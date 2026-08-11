import api from "../api/axios";

import type {
    AuthResponse,
    LoginAdminRequest,
    MeResponse,
} from "../../types/auth.types";

class AuthService {
    async login(
        data: LoginAdminRequest
    ): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(
            "/auth/login",
            {
                ...data,
                role: "ADMIN",
            }
        );

        return response.data;
    }

    async me(): Promise<MeResponse> {
        const response = await api.get<MeResponse>(
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