import bcrypt from "bcrypt";

import prisma from "../../lib/prisma.js";
import { generateAccessToken } from "../../lib/jwt.js";
import { sendEmail } from "../../utils/email.js";

import authRepository from "./auth.repository.js";

import {
    ForgotPasswordDto,
    LoginUserDto,
    RegisterUserDto,
    ResendVerificationDto,
    ResetPasswordDto,
    VerifyEmailDto,
} from "./auth.types.js";

class AuthService {
    private generateOtp(): string {
        return Math.floor(
            100000 +
            Math.random() * 900000
        ).toString();
    }

    private async sendOtpEmail(
        email: string,
        otp: string,
        subject: string
    ) {
        await sendEmail({
            to: email,
            subject,
            html: `
                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 24px;
                        border-radius: 16px;
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                    "
                >
                    <h2
                        style="
                            margin: 0 0 16px;
                            color: #0f172a;
                        "
                    >
                        TravelMate Verification
                    </h2>

                    <p
                        style="
                            color: #475569;
                            line-height: 1.6;
                        "
                    >
                        Use the following OTP to continue:
                    </p>

                    <div
                        style="
                            margin: 24px 0;
                            padding: 16px;
                            text-align: center;
                            font-size: 30px;
                            font-weight: 700;
                            letter-spacing: 8px;
                            color: #0f172a;
                            background: #f8fafc;
                            border-radius: 12px;
                        "
                    >
                        ${otp}
                    </div>

                    <p
                        style="
                            color: #64748b;
                            font-size: 14px;
                            line-height: 1.6;
                        "
                    >
                        This OTP expires in 10 minutes.
                    </p>

                    <p
                        style="
                            color: #64748b;
                            font-size: 14px;
                        "
                    >
                        If you did not request this, please ignore this email.
                    </p>
                </div>
            `,
        });
    }

