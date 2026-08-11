export interface RegisterUserDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role:
        | "TOURIST"
        | "HOTEL_OWNER"
        | "GUIDE"
        | "DRIVER";
}

export interface LoginUserDto {
    email: string;
    password: string;
    role:
        | "ADMIN"
        | "TOURIST"
        | "HOTEL_OWNER"
        | "GUIDE"
        | "DRIVER";
}export interface VerifyEmailDto {
    email: string;
    otp: string;
}

export interface VerifyPhoneDto {
    phone: string;
    otp: string;
}

export interface ResendVerificationDto {
    email: string;
}

export interface ForgotPasswordDto {
    email: string;
}

export interface ResetPasswordDto {
    email: string;
    otp: string;
    password: string;
}