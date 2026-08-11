import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import BookingRequestsPage from "../pages/bookings/BookingRequestsPage";
import AvailabilityPage from "../pages/availability/AvailabilityPage";
import EarningsPage from "../pages/earnings/EarningsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import TripsPage from "../pages/trips/TripsPage";

function AppRoutes() {
    return (
        <Routes>
            {/* Authentication */}

            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
            </Route>

            {/* Protected Dashboard */}

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route
                        path="/"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                    />

                    <Route
                        path="/bookings"
                        element={<BookingRequestsPage />}
                    />

                    <Route
                        path="/availability"
                        element={<AvailabilityPage />}
                    />
       <Route
    path="/trips"
    element={<TripsPage />}
/>
                    <Route
                        path="/earnings"
                        element={<EarningsPage />}
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