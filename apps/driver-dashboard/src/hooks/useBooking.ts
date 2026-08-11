import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import bookingService from "../services/booking/booking.service";

function useBooking() {
    const queryClient =
        useQueryClient();

    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: [
            "booking-requests",
        ],
        queryFn: () =>
            bookingService.getBookingRequests(),
        refetchOnWindowFocus: true,
    });

    const acceptMutation =
        useMutation({
            mutationFn: (
                requestId: string
            ) =>
                bookingService.acceptBookingRequest(
                    requestId
                ),

            onSuccess: (
                response
            ) => {
                toast.success(
                    response.message
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "booking-requests",
                    ],
                });
            },

            onError: (
                error: any
            ) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Unable to accept request"
                );
            },
        });

    const rejectMutation =
        useMutation({
            mutationFn: ({
                requestId,
                reason,
            }: {
                requestId: string;
                reason: string;
            }) =>
                bookingService.rejectBookingRequest(
                    requestId,
                    reason
                ),

            onSuccess: (
                response
            ) => {
                toast.success(
                    response.message
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "booking-requests",
                    ],
                });
            },

            onError: (
                error: any
            ) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Unable to reject request"
                );
            },
        });

    const removeMutation =
        useMutation({
            mutationFn: (
                requestId: string
            ) =>
                bookingService.removeBookingRequest(
                    requestId
                ),

            onSuccess: (
                response
            ) => {
                toast.success(
                    response.message
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "booking-requests",
                    ],
                });
            },

            onError: (
                error: any
            ) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Unable to remove request"
                );
            },
        });

    return {
        requests:
            data?.requests ?? [],

        loading:
            isLoading,

        acceptBookingRequest: (
            requestId: string
        ) =>
            acceptMutation.mutate(
                requestId
            ),

        rejectBookingRequest: (
            requestId: string,
            reason: string
        ) =>
            rejectMutation.mutate({
                requestId,
                reason,
            }),

        removeBookingRequest: (
            requestId: string
        ) =>
            removeMutation.mutate(
                requestId
            ),

        isSubmitting:
            acceptMutation.isPending ||
            rejectMutation.isPending ||
            removeMutation.isPending,
    };
}

export default useBooking;