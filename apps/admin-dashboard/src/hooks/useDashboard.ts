import { useQuery } from "@tanstack/react-query";

import dashboardService from "../services/dashboard/dashboard.service";

function useDashboard() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["admin-dashboard"],
        queryFn: () =>
            dashboardService.getDashboard(),
    });

return {

    overview:
        data?.data?.overview,

    approvals:
        data?.data?.approvals,

    revenue:
        data?.data?.revenue,

    isLoading,

    isError,

    refetch,

};
}

export default useDashboard;