import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import approvalService from "../services/approval/approval.service";

function usePendingHotels() {
    const queryClient =
        useQueryClient();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["pending-hotels"],
        queryFn: () =>
            approvalService.getPendingHotels(),
    });

    const approveHotel =
        useMutation({
            mutationFn: (
                hotelId: string
            ) =>
                approvalService.approveHotel(
                    hotelId
                ),

            onSuccess: () => {
                toast.success(
                    "Hotel approved successfully"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "pending-hotels",
                    ],
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "approved-hotels",
                    ],
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-dashboard",
                    ],
                });
            },

            onError: () => {
                toast.error(
                    "Failed to approve hotel"
                );
            },
        });

    const rejectHotel =
        useMutation({
            mutationFn: (
                hotelId: string
            ) =>
                approvalService.rejectHotel(
                    hotelId
                ),

            onSuccess: () => {
                toast.success(
                    "Hotel rejected successfully"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "pending-hotels",
                    ],
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-dashboard",
                    ],
                });
            },

            onError: () => {
                toast.error(
                    "Failed to reject hotel"
                );
            },
        });

    return {
        hotels:
            data?.hotels ?? [],

        isLoading,

        isError,

        approveHotel,

        rejectHotel,
    };
}

export default usePendingHotels;