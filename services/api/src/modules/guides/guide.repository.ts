import prisma from "../../lib/prisma.js";

import { Prisma } from "@prisma/client";


class GuideRepository {

    async createGuide(
        data: Prisma.GuideCreateInput
    ) {

        return prisma.guide.create({
            data,
        });

    }


    async findGuideById(
        id: string
    ) {

        return prisma.guide.findUnique({
            where: {
                id,
            },
        });

    }


    async findGuideByUserId(
        userId: string
    ) {

        return prisma.guide.findUnique({
            where: {
                userId,
            },
        });

    }


    async findUserById(
        userId: string
    ) {

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


    async getAllGuides() {

        return prisma.guide.findMany({
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


    async getGuidesByCity(
        city: string
    ) {

        return prisma.guide.findMany({
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


    async getAvailability(
        userId: string
    ) {

        return prisma.guide.findUnique({
            where: {
                userId,
            },
            select: {
                id: true,
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
        data: {
            isAvailable: boolean;
            vacationMode: boolean;
            workingDays: string;
            workingStartTime: string;
            workingEndTime: string;
        }
    ) {

        return prisma.guide.update({
            where: {
                userId,
            },
            data: {
                isAvailable:
                    data.isAvailable,

                vacationMode:
                    data.vacationMode,

                workingDays:
                    data.workingDays,

                workingStartTime:
                    data.workingStartTime,

                workingEndTime:
                    data.workingEndTime,
            },
            select: {
                id: true,
                isAvailable: true,
                vacationMode: true,
                workingDays: true,
                workingStartTime: true,
                workingEndTime: true,
            },
        });

    }


    async updateGuide(
        id: string,
        data: Prisma.GuideUpdateInput
    ) {

        return prisma.guide.update({
            where: {
                id,
            },
            data,
        });

    }


    async deleteGuide(
        id: string
    ) {

        return prisma.guide.delete({
            where: {
                id,
            },
        });

    }


    async getGuideEarnings(
        userId: string
    ) {

        const guide =
            await prisma.guide.findUnique({
                where: {
                    userId,
                },
                select: {
                    id: true,
                },
            });


        if (!guide) {
            return null;
        }


        return prisma.bookingItem.findMany({

            where: {

                guideId:
                    guide.id,

                bookingType:
                    "GUIDE",

                paymentStatus:
                    "PAID",

            },

            select: {

                id: true,

                totalPrice: true,

                platformFee: true,

                providerAmount: true,

                paymentStatus: true,

                paidAt: true,

                completedAt: true,

                status: true,

                guideStartDate: true,

                guideEndDate: true,

                guideStartTime: true,

                guideEndTime: true,

                booking: {

                    select: {

                        id: true,

                        bookingNumber: true,

                        user: {

                            select: {

                                id: true,

                                firstName: true,

                                lastName: true,

                                email: true,

                            },

                        },

                    },

                },

            },

            orderBy: {

                paidAt: "desc",

            },

        });

    }

}


export default new GuideRepository();