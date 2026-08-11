import api from "../api/axios";

import type { MyHotelResponse } from "../../types/hotel.types";

const BASE_URL = "/hotels";

const hotelService = {
    async getMyHotel(): Promise<MyHotelResponse> {
        const response =
            await api.get<MyHotelResponse>(
                `${BASE_URL}/my-hotel`
            );

        return response.data;
    },

    async createHotel(data: any) {
        const response = await api.post(
            BASE_URL,
            data
        );

        return response.data;
    },

    async updateHotel(
        id: string,
        data: any
    ) {
        const response = await api.put(
            `${BASE_URL}/${id}`,
            data
        );

        return response.data;
    },
};

export default hotelService;