import api from "../api/axios";

import type {
    AuthResponse,
    LoginGuideRequest,
    RegisterGuideRequest,
} from "../../types/auth.types";

interface RegisterResponse {
    success: boolean;
    message: string;
}

class AuthService {
    async register(
        data: RegisterGuideRequest
    ): Promise<RegisterResponse> {
        const response = await api.post<RegisterResponse>(
            "/auth/register",
            {
                ...data,
                role: "GUIDE",
            }
        );

        return response.data;
    }

async login(
    data: LoginGuideRequest
): Promise<AuthResponse> {
    const response =
        await api.post<AuthResponse>(
            "/auth/login",
            {
                ...data,
                role: "GUIDE",
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