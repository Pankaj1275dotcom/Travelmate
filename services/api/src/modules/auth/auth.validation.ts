import { z } from "zod";

export const registerSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name cannot exceed 50 characters"),

    lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name cannot exceed 50 characters"),

    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),

    phone: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
            "Password must contain uppercase, lowercase, number and special character"
        ),

    role: z.enum([
        "TOURIST",
        "HOTEL_OWNER",
        "GUIDE",
        "DRIVER",
    ]),
});

export const loginSchema = z.object({
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(1, "Password is required"),

    role: z.enum([
        "ADMIN",
        "TOURIST",
        "HOTEL_OWNER",
        "GUIDE",
        "DRIVER",
    ]),
});
export const verifyEmailSchema = z.object({
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),

    otp: z
        .string()
        .trim()
        .length(6, "OTP must be 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export const verifyPhoneSchema = z.object({
    phone: z
        .string()
        .trim()
        .regex(
            /^[6-9]\d{9}$/,
            "Invalid Indian mobile number"
        ),

    otp: z
        .string()
        .trim()
        .length(6, "OTP must be 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export const resendVerificationSchema = z.object({
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),
});

export const forgotPasswordSchema = z.object({
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),
});

export const resetPasswordSchema = z.object({
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),

    otp: z
        .string()
        .trim()
        .length(6, "OTP must be 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only digits"),

    password: z
        .string()
        .min(
            8,
            "Password must be at least 8 characters"
        )
        .max(
            100,
            "Password cannot exceed 100 characters"
        )
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
            "Password must contain uppercase, lowercase, number and special character"
        ),
});