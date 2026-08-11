import { z } from "zod";

export const createDriverSchema = z.object({
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

    vehicleType: z
        .string()
        .min(2, "Vehicle type is required"),

    vehicleBrand: z
        .string()
        .min(2, "Vehicle brand is required"),

    vehicleModel: z
        .string()
        .min(2, "Vehicle model is required"),

    vehicleNumber: z
        .string()
        .min(5, "Vehicle number is required")
        .max(20, "Vehicle number is too long"),

    vehicleColor: z
        .string()
        .max(30, "Vehicle color is too long")
        .optional(),

    seatCapacity: z
        .number()
        .int()
        .min(1, "Seat capacity must be at least 1"),

    airConditioned: z.boolean(),

    pricePerHour: z
        .number()
        .positive("Price per hour must be greater than 0"),
});

export const updateDriverSchema = createDriverSchema.partial();

export const updateDriverAvailabilitySchema = z.object({
    isAvailable: z.boolean(),

    vacationMode: z.boolean(),

    workingDays: z
        .string()
        .min(1, "Working days are required"),

    workingStartTime: z
        .string()
        .min(1, "Working start time is required"),

    workingEndTime: z
        .string()
        .min(1, "Working end time is required"),
});

export const updateDriverVehicleSchema = z.object({
    vehicleType: z
        .string()
        .min(2, "Vehicle type is required"),

    vehicleBrand: z
        .string()
        .min(2, "Vehicle brand is required"),

    vehicleModel: z
        .string()
        .min(2, "Vehicle model is required"),

    vehicleNumber: z
        .string()
        .min(5, "Vehicle number is required")
        .max(20, "Vehicle number is too long"),

    vehicleColor: z
        .string()
        .max(30, "Vehicle color is too long")
        .optional(),

    seatCapacity: z
        .number()
        .int()
        .min(1, "Seat capacity must be at least 1"),

    airConditioned: z.boolean(),
});