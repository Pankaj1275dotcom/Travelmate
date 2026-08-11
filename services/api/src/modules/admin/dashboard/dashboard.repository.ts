import prisma from "../../../lib/prisma.js";

class DashboardRepository {
    async getTotalUsers() {
        return prisma.user.count({
            where: {
                role: "TOURIST",
            },
        });
    }
async getTodaysBookings() {

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    return prisma.booking.count({

        where: {

            createdAt: {

                gte: today,

            },

        },

    });

}
    async getTotalHotels() {
        return prisma.hotel.count();
    }

    async getTotalGuides() {
        return prisma.guide.count();
    }

    async getTotalDrivers() {
        return prisma.driver.count();
    }

    async getPendingHotelApprovals() {
        return prisma.hotel.count({
            where: {
                isApproved: false,
            },
        });
    }

    async getPendingGuideApprovals() {
        return prisma.guide.count({
            where: {
                approvalStatus: "PENDING",
            },
        });
    }

    async getPendingDriverApprovals() {
        return prisma.driver.count({
            where: {
                approvalStatus: "PENDING",
            },
        });
    }

    async getTotalBookings() {

    return prisma.booking.count();

}

async getUpcomingTrips() {

    return prisma.booking.count({

        where: {

            tripStatus: "UPCOMING",

        },

    });

}

async getActiveTrips() {

    return prisma.booking.count({

        where: {

            tripStatus: "IN_PROGRESS",

        },

    });

}

async getCompletedTrips() {

    return prisma.booking.count({

        where: {

            tripStatus: "COMPLETED",

        },

    });

}

async getCancelledTrips() {

    return prisma.booking.count({

        where: {

            status: "CANCELLED",

        },

    });

}
async getTotalRevenue() {

    const result = await prisma.payment.aggregate({

        where: {

            status: "PAID",

        },

        _sum: {

            amount: true,

        },

    });

    return Number(result._sum.amount ?? 0);

}

async getTotalCommission() {

    const result = await prisma.payment.aggregate({

        where: {

            status: "PAID",

        },

        _sum: {

            platformFee: true,

        },

    });

    return Number(result._sum.platformFee ?? 0);

}

async getProviderPayout() {

    const result = await prisma.payment.aggregate({

        where: {

            status: "PAID",

        },

        _sum: {

            providerAmount: true,

        },

    });

    return Number(result._sum.providerAmount ?? 0);

}
async getTodayRevenue() {

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const result =
        await prisma.payment.aggregate({

            where: {

                status: "PAID",

                paidAt: {

                    gte: today,

                },

            },

            _sum: {

                amount: true,

            },

        });

    return Number(
        result._sum.amount ?? 0
    );

}
async getMonthlyRevenue() {

    const now = new Date();

    const start = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    const result =
        await prisma.payment.aggregate({

            where: {

                status: "PAID",

                paidAt: {

                    gte: start,

                },

            },

            _sum: {

                amount: true,

            },

        });

    return Number(
        result._sum.amount ?? 0
    );

}

    async getDashboardStats() {
      const [
    totalUsers,
    totalHotels,
    totalGuides,
    totalDrivers,
    pendingHotels,
    pendingGuides,
    pendingDrivers,
    todaysBookings,
    totalBookings,
    upcomingTrips,
    activeTrips,
    completedTrips,
    cancelledTrips,
    totalRevenue,
    todayRevenue,
    monthlyRevenue,
    totalCommission,
    providerPayout,
] = await Promise.all([
            this.getTotalUsers(),
            this.getTotalHotels(),
            this.getTotalGuides(),
            this.getTotalDrivers(),
            this.getPendingHotelApprovals(),
            this.getPendingGuideApprovals(),
            this.getPendingDriverApprovals(),
            this.getTodaysBookings(),
this.getTotalBookings(),
this.getUpcomingTrips(),
this.getActiveTrips(),
this.getCompletedTrips(),
this.getCancelledTrips(),
this.getTotalRevenue(),
this.getTodayRevenue(),
this.getMonthlyRevenue(),
this.getTotalCommission(),
this.getProviderPayout(),
        ]);

       return {

    overview: {

        totalUsers,

        totalHotels,

        totalGuides,

        totalDrivers,

        totalBookings,

        todaysBookings,

        upcomingTrips,

        activeTrips,

        completedTrips,

        cancelledTrips,

    },

    approvals: {

        pendingHotels,

        pendingGuides,

        pendingDrivers,

    },

    revenue: {

        totalRevenue,

        todayRevenue,

        monthlyRevenue,

        totalCommission,

        providerPayout,

    },

};
    }
}

export default new DashboardRepository();