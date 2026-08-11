import { Request, Response } from "express";

import approvalService from "./approval.service.js";

class ApprovalController {
    async getPendingHotels(
        _req: Request,
        res: Response
    ) {
        const hotels =
            await approvalService.getPendingHotels();

        return res.status(200).json({
            success: true,
            hotels,
        });
    }

    async getApprovedHotels(
        _req: Request,
        res: Response
    ) {
        const hotels =
            await approvalService.getApprovedHotels();

        return res.status(200).json({
            success: true,
            hotels,
        });
    }

    async getPendingGuides(
        _req: Request,
        res: Response
    ) {
        const guides =
            await approvalService.getPendingGuides();

        return res.status(200).json({
            success: true,
            guides,
        });
    }

    async getApprovedGuides(
        _req: Request,
        res: Response
    ) {
        const guides =
            await approvalService.getApprovedGuides();

        return res.status(200).json({
            success: true,
            guides,
        });
    }

    async getPendingDrivers(
        _req: Request,
        res: Response
    ) {
        const drivers =
            await approvalService.getPendingDrivers();

        return res.status(200).json({
            success: true,
            drivers,
        });
    }

    async getApprovedDrivers(
        _req: Request,
        res: Response
    ) {
        const drivers =
            await approvalService.getApprovedDrivers();

        return res.status(200).json({
            success: true,
            drivers,
        });
    }

    async approveHotel(
        req: Request,
        res: Response
    ) {
        const result =
            await approvalService.approveHotel(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }

    async rejectHotel(
        req: Request,
        res: Response
    ) {
        const result =
            await approvalService.rejectHotel(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }

    async approveGuide(
        req: Request,
        res: Response
    ) {
        const result =
            await approvalService.approveGuide(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }

    async rejectGuide(
        req: Request,
        res: Response
    ) {
        const result =
            await approvalService.rejectGuide(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }

    async approveDriver(
        req: Request,
        res: Response
    ) {
        const result =
            await approvalService.approveDriver(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }

    async rejectDriver(
        req: Request,
        res: Response
    ) {
        const result =
            await approvalService.rejectDriver(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }
}

export default new ApprovalController();