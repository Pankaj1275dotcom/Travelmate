import { Router } from "express";

import dashboardController from "./dashboard.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/",
    authenticate,
    dashboardController.getDashboardStats
);

export default router;