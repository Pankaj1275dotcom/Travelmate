import api from "../api/axios";

import type {
    Booking,
} from "../../types/booking.types";

class TripService {
    async getDriverTrips() {
        const response =
            await api.get<{
                success: boolean;
                count: number;
                trips: Booking[];
            }>(
                "/trips/driver"
            );

        return response.data;
    }

    async getTripDetails(
        bookingId: string
    ) {
        const response =
            await api.get<{
                success: boolean;
                trip: Booking;
            }>(
                `/trips/driver/${bookingId}`
            );

        return response.data;
    }

    async verifyQr(
        bookingId: string,
        qrToken: string
    ) {
        const response =
            await api.post<{
                success: boolean;
                verified: boolean;
                message: string;
            }>(
                "/trips/verify/qr",
                {
                    bookingId,
                    qrToken,
                }
            );

        return response.data;
    }

    async verifyOtp(
        bookingId: string,
        otp: string
    ) {
        const response =
            await api.post<{
                success: boolean;
                verified: boolean;
                message: string;
            }>(
                "/trips/verify/otp",
                {
                    bookingId,
                    otp,
                }
            );

        return response.data;
    }

    async startTrip(
        data: {
            bookingId: string;
            bookingItemId: string;
            otp?: string;
            qrToken?: string;
        }
    ) {
        const response =
            await api.post<{
                success: boolean;
                message: string;
            }>(
                "/trips/start",
                data
            );

        return response.data;
    }

    async completeTrip(
        data: {
            bookingId: string;
            bookingItemId: string;
            otp: string;
        }
    ) {
        const response =
            await api.post<{
                success: boolean;
                message: string;
            }>(
                "/trips/complete",
                data
            );

        return response.data;
    }
}

export default new TripService();