export interface RegisterDriverRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

export interface LoginDriverRequest {
    email: string;
    password: string;
}

export interface DriverUser {
    id: string;

    firstName: string;
    lastName: string;

    email: string;

    role: "DRIVER";

    approvalStatus:
        | "PENDING"
        | "APPROVED"
        | "REJECTED"
        | "SUSPENDED";
}

export interface AuthData {
    token: string;

    user: DriverUser;
}

export interface AuthResponse {
    success: boolean;

    message: string;

    data: AuthData;
}