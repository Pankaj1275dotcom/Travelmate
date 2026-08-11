import api from "../api/axios";

import type {
    AuthResponse,
    LoginHotelRequest,
    RegisterHotelRequest,
} from "../../types/auth.types";

interface RegisterResponse {
    success: boolean;
    message: string;
}

class AuthService {
    async register(
        data: RegisterHotelRequest
    ): Promise<RegisterResponse> {
        const response = await api.post<RegisterResponse>(
            "/auth/register",
            {
                ...data,
                role: "HOTEL_OWNER",
            }
        );

        return response.data;
    }

    async login(
    data: LoginHotelRequest
): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
        "/auth/login",
        {
            ...data,
            role: "HOTEL_OWNER",
        }
    );

    return response.data;
}

    async me() {
        const response = await api.get(
            "/auth/me"
        );

        return response.data;
    }

    async logout() {
        return Promise.resolve();
    }
}

const authService = new AuthService();

export default authService;