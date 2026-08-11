import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import approvalService from "../services/approval/approval.service";

function usePendingGuides() {
    const queryClient =
        useQueryClient();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["pending-guides"],
        queryFn: () =>
            approvalService.getPendingGuides(),
    });

    const approveGuide =
        useMutation({
            mutationFn: (
                userId: string
            ) =>
                approvalService.approveGuide(
                    userId
                ),

            onSuccess: () => {
                toast.success(
                    "Guide approved successfully"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "pending-guides",
                    ],
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "approved-guides",
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
                    "Failed to approve guide"
                );
            },
        });

    const rejectGuide =
        useMutation({
            mutationFn: (
                userId: string
            ) =>
                approvalService.rejectGuide(
                    userId
                ),

            onSuccess: () => {
                toast.success(
                    "Guide rejected successfully"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "pending-guides",
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
                    "Failed to reject guide"
                );
            },
        });

    return {
        guides:
            data?.guides ?? [],

        isLoading,

        isError,

        approveGuide,

        rejectGuide,
    };
}

export default usePendingGuides;