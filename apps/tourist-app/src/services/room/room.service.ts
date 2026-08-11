import api from "../api/axios";
import { API } from "../../constants/api";

import type {
    Room,
    CreateRoomRequest,
    UpdateRoomRequest,
} from "../../types/room.types";

interface RoomsResponse {
    success: boolean;
    count: number;
    rooms: Room[];
}

interface RoomResponse {
    success: boolean;
    room: Room;
}

interface CreateRoomResponse {
    success: boolean;
    message: string;
    room: Room;
}

interface UpdateRoomResponse {
    success: boolean;
    message: string;
    room: Room;
}

interface DeleteRoomResponse {
    success: boolean;
    message: string;
}

class RoomService {
    async getRoomsByHotel(
        hotelId: string
    ): Promise<RoomsResponse> {
        const response = await api.get<RoomsResponse>(
            `${API.ROOMS}/hotel/${hotelId}`
        );

        return response.data;
    }

    async getRoomById(
        roomId: string
    ): Promise<RoomResponse> {
        const response = await api.get<RoomResponse>(
            `${API.ROOMS}/${roomId}`
        );

        return response.data;
    }

    async createRoom(
        data: CreateRoomRequest
    ): Promise<CreateRoomResponse> {
        const response =
            await api.post<CreateRoomResponse>(
                API.ROOMS,
                data
            );

        return response.data;
    }

    async updateRoom(
        roomId: string,
        data: UpdateRoomRequest
    ): Promise<UpdateRoomResponse> {
        const response =
            await api.put<UpdateRoomResponse>(
                `${API.ROOMS}/${roomId}`,
                data
            );

        return response.data;
    }

    async deleteRoom(
        roomId: string
    ): Promise<DeleteRoomResponse> {
        const response =
            await api.delete<DeleteRoomResponse>(
                `${API.ROOMS}/${roomId}`
            );

        return response.data;
    }
}

const roomService = new RoomService();

export default roomService;