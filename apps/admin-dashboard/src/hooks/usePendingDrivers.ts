import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import approvalService from "../services/approval/approval.service";

function usePendingDrivers() {
    const queryClient =
        useQueryClient();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["pending-drivers"],
        queryFn: () =>
            approvalService.getPendingDrivers(),
    });

    const approveDriver =
        useMutation({
            mutationFn: (
                userId: string
            ) =>
                approvalService.approveDriver(
                    userId
                ),

            onSuccess: () => {
                toast.success(
                    "Driver approved successfully"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "pending-drivers",
                    ],
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "approved-drivers",
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
                    "Failed to approve driver"
                );
            },
        });

    const rejectDriver =
        useMutation({
            mutationFn: (
                userId: string
            ) =>
                approvalService.rejectDriver(
                    userId
                ),

            onSuccess: () => {
                toast.success(
                    "Driver rejected successfully"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "pending-drivers",
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
                    "Failed to reject driver"
                );
            },
        });

    return {
        drivers:
            data?.drivers ?? [],

        isLoading,

        isError,

        approveDriver,

        rejectDriver,
    };
}

export default usePendingDrivers;