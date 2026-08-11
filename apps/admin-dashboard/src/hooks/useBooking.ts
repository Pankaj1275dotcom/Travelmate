import { useQuery } from "@tanstack/react-query";

import bookingService from "../services/booking/booking.service";

function useBooking() {

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({

        queryKey: ["admin-bookings"],

        queryFn: () =>
            bookingService.getAllBookings(),

    });

    return {

        bookings:
            data?.bookings ?? [],

        bookingsLoading:
            isLoading,

        isError,

        refetch,

    };

}

export default useBooking;