import { NextFunction, Response } from "express";

import { Role } from "@travelmate/database";

import { AuthRequest } from "./auth.middleware.js";

export function authorizeRole(
    ...allowedRoles: Role[]
) {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message:
                    "Authentication required.",

            });

        }

        if (
            !allowedRoles.includes(
                req.user.role
            )
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Access denied.",

            });

        }

        next();

    };
}