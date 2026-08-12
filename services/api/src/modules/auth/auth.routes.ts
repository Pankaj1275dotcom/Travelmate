import { Router } from "express";

import authController from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    authController.register
);

router.get(
    "/check",
    authController.check
);

router.post(
    "/verify-email",
    authController.verifyEmail
);

router.post(
    "/resend-verification",
    authController.resendVerification
);

router.post(
    "/forgot-password",
    authController.forgotPassword
);

router.post(
    "/reset-password",
    authController.resetPassword
);

router.post(
    "/login",
    authController.login
);

router.get(
    "/me",
    authenticate,
    authController.me
);

export default router;