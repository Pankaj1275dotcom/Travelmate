import prisma from "../../lib/prisma.js";
import { Wishlist } from "@travelmate/database";

class WishlistRepository {
    async findWishlistItem(
        userId: string,
        hotelId: string
    ): Promise<Wishlist | null> {
        return prisma.wishlist.findFirst({
            where: {
                userId,
                hotelId,
            },
        });
    }

    async getWishlistByUserId(userId: string) {
        return prisma.wishlist.findMany({
            where: {
                userId,
            },
            include: {
                hotel: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async addToWishlist(
        userId: string,
        hotelId: string
    ): Promise<Wishlist> {
        return prisma.wishlist.create({
            data: {
                userId,
                hotelId,
            },
        });
    }

    async removeFromWishlist(
        userId: string,
        hotelId: string
    ): Promise<Wishlist> {
        return prisma.wishlist.delete({
            where: {
                userId_hotelId: {
                    userId,
                    hotelId,
                },
            },
        });
    }
}

export default new WishlistRepository();