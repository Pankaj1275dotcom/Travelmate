import { Response } from "express";

import wishlistService from "./wishlist.service.js";
import {
    addWishlistSchema,
    removeWishlistSchema,
} from "./wishlist.validation.js";

import { AuthRequest } from "../../middleware/auth.middleware.js";

class WishlistController {
    async getWishlist(
        req: AuthRequest,
        res: Response
    ) {
        const result =
            await wishlistService.getWishlist(
                req.user!.id
            );

        return res.status(200).json({
            success: true,
            message: result.message,
            wishlist: result.wishlist,
        });
    }

    async addToWishlist(
        req: AuthRequest,
        res: Response
    ) {
        const { hotelId } =
            addWishlistSchema.parse(req.body);

        const result =
            await wishlistService.addToWishlist(
                req.user!.id,
                hotelId
            );

        return res.status(201).json({
            success: true,
            message: result.message,
            wishlist: result.wishlist,
        });
    }

    async removeFromWishlist(
        req: AuthRequest,
        res: Response
    ) {
        const { hotelId } =
            removeWishlistSchema.parse(req.params);

        const result =
            await wishlistService.removeFromWishlist(
                req.user!.id,
                hotelId
            );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }
}

export default new WishlistController();