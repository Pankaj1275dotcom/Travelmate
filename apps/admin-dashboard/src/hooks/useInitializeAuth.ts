import { useEffect } from "react";

import authService from "../services/auth/auth.service";

import useAuthStore from "../store/auth.store";

import { getToken } from "../utils/token";

function useInitializeAuth() {
    const {
        setAdmin,
        clearAdmin,
    } = useAuthStore();

    useEffect(() => {
        async function initialize() {
            try {
                const token = getToken();

                if (!token) {
                    clearAdmin();
                    return;
                }

                const response = await authService.me();

                setAdmin(response.data);
            } catch (error) {
                clearAdmin();
            }
        }

        initialize();
    }, [setAdmin, clearAdmin]);
}

export default useInitializeAuth;