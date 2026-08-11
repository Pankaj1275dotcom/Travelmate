export interface CreateRoomTypeDto {
    hotelId: string;
    name: string;
    description?: string;

    pricePerNight: number;

    capacity: number;

    totalRooms: number;

    startingRoomNumber: number;

    bedType?: string;

    roomSize?: string;

    images?: string[];

    amenities?: string[];
}

export interface UpdateRoomTypeDto {
    name?: string;

    description?: string;

    pricePerNight?: number;

    capacity?: number;

    totalRooms?: number;

    startingRoomNumber?: number;

    bedType?: string;

    roomSize?: string;

    images?: string[];

    amenities?: string[];
}

export interface RoomTypeFilters {
    hotelId?: string;
}

export interface RoomType {
    id: string;

    hotelId: string;

    name: string;

    description: string | null;

    pricePerNight: number;

    capacity: number;

    totalRooms: number;

    startingRoomNumber: number;

    bedType: string | null;

    roomSize: string | null;

    images: string[];

    amenities: string[];

    createdAt: string;

    updatedAt: string;
}

export interface GetRoomTypesResponse {
    success: boolean;

    message: string;

    roomTypes: RoomType[];
}
