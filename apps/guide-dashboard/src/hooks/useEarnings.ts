import {
    useQuery,
} from "@tanstack/react-query";

import guideService from "../services/guide/guide.service";


function useEarnings() {

    const earningsQuery =
        useQuery({

            queryKey: [
                "guide-earnings",
            ],

            queryFn: () =>
                guideService.getEarnings(),

            refetchOnWindowFocus:
                true,

        });


    return {

        totalEarnings:
            earningsQuery.data
                ?.totalEarnings ??
            0,

        thisMonthEarnings:
            earningsQuery.data
                ?.thisMonthEarnings ??
            0,

        totalPlatformFee:
            earningsQuery.data
                ?.totalPlatformFee ??
            0,

        totalBookingAmount:
            earningsQuery.data
                ?.totalBookingAmount ??
            0,

        paidBookings:
            earningsQuery.data
                ?.paidBookings ??
            0,

        earnings:
            earningsQuery.data
                ?.earnings ??
            [],

        isLoading:
            earningsQuery.isLoading,

        isFetching:
            earningsQuery.isFetching,

        isError:
            earningsQuery.isError,

        refetch:
            earningsQuery.refetch,

    };

}


export default useEarnings;