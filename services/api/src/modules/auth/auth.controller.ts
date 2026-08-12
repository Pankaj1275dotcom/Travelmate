import {
    NextFunction,
    Request,
    Response,
} from "express";

import authService from "./auth.service.js";

import {
    forgotPasswordSchema,
    loginSchema,
    registerSchema,
    resendVerificationSchema,
    resetPasswordSchema,
    verifyEmailSchema,
} from "./auth.validation.js";

import {
    AuthRequest,
} from "../../middleware/auth.middleware.js";

class AuthController {
    async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data =
                registerSchema.parse(
                    req.body
                );

            const result =
                await authService.register(
                    data
                );

            return res.status(201).json({
                success: true,
                message:
                    result.message,
                data:
                    result.user,
            });
        } catch (error) {
            next(error);
        }
    }

    async check(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { email, phone } = req.query as {
                email?: string;
                phone?: string;
            };

            const result: Record<string, boolean> = {};

            if (email) {
                const existing = await authService.findByEmail(
                    String(email)
                );

                result.emailExists = !!existing;
            }

            if (phone) {
                const existing = await authService.findByPhone(
                    String(phone)
                );

                result.phoneExists = !!existing;
            }

            return res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyEmail(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data =
                verifyEmailSchema.parse(
                    req.body
                );

            const result =
                await authService.verifyEmail(
                    data
                );

            return res.status(200).json({
                success: true,
                message:
                    result.message,
            });
        } catch (error) {
            next(error);
        }
    }

    async resendVerification(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data =
                resendVerificationSchema.parse(
                    req.body
                );

            const result =
                await authService
                    .resendVerification(
                        data
                    );

            return res.status(200).json({
                success: true,
                message:
                    result.message,
            });
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data =
                forgotPasswordSchema.parse(
                    req.body
                );

            const result =
                await authService
                    .forgotPassword(
                        data
                    );

            return res.status(200).json({
                success: true,
                message:
                    result.message,
            });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data =
                resetPasswordSchema.parse(
                    req.body
                );

            const result =
                await authService
                    .resetPassword(
                        data
                    );

            return res.status(200).json({
                success: true,
                message:
                    result.message,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data =
                loginSchema.parse(
                    req.body
                );

            const result =
                await authService.login(
                    data
                );

            return res.status(200).json({
                success: true,
                message:
                    result.message,
                data: {
                    token:
                        result.token,
                    user:
                        result.user,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async me(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result =
                await authService.me(
                    req.user!.id
                );

            return res.status(200).json({
                success: true,
                message:
                    result.message,
                data:
                    result.user,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();