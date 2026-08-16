import api from "../api/axios";
import { API } from "../../constants/api";

import type {
    AuthUser,
    LoginRequest,
    RegisterRequest,
    User,
} from "../../types/auth.types";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

class AuthService {
    async login(
        data: LoginRequest
    ): Promise<ApiResponse<{
        token: string;
        user: AuthUser;
    }>> {
        const response =
            await api.post<
                ApiResponse<{
                    token: string;
                    user: AuthUser;
                }>
            >(
                `${API.AUTH}/login`,
                {
                    ...data,
                    role: data.role ?? "TOURIST",
                }
            );

        return response.data;
    }

    async register(
        data: RegisterRequest
    ): Promise<ApiResponse<AuthUser>> {
        const response =
            await api.post<ApiResponse<AuthUser>>(
                `${API.AUTH}/register`,
                {
                    ...data,
                    role: data.role ?? "TOURIST",
                }
            );

        return response.data;
    }

    async me(): Promise<ApiResponse<User>> {
        const response =
            await api.get<ApiResponse<User>>(
                `${API.AUTH}/me`
            );

        return response.data;
    }
}

const authService = new AuthService();

export default authService;