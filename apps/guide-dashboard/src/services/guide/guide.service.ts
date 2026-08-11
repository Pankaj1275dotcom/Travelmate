import api from "../api/axios";

import type {
    CreateGuideRequest,
    GuideResponse,
    GuidesResponse,
    UpdateGuideRequest,
    UpdateGuideAvailabilityRequest,
    GuideAvailabilityResponse,
    MyGuideResponse,
    GuideEarningsResponse,
} from "../../types/guide.types";


class GuideService {

    async createGuide(
        data: CreateGuideRequest
    ): Promise<GuideResponse> {

        const response =
            await api.post<GuideResponse>(
                "/guides",
                data
            );

        return response.data;

    }


    async getMyGuide(): Promise<MyGuideResponse> {

        const response =
            await api.get<MyGuideResponse>(
                "/guides/me"
            );

        return response.data;

    }


    async getGuideById(
        id: string
    ): Promise<GuideResponse> {

        const response =
            await api.get<GuideResponse>(
                `/guides/${id}`
            );

        return response.data;

    }


    async getAllGuides(): Promise<GuidesResponse> {

        const response =
            await api.get<GuidesResponse>(
                "/guides"
            );

        return response.data;

    }


    async getAvailability(): Promise<GuideAvailabilityResponse> {

        const response =
            await api.get<GuideAvailabilityResponse>(
                "/guides/me/availability"
            );

        return response.data;

    }


    async updateAvailability(
        data: UpdateGuideAvailabilityRequest
    ): Promise<GuideAvailabilityResponse> {

        const response =
            await api.put<GuideAvailabilityResponse>(
                "/guides/me/availability",
                data
            );

        return response.data;

    }


    async updateGuide(
        id: string,
        data: UpdateGuideRequest
    ): Promise<GuideResponse> {

        const response =
            await api.put<GuideResponse>(
                `/guides/${id}`,
                data
            );

        return response.data;

    }


    async deleteGuide(
        id: string
    ) {

        const response =
            await api.delete(
                `/guides/${id}`
            );

        return response.data;

    }


    async getEarnings(): Promise<GuideEarningsResponse> {

        const response =
            await api.get<GuideEarningsResponse>(
                "/guides/me/earnings"
            );

        return response.data;

    }

}


const guideService =
    new GuideService();


export default guideService;