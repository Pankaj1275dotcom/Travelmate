import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import RegisterHotelPage from "../pages/hotel/RegisterHotelPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import RoomsPage from "../pages/rooms/RoomsPage";
import AmenitiesPage from "../pages/amenities/AmenitiesPage";
import GalleryPage from "../pages/gallery/GalleryPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ReviewsPage from "../pages/reviews/ReviewsPage";
import SettingsPage from "../pages/settings/SettingsPage";
import TripsPage from "../pages/trips/TripsPage";
import TripDetailsPage from "../pages/trips/TripDetailsPage";

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
                        path="/register-hotel"
                        element={<RegisterHotelPage />}
                    />

                    <Route
                        path="/"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                    />

                    <Route
                        path="/trips"
                        element={<TripsPage />}
                    />

                    <Route
                        path="/trips/:bookingId"
                        element={<TripDetailsPage />}
                    />

                    <Route
                        path="/rooms"
                        element={<RoomsPage />}
                    />

                    <Route
                        path="/amenities"
                        element={<AmenitiesPage />}
                    />

                    <Route
                        path="/gallery"
                        element={<GalleryPage />}
                    />

                    <Route
                        path="/reviews"
                        element={<ReviewsPage />}
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