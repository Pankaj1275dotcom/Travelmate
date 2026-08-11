export interface BookingItem {

    id: string;

    bookingType: string;

    totalPrice: string | number;

    status: string;

    paymentStatus: string;

    room?: {

        roomType?: {

            hotel?: {

                id: string;

                name: string;

            };

        };

    } | null;

    guide?: {

        id: string;

        fullName: string;

    } | null;

    driver?: {

        id: string;

        fullName: string;

    } | null;

}

export interface Booking {

    id: string;

    bookingNumber: string;

    totalAmount: string | number;

    platformFee: string | number;

    payableAmount: string | number;

    paymentStatus: string;

    status: string;

    tripStatus: string;

    startDate: string;

    endDate: string;

    createdAt: string;

    updatedAt: string;

    user?: {

        id: string;

        name?: string;

        fullName?: string;

        email?: string;

    } | null;

    items: BookingItem[];

}

export interface BookingListResponse {

    success: boolean;

    message: string;

    bookings: Booking[];

    count?: number;

}

export interface BookingResponse {

    success: boolean;

    message: string;

    booking: Booking;

}