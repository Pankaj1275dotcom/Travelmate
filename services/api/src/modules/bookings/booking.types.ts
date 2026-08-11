import {
    BookingStatus,
    BookingType,
    PaymentStatus,
    ServiceRequestStatus,
} from "@prisma/client";

export interface CreateHotelBookingDto {
    roomTypeId: string;

    checkIn: Date;

    checkOut: Date;

    adults: number;

    children: number;

    specialRequest?: string;
}

export interface CreateGuideBookingDto {
    guideId: string;

    startDate: Date;

    endDate: Date;

    startTime: string;

    endTime: string;

    specialRequest?: string;
}

export interface CreateDriverBookingDto {

    driverId: string;

    startDate: Date;

    endDate: Date;

    startTime: string;

    endTime: string;

    specialRequest?: string;

}

export interface UpdateBookingStatusDto {
    status: BookingStatus;
}

export interface UpdateRequestStatusDto {
    status: ServiceRequestStatus;

    rejectionReason?: string;
}

export interface BookingFilterDto {
    bookingType?: BookingType;

    bookingStatus?: BookingStatus;

    paymentStatus?: PaymentStatus;

    fromDate?: Date;

    toDate?: Date;
}