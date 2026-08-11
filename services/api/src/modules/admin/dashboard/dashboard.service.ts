import dashboardRepository from "./dashboard.repository.js";

class DashboardService {
    async getDashboardStats() {
        const stats =
            await dashboardRepository.getDashboardStats();

        return {
            message: "Dashboard statistics fetched successfully",
            data: stats,
        };
    }
}

export default new DashboardService();