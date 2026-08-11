import {
    useQuery,
} from "@tanstack/react-query";

import bookingService from "../services/booking/booking.service";


function useEarnings() {

    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({

        queryKey: [
            "driver-earnings",
        ],

        queryFn: () =>
            bookingService.getDriverEarnings(),

        refetchOnWindowFocus:
            true,

    });


    return {

        summary:
            data?.summary ?? {

                totalGross: 0,

                totalPlatformFee: 0,

                totalEarnings: 0,

                completedBookings: 0,

            },

        earnings:
            data?.earnings ?? [],

        isLoading,

        isFetching,

        refetch,

    };

}


export default useEarnings;