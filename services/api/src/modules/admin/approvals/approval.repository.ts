import prisma from "../../../lib/prisma.js";

class ApprovalRepository {
    // Hotels

    async getPendingHotels() {
        return prisma.hotel.findMany({
            where: {
                isApproved: false,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
                images: true,
                roomTypes: {
                    include: {
                        rooms: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getApprovedHotels() {
        return prisma.hotel.findMany({
            where: {
                isApproved: true,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
                images: true,
                roomTypes: {
                    include: {
                        rooms: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
    }

    async approveHotel(hotelId: string) {
        return prisma.hotel.update({
            where: {
                id: hotelId,
            },
            data: {
                isApproved: true,
            },
        });
    }

    async rejectHotel(hotelId: string) {
        return prisma.hotel.delete({
            where: {
                id: hotelId,
            },
        });
    }

    // Guides

    async getPendingGuides() {
        return prisma.guide.findMany({
            where: {
                approvalStatus: "PENDING",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getApprovedGuides() {
        return prisma.guide.findMany({
            where: {
                approvalStatus: "APPROVED",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
    }

    async approveGuide(userId: string) {
        return prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: userId,
                },
                data: {
                    approvalStatus: "APPROVED",
                },
            });

            return tx.guide.update({
                where: {
                    userId,
                },
                data: {
                    approvalStatus: "APPROVED",
                },
            });
        });
    }

    async rejectGuide(userId: string) {
        return prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: userId,
                },
                data: {
                    approvalStatus: "REJECTED",
                },
            });

            return tx.guide.update({
                where: {
                    userId,
                },
                data: {
                    approvalStatus: "REJECTED",
                },
            });
        });
    }

    // Drivers

    async getPendingDrivers() {
        return prisma.driver.findMany({
            where: {
                approvalStatus: "PENDING",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getApprovedDrivers() {
        return prisma.driver.findMany({
            where: {
                approvalStatus: "APPROVED",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
    }

    async approveDriver(userId: string) {
        return prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: userId,
                },
                data: {
                    approvalStatus: "APPROVED",
                },
            });

            return tx.driver.update({
                where: {
                    userId,
                },
                data: {
                    approvalStatus: "APPROVED",
                },
            });
        });
    }

    async rejectDriver(userId: string) {
        return prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: userId,
                },
                data: {
                    approvalStatus: "REJECTED",
                },
            });

            return tx.driver.update({
                where: {
                    userId,
                },
                data: {
                    approvalStatus: "REJECTED",
                },
            });
        });
    }
}

export default new ApprovalRepository();