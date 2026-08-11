import { z } from "zod";

export const createHotelBookingSchema = z
    .object({
        roomTypeId: z
    .string()
    .trim()
    .min(1, "Room type is required"),

        checkIn: z.coerce.date(),

        checkOut: z.coerce.date(),

        adults: z
            .number()
            .int()
            .min(1, "At least one adult is required"),

        children: z
            .number()
            .int()
            .min(0)
            .default(0),

        specialRequest: z
            .string()
            .trim()
            .max(500)
            .optional(),
    })
    .refine(
        (data) => data.checkOut > data.checkIn,
        {
            message:
                "Check-out date must be after check-in date",
            path: ["checkOut"],
        }
    );

export const createGuideBookingSchema =
    z.object({

            guideId: z
                .string()
                .trim()
                .min(1, "Guide is required"),

            startDate:
                z.coerce.date(),

            endDate:
                z.coerce.date(),

            startTime: z
                .string()
                .trim()
                .min(
                    1,
                    "Start time is required"
                ),

            endTime: z
                .string()
                .trim()
                .min(
                    1,
                    "End time is required"
                ),

            specialRequest: z
                .string()
                .trim()
                .max(500)
                .optional(),

        })

        .refine(

            (data) =>
                data.endDate >=
                data.startDate,

            {

                message:
                    "End date must be after start date",

                path: ["endDate"],

            }

        );

export const createDriverBookingSchema =
    z.object({

        driverId: z
            .string()
            .trim()
            .min(1, "Driver is required"),

        startDate:
            z.coerce.date(),

        endDate:
            z.coerce.date(),

        startTime: z
            .string()
            .trim()
            .min(1, "Start time is required"),

        endTime: z
            .string()
            .trim()
            .min(1, "End time is required"),

        specialRequest: z
            .string()
            .trim()
            .max(500)
            .optional(),

    }).refine(

        (data) =>
            data.endDate >=
            data.startDate,

        {

            message:
                "End date must be after start date",

            path: ["endDate"],

        }

    );

export const bookingFilterSchema =
    z.object({
        bookingType: z
            .enum([
                "HOTEL",
                "GUIDE",
                "DRIVER",
            ])
            .optional(),

        bookingStatus: z.string().optional(),

        paymentStatus: z.string().optional(),

        fromDate: z.coerce.date().optional(),

        toDate: z.coerce.date().optional(),
    });

export type CreateHotelBookingInput =
    z.infer<
        typeof createHotelBookingSchema
    >;

export type CreateGuideBookingInput =
    z.infer<
        typeof createGuideBookingSchema
    >;

export type CreateDriverBookingInput =
    z.infer<
        typeof createDriverBookingSchema
    >;

export type BookingFilterInput =
    z.infer<
        typeof bookingFilterSchema
    >;