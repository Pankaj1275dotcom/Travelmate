import { useEffect } from "react";

import authService from "../services/auth/auth.service";

import useAuthStore from "../store/auth.store";

import { getToken } from "../utils/token";

function useInitializeAuth() {
    const {
        setGuide,
        clearGuide,
    } = useAuthStore();

    useEffect(() => {
        async function initialize() {
            try {
                const token = getToken();

                if (!token) {
                    clearGuide();

                    return;
                }

                const response =
                    await authService.me();

                setGuide(response.data);
            } catch (error) {
                clearGuide();
            }
        }

        initialize();
    }, [setGuide, clearGuide]);
}

export default useInitializeAuth;