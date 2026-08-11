import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: error.issues,
        });
    }

    if (error instanceof Error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}