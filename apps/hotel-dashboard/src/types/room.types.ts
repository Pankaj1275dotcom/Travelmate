export type RoomStatus =
    | "AVAILABLE"
    | "OCCUPIED"
    | "MAINTENANCE";

export interface Room {
    id: string;

    roomTypeId: string;

    roomNumber: string;

    status: RoomStatus;

    createdAt: string;

    updatedAt: string;
}

export interface CreateRoomDto {
    roomTypeId: string;

    roomNumber: string;

    status?: RoomStatus;
}

export interface UpdateRoomDto {
    roomNumber?: string;

    status?: RoomStatus;
}

export interface GetRoomsResponse {
    success: boolean;

    message: string;

    rooms: Room[];
}

export interface GetRoomResponse {
    success: boolean;

    message: string;

    room: Room;
}