export interface Room {
    id: string;

    hotelId: string;

    name: string;
    description: string | null;

    roomType: string;

    pricePerNight: number;

    capacity: number;

    totalRooms: number;

    availableRooms: number;

    hasAC: boolean;
    hasWifi: boolean;

    createdAt: string;
    updatedAt: string;
}

export interface CreateRoomRequest {
    hotelId: string;

    name: string;
    description?: string;

    roomType: string;

    pricePerNight: number;

    capacity: number;

    totalRooms: number;

    availableRooms: number;

    hasAC?: boolean;
    hasWifi?: boolean;
}

export interface UpdateRoomRequest
    extends Partial<CreateRoomRequest> {}