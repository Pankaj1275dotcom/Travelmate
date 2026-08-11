import api from "../api/axios";
import { API } from "../../constants/api";

import type { RoomType } from "../../types/room-type.types";

interface RoomTypeResponse {
    success: boolean;
    roomType: RoomType;
}

interface RoomTypesResponse {
    success: boolean;
    count: number;
    roomTypes: RoomType[];
}

class RoomTypeService {
    async getRoomTypeById(
        roomTypeId: string
    ): Promise<RoomTypeResponse> {
        const response =
            await api.get<RoomTypeResponse>(
                `${API.ROOM_TYPES}/${roomTypeId}`
            );

        return response.data;
    }

    async getRoomTypesByHotel(
        hotelId: string
    ): Promise<RoomTypesResponse> {
        const response =
            await api.get<RoomTypesResponse>(
                `${API.ROOM_TYPES}/hotel/${hotelId}`
            );

        return response.data;
    }
}

const roomTypeService =
    new RoomTypeService();

export default roomTypeService;