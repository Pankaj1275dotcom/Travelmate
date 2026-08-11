import prisma from "../../lib/prisma.js";

import {
    PaymentStatus,
    BookingStatus,
} from "@travelmate/database";

class PaymentRepository {

    async findBookingById(
        bookingId: string
    ) {

        return prisma.booking.findUnique({

            where: {
                id: bookingId,
            },

            include: {

                payment: true,

                items: true,

                cart: {
                    include: {
                        items: true,
                    },
                },

            },

        });

    }

    async updatePayment(
        bookingId: string,
        data: {
            status?: PaymentStatus;
            transactionId?: string;
            gatewayOrderId?: string;
            gatewayPaymentId?: string;
            gatewaySignature?: string;
            paidAt?: Date;
        }
    ) {

        return prisma.payment.update({

            where: {
                bookingId,
            },

            data,

        });

    }

    async updateBooking(
        bookingId: string,
        data: {
            status?: BookingStatus;
            paymentStatus?: PaymentStatus;
            paidAt?: Date;
            confirmedAt?: Date;
        }
    ) {

        return prisma.booking.update({

            where: {
                id: bookingId,
            },

            data,

        });

    }

    async updateBookingItems(
        bookingId: string,
        data: {
            status?: any;
            paymentStatus?: PaymentStatus;
            paidAt?: Date;
            confirmedAt?: Date;
        }
    ) {

        return prisma.bookingItem.updateMany({

            where: {
                bookingId,
            },

            data,

        });

    }

    async clearCart(
        cartId: string
    ) {

        return prisma.tripCartItem.deleteMany({

            where: {
                cartId,
            },

        });

    }

    async resetCart(
        cartId: string
    ) {

        return prisma.tripCart.update({

            where: {
                id: cartId,
            },

            data: {

                totalAmount: 0,

                platformFee: 0,

                payableAmount: 0,

                isCheckedOut: false,

                checkedOutAt: null,

            },

        });

    }

}

export default new PaymentRepository();