export interface SearchUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    role?:
        | "ADMIN"
        | "TOURIST"
        | "HOTEL_OWNER"
        | "GUIDE"
        | "DRIVER";
}