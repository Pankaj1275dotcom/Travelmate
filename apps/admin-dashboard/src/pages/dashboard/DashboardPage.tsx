import {
    Building2,
    Car,
    Hotel,
    Users,
    Clock,
    UserCheck,
    UserRound,
    CalendarDays,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import SectionCard from "../../components/common/SectionCard";
import StatsCard from "../../components/common/StatsCard";

import useDashboard from "../../hooks/useDashboard";

function DashboardPage() {
   const {
    overview,
    approvals,
    revenue,
    isLoading,
    isError,
} = useDashboard();

    if (isLoading) {
        return (
            <div className="space-y-8">
                <PageHeader
                    title="Dashboard"
                    description="Loading dashboard..."
                />
            </div>
        );
    }

    if (
    isError ||
    !overview ||
    !approvals ||
    !revenue
) {
        return (
            <div className="space-y-8">
                <PageHeader
                    title="Dashboard"
                    description="Unable to load dashboard."
                />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard"
                description="Monitor platform activity and pending approvals."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    title="Total Users"
                    value={overview.totalUsers}
                    icon={Users}
                />
                
                <StatsCard
                    title="Total Hotels"
                    value={overview.totalHotels}
                    icon={Hotel}
                />

                <StatsCard
                    title="Total Guides"
                    value={overview.totalGuides}
                    icon={UserCheck}
                />

                <StatsCard
                    title="Total Drivers"
                   value={overview.totalDrivers}
                    icon={Car}
                />

                <StatsCard
                    title="Pending Hotels"
                   value={approvals.pendingHotels}
                    icon={Building2}
                />

                <StatsCard
                    title="Pending Guides"
                    value={approvals.pendingGuides}
                    icon={UserRound}
                />

                <StatsCard
                    title="Pending Drivers"
                    value={approvals.pendingDrivers}
                    icon={Clock}
                />

                <StatsCard
                    title="Today's Bookings"
                    value={overview.todaysBookings}
                    icon={CalendarDays}
                />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

    <StatsCard
        title="Total Revenue"
        value={`₹${revenue.totalRevenue.toLocaleString()}`}
        icon={CalendarDays}
    />

    <StatsCard
        title="Today's Revenue"
        value={`₹${revenue.todayRevenue.toLocaleString()}`}
        icon={CalendarDays}
    />

    <StatsCard
        title="Monthly Revenue"
        value={`₹${revenue.monthlyRevenue.toLocaleString()}`}
        icon={CalendarDays}
    />

    <StatsCard
        title="Platform Commission"
        value={`₹${revenue.totalCommission.toLocaleString()}`}
        icon={Building2}
    />

</div>

            <SectionCard title="Pending Approvals">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-xl border p-5">
                        <p className="text-sm text-slate-500">
                            Hotels
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-orange-600">
                           {approvals.pendingHotels}
                        </h2>
                    </div>

                    <div className="rounded-xl border p-5">
                        <p className="text-sm text-slate-500">
                            Guides
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-orange-600">
                            {approvals.pendingGuides}
                        </h2>
                    </div>

                    <div className="rounded-xl border p-5">
                        <p className="text-sm text-slate-500">
                            Drivers
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-orange-600">
                            {approvals.pendingDrivers}
                        </h2>
                    </div>
                </div>
            </SectionCard>
        </div>
    );
}

export default DashboardPage;