export interface Hotel {

    id: string;

    name: string;

    city: string;

    state: string;

    country: string;

    address: string;

    rating: number;

    coverImage: string | null;

}

export interface RoomType {

    id: string;

    name: string;

    pricePerNight: number;

    capacity: number;

    hotel: Hotel;

}

export interface Room {

    id: string;

    roomNumber: string;

    status:
        | "AVAILABLE"
        | "BOOKED"
        | "MAINTENANCE";

    roomType: RoomType;

}

export interface TripPass {

    id: string;

    bookingId: string;

    qrToken: string;

    startOtp: string;

    completionOtp: string;

    otpExpiresAt: string | null;

    qrExpiresAt: string | null;

}
export interface User {

    id: string;

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    profileImage: string | null;

}
export interface BookingItem {

    id: string;

    bookingId: string;

    bookingType:
        | "HOTEL"
        | "GUIDE"
        | "DRIVER";

    roomId: string | null;

    quantity: number;

    unitPrice: number;

    totalPrice: number;

    status:
        | "PENDING"
        | "REQUEST_SENT"
        | "ACCEPTED"
        | "REJECTED"
        | "PAYMENT_PENDING"
        | "CONFIRMED"
        | "REQUEST_EXPIRED"
        | "PAYMENT_EXPIRED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED";

    paymentStatus:
        | "PENDING"
        | "PAID"
        | "FAILED"
        | "REFUNDED"
        | "EXPIRED";

    checkIn: string | null;

    checkOut: string | null;

    confirmedAt: string | null;

    completedAt: string | null;

    room: Room | null;

}

export interface TripTimeline {

    id: string;

    bookingId: string;

    title: string;

    description: string | null;

    createdBy:
        | "ADMIN"
        | "TOURIST"
        | "HOTEL_OWNER"
        | "GUIDE"
        | "DRIVER";

    createdAt: string;

}

export interface TripVerification {

    id: string;

    bookingId: string;

    bookingItemId: string | null;

    verificationType:
        | "START"
        | "COMPLETE";

    verificationStatus:
        | "PENDING"
        | "VERIFIED"
        | "FAILED";

    verifiedBy:
        | "ADMIN"
        | "TOURIST"
        | "HOTEL_OWNER"
        | "GUIDE"
        | "DRIVER";

    verifiedAt: string | null;

    otp: string | null;

    qrToken: string | null;

    createdAt: string;

}
export interface Booking {

    id: string;

    bookingNumber: string;

    userId: string;

    totalAmount: number;

    platformFee: number;

    payableAmount: number;

    status:
        | "PENDING"
        | "PARTIALLY_CONFIRMED"
        | "CONFIRMED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED"
        | "EXPIRED";

    tripStatus:
        | "UPCOMING"
        | "READY_TO_START"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED";

    paymentStatus:
        | "PENDING"
        | "PAID"
        | "FAILED"
        | "REFUNDED"
        | "EXPIRED";

    adults: number;

    children: number;

    startDate: string;

    endDate: string;

    specialRequest: string | null;

    paidAt: string | null;

    confirmedAt: string | null;

    cancelledAt: string | null;

    cancellationReason: string | null;
    user: User;

    items: BookingItem[];

    tripPass: TripPass | null;

    tripTimeline: TripTimeline[];

    tripVerifications: TripVerification[];

    createdAt: string;

    updatedAt: string;

}

export interface TripListResponse {

    success: boolean;

    count: number;

    trips: Booking[];

}

export interface TripResponse {

    success: boolean;

    trip: Booking;

}

export interface ApiResponse {

    success: boolean;

    message: string;

}