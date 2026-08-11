export interface AddWishlistDto {
    hotelId: string;
}

export interface RemoveWishlistDto {
    hotelId: string;
}

export interface WishlistResponseDto {
    id: string;

    userId: string;

    hotelId: string;

    createdAt: Date;
}