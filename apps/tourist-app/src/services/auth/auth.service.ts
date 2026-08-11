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

interface EmailRequest {
    email: string;
}

interface VerifyEmailRequest {
    email: string;
    otp: string;
}

interface ResetPasswordRequest {
    email: string;
    otp: string;
    password: string;
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
                    role: "TOURIST",
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
                data
            );

        return response.data;
    }

    async verifyEmail(
        data: VerifyEmailRequest
    ): Promise<ApiResponse<null>> {
        const response =
            await api.post<ApiResponse<null>>(
                `${API.AUTH}/verify-email`,
                data
            );

        return response.data;
    }

    async resendVerification(
        data: EmailRequest
    ): Promise<ApiResponse<null>> {
        const response =
            await api.post<ApiResponse<null>>(
                `${API.AUTH}/resend-verification`,
                data
            );

        return response.data;
    }

    async forgotPassword(
        data: EmailRequest
    ): Promise<ApiResponse<null>> {
        const response =
            await api.post<ApiResponse<null>>(
                `${API.AUTH}/forgot-password`,
                data
            );

        return response.data;
    }

    async resetPassword(
        data: ResetPasswordRequest
    ): Promise<ApiResponse<null>> {
        const response =
            await api.post<ApiResponse<null>>(
                `${API.AUTH}/reset-password`,
                data
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