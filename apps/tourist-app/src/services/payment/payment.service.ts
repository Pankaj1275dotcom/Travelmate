import api from "../api/axios";

import type {

    CreatePaymentOrderResponse,

    VerifyPaymentRequest,

    VerifyPaymentResponse,

} from "../../types/booking.types";

declare global {

    interface Window {

        Razorpay: any;

    }

}

class PaymentService {

    private async loadRazorpayScript() {

        if (window.Razorpay) {

            return true;

        }

        return new Promise<boolean>((resolve) => {

            const script =
                document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => resolve(true);

            script.onerror = () => resolve(false);

            document.body.appendChild(script);

        });

    }

    async createOrder(
        bookingId: string
    ): Promise<CreatePaymentOrderResponse> {

        const response =
            await api.post<CreatePaymentOrderResponse>(
                "/payments/create-order",
                {
                    bookingId,
                }
            );

        return response.data;

    }

    async verifyPayment(
        data: VerifyPaymentRequest
    ): Promise<VerifyPaymentResponse> {

        const response =
            await api.post<VerifyPaymentResponse>(
                "/payments/verify",
                data
            );

        return response.data;

    }

    async openCheckout(options: {

        bookingId: string;

        orderId: string;

        amount: number;

        currency: string;

        key: string;

        customerName?: string;

        customerEmail?: string;

        customerPhone?: string;

        onSuccess: () => void;

    }) {

        const loaded =
            await this.loadRazorpayScript();

        if (!loaded) {

            throw new Error(
                "Unable to load Razorpay."
            );

        }

        const razorpay =
            new window.Razorpay({

                key: options.key,

                amount: options.amount,

                currency: options.currency,

                order_id: options.orderId,
                

                name: "TravelMate",

                description: "Travel Booking",

                handler: async (response: any) => {

                    await this.verifyPayment({

                        bookingId:
                            options.bookingId,

                        razorpayOrderId:
                            response.razorpay_order_id,

                        razorpayPaymentId:
                            response.razorpay_payment_id,

                        razorpaySignature:
                            response.razorpay_signature,

                    });

                    options.onSuccess();

                },

                prefill: {

                    name:
                        options.customerName,

                    email:
                        options.customerEmail,

                    contact:
                        options.customerPhone,

                },

                theme: {

                    color: "#2563eb",

                },

            });

        razorpay.open();

    }

}

export default new PaymentService();