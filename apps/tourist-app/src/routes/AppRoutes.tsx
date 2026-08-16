import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTES } from "../constants/routes";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import HotelListPage from "../pages/hotels/HotelListPage";
import HotelDetailsPage from "../pages/hotels/HotelDetailsPage";

import RoomPage from "../pages/rooms/RoomPage";

import GuidePage from "../pages/guides/GuidePage";
import GuideDetailsPage from "../pages/guides/GuideDetailsPage";

import DriverPage from "../pages/drivers/DriverPage";
import DriverDetailsPage from "../pages/drivers/DriverDetailsPage";
import BookingPage from "../pages/bookings/BookingPage";
import ServiceBookingPage from "../pages/bookings/ServiceBookingPage";
import BookingSuccessPage from "../pages/bookings/BookingSuccessPage";
import MyTripsPage from "../pages/trips/MyTripsPage";
import TripDetailsPage from "../pages/trips/TripDetailsPage";
import TripPassPage from "../pages/trips/TripPassPage";
import WishlistPage from "../pages/wishlist/WishlistPage";

import ProfilePage from "../pages/profile/ProfilePage";
import CartPage from "../pages/cart/CartPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />

                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route
                    path={ROUTES.REGISTER}
                    element={<RegisterPage />}
                />

                <Route
                    path={ROUTES.HOTELS}
                    element={<HotelListPage />}
                />

                <Route
                    path={ROUTES.HOTEL_DETAILS}
                    element={<HotelDetailsPage />}
                />

                <Route
                    path={ROUTES.ROOMS}
                    element={<RoomPage />}
                />

                <Route
                    path={ROUTES.GUIDES}
                    element={<GuidePage />}
                />
                <Route
                    path={ROUTES.GUIDE_DETAILS}
                    element={<GuideDetailsPage />}
                />
                <Route
    path={ROUTES.GUIDE_BOOKING}
    element={<ServiceBookingPage />}
/>
                <Route
                    path={ROUTES.DRIVERS}
                    element={<DriverPage />}
                />
                <Route
                    path={ROUTES.DRIVER_DETAILS}
                    element={<DriverDetailsPage />}
                />
                <Route
    path={ROUTES.DRIVER_BOOKING}
    element={<ServiceBookingPage />}
/>
                <Route
                    path={ROUTES.BOOKINGS}
                    element={<BookingPage />}
                />
                <Route
                    path={ROUTES.BOOKING_SUCCESS}
                    element={<BookingSuccessPage />}
                />
                <Route
    path={ROUTES.TRIPS}
    element={<MyTripsPage />}
/>

<Route
    path={ROUTES.TRIP_DETAILS}
    element={<TripDetailsPage />}
/>

<Route
    path={ROUTES.TRIP_PASS}
    element={<TripPassPage />}
/>
                <Route
                    path={ROUTES.WISHLIST}
                    element={<WishlistPage />}
                />

                <Route
                    path={ROUTES.PROFILE}
                    element={<ProfilePage />}
                />
                <Route
    path={ROUTES.CART}
    element={<CartPage />}
/>
                <Route
                    path={ROUTES.NOT_FOUND}
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;