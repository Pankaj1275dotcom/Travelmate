import wishlistRepository from "./wishlist.repository.js";
import hotelRepository from "../hotels/hotel.repository.js";

class WishlistService {
    async getWishlist(userId: string) {
        const wishlist =
            await wishlistRepository.getWishlistByUserId(
                userId
            );

        return {
            message: "Wishlist fetched successfully",
            wishlist,
        };
    }

    async addToWishlist(
        userId: string,
        hotelId: string
    ) {
        // Check hotel exists
        const hotel =
            await hotelRepository.findHotelById(
                hotelId
            );

        if (!hotel) {
            throw new Error("Hotel not found");
        }

        // Check duplicate
        const existing =
            await wishlistRepository.findWishlistItem(
                userId,
                hotelId
            );

        if (existing) {
            throw new Error(
                "Hotel already exists in wishlist"
            );
        }

        const wishlist =
            await wishlistRepository.addToWishlist(
                userId,
                hotelId
            );

        return {
            message:
                "Hotel added to wishlist successfully",
            wishlist,
        };
    }

    async removeFromWishlist(
        userId: string,
        hotelId: string
    ) {
        const existing =
            await wishlistRepository.findWishlistItem(
                userId,
                hotelId
            );

        if (!existing) {
            throw new Error(
                "Wishlist item not found"
            );
        }

        await wishlistRepository.removeFromWishlist(
            userId,
            hotelId
        );

        return {
            message:
                "Hotel removed from wishlist successfully",
        };
    }
}

export default new WishlistService();