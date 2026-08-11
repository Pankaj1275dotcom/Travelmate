import { Prisma } from "@prisma/client";

import prisma from "../../../lib/prisma.js";

import { SearchUserDto } from "./admin-user.types.js";

class AdminUserRepository {
    async searchUsers(
        filters: SearchUserDto
    ) {
        const where: Prisma.UserWhereInput = {};

        if (filters.firstName) {
            where.firstName = {
                contains: filters.firstName,
            };
        }

        if (filters.lastName) {
            where.lastName = {
                contains: filters.lastName,
            };
        }

        if (filters.email) {
            where.email = filters.email;
        }

        if (filters.phone) {
            where.phone = filters.phone;
        }

        if (filters.role) {
            where.role = filters.role;
        }

        return prisma.user.findMany({
            where,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                approvalStatus: true,
                isActive: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getUserDetails(userId: string) {
        return prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                hotels: {
                    include: {
                        roomTypes: true,
                    },
                },
                guide: true,
                driver: true,
                bookings: {
                    include: {
                        items: true,
                        payment: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                wishlists: {
                    include: {
                        hotel: true,
                    },
                },
            },
        });
    }
        async updateUserStatus(
        userId: string,
        isActive: boolean
    ) {

        return prisma.user.update({

            where: {
                id: userId,
            },

            data: {
                isActive,
            },

            select: {

                id: true,

                firstName: true,

                lastName: true,

                email: true,

                phone: true,

                role: true,

                approvalStatus: true,

                isActive: true,

                profileImage: true,

                createdAt: true,

                updatedAt: true,

            },

        });

    }
}

export default new AdminUserRepository();