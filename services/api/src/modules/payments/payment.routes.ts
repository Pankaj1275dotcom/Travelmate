import { Router } from "express";

import paymentController from "./payment.controller.js";

import {
    authenticate,
} from "../../middleware/auth.middleware.js";

const router = Router();

router.post(

    "/create-order",

    authenticate,

    paymentController.createOrder

);

router.post(

    "/verify",

    authenticate,

    paymentController.verifyPayment

);

export default router;