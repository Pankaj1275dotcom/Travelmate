export type RequestStatus =
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED";

export type ProviderType =
    | "GUIDE"
    | "DRIVER";

export interface Tourist {

    id: string;

    name: string;

    email: string;

    phone: string | null;

}

export interface BookingRequest {

    id: string;

    cartItemId: string;

    providerType:
        "GUIDE" | "DRIVER";

    status:
        "PENDING" |
        "ACCEPTED" |
        "REJECTED";

    requestedAt: string;

    respondedAt: string | null;

    expiresAt: string;

    rejectionReason: string | null;

    tourist: {

        id: string;

        name: string;

        email: string;

        phone: string | null;

    };

    cartItem: {

        id: string;

        bookingType:
            "GUIDE" |
            "DRIVER" |
            "HOTEL";

        guideStartDate:
            string | null;

        guideEndDate:
            string | null;

        guideStartTime:
            string | null;

        guideEndTime:
            string | null;

        guideRequestedHours:
            number | null;

        quantity:
            number;

        unitPrice:
            number;

        totalPrice:
            number;

        notes:
            string | null;

        guide: {

            id: string;

            fullName: string;

        } | null;

        driver: {

            id: string;

            fullName: string;

        } | null;

    };

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
export interface Booking {

    id: string;

    bookingNumber: string;

    tripStatus:
        | "UPCOMING"
        | "READY_TO_START"
        | "IN_PROGRESS"
        | "COMPLETED";

    paymentStatus: string;

    startDate: string;

    endDate: string;

    user: {

        id: string;

        firstName: string;

        lastName: string;

        email: string;

        phone: string;

        profileImage?: string | null;

    };

    items: Array<{

        id: string;

        bookingType: string;

        guideStartDate: string | null;

        guideEndDate: string | null;

        guideStartTime: string | null;

        guideEndTime: string | null;

        guideRequestedHours: number | null;

        status: string;

    }>;

    tripPass: {

        qrToken: string;

        startOtp: string;

        completionOtp: string;

    } | null;

    tripTimeline: any[];

    tripVerifications: any[];

}