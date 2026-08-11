import { Router } from "express";

import {
    authenticate,
    AuthRequest,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/profile",
    authenticate,
    (req: AuthRequest, res) => {
        return res.status(200).json({
            success: true,
            message: "Protected Route Accessed",
            user: req.user,
        });
    }
);

export default router;