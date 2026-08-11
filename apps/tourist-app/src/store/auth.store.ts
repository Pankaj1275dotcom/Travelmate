import { create } from "zustand";
import type { AuthState, AuthUser } from "../types/auth.types";

interface AuthStore extends AuthState {
    login: (user: AuthUser, token: string) => void;
    logout: () => void;
    setUser: (user: AuthUser) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    user: null,

    token: localStorage.getItem("token"),

    isAuthenticated: !!localStorage.getItem("token"),

    login: (user, token) => {
        localStorage.setItem("token", token);

        set({
            user,
            token,
            isAuthenticated: true,
        });
    },

    logout: () => {
        localStorage.removeItem("token");

        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },

    setUser: (user) =>
        set({
            user,
        }),
}));

export default useAuthStore;