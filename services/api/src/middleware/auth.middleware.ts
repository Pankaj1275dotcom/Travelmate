import { NextFunction, Request, Response } from "express";

import { Role } from "@travelmate/database";

import { verifyAccessToken } from "../lib/jwt.js";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: Role;
    };
}

export function authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing",
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format",
            });
        }

        const token = authHeader.split(" ")[1];

        const payload = verifyAccessToken(token);

        // DEBUG
        console.log("========== AUTH DEBUG ==========");
        console.log("Token:", token);
        console.log("JWT Payload:", payload);
        console.log("===============================");

        req.user = {
            id: payload.id,
            role: payload.role as Role,
        };

        next();
    } catch (error) {
        console.error("AUTH ERROR:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}