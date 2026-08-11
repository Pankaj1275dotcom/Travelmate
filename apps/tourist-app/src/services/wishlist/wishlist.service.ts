import api from "../api/axios";
import { API } from "../../constants/api";

import type {
    AddWishlistRequest,
    AddWishlistResponse,
    WishlistResponse,
    RemoveWishlistResponse,
} from "../../types/wishlist.types";

class WishlistService {
    async getWishlist(): Promise<WishlistResponse> {
        const response =
            await api.get<WishlistResponse>(
                API.WISHLIST
            );

        return response.data;
    }

    async addToWishlist(
        data: AddWishlistRequest
    ): Promise<AddWishlistResponse> {
        const response =
            await api.post<AddWishlistResponse>(
                API.WISHLIST,
                data
            );

        return response.data;
    }

    async removeFromWishlist(
        hotelId: string
    ): Promise<RemoveWishlistResponse> {
        const response =
            await api.delete<RemoveWishlistResponse>(
                `${API.WISHLIST}/${hotelId}`
            );

        return response.data;
    }
}

const wishlistService = new WishlistService();

export default wishlistService;