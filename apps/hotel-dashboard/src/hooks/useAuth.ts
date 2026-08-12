import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import authService from "../services/auth/auth.service";
import hotelService from "../services/hotel/hotel.service";

import {
    saveToken,
    removeToken,
} from "../utils/token";

import useAuthStore from "../store/auth.store";

import type {
    LoginHotelRequest,
    RegisterHotelRequest,
} from "../types/auth.types";

function useAuth() {
    const navigate = useNavigate();

    const {
        setHotel,
        clearHotel,
        setCurrentHotel,
        clearCurrentHotel,
    } = useAuthStore();

    const registerMutation = useMutation({
        mutationFn: (
            data: RegisterHotelRequest
        ) => authService.register(data),

        onSuccess: (response) => {
            toast.success(response.message);

            navigate("/login");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                    "Registration failed"
            );
        },
    });

    const loginMutation = useMutation({
        mutationFn: (
            data: LoginHotelRequest
        ) => authService.login(data),

        onSuccess: async (response) => {
            try {
                saveToken(response.data.token);

                const profile =
                    await authService.me();

                setHotel(profile.data);

                try {
                    const hotel =
                        await hotelService.getMyHotel();

                    setCurrentHotel(
                        hotel.hotel
                    );

                    toast.success(
                        response.message
                    );

                    navigate("/");
                } catch (error: any) {
                    clearCurrentHotel();

                    const status =
                        error?.response?.status;

                    const message =
                        error?.response?.data
                            ?.message;

                    if (
                        status === 404 ||
                        status === 400 ||
                        message ===
                            "Hotel not found"
                    ) {
                        toast.success(
                            "Please register your hotel."
                        );

                        navigate(
                            "/register-hotel"
                        );

                        return;
                    }

                    toast.error(
                        message ??
                            "Unable to fetch hotel details."
                    );
                }
            } catch (error: any) {
                removeToken();

                clearHotel();
                clearCurrentHotel();

                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Login failed."
                );
            }
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                    "Login failed"
            );
        },
    });

    const logout = () => {
        removeToken();

        clearHotel();
        clearCurrentHotel();

        navigate("/login");
    };

    return {
        register: registerMutation.mutate,

        login: loginMutation.mutate,

        logout,

        isRegistering:
            registerMutation.isPending,

        isLoggingIn:
            loginMutation.isPending,
    };
}

export default useAuth;