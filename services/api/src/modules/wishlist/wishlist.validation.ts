import { z } from "zod";

export const addWishlistSchema = z.object({
    hotelId: z
        .string()
        .trim()
        .uuid("Invalid hotel id"),
});

export const removeWishlistSchema = z.object({
    hotelId: z
        .string()
        .trim()
        .uuid("Invalid hotel id"),
});