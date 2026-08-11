export interface AdminUser {

    id: string;

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    role: string;

    approvalStatus: string;

    emailVerified: boolean;

    isActive: boolean;

    profileImage?: string | null;

    createdAt: string;

    updatedAt: string;

    hotels?: AdminHotel[];

    guide?: AdminGuide | null;

    driver?: AdminDriver | null;

    bookings?: AdminBooking[];

}


export interface AdminHotel {

    id: string;

    name?: string;

}


export interface AdminGuide {

    id: string;

    fullName?: string;

}


export interface AdminDriver {

    id: string;

    fullName?: string;

}


export interface AdminBooking {

    id: string;

    bookingNumber: string;

    totalAmount: string | number;

    status: string;

    paymentStatus: string;

    tripStatus: string;

    createdAt: string;

}


export interface UserSearchParams {

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


export interface UsersResponse {

    success: boolean;

    message: string;

    users: AdminUser[];

}


export interface UserResponse {

    success: boolean;

    message: string;

    user: AdminUser;

}