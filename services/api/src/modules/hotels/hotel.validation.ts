import { z } from "zod";

export const createHotelSchema = z.object({
    // Basic Information
    name: z
        .string()
        .trim()
        .min(3, "Hotel name must be at least 3 characters")
        .max(100, "Hotel name cannot exceed 100 characters"),

    hotelType: z
        .string()
        .trim()
        .min(2, "Hotel type is required")
        .max(50, "Hotel type cannot exceed 50 characters"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters"),

    // Contact
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),

    phone: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),

    // Address
    address: z
        .string()
        .trim()
        .min(5, "Address is required"),

    city: z
        .string()
        .trim()
        .min(2, "City is required"),

    state: z
        .string()
        .trim()
        .min(2, "State is required"),

    country: z
        .string()
        .trim()
        .min(2, "Country is required"),

    zipCode: z
        .string()
        .trim()
        .min(4, "Invalid zip code")
        .max(10, "Invalid zip code"),

    // Location
    latitude: z.number().optional(),

    longitude: z.number().optional(),

    mapUrl: z
        .string()
        .trim()
        .url("Invalid map URL")
        .optional()
        .or(z.literal("")),

    // Media
    coverImage: z
        .string()
        .trim()
        .url("Invalid image URL")
        .optional()
        .or(z.literal("")),

    // Hotel Facilities
    hasParking: z.boolean().optional(),

    hasRestaurant: z.boolean().optional(),

    hasSwimmingPool: z.boolean().optional(),

    hasGym: z.boolean().optional(),

    hasLaundry: z.boolean().optional(),

    hasRoomService: z.boolean().optional(),

    hasLift: z.boolean().optional(),

    hasPowerBackup: z.boolean().optional(),

    // Timing
    checkInTime: z.string().optional(),

    checkOutTime: z.string().optional(),

    // Pricing
    pricePerNight: z
        .number()
        .positive("Price must be greater than zero"),
});

export const hotelFilterSchema = z.object({
    search: z.string().trim().optional(),

    city: z.string().trim().optional(),

    state: z.string().trim().optional(),

    minPrice: z.coerce.number().nonnegative().optional(),

    maxPrice: z.coerce.number().nonnegative().optional(),

    rating: z.coerce
        .number()
        .min(0)
        .max(5)
        .optional(),

    sort: z
        .enum([
            "newest",
            "price_asc",
            "price_desc",
            "rating",
        ])
        .optional(),
});

export type CreateHotelInput = z.infer<
    typeof createHotelSchema
>;

export type HotelFilterInput = z.infer<
    typeof hotelFilterSchema
>;
export const updateHotelSchema =
    createHotelSchema.partial();