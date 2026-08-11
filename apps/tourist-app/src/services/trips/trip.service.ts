import api from "../api/axios";

import type {
    Booking,
    TripPass,
    TripTimeline,
} from "../../types/booking.types";

class TripService {

    async getMyTrips() {

        const response =
            await api.get<{
                success: boolean;
                trips: Booking[];
            }>(
                "/trips/my"
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
                `/trips/${bookingId}`
            );

        return response.data;

    }
    async getTripPass(
    bookingId: string
) {

    const response =
        await api.get<{

            success: boolean;

            pass: TripPass;

        }>(
            `/trips/${bookingId}/pass`
        );

    return response.data;

}

    async getTripTimeline(
        bookingId: string
    ) {

        const response =
            await api.get<{
                success: boolean;
                timeline: TripTimeline[];
            }>(
                `/trips/${bookingId}/timeline`
            );

        return response.data;

    }

    async getCountdown(
        bookingId: string
    ) {

        const response =
            await api.get<{
                success: boolean;
                days: number;
                hours: number;
                minutes: number;
                message: string;
            }>(
                `/trips/${bookingId}/countdown`
            );

        return response.data;

    }

    async generateTripPass(
        bookingId: string
    ) {

        const response =
            await api.post<{
                success: boolean;
                pass: TripPass;
            }>(
                "/trips/generate-pass",
                {
                    bookingId,
                }
            );

        return response.data;

    }
        async regenerateOtp(
        bookingId: string
    ) {

        const response =
           await api.patch<{

    success: boolean;

    message: string;

    pass: TripPass;

}>(
                "/trips/regenerate-otp",
                {
                    bookingId,
                }
            );

        return response.data;

    }

    async regenerateQr(
        bookingId: string
    ) {

        const response =
            await api.patch<{

    success: boolean;

    message: string;

    pass: TripPass;

}>(
                "/trips/regenerate-qr",
                {
                    bookingId,
                }
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