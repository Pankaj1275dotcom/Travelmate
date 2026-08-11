import { create } from "zustand";

import type { DriverUser } from "../types/auth.types";

interface AuthState {
    driver: DriverUser | null;

    isAuthenticated: boolean;

    setDriver: (driver: DriverUser) => void;

    clearDriver: () => void;
}

const useAuthStore = create<AuthState>(
    (set) => ({
        driver: null,

        isAuthenticated: false,

        setDriver: (driver) =>
            set({
                driver,
                isAuthenticated: true,
            }),

        clearDriver: () =>
            set({
                driver: null,
                isAuthenticated: false,
            }),
    })
);

export default useAuthStore;