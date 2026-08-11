export interface LoginAdminRequest {
    email: string;
    password: string;
}

export interface AdminUser {
    id: string;

    firstName: string;
    lastName: string;

    email: string;

    role: "ADMIN";
}

export interface AuthData {
    token: string;

    user: AdminUser;
}

export interface AuthResponse {
    success: boolean;

    message: string;

    data: AuthData;
}
export interface MeResponse {
    success: boolean;
    message: string;
    data: AdminUser;
}