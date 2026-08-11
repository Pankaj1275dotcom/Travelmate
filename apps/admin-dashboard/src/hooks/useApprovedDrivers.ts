import { useQuery } from "@tanstack/react-query";

import approvalService from "../services/approval/approval.service";

function useApprovedDrivers() {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["approved-drivers"],
        queryFn: () =>
            approvalService.getApprovedDrivers(),
    });

    return {
        drivers:
            data?.drivers ?? [],

        isLoading,

        isError,
    };
}

export default useApprovedDrivers;