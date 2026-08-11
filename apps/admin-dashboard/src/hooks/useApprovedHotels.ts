import { useQuery } from "@tanstack/react-query";

import approvalService from "../services/approval/approval.service";

function useApprovedHotels() {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["approved-hotels"],
        queryFn: () =>
            approvalService.getApprovedHotels(),
    });

    return {
        hotels:
            data?.hotels ?? [],

        isLoading,

        isError,
    };
}

export default useApprovedHotels;