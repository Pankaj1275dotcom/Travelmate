import { RoomStatus } from "@prisma/client";

export interface CreateRoomDto {
    roomTypeId: string;

    roomNumber: string;

    status?: RoomStatus;
}

export interface UpdateRoomDto {
    roomNumber?: string;

    status?: RoomStatus;
}

export interface RoomFilterDto {
    roomTypeId?: string;

    status?: RoomStatus;
}