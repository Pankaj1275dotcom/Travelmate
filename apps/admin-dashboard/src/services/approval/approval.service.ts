import api from "../api/axios";

import type {
    PendingHotelsResponse,
    PendingGuidesResponse,
    PendingDriversResponse,
} from "../../types/approval.types";

class ApprovalService {
    // Hotels

    async getPendingHotels() {
        const response =
            await api.get<PendingHotelsResponse>(
                "/admin/approvals/hotels/pending"
            );

        return response.data;
    }

    async getApprovedHotels() {
        const response =
            await api.get<PendingHotelsResponse>(
                "/admin/approvals/hotels/approved"
            );

        return response.data;
    }

    async approveHotel(
        hotelId: string
    ) {
        return api.patch(
            `/admin/approvals/hotels/${hotelId}/approve`
        );
    }

    async rejectHotel(
        hotelId: string
    ) {
        return api.patch(
            `/admin/approvals/hotels/${hotelId}/reject`
        );
    }

    // Guides

    async getPendingGuides() {
        const response =
            await api.get<PendingGuidesResponse>(
                "/admin/approvals/guides/pending"
            );

        return response.data;
    }

    async getApprovedGuides() {
        const response =
            await api.get<PendingGuidesResponse>(
                "/admin/approvals/guides/approved"
            );

        return response.data;
    }

    async approveGuide(
        userId: string
    ) {
        return api.patch(
            `/admin/approvals/guides/${userId}/approve`
        );
    }

    async rejectGuide(
        userId: string
    ) {
        return api.patch(
            `/admin/approvals/guides/${userId}/reject`
        );
    }

    // Drivers

    async getPendingDrivers() {
        const response =
            await api.get<PendingDriversResponse>(
                "/admin/approvals/drivers/pending"
            );

        return response.data;
    }

    async getApprovedDrivers() {
        const response =
            await api.get<PendingDriversResponse>(
                "/admin/approvals/drivers/approved"
            );

        return response.data;
    }

    async approveDriver(
        userId: string
    ) {
        return api.patch(
            `/admin/approvals/drivers/${userId}/approve`
        );
    }

    async rejectDriver(
        userId: string
    ) {
        return api.patch(
            `/admin/approvals/drivers/${userId}/reject`
        );
    }
}

export default new ApprovalService();