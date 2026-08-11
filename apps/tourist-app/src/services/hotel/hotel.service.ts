import api from "../api/axios";
import { API } from "../../constants/api";

import type {
    Hotel,
    CreateHotelRequest,
    UpdateHotelRequest,
    HotelFilters,
} from "../../types/hotel.types";

interface HotelsResponse {
    success: boolean;
    count: number;
    hotels: Hotel[];
}

interface HotelResponse {
    success: boolean;
    hotel: Hotel;
}

interface CreateHotelResponse {
    success: boolean;
    message: string;
    hotel: Hotel;
}

interface UpdateHotelResponse {
    success: boolean;
    message: string;
    hotel: Hotel;
}

interface DeleteHotelResponse {
    success: boolean;
    message: string;
}

class HotelService {
async getAllHotels(
    filters?: HotelFilters
): Promise<HotelsResponse> {
    const response = await api.get<HotelsResponse>(
        API.HOTELS,
        {
            params: filters,
        }
    );

    return response.data;
}

    async getHotelById(
        hotelId: string
    ): Promise<HotelResponse> {
        const response = await api.get<HotelResponse>(
            `${API.HOTELS}/${hotelId}`
        );

        return response.data;
    }

    async createHotel(
        data: CreateHotelRequest
    ): Promise<CreateHotelResponse> {
        const response =
            await api.post<CreateHotelResponse>(
                API.HOTELS,
                data
            );

        return response.data;
    }

    async updateHotel(
        hotelId: string,
        data: UpdateHotelRequest
    ): Promise<UpdateHotelResponse> {
        const response =
            await api.put<UpdateHotelResponse>(
                `${API.HOTELS}/${hotelId}`,
                data
            );

        return response.data;
    }

    async deleteHotel(
        hotelId: string
    ): Promise<DeleteHotelResponse> {
        const response =
            await api.delete<DeleteHotelResponse>(
                `${API.HOTELS}/${hotelId}`
            );

        return response.data;
    }
}

const hotelService = new HotelService();

export default hotelService;