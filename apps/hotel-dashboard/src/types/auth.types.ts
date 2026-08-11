export interface RegisterHotelRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: "HOTEL_OWNER";
}

export interface LoginHotelRequest {
    email: string;
    password: string;
}

export interface HotelUser {
    id: string;

    firstName: string;
    lastName: string;

    email: string;

    role: "HOTEL_OWNER";

    approvalStatus:
        | "PENDING"
        | "APPROVED"
        | "REJECTED"
        | "SUSPENDED";
}

export interface AuthData {
    token: string;

    user: HotelUser;
}

export interface AuthResponse {
    success: boolean;

    message: string;

    data: AuthData;
}