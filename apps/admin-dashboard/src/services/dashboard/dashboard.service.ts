import api from "../api/axios";

import type {
    DashboardResponse,
} from "../../types/dashboard.types";

class DashboardService {
    async getDashboard() {
        const response =
            await api.get<DashboardResponse>(
                "/admin/dashboard"
            );

        return response.data;
    }
}

const dashboardService =
    new DashboardService();

export default dashboardService;