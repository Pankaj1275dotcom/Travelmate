import { Request, Response } from "express";

import dashboardService from "./dashboard.service.js";

class DashboardController {
    async getDashboardStats(
        _req: Request,
        res: Response
    ) {
        const result =
            await dashboardService.getDashboardStats();

        return res.status(200).json({
            success: true,
            message: result.message,
            data: result.data,
        });
    }
}

export default new DashboardController();