import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import authService from "../services/auth/auth.service";

import useAuthStore from "../store/auth.store";

import {
    getToken,
    removeToken,
} from "../utils/token";

function useInitializeAuth() {
    const navigate = useNavigate();

    const {
        setDriver,
        clearDriver,
    } = useAuthStore();

    useEffect(() => {
        async function initialize() {
            try {
                const token = getToken();

                if (!token) {
                    clearDriver();

                    return;
                }

                const response =
                    await authService.me();

                setDriver(response.data.data);
            } catch (error) {
                removeToken();
                clearDriver();
                navigate("/login");
            }
        }

        initialize();
    }, [setDriver, clearDriver, navigate]);
}

export default useInitializeAuth;