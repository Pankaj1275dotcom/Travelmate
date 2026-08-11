export interface CreatePaymentOrderDto {

    bookingId: string;

}

export interface VerifyPaymentDto {

    bookingId: string;

    razorpayOrderId: string;

    razorpayPaymentId: string;

    razorpaySignature: string;

}

export interface PaymentOrderResponse {

    bookingId: string;

    orderId: string;

    amount: number;

    currency: string;

    key: string;

}

export interface PaymentVerificationResponse {

    message: string;

}