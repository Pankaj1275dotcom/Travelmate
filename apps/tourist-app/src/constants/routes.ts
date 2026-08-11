export const ROUTES = {
    HOME: "/",

    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY_EMAIL: "/verify-email",

FORGOT_PASSWORD: "/forgot-password",

RESET_PASSWORD: "/reset-password",

    HOTELS: "/hotels",
    HOTEL_DETAILS: "/hotels/:hotelId",

    ROOMS: "/rooms/:roomId",

    GUIDES: "/guides",
    GUIDE_DETAILS: "/guides/:guideId",

    GUIDE_BOOKING:
        "/guides/:guideId/book",

    DRIVERS: "/drivers",
    DRIVER_DETAILS:
        "/drivers/:driverId",

    DRIVER_BOOKING:
        "/drivers/:driverId/book",

    BOOKINGS: "/bookings",

    BOOKING_SUCCESS:
        "/booking-success",

    CART: "/cart",

    WISHLIST: "/wishlist",

    PROFILE: "/profile",

    // ===== Trip Module =====

    TRIPS: "/trips",

    TRIP_DETAILS:
        "/trips/:bookingId",

    TRIP_PASS:
        "/trips/:bookingId/pass",

    NOT_FOUND: "*",
} as const;