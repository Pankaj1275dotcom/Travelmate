import api from "../api/axios";

const BASE_URL = "/room-types";

const roomTypeService = {
    async getRoomTypesByHotel(hotelId: string) {
        const response = await api.get(
            `${BASE_URL}/hotel/${hotelId}`
        );

        return response.data;
    },

    async getRoomType(id: string) {
        const response = await api.get(
            `${BASE_URL}/${id}`
        );

        return response.data;
    },

    async createRoomType(data: any) {
        const response = await api.post(
            BASE_URL,
            data
        );

        return response.data;
    },

    async updateRoomType(
        id: string,
        data: any
    ) {
        const response = await api.put(
            `${BASE_URL}/${id}`,
            data
        );

        return response.data;
    },

    async deleteRoomType(id: string) {
        const response = await api.delete(
            `${BASE_URL}/${id}`
        );

        return response.data;
    },
};

export default roomTypeService;