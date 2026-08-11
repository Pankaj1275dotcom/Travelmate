import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import driverService from "./driver.service.js";
import {
    createDriverSchema,
    updateDriverSchema,
    updateDriverAvailabilitySchema,
    updateDriverVehicleSchema,
} from "./driver.validation.js";

class DriverController {
    async createDriver(req: AuthRequest, res: Response) {
        const data = createDriverSchema.parse(req.body);

        const result = await driverService.createDriver({
            ...data,
            userId: req.user!.id,
        });

        return res.status(201).json({
            success: true,
            ...result,
        });
    }

    async getDriverById(req: Request, res: Response) {
        const driver = await driverService.getDriverById(
            req.params.id as string
        );

        return res.status(200).json({
            success: true,
            driver,
        });
    }

    async getAllDrivers(req: Request, res: Response) {
        const drivers = await driverService.getAllDrivers();

        return res.status(200).json({
            success: true,
            count: drivers.length,
            drivers,
        });
    }

    async getDriversByCity(req: Request, res: Response) {
        const drivers = await driverService.getDriversByCity(
            req.params.city as string
        );

        return res.status(200).json({
            success: true,
            count: drivers.length,
            drivers,
        });
    }

    async updateDriver(req: Request, res: Response) {
        const data = updateDriverSchema.parse(req.body);

        const driver = await driverService.updateDriver(
            req.params.id as string,
            data
        );

        return res.status(200).json({
            success: true,
            message: "Driver updated successfully",
            driver,
        });
    }

    async deleteDriver(req: Request, res: Response) {
        const result = await driverService.deleteDriver(
            req.params.id as string
        );

        return res.status(200).json({
            success: true,
            ...result,
        });
    }

    // ==========================
    // Driver Dashboard
    // ==========================

   async getMyDriver(
    req: AuthRequest,
    res: Response
) {
    const result =
        await driverService.getMyDriver(
            req.user!.id
        );

    return res.status(200).json({
        success: true,
        ...result,
    });
}

    async updateMyProfile(req: AuthRequest, res: Response) {
        const data = updateDriverSchema.parse(req.body);

        const driver = await driverService.updateMyProfile(
            req.user!.id,
            data
        );

        return res.status(200).json({
            success: true,
            message: "Driver profile updated successfully",
            driver,
        });
    }

    async getAvailability(req: AuthRequest, res: Response) {
        const availability = await driverService.getAvailability(
            req.user!.id
        );

        return res.status(200).json({
            success: true,
            availability,
        });
    }

    async updateAvailability(req: AuthRequest, res: Response) {
        const data = updateDriverAvailabilitySchema.parse(req.body);

        const availability = await driverService.updateAvailability(
            req.user!.id,
            data
        );

        return res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            availability,
        });
    }

    async getVehicleDetails(req: AuthRequest, res: Response) {
        const vehicle = await driverService.getVehicleDetails(
            req.user!.id
        );

        return res.status(200).json({
            success: true,
            vehicle,
        });
    }

    async updateVehicleDetails(req: AuthRequest, res: Response) {
        const data = updateDriverVehicleSchema.parse(req.body);

        const vehicle = await driverService.updateVehicleDetails(
            req.user!.id,
            data
        );

        return res.status(200).json({
            success: true,
            message: "Vehicle details updated successfully",
            vehicle,
        });
    }
}

export default new DriverController();