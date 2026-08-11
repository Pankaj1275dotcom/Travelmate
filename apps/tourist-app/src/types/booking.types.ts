export interface CreateHotelBookingDto {
    roomTypeId: string;

    checkIn: string;

    checkOut: string;

    adults: number;

    children: number;

    specialRequest?: string;
}

export interface CreateGuideBookingDto {
    guideId: string;

    startDate: string;

    endDate: string;

    startTime: string;

    endTime: string;

    specialRequest?: string;
}
export interface CreateDriverBookingDto {
    driverId: string;

    startDate: string;

    endDate: string;

    startTime: string;

    endTime: string;

    specialRequest?: string;
}

export interface Hotel {
    id: string;

    name: string;

    hotelType: string;

    city: string;

    state: string;

    country: string;

    address: string;

    coverImage: string | null;

    rating: number;

    totalReviews: number;
}

export interface RoomType {
    id: string;

    hotelId: string;

    name: string;

    description: string;

    pricePerNight: number;

    capacity: number;

    hotel: Hotel;
}

export interface Room {
    id: string;

    roomTypeId: string;

    roomNumber: string;

    status:
        | "AVAILABLE"
        | "BOOKED"
        | "MAINTENANCE";

    roomType: RoomType;
}export interface Guide {
    id: string;

    userId: string;

    fullName: string;

    phone: string;

    bio: string;

    city: string;

    experience: number;

    languages: string[];

    specialties: string[];

    pricePerDay: number;

    rating: number;

    totalReviews: number;

    profileImage: string | null;

    isAvailable: boolean;
}

export interface Driver {
    id: string;

    userId: string;

    fullName: string;

    phone: string;

    city: string;

    experience: number;

    vehicleType: string;

    vehicleBrand: string;

    vehicleModel: string;

    vehicleNumber: string;

    vehicleColor: string;

    seatCapacity: number;

    airConditioned: boolean;

    pricePerHour: number;

    pricePerDay: number;

    rating: number;

    totalReviews: number;

    profileImage: string | null;

    isAvailable: boolean;
}

export interface TripCartItem {
    id: string;

    cartId: string;

    bookingType:
        | "HOTEL"
        | "GUIDE"
        | "DRIVER";

    roomId: string | null;

    guideId: string | null;

    driverId: string | null;
    // Hotel
   checkIn: string | null;

    checkOut: string | null;

// Guide
guideStartDate: string | null;

guideEndDate: string | null;

guideStartTime: string | null;

guideEndTime: string | null;

guideRequestedHours: number | null;

// Driver
driverStartDate: string | null;

driverEndDate: string | null;

driverStartTime: string | null;

driverEndTime: string | null;

driverRequestedHours: number | null;

/*
 * Request Flow
 */
requestStatus:
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED"
    | "REQUEST_EXPIRED"
    | "PAYMENT_PENDING"
    | "PAYMENT_EXPIRED"
    | "CONFIRMED"
    | null;

rejectionReason: string | null;

acceptedAt: string | null;

paymentExpiresAt: string | null;

quantity: number;

    unitPrice: number;

    totalPrice: number;

    room: Room | null;

    guide: Guide | null;

    driver: Driver | null;

    createdAt: string;

    updatedAt: string;
}

export interface TripCart {
    id: string;

    userId: string;

    totalAmount: number;

    items: TripCartItem[];

    createdAt: string;

    updatedAt: string;
}export interface Payment {
    id: string;

    bookingId: string;

    amount: number;

    platformFee: number;

    providerAmount: number;

    method:
        | "UNKNOWN"
        | "MANUAL"
        | "RAZORPAY"
        | "STRIPE";

    status:
        | "PENDING"
        | "PAID"
        | "FAILED"
        | "REFUNDED"
        | "EXPIRED";

    transactionId: string | null;

    gatewayPaymentId: string | null;

    gatewayOrderId: string | null;

    gatewaySignature: string | null;

    paidAt: string | null;

    createdAt: string;

    updatedAt: string;
}

export interface BookingItem {
    id: string;

    bookingId: string;

    bookingType:
        | "HOTEL"
        | "GUIDE"
        | "DRIVER";

    roomId: string | null;

    guideId: string | null;

    driverId: string | null;

    cartItemId: string | null;

    checkIn: string | null;

    checkOut: string | null;
    guideStartDate: string | null;

guideEndDate: string | null;

guideStartTime: string | null;

guideEndTime: string | null;

guideRequestedHours: number | null;

driverStartDate: string | null;

driverEndDate: string | null;

driverStartTime: string | null;

driverEndTime: string | null;

    quantity: number;

    unitPrice: number;

    totalPrice: number;

    platformFee: number;

    providerAmount: number;

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

    paidAt: string | null;

    confirmedAt: string | null;

    completedAt: string | null;

    cancelledAt: string | null;

    cancellationReason: string | null;

    room: Room | null;

    guide: Guide | null;

    driver: Driver | null;

    cartItem: TripCartItem | null;

    createdAt: string;

    updatedAt: string;
}

export interface Booking {

    id: string;

    bookingNumber: string;

    userId: string;

    cartId: string | null;

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

    items: BookingItem[];

    payment: Payment | null;

    tripPass: TripPass | null;

    tripTimeline: TripTimeline[];

    tripVerifications:
        TripVerification[];

    createdAt: string;

    updatedAt: string;

}
export interface ApiResponse {
    success: boolean;
}

export interface CartResponse {
    success: boolean;

    cart: TripCart;
}

export interface BookingResponse {
    success: boolean;

    booking: Booking;
}

export interface BookingListResponse {
    success: boolean;

    count: number;

    bookings: Booking[];
}

export interface CartItemResponse {
    success: boolean;

    message: string;

    item: TripCartItem;
}

export interface CartActionResponse {
    success: boolean;

    message: string;
}

export interface PaymentSuccessRequest {
    transactionId: string;

    gatewayPaymentId: string;

    gatewayOrderId: string;

    gatewaySignature: string;
}

export interface BookingFilter {
    bookingType?:
        | "HOTEL"
        | "GUIDE"
        | "DRIVER";

    bookingStatus?:
        | "PENDING"
        | "PARTIALLY_CONFIRMED"
        | "CONFIRMED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED"
        | "EXPIRED";

    paymentStatus?:
        | "PENDING"
        | "PAID"
        | "FAILED"
        | "REFUNDED"
        | "EXPIRED";

    fromDate?: string;

    toDate?: string;
}
export interface CreatePaymentOrderResponse {

    success: boolean;

    bookingId: string;

    orderId: string;

    amount: number;

    currency: string;

    key: string;

}

export interface VerifyPaymentRequest {

    bookingId: string;

    razorpayOrderId: string;

    razorpayPaymentId: string;

    razorpaySignature: string;

}

export interface VerifyPaymentResponse {

    success: boolean;

    message: string;

}
export interface TripPass {

    id: string;

    bookingId: string;

    qrToken: string;

    startOtp: string;

    completionOtp: string;

    otpExpiresAt: string | null;

    qrExpiresAt: string | null;

    createdAt: string;

    updatedAt: string;

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

    otp: string | null;

    qrToken: string | null;

    verifiedAt: string | null;

    createdAt: string;

}