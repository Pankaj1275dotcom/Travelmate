export interface DashboardOverview {

    totalUsers: number;

    totalHotels: number;

    totalGuides: number;

    totalDrivers: number;

    totalBookings: number;

    todaysBookings: number;

    upcomingTrips: number;

    activeTrips: number;

    completedTrips: number;

    cancelledTrips: number;

}

export interface DashboardApprovals {

    pendingHotels: number;

    pendingGuides: number;

    pendingDrivers: number;

}

export interface DashboardRevenue {

    totalRevenue: number;

    todayRevenue: number;

    monthlyRevenue: number;

    totalCommission: number;

    providerPayout: number;

}

export interface DashboardStats {

    overview: DashboardOverview;

    approvals: DashboardApprovals;

    revenue: DashboardRevenue;

}

export interface DashboardResponse {

    success: boolean;

    message: string;

    data: DashboardStats;

}