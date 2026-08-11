import crypto from "crypto";

import razorpay from "../../lib/razorpay.js";

import paymentRepository from "./payment.repository.js";
import tripService from "../trips/trip.service.js";
import {
    PaymentStatus,
    BookingStatus,
    BookingItemStatus,
} from "@travelmate/database";

class PaymentService {

    async createPaymentOrder(
        bookingId: string
    ) {

        const booking =
            await paymentRepository.findBookingById(
                bookingId
            );

        if (!booking) {

            throw new Error(
                "Booking not found."
            );

        }

        if (!booking.payment) {

            throw new Error(
                "Payment record not found."
            );

        }

        if (
            booking.payment.status ===
            PaymentStatus.PAID
        ) {

            throw new Error(
                "Booking is already paid."
            );

        }

        const amount =
            Math.round(
                Number(
                    booking.payableAmount
                ) * 100
            );

try {

    const order =
        await razorpay.orders.create({

            amount,

            currency: "INR",

            receipt:
                booking.bookingNumber,

            notes: {

                bookingId:
                    booking.id,

            },

        });

    await paymentRepository.updatePayment(
        booking.id,
        {

            gatewayOrderId:
                order.id,

        }
    );

    return {

        bookingId:
            booking.id,

        orderId:
            order.id,

        amount:
            order.amount,

        currency:
            order.currency,

        key:
            process.env.RAZORPAY_KEY_ID,

    };

} catch (error) {

    console.error(
        "RAZORPAY ERROR:",
        error
    );

    throw error;

}

    }    async verifyPayment(
        bookingId: string,
        razorpayOrderId: string,
        razorpayPaymentId: string,
        razorpaySignature: string
    ) {

        const booking =
            await paymentRepository.findBookingById(
                bookingId
            );

        if (!booking) {

            throw new Error(
                "Booking not found."
            );

        }

        if (!booking.payment) {

            throw new Error(
                "Payment record not found."
            );

        }

        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env
                        .RAZORPAY_KEY_SECRET as string
                )
                .update(
                    `${razorpayOrderId}|${razorpayPaymentId}`
                )
                .digest("hex");

        if (
            expectedSignature !==
            razorpaySignature
        ) {

            throw new Error(
                "Invalid payment signature."
            );

        }

        const now =
            new Date();

        await paymentRepository.updatePayment(
            booking.id,
            {

                status:
                    PaymentStatus.PAID,

                transactionId:
                    razorpayPaymentId,

                gatewayOrderId:
                    razorpayOrderId,

                gatewayPaymentId:
                    razorpayPaymentId,

                gatewaySignature:
                    razorpaySignature,

                paidAt:
                    now,

            }
        );

        await paymentRepository.updateBooking(
            booking.id,
            {

                paymentStatus:
                    PaymentStatus.PAID,

                status:
                    BookingStatus.CONFIRMED,

                paidAt:
                    now,

                confirmedAt:
                    now,

            }
        );

        await paymentRepository.updateBookingItems(
            booking.id,
            {

                paymentStatus:
                    PaymentStatus.PAID,

                status:
                    BookingItemStatus.CONFIRMED,

                paidAt:
                    now,

                confirmedAt:
                    now,

            }
        );

        if (
            booking.cart
        ) {

            await paymentRepository.clearCart(
                booking.cart.id
            );

            await paymentRepository.resetCart(
                booking.cart.id
            );

        }
        await tripService.generateTripPass(
    booking.userId,
    booking.id
);

        return {

            message:
                "Payment verified successfully.",

        };

    }

}

export default new PaymentService();