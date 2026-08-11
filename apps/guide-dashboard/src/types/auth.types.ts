export interface RegisterGuideRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

export interface LoginGuideRequest {
    email: string;
    password: string;
}

export interface GuideUser {
    id: string;

    firstName: string;
    lastName: string;

    email: string;

    role: "GUIDE";

    approvalStatus:
        | "PENDING"
        | "APPROVED"
        | "REJECTED"
        | "SUSPENDED";
}

export interface AuthData {
    token: string;

    user: GuideUser;
}

export interface AuthResponse {
    success: boolean;

    message: string;

    data: AuthData;
}