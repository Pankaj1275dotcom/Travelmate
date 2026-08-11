import prisma from "../../lib/prisma.js";
import {
    AuthVerificationType,
    Prisma,
    User,
} from "@travelmate/database";

class AuthRepository {
    async findUserByEmail(
        email: string
    ): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findUserByPhone(
        phone: string
    ): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                phone,
            },
        });
    }

    async findUserById(
        id: string
    ): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async createUser(
        data: Prisma.UserCreateInput
    ): Promise<User> {
        return prisma.user.create({
            data,
        });
    }

    async createHotelOwner(
        userData: Prisma.UserCreateInput,
        hotelData: Omit<
            Prisma.HotelCreateInput,
            "owner"
        >
    ): Promise<User> {
        return prisma.$transaction(
            async (tx) => {
                const user =
                    await tx.user.create({
                        data: userData,
                    });

                await tx.hotel.create({
                    data: {
                        ...hotelData,
                        owner: {
                            connect: {
                                id: user.id,
                            },
                        },
                    },
                });

                return user;
            }
        );
    }

    async createVerification(
        data: {
            userId: string;
            type: AuthVerificationType;
            target: string;
            code: string;
            expiresAt: Date;
        }
    ) {
        return prisma.authVerification.create({
            data,
        });
    }

    async deleteActiveVerifications(
        userId: string,
        type: AuthVerificationType
    ) {
        return prisma.authVerification.deleteMany({
            where: {
                userId,
                type,
                verifiedAt: null,
            },
        });
    }

    async findActiveVerification(
        userId: string,
        type: AuthVerificationType,
        code: string
    ) {
        return prisma.authVerification.findFirst({
            where: {
                userId,
                type,
                code,
                verifiedAt: null,
                expiresAt: {
                    gt: new Date(),
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async markVerificationVerified(
        id: string
    ) {
        return prisma.authVerification.update({
            where: {
                id,
            },
            data: {
                verifiedAt: new Date(),
            },
        });
    }

    async updateEmailVerified(
        userId: string
    ): Promise<User> {
        return prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                emailVerified: true,
            },
        });
    }

    async updatePhoneVerified(
        userId: string
    ): Promise<User> {
        return prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                phoneVerified: true,
            },
        });
    }

    async updatePassword(
        userId: string,
        password: string
    ): Promise<User> {
        return prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                password,
            },
        });
    }
}

export default new AuthRepository();