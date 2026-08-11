import prisma from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";

class DriverRepository {
    async createDriver(data: Prisma.DriverCreateInput) {
        return prisma.driver.create({
            data,
        });
    }

    async findDriverById(id: string) {
        return prisma.driver.findUnique({
            where: {
                id,
            },
        });
    }

    async findDriverByUserId(userId: string) {
        return prisma.driver.findUnique({
            where: {
                userId,
            },
        });
    }

    async findUserById(userId: string) {
        return prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
            },
        });
    }

    async getAllDrivers() {
        return prisma.driver.findMany({
            where: {
                approvalStatus: "APPROVED",
                isAvailable: true,
                vacationMode: false,
            },
            orderBy: {
                rating: "desc",
            },
        });
    }

    async getDriversByCity(city: string) {
        return prisma.driver.findMany({
            where: {
                city,
                approvalStatus: "APPROVED",
                isAvailable: true,
                vacationMode: false,
            },
            orderBy: {
                rating: "desc",
            },
        });
    }

    async updateDriver(
        id: string,
        data: Prisma.DriverUpdateInput
    ) {
        return prisma.driver.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteDriver(id: string) {
        return prisma.driver.delete({
            where: {
                id,
            },
        });
    }

    async getMyDriver(userId: string) {
        return prisma.driver.findUnique({
            where: {
                userId,
            },
        });
    }

    async updateMyProfile(
        userId: string,
        data: Prisma.DriverUpdateInput
    ) {
        const driver =
            await prisma.driver.findFirst({
                where: {
                    userId,
                },
            });

        if (!driver) {
            throw new Error(
                "Driver profile not found"
            );
        }

        return prisma.driver.update({
            where: {
                id: driver.id,
            },
            data,
        });
    }

    async getAvailability(userId: string) {
        return prisma.driver.findUnique({
            where: {
                userId,
            },
            select: {
                isAvailable: true,
                vacationMode: true,
                workingDays: true,
                workingStartTime: true,
                workingEndTime: true,
            },
        });
    }

    async updateAvailability(
        userId: string,
        data: Prisma.DriverUpdateInput
    ) {
        return prisma.driver.update({
            where: {
                userId,
            },
            data,
            select: {
                isAvailable: true,
                vacationMode: true,
                workingDays: true,
                workingStartTime: true,
                workingEndTime: true,
            },
        });
    }

    async getVehicleDetails(userId: string) {
        return prisma.driver.findUnique({
            where: {
                userId,
            },
            select: {
                vehicleType: true,
                vehicleBrand: true,
                vehicleModel: true,
                vehicleNumber: true,
                vehicleColor: true,
                seatCapacity: true,
                airConditioned: true,
            },
        });
    }

    async updateVehicleDetails(
        userId: string,
        data: Prisma.DriverUpdateInput
    ) {
        return prisma.driver.update({
            where: {
                userId,
            },
            data,
            select: {
                vehicleType: true,
                vehicleBrand: true,
                vehicleModel: true,
                vehicleNumber: true,
                vehicleColor: true,
                seatCapacity: true,
                airConditioned: true,
            },
        });
    }
}

export default new DriverRepository();