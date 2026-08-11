import api from "../api/axios";

import type {
    UpdateRoomDto,
} from "../../types/room.types";

const BASE_URL = "/rooms";

const roomService = {
    async getRoomsByRoomType(
        roomTypeId: string
    ) {
        const response =
            await api.get(
                `${BASE_URL}/room-type/${roomTypeId}`
            );

        return response.data;
    },


    async getRoom(
        id: string
    ) {
        const response =
            await api.get(
                `${BASE_URL}/${id}`
            );

        return response.data;
    },


    async createRoom(
        data: any
    ) {
        const response =
            await api.post(
                BASE_URL,
                data
            );

        return response.data;
    },


    async updateRoom(
        id: string,
        data: UpdateRoomDto
    ) {
        const response =
            await api.put(
                `${BASE_URL}/${id}`,
                data
            );

        return response.data;
    },


    async updateRoomStatus(
        id: string,
        status: UpdateRoomDto["status"]
    ) {
        const response =
            await api.put(
                `${BASE_URL}/${id}`,
                {
                    status,
                }
            );

        return response.data;
    },


    async deleteRoom(
        id: string
    ) {
        const response =
            await api.delete(
                `${BASE_URL}/${id}`
            );

        return response.data;
    },
};

export default roomService;