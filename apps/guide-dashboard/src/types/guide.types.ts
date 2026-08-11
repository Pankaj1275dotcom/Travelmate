export interface CreateGuideRequest {
    fullName: string;

    phone: string;

    bio?: string;

    city: string;

    experience: number;

    languages: string;

    pricePerHour: number;
}

export interface UpdateGuideRequest {
    fullName?: string;

    phone?: string;

    bio?: string;

    city?: string;

    experience?: number;

    languages?: string;

    pricePerHour?: number;
}

export interface UpdateGuideAvailabilityRequest {
    isAvailable: boolean;

    vacationMode: boolean;

    workingDays: string;

    workingStartTime: string;

    workingEndTime: string;
}

export interface Guide {
    id: string;

    userId: string;

    fullName: string;

    phone: string;

    bio?: string;

    city: string;

    experience: number;

    languages: string;

    pricePerHour: number;

    pricePerDay: number;

    rating: number;

    totalReviews: number;

    isAvailable: boolean;

    vacationMode: boolean;

    workingDays: string;

    workingStartTime: string;

    workingEndTime: string;

    approvalStatus:
        | "PENDING"
        | "APPROVED"
        | "REJECTED";
}

export interface MyGuideUser {
    id: string;

    fullName: string;

    phone: string;

    email: string;
}

export interface MyGuideResponse {
    success: boolean;

    guide: Guide | null;

    user: MyGuideUser;
}

export interface GuideResponse {
    success: boolean;

    message: string;

    guide: Guide;
}

export interface GuidesResponse {
    success: boolean;

    count: number;

    guides: Guide[];
}

export interface GuideAvailabilityResponse {
    success: boolean;

    availability: Guide;
}
export interface GuideEarningBookingUser {

    id: string;

    firstName: string;

    lastName: string;

    email: string;

}


export interface GuideEarningBooking {

    id: string;

    bookingNumber: string;

    user: GuideEarningBookingUser;

}


export interface GuideEarning {

    id: string;

    totalPrice: number | string;

    platformFee: number | string;

    providerAmount: number | string;

    paymentStatus: string;

    paidAt: string | null;

    completedAt: string | null;

    status: string;

    guideStartDate: string | null;

    guideEndDate: string | null;

    guideStartTime: string | null;

    guideEndTime: string | null;

    booking: GuideEarningBooking;

}


export interface GuideEarningsResponse {

    success: boolean;

    totalEarnings: number;

    thisMonthEarnings: number;

    totalPlatformFee: number;

    totalBookingAmount: number;

    paidBookings: number;

    earnings: GuideEarning[];

}