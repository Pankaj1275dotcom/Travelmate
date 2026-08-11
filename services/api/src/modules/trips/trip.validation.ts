import { z } from "zod";

export const bookingIdSchema = z.object({
    bookingId: z.string().cuid(),
});

export const tripIdSchema = z.object({
    tripId: z.string().cuid(),
});

export const generateTripPassSchema = z.object({
    bookingId: z.string().cuid(),
});

export const verifyTripOtpSchema = z.object({
    bookingId: z.string().cuid(),
    otp: z
        .string()
        .length(6),
});

export const verifyTripQrSchema = z.object({
    bookingId: z.string().cuid(),
    qrToken: z
        .string()
        .min(10),
});

export const startTripSchema = z.object({
    bookingId: z.string().cuid(),
    bookingItemId: z.string().cuid(),
    otp: z
        .string()
        .length(6)
        .optional(),
    qrToken: z
        .string()
        .optional(),
});

export const completeTripSchema = z.object({
    bookingId: z.string().cuid(),
    bookingItemId: z.string().cuid(),
    otp: z
        .string()
        .length(6),
});

export const providerTripSchema = z.object({
    bookingId: z.string().cuid(),
    bookingItemId: z
        .string()
        .cuid(),
});

export const updateTripStatusSchema = z.object({
    bookingId: z.string().cuid(),
    status: z.enum([
        "UPCOMING",
        "READY_TO_START",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
    ]),
});