    async register(
        data: RegisterUserDto
    ) {
        const existingEmail =
            await authRepository.findUserByEmail(
                data.email
            );

        if (existingEmail) {
            throw new Error(
                "Email already exists"
            );
        }

        const existingPhone =
            await authRepository.findUserByPhone(
                data.phone
            );

        if (existingPhone) {
            throw new Error(
                "Phone number already exists"
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                data.password,
                10
            );

        const approvalStatus =
            data.role === "TOURIST" ||
            data.role === "HOTEL_OWNER"
                ? "APPROVED"
                : "PENDING";

        const result =
            await prisma.$transaction(
                async (tx) => {
                    const user =
                        await tx.user.create({
                            data: {
                                firstName:
                                    data.firstName,
                                lastName:
                                    data.lastName,
                                email:
                                    data.email,
                                phone:
                                    data.phone,
                                password:
                                    hashedPassword,
                                role:
                                    data.role,
                                approvalStatus,

                                emailVerified:
                                    data.role !==
                                    "TOURIST",

                                phoneVerified:
                                    data.role !==
                                    "TOURIST",
                            },
                        });

                    if (
                        data.role ===
                        "DRIVER"
                    ) {
                        await tx.driver.create({
                            data: {
                                userId:
                                    user.id,

                                fullName:
                                    `${user.firstName} ${user.lastName}`,

                                phone:
                                    user.phone,

                                bio: "",

                                city:
                                    "Jaipur",

                                experience: 0,

                                vehicleType:
                                    "CAR",

                                vehicleBrand:
                                    "Not Added",

                                vehicleModel:
                                    "Not Added",

                                vehicleNumber:
                                    `TEMP-${Date.now()}`,

                                vehicleColor:
                                    "",

                                seatCapacity: 4,

                                airConditioned:
                                    true,

                                pricePerHour: 0,

                                pricePerDay: 0,
                            },
                        });
                    }

                    return user;
                }
            );

        if (
            data.role ===
            "TOURIST"
        ) {
            const otp =
                this.generateOtp();

            const expiresAt =
                new Date(
                    Date.now() +
                    10 * 60 * 1000
                );

            await authRepository
                .deleteActiveVerifications(
                    result.id,
                    "EMAIL"
                );

            await authRepository
                .createVerification({
                    userId:
                        result.id,

                    type:
                        "EMAIL",

                    target:
                        result.email,

                    code:
                        otp,

                    expiresAt,
                });

            // send verification email asynchronously so registration isn't blocked
            this.sendOtpEmail(
                result.email,
                otp,
                "Verify your TravelMate email"
            ).catch((err) => {
                // log the error but don't fail the registration
                // eslint-disable-next-line no-console
                console.error("Failed to send verification email:", err);
            });

            return {
                message:
                    "Registration successful. Please verify your email.",
                user: result,
            };
        }

        return {
            message:
                "User registered successfully",
            user: result,
        };
    }

    async verifyEmail(
        data: VerifyEmailDto
    ) {
        const user =
            await authRepository.findUserByEmail(
                data.email
            );

        if (!user) {
            throw new Error(
                "User not found"
            );
        }

        if (
            user.role !==
            "TOURIST"
        ) {
            throw new Error(
                "Email verification is only available for tourists"
            );
        }

        if (user.emailVerified) {
            throw new Error(
                "Email is already verified"
            );
        }

        const verification =
            await authRepository
                .findActiveVerification(
                    user.id,
                    "EMAIL",
                    data.otp
                );

        if (!verification) {
            throw new Error(
                "Invalid or expired OTP"
            );
        }

        await prisma.$transaction(
            async (tx) => {
                await tx.authVerification.update({
                    where: {
                        id:
                            verification.id,
                    },
                    data: {
                        verifiedAt:
                            new Date(),
                    },
                });

                await tx.user.update({
                    where: {
                        id:
                            user.id,
                    },
                    data: {
                        emailVerified:
                            true,
                    },
                });
            }
        );

        return {
            message:
                "Email verified successfully",
        };
    }

    async resendVerification(
        data: ResendVerificationDto
    ) {
        const user =
            await authRepository.findUserByEmail(
                data.email
            );

        if (!user) {
            throw new Error(
                "User not found"
            );
        }

        if (
            user.role !==
            "TOURIST"
        ) {
            throw new Error(
                "Email verification is only available for tourists"
            );
        }

        if (user.emailVerified) {
            throw new Error(
                "Email is already verified"
            );
        }

        const otp =
            this.generateOtp();

        const expiresAt =
            new Date(
                Date.now() +
                10 * 60 * 1000
            );

        await authRepository
            .deleteActiveVerifications(
                user.id,
                "EMAIL"
            );

        await authRepository
            .createVerification({
                userId:
                    user.id,

                type:
                    "EMAIL",

                target:
                    user.email,

                code:
                    otp,

                expiresAt,
            });

        await this.sendOtpEmail(
            user.email,
            otp,
            "Your TravelMate verification OTP"
        );

        return {
            message:
                "Verification OTP sent successfully",
        };
    }

    async forgotPassword(
        data: ForgotPasswordDto
    ) {
        const user =
            await authRepository.findUserByEmail(
                data.email
            );

        if (!user) {
            return {
                message:
                    "If this email is registered, a password reset OTP has been sent",
            };
        }

        if (
            user.role !==
            "TOURIST"
        ) {
            throw new Error(
                "Password reset is currently available only for tourists"
            );
        }

        const otp =
            this.generateOtp();

        const expiresAt =
            new Date(
                Date.now() +
                10 * 60 * 1000
            );

        await authRepository
            .deleteActiveVerifications(
                user.id,
                "PASSWORD_RESET"
            );

        await authRepository
            .createVerification({
                userId:
                    user.id,

                type:
                    "PASSWORD_RESET",

                target:
                    user.email,

                code:
                    otp,

                expiresAt,
            });

        await this.sendOtpEmail(
            user.email,
            otp,
            "Reset your TravelMate password"
        );

        return {
            message:
                "Password reset OTP sent successfully",
        };
    }

    async resetPassword(
        data: ResetPasswordDto
    ) {
        const user =
            await authRepository.findUserByEmail(
                data.email
            );

        if (!user) {
            throw new Error(
                "Invalid password reset request"
            );
        }

        if (
            user.role !==
            "TOURIST"
        ) {
            throw new Error(
                "Password reset is currently available only for tourists"
            );
        }

        const verification =
            await authRepository
                .findActiveVerification(
                    user.id,
                    "PASSWORD_RESET",
                    data.otp
                );

        if (!verification) {
            throw new Error(
                "Invalid or expired OTP"
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                data.password,
                10
            );

        await prisma.$transaction(
            async (tx) => {
                await tx.authVerification.update({
                    where: {
                        id:
                            verification.id,
                    },
                    data: {
                        verifiedAt:
                            new Date(),
                    },
                });

                await tx.user.update({
                    where: {
                        id:
                            user.id,
                    },
                    data: {
                        password:
                            hashedPassword,
                    },
                });
            }
        );

        return {
            message:
                "Password reset successfully",
        };
    }

    async login(
        data: LoginUserDto
    ) {
        const user =
            await authRepository.findUserByEmail(
                data.email
            );

        if (!user) {
            throw new Error(
                "Invalid email or password"
            );
        }

        if (
            user.role !==
            data.role
        ) {
            throw new Error(
                "Invalid email or password"
            );
        }

        const isPasswordValid =
            await bcrypt.compare(
                data.password,
                user.password
            );

        if (!isPasswordValid) {
            throw new Error(
                "Invalid email or password"
            );
        }

        if (
            user.role === "TOURIST" &&
            !user.emailVerified
        ) {
            throw new Error(
                "Please verify your email before logging in"
            );
        }

        if (
            user.approvalStatus ===
                "PENDING" &&
            user.role !== "GUIDE" &&
            user.role !== "DRIVER"
        ) {
            throw new Error(
                "Your account is waiting for admin approval."
            );
        }

        if (
            user.approvalStatus ===
            "REJECTED"
        ) {
            throw new Error(
                "Your account has been rejected."
            );
        }

        if (
            user.approvalStatus ===
            "SUSPENDED"
        ) {
            throw new Error(
                "Your account has been suspended."
            );
        }

        const token =
            generateAccessToken({
                id:
                    user.id,

                role:
                    user.role,
            });

        return {
            message:
                "Login successful",

            token,

            user: {
                id:
                    user.id,

                firstName:
                    user.firstName,

                lastName:
                    user.lastName,

                email:
                    user.email,

                role:
                    user.role,

                approvalStatus:
                    user.approvalStatus,
            },
        };
    }

    async me(
        userId: string
    ) {
        const user =
            await authRepository.findUserById(
                userId
            );

        if (!user) {
            throw new Error(
                "User not found"
            );
        }

        return {
            message:
                "Profile fetched successfully",

            user,
        };
    }
}

export default new AuthService();