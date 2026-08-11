import { useQuery } from "@tanstack/react-query";

import approvalService from "../services/approval/approval.service";

function useApprovedGuides() {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["approved-guides"],
        queryFn: () =>
            approvalService.getApprovedGuides(),
    });

    return {
        guides:
            data?.guides ?? [],

        isLoading,

        isError,
    };
}

export default useApprovedGuides;