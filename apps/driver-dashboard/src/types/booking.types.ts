export interface Tourist {

    id: string;

    name: string;

    email: string;

    phone: string | null;

}

export interface DriverCartItem {

    id: string;

    quantity: number;

    totalPrice: number;

    notes: string | null;

    driverStartDate: string | null;

    driverEndDate: string | null;

    driverStartTime: string | null;

    driverEndTime: string | null;

    driverRequestedHours: number | null;

}

export interface BookingRequest {

    id: string;

    status:

        | "PENDING"

        | "ACCEPTED"

        | "REJECTED";

    requestedAt: string;

    expiresAt: string;

    respondedAt: string | null;

    rejectionReason: string | null;

    tourist: Tourist;

    cartItem: DriverCartItem;

}
export interface BookingRequestResponse {

    success: boolean;

    count: number;

    requests: BookingRequest[];

}

export interface BookingActionResponse {

    success: boolean;

    message: string;

}
export interface Driver {

    id: string;

    fullName: string;

}

export interface BookingItem {

    id: string;

    bookingType:
        | "HOTEL"
        | "GUIDE"
        | "DRIVER";

    roomId: string | null;

    guideId: string | null;

    driverId: string | null;

    checkIn: string | null;

    checkOut: string | null;

    driverStartDate: string | null;

    driverEndDate: string | null;

    driverStartTime: string | null;

    driverEndTime: string | null;

    driverRequestedHours: number | null;

    quantity: number;

    unitPrice: string;

    totalPrice: string;

    status: string;

    driver: Driver | null;

}

export interface TripPass {

    id: string;

    qrToken: string;

    startOtp: string;

    completionOtp: string;

    otpExpiresAt: string;

    qrExpiresAt: string;

}

export interface TripTimeline {

    id: string;

    title: string;

    description: string;

    createdAt: string;

}

export interface TripVerification {

    id: string;

    verificationType:
        | "START"
        | "COMPLETE";

    verificationStatus:
        | "PENDING"
        | "VERIFIED"
        | "EXPIRED";

    verifiedBy: string;

    verifiedAt: string | null;

}

export interface Booking {

    id: string;

    bookingNumber: string;

    tripStatus:
        | "UPCOMING"
        | "READY_TO_START"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED";

    status: string;

    paymentStatus: string;

    startDate: string;

    endDate: string;

    user: {

        id: string;

        firstName: string;

        lastName: string;

        email: string;

        phone: string | null;

    };

    items: BookingItem[];

    tripPass: TripPass | null;

    tripTimeline?: TripTimeline[];

    tripVerifications?: TripVerification[];

}
export interface DriverEarningItem {
    id: string;

    bookingType: "DRIVER";

    quantity: number;

    unitPrice: string;

    totalPrice: string;

    platformFee: string;

    providerAmount: string;

    paymentStatus: string;

    paidAt: string | null;

    completedAt: string | null;

    driverStartDate: string | null;

    driverEndDate: string | null;

    driverStartTime: string | null;

    driverEndTime: string | null;

    booking: {
        id: string;

        bookingNumber: string;

        startDate: string;

        endDate: string;

        paymentStatus: string;

        status: string;

        createdAt: string;
    };

    driver: {
        id: string;

        fullName: string;
    } | null;
}


export interface DriverEarningsSummary {
    totalGross: number;

    totalPlatformFee: number;

    totalEarnings: number;

    completedBookings: number;
}


export interface DriverEarningsResponse {
    success: boolean;

    summary: DriverEarningsSummary;

    earnings: DriverEarningItem[];
}