import { z } from "zod";

export const createRoomTypeSchema = z.object({
    hotelId: z
        .string()
        .uuid("Invalid hotel id"),

    name: z
        .string()
        .trim()
        .min(
            1,
            "Room type name is required"
        )
        .max(
            100,
            "Room type name is too long"
        ),

    description: z
        .string()
        .trim()
        .max(
            1000,
            "Description is too long"
        )
        .optional(),

    pricePerNight: z.coerce
        .number()
        .positive(
            "Price must be greater than 0"
        ),

    capacity: z.coerce
        .number()
        .int()
        .min(
            1,
            "Capacity must be at least 1"
        ),

    totalRooms: z.coerce
        .number()
        .int()
        .min(
            1,
            "At least one room is required"
        ),

    startingRoomNumber: z.coerce
        .number()
        .int()
        .positive(
            "Starting room number must be greater than 0"
        ),

    bedType: z
        .string()
        .trim()
        .optional(),

    roomSize: z
        .string()
        .trim()
        .optional(),

    images: z
        .array(z.string().url())
        .optional(),

    amenities: z
        .array(z.string())
        .optional(),
});

export const updateRoomTypeSchema =
    createRoomTypeSchema
        .omit({
            hotelId: true,
        })
        .partial();

export type CreateRoomTypeInput =
    z.infer<
        typeof createRoomTypeSchema
    >;

export type UpdateRoomTypeInput =
    z.infer<
        typeof updateRoomTypeSchema
    >;