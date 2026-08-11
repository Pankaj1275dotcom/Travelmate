import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import authService from "../services/auth/auth.service";

import {
    saveToken,
    removeToken,
} from "../utils/token";

import useAuthStore from "../store/auth.store";

import type {
    LoginDriverRequest,
    RegisterDriverRequest,
} from "../types/auth.types";

function useAuth() {
    const navigate =
        useNavigate();

    const {
        setDriver,
        clearDriver,
    } = useAuthStore();

    const registerMutation =
        useMutation({
            mutationFn: (
                data: RegisterDriverRequest
            ) =>
                authService.register(
                    data
                ),

            onSuccess: (
                response
            ) => {
                toast.success(
                    response.message
                );

                navigate("/login");
            },

            onError: (
                error: any
            ) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Registration failed"
                );
            },
        });

    const loginMutation =
        useMutation({
            mutationFn: (
                data: LoginDriverRequest
            ) =>
                authService.login(
                    data
                ),

            onSuccess: async (
                response
            ) => {
                saveToken(
                    response.data.token
                );

                const profile =
                    await authService.me();

                setDriver(
                    profile.data
                );

                toast.success(
                    response.message
                );

                navigate("/");
            },

            onError: (
                error: any
            ) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Login failed"
                );
            },
        });

    const logout = () => {
        removeToken();

        clearDriver();

        navigate("/login");
    };

    return {
        register:
            registerMutation.mutate,

        login:
            loginMutation.mutate,

        logout,

        isRegistering:
            registerMutation.isPending,

        isLoggingIn:
            loginMutation.isPending,
    };
}

export default useAuth;