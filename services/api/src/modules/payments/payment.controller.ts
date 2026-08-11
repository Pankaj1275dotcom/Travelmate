import { Request, Response } from "express";

import paymentService from "./payment.service.js";

import {
    createPaymentOrderSchema,
    verifyPaymentSchema,
} from "./payment.validation.js";

class PaymentController {

    async createOrder(
        req: Request,
        res: Response
    ) {

        const {
            bookingId,
        } =
            createPaymentOrderSchema.parse(
                req.body
            );

        const result =
            await paymentService.createPaymentOrder(
                bookingId
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async verifyPayment(
        req: Request,
        res: Response
    ) {

        const {

            bookingId,

            razorpayOrderId,

            razorpayPaymentId,

            razorpaySignature,

        } =
            verifyPaymentSchema.parse(
                req.body
            );

        const result =
            await paymentService.verifyPayment(

                bookingId,

                razorpayOrderId,

                razorpayPaymentId,

                razorpaySignature

            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

}

export default new PaymentController();