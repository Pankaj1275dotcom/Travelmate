import { create } from "zustand";

import type { GuideUser } from "../types/auth.types";

interface AuthState {
    guide: GuideUser | null;

    isAuthenticated: boolean;

    setGuide: (guide: GuideUser) => void;

    clearGuide: () => void;
}

const useAuthStore = create<AuthState>(
    (set) => ({
        guide: null,

        isAuthenticated: false,

        setGuide: (guide) =>
            set({
                guide,
                isAuthenticated: true,
            }),

        clearGuide: () =>
            set({
                guide: null,
                isAuthenticated: false,
            }),
    })
);

export default useAuthStore;