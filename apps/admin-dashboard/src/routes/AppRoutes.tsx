import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/auth/LoginPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import BookingsPage from "../pages/bookings/BookingsPage";
import HotelsPage from "../pages/hotels/HotelsPage";

import GuidesPage from "../pages/guides/GuidesPage";
import DriversPage from "../pages/drivers/DriversPage";
import UsersPage from "../pages/users/UsersPage";
import PaymentsPage from "../pages/payments/PaymentsPage";
import ReviewsPage from "../pages/reviews/ReviewsPage";
import ReportsPage from "../pages/reports/ReportsPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import SettingsPage from "../pages/settings/SettingsPage";

function AppRoutes() {
    return (
        <Routes>
            {/* Authentication */}

            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
            </Route>

            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route
                        path="/"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/bookings"
                        element={<BookingsPage />}
                    />

                    <Route
                        path="/hotels"
                        element={<HotelsPage />}
                    />


                    <Route
                        path="/guides"
                        element={<GuidesPage />}
                    />

                    <Route
                        path="/drivers"
                        element={<DriversPage />}
                    />

                    <Route
                        path="/users"
                        element={<UsersPage />}
                    />

                    <Route
                        path="/payments"
                        element={<PaymentsPage />}
                    />

                    <Route
                        path="/reviews"
                        element={<ReviewsPage />}
                    />

                    <Route
                        path="/reports"
                        element={<ReportsPage />}
                    />

                    <Route
                        path="/notifications"
                        element={<NotificationsPage />}
                    />

                    <Route
                        path="/settings"
                        element={<SettingsPage />}
                    />
                </Route>
            </Route>

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />
        </Routes>
    );
}

export default AppRoutes;