import {
    useQuery,
} from "@tanstack/react-query";

import tripService from "../services/trips/trip.service";


function useTrip() {

    const tripsQuery =
        useQuery({

            queryKey: [
                "driver-trips",
            ],

            queryFn: () =>
                tripService.getDriverTrips(),

            refetchOnWindowFocus:
                true,

        });


    return {

        trips:
            tripsQuery.data?.trips ??
            [],

        count:
            tripsQuery.data?.count ??
            0,

        isLoading:
            tripsQuery.isLoading,

        isFetching:
            tripsQuery.isFetching,

        isError:
            tripsQuery.isError,

        refetch:
            tripsQuery.refetch,

    };

}


export default useTrip;