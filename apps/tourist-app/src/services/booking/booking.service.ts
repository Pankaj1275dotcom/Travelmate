import api from "../api/axios";
import { API } from "../../constants/api";

import type {
    BookingListResponse,
    BookingResponse,
    CartActionResponse,
    CartItemResponse,
    CartResponse,
    CreateDriverBookingDto,
    CreateGuideBookingDto,
    CreateHotelBookingDto,
    PaymentSuccessRequest,
} from "../../types/booking.types";

class BookingService {
    async addHotelToCart(
        data: CreateHotelBookingDto
    ): Promise<CartItemResponse> {
        const response =
            await api.post<CartItemResponse>(
                `${API.BOOKINGS}/cart/hotel`,
                data
            );

        return response.data;
    }

    async addGuideToCart(
        data: CreateGuideBookingDto
    ): Promise<CartItemResponse> {
        const response =
            await api.post<CartItemResponse>(
                `${API.BOOKINGS}/cart/guide`,
                data
            );

        return response.data;
    }

    async addDriverToCart(
        data: CreateDriverBookingDto
    ): Promise<CartItemResponse> {
        const response =
            await api.post<CartItemResponse>(
                `${API.BOOKINGS}/cart/driver`,
                data
            );

        return response.data;
    }

    async getMyCart(): Promise<CartResponse> {
        const response =
            await api.get<CartResponse>(
                `${API.BOOKINGS}/cart`
            );

        return response.data;
    }

    async removeCartItem(
        itemId: string
    ): Promise<CartActionResponse> {
        const response =
            await api.delete<CartActionResponse>(
                `${API.BOOKINGS}/cart/item/${itemId}`
            );

        return response.data;
    }

    async clearCart(): Promise<CartActionResponse> {
        const response =
            await api.delete<CartActionResponse>(
                `${API.BOOKINGS}/cart`
            );

        return response.data;
    }

    async checkoutCart(): Promise<CartResponse> {
        const response =
            await api.post<CartResponse>(
                `${API.BOOKINGS}/cart/checkout`
            );

        return response.data;
    }

    async createBookingFromCart(): Promise<BookingResponse> {
        const response =
            await api.post<BookingResponse>(
                `${API.BOOKINGS}/create`
            );

        return response.data;
    }

    async getMyBookings(): Promise<BookingListResponse> {
        const response =
            await api.get<BookingListResponse>(
                `${API.BOOKINGS}/my`
            );

        return response.data;
    }

    async getBookingById(
        id: string
    ): Promise<BookingResponse> {
        const response =
            await api.get<BookingResponse>(
                `${API.BOOKINGS}/${id}`
            );

        return response.data;
    }

    async getBookingByNumber(
        bookingNumber: string
    ): Promise<BookingResponse> {
        const response =
            await api.get<BookingResponse>(
                `${API.BOOKINGS}/number/${bookingNumber}`
            );

        return response.data;
    }

    async getAllBookings(): Promise<BookingListResponse> {
        const response =
            await api.get<BookingListResponse>(
                `${API.BOOKINGS}`
            );

        return response.data;
    }

    async cancelBooking(
        id: string,
        reason?: string
    ): Promise<CartActionResponse> {
        const response =
            await api.patch<CartActionResponse>(
                `${API.BOOKINGS}/${id}/cancel`,
                {
                    reason,
                }
            );

        return response.data;
    }

    async confirmBooking(
        id: string
    ): Promise<CartActionResponse> {
        const response =
            await api.patch<CartActionResponse>(
                `${API.BOOKINGS}/${id}/confirm`
            );

        return response.data;
    }

    async markPaymentSuccess(
        id: string,
        data: PaymentSuccessRequest
    ): Promise<CartActionResponse> {
        const response =
            await api.patch<CartActionResponse>(
                `${API.BOOKINGS}/${id}/payment-success`,
                data
            );

        return response.data;
    }

    async markPaymentFailed(
        id: string
    ): Promise<CartActionResponse> {
        const response =
            await api.patch<CartActionResponse>(
                `${API.BOOKINGS}/${id}/payment-failed`
            );

        return response.data;
    }
    async expireBookingRequest(
    requestId: string
): Promise<CartActionResponse> {

    const response =
        await api.patch<CartActionResponse>(
            `${API.BOOKINGS}/requests/${requestId}/payment-expired`
        );

    return response.data;

}

    async deleteBooking(
        id: string
    ): Promise<CartActionResponse> {
        const response =
            await api.delete<CartActionResponse>(
                `${API.BOOKINGS}/${id}`
            );

        return response.data;
    }
}

const bookingService = new BookingService();

export default bookingService;