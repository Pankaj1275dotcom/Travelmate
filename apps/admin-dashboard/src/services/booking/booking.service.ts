import api from "../api/axios";

import type {
    BookingListResponse,
    BookingResponse,
} from "../../types/booking.types";

class BookingService {

    async getAllBookings(): Promise<BookingListResponse> {

        const response =
            await api.get<BookingListResponse>(
                "/bookings"
            );

        return response.data;

    }

    async getBookingById(
        id: string
    ): Promise<BookingResponse> {

        const response =
            await api.get<BookingResponse>(
                `/bookings/${id}`
            );

        return response.data;

    }

}

const bookingService =
    new BookingService();

export default bookingService;