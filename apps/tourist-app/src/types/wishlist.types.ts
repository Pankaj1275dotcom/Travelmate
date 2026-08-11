import type { Hotel } from "./hotel.types";

export interface Wishlist {
    id: string;

    userId: string;

    hotelId: string;

    createdAt: string;

    hotel: Hotel;
}

export interface AddWishlistRequest {
    hotelId: string;
}

export interface WishlistResponse {
    success: boolean;
    message: string;
    wishlist: Wishlist[];
}

export interface AddWishlistResponse {
    success: boolean;
    message: string;
    wishlist: Wishlist;
}

export interface RemoveWishlistResponse {
    success: boolean;
    message: string;
}