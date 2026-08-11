import api from "../api/axios";

import { API } from "../../constants/api";

import type {
    BookingActionResponse,
    BookingRequestResponse,
} from "../../types/booking.types";

class BookingService {

    async getBookingRequests(): Promise<BookingRequestResponse> {

        const response =
            await api.get<BookingRequestResponse>(
                `${API.BOOKINGS}/guide/requests`
            );

        return response.data;

    }

    async acceptBookingRequest(
        requestId: string
    ): Promise<BookingActionResponse> {

        const response =
            await api.patch<BookingActionResponse>(
                `${API.BOOKINGS}/requests/${requestId}/accept`
            );

        return response.data;

    }

    async rejectBookingRequest(
        requestId: string,
        reason: string
    ): Promise<BookingActionResponse> {

        const response =
            await api.patch<BookingActionResponse>(
                `${API.BOOKINGS}/requests/${requestId}/reject`,
                {
                    reason,
                }
            );

        return response.data;

    }
    async removeBookingRequest(
    requestId: string
): Promise<BookingActionResponse> {

    const response =
        await api.delete<BookingActionResponse>(
            `${API.BOOKINGS}/guide/requests/${requestId}`
        );

    return response.data;

}

}

const bookingService =
    new BookingService();

export default bookingService;