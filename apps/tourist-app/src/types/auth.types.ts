export interface User {
    id: string;

    firstName: string;
    lastName: string;

    email: string;
    phone: string;

    role:
        | "ADMIN"
        | "TOURIST"
        | "HOTEL_OWNER"
        | "GUIDE"
        | "DRIVER";

    approvalStatus:
        | "PENDING"
        | "APPROVED"
        | "REJECTED"
        | "SUSPENDED";

    emailVerified: boolean;
    isActive: boolean;

    profileImage: string | null;

    lastLoginAt: string | null;
    passwordChangedAt: string | null;

    createdAt: string;
    updatedAt: string;
}

/* User returned after Login/Register */

export interface AuthUser {
    id: string;

    firstName: string;
    lastName: string;

    email: string;

    role:
        | "ADMIN"
        | "TOURIST"
        | "HOTEL_OWNER"
        | "GUIDE"
        | "DRIVER";
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: "TOURIST";
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
}
export interface VerifyEmailRequest {
    email: string;
    otp: string;
}

export interface ResendVerificationRequest {
    email: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    password: string;
}