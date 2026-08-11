import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import authService from "../services/auth/auth.service";

import useAuthStore from "../store/auth.store";

import {
    removeToken,
    saveToken,
} from "../utils/token";

import type {
    LoginAdminRequest,
} from "../types/auth.types";

function useAuth() {
    const navigate = useNavigate();

    const [isLoggingIn, setIsLoggingIn] =
        useState(false);

    const {
        admin,
        isAuthenticated,
        setAdmin,
        clearAdmin,
    } = useAuthStore();

    async function login(
        data: LoginAdminRequest
    ) {
        try {
            setIsLoggingIn(true);

            const response =
                await authService.login(data);

            saveToken(
                response.data.token
            );

            setAdmin(
                response.data.user
            );

            toast.success(
                response.message
            );

            navigate("/", {
                replace: true,
            });
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                    "Login failed"
            );
        } finally {
            setIsLoggingIn(false);
        }
    }

    function logout() {
        removeToken();

        clearAdmin();

        navigate("/login", {
            replace: true,
        });
    }

    return {
        admin,
        isAuthenticated,
        isLoggingIn,
        login,
        logout,
    };
}

export default useAuth;