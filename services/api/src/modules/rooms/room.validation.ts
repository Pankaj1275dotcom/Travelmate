import { z } from "zod";
import { RoomStatus } from "@prisma/client";

export const createRoomSchema = z.object({
    roomTypeId: z
        .string()
        .uuid("Invalid room type id"),

    roomNumber: z
        .string()
        .trim()
        .min(
            1,
            "Room number is required"
        )
        .max(
            50,
            "Room number is too long"
        ),

    status: z
        .nativeEnum(RoomStatus)
        .optional(),
});

export const updateRoomSchema =
    z.object({
        roomNumber: z
            .string()
            .trim()
            .min(
                1,
                "Room number is required"
            )
            .max(
                50,
                "Room number is too long"
            )
            .optional(),

        status: z
            .nativeEnum(RoomStatus)
            .optional(),
    });

export const roomFilterSchema =
    z.object({
        roomTypeId: z
            .string()
            .uuid()
            .optional(),

        status: z
            .nativeEnum(RoomStatus)
            .optional(),
    });

export type CreateRoomInput =
    z.infer<
        typeof createRoomSchema
    >;

export type UpdateRoomInput =
    z.infer<
        typeof updateRoomSchema
    >;

export type RoomFilterInput =
    z.infer<
        typeof roomFilterSchema
    >;