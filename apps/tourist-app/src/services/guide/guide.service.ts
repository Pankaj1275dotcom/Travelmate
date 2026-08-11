import api from "../api/axios";
import { API } from "../../constants/api";

import type {
    Guide,
    CreateGuideRequest,
    UpdateGuideRequest,
} from "../../types/guide.types";

interface GuidesResponse {
    success: boolean;
    count: number;
    guides: Guide[];
}

interface GuideResponse {
    success: boolean;
    guide: Guide;
}

interface CreateGuideResponse {
    success: boolean;
    message: string;
    guide: Guide;
}

interface UpdateGuideResponse {
    success: boolean;
    message: string;
    guide: Guide;
}

interface DeleteGuideResponse {
    success: boolean;
    message: string;
}

class GuideService {
    async getAllGuides(): Promise<GuidesResponse> {
        const response = await api.get<GuidesResponse>(
            API.GUIDES
        );

        return response.data;
    }

    async getGuideById(
        guideId: string
    ): Promise<GuideResponse> {
        const response = await api.get<GuideResponse>(
            `${API.GUIDES}/${guideId}`
        );

        return response.data;
    }

    async getGuidesByCity(
        city: string
    ): Promise<GuidesResponse> {
        const response = await api.get<GuidesResponse>(
            `${API.GUIDES}/city/${city}`
        );

        return response.data;
    }

    async createGuide(
        data: CreateGuideRequest
    ): Promise<CreateGuideResponse> {
        const response =
            await api.post<CreateGuideResponse>(
                API.GUIDES,
                data
            );

        return response.data;
    }

    async updateGuide(
        guideId: string,
        data: UpdateGuideRequest
    ): Promise<UpdateGuideResponse> {
        const response =
            await api.put<UpdateGuideResponse>(
                `${API.GUIDES}/${guideId}`,
                data
            );

        return response.data;
    }

    async deleteGuide(
        guideId: string
    ): Promise<DeleteGuideResponse> {
        const response =
            await api.delete<DeleteGuideResponse>(
                `${API.GUIDES}/${guideId}`
            );

        return response.data;
    }
}

const guideService = new GuideService();

export default guideService;