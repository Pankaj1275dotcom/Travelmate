import api from "../api/axios";

import type {
    LoginDriverRequest,
    RegisterDriverRequest,
} from "../../types/auth.types";

interface RegisterResponse {
    success: boolean;

    message: string;
}

class AuthService {
    async register(
        data: RegisterDriverRequest
    ): Promise<RegisterResponse> {
        const response =
            await api.post<RegisterResponse>(
                "/auth/register",
                {
                    ...data,
                    role: "DRIVER",
                }
            );

        return response.data;
    }

    async login(
        data: LoginDriverRequest
    ) {
        const response =
            await api.post(
                "/auth/login",
                {
                    ...data,
                    role: "DRIVER",
                }
            );

        return response.data;
    }

    async me() {
        const response =
            await api.get(
                "/auth/me"
            );

        return response.data;
    }

    async logout() {
        return Promise.resolve();
    }
}

const authService =
    new AuthService();

export default authService;