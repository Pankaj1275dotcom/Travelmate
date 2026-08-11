const defaultApiBaseUrl = "http://localhost:5000/api/v1";

export const API = {
    BASE_URL: (import.meta.env.VITE_API_URL as string | undefined) ?? defaultApiBaseUrl,

    AUTH: "/auth",
    HOTELS: "/hotels",
    ROOM_TYPES: "/room-types",
    ROOMS: "/rooms",
    BOOKINGS: "/bookings",
    GUIDES: "/guides",
    DRIVERS: "/drivers",
    WISHLIST: "/wishlist",
} as const;