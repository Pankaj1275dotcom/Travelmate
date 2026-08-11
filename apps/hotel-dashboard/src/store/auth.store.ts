import { create } from "zustand";

import type { HotelUser } from "../types/auth.types";
import type { Hotel } from "../types/hotel.types";

interface AuthState {
    hotel: HotelUser | null;

    currentHotel: Hotel | null;

    hasHotel: boolean;

    isAuthenticated: boolean;

    setHotel: (hotel: HotelUser) => void;

    setCurrentHotel: (hotel: Hotel | null) => void;

    clearCurrentHotel: () => void;

    clearHotel: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    hotel: null,

    currentHotel: null,

    hasHotel: false,

    isAuthenticated: false,

    setHotel: (hotel) =>
        set({
            hotel,
            isAuthenticated: true,
        }),

    setCurrentHotel: (hotel) =>
        set({
            currentHotel: hotel,
            hasHotel: hotel !== null,
        }),

    clearCurrentHotel: () =>
        set({
            currentHotel: null,
            hasHotel: false,
        }),

    clearHotel: () =>
        set({
            hotel: null,
            currentHotel: null,
            hasHotel: false,
            isAuthenticated: false,
        }),
}));

export default useAuthStore;