import { z } from "zod";

export const createGuideSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(100, "Full name cannot exceed 100 characters"),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits"),

    bio: z
        .string()
        .max(500, "Bio cannot exceed 500 characters")
        .optional(),

    city: z
        .string()
        .min(2, "City is required")
        .transform((value) => {
            const city = value.trim().toLowerCase();

            return city.charAt(0).toUpperCase() + city.slice(1);
        }),

    experience: z
        .number()
        .int()
        .min(0, "Experience cannot be negative"),

    languages: z
        .string()
        .min(2, "Languages are required"),

    pricePerHour: z
        .number()
        .positive("Price per hour must be greater than 0"),
});

export const updateGuideSchema =
    createGuideSchema.partial();

export const updateGuideAvailabilitySchema = z.object({
    isAvailable: z.boolean(),

    vacationMode: z.boolean(),

    workingDays: z
        .string()
        .min(1, "Working days are required"),

    workingStartTime: z
        .string()
        .min(1, "Start time is required"),

    workingEndTime: z
        .string()
        .min(1, "End time is required"),
});