import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import tripService from "../services/trips/trip.service";

function useTrips() {

    const queryClient =
        useQueryClient();

    const {
        data,
        isLoading,
    } = useQuery({

        queryKey: ["trips"],

        queryFn: () =>
            tripService.getMyTrips(),

    });

    const generateTripPassMutation =
        useMutation({

            mutationFn: (
                bookingId: string
            ) =>
                tripService.generateTripPass(
                    bookingId
                ),

            onSuccess: () => {

                toast.success(
                    "Trip Pass generated successfully."
                );

                queryClient.invalidateQueries({
                    queryKey: ["trips"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??

                        "Unable to generate Trip Pass."

                );

            },

        });

    const regenerateOtpMutation =
        useMutation({

            mutationFn: (
                bookingId: string
            ) =>
                tripService.regenerateOtp(
                    bookingId
                ),

            onSuccess: () => {

                toast.success(
                    "OTP regenerated."
                );

                queryClient.invalidateQueries({
                    queryKey: ["trips"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??

                        "Unable to regenerate OTP."

                );

            },

        });

    const regenerateQrMutation =
        useMutation({

            mutationFn: (
                bookingId: string
            ) =>
                tripService.regenerateQr(
                    bookingId
                ),

            onSuccess: () => {

                toast.success(
                    "QR regenerated."
                );

                queryClient.invalidateQueries({
                    queryKey: ["trips"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??

                        "Unable to regenerate QR."

                );

            },

        });

    const startTripMutation =
        useMutation({

            mutationFn: tripService.startTrip,

            onSuccess: () => {

                toast.success(
                    "Trip started."
                );

                queryClient.invalidateQueries({
                    queryKey: ["trips"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??

                        "Unable to start trip."

                );

            },

        });

    const completeTripMutation =
        useMutation({

            mutationFn:
                tripService.completeTrip,

            onSuccess: () => {

                toast.success(
                    "Trip completed."
                );

                queryClient.invalidateQueries({
                    queryKey: ["trips"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??

                        "Unable to complete trip."

                );

            },

        });    return {

        trips:
            data?.trips ?? [],

        isLoading,

        generateTripPass: (
            bookingId: string,
            options?: Parameters<
                typeof generateTripPassMutation.mutate
            >[1]
        ) =>
            generateTripPassMutation.mutate(
                bookingId,
                options
            ),

        regenerateOtp: (
            bookingId: string,
            options?: Parameters<
                typeof regenerateOtpMutation.mutate
            >[1]
        ) =>
            regenerateOtpMutation.mutate(
                bookingId,
                options
            ),

        regenerateQr: (
            bookingId: string,
            options?: Parameters<
                typeof regenerateQrMutation.mutate
            >[1]
        ) =>
            regenerateQrMutation.mutate(
                bookingId,
                options
            ),

        startTrip: (
            data: {
                bookingId: string;
                bookingItemId: string;
                otp?: string;
                qrToken?: string;
            },
            options?: Parameters<
                typeof startTripMutation.mutate
            >[1]
        ) =>
            startTripMutation.mutate(
                data,
                options
            ),

        completeTrip: (
            data: {
                bookingId: string;
                bookingItemId: string;
                otp: string;
            },
            options?: Parameters<
                typeof completeTripMutation.mutate
            >[1]
        ) =>
            completeTripMutation.mutate(
                data,
                options
            ),

        isPending:

            generateTripPassMutation.isPending ||

            regenerateOtpMutation.isPending ||

            regenerateQrMutation.isPending ||

            startTripMutation.isPending ||

            completeTripMutation.isPending,

    };

}

export default useTrips;