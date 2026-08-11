export interface PendingHotel {
    id: string;

    name: string;

    hotelType: string;

    description: string;

    email: string;

    phone: string;

    address: string;

    city: string;

    state: string;

    country: string;

    zipCode: string;

    coverImage?: string | null;

    isApproved: boolean;

    createdAt: string;

    updatedAt: string;

    owner: {
        id: string;

        firstName: string;

        lastName: string;

        email: string;

        phone: string;
    };
}

export interface PendingHotelsResponse {
    success: boolean;

    hotels: PendingHotel[];
}

export interface PendingGuide {
    id: string;

    userId: string;

    fullName: string;

    phone: string;

    bio: string | null;

    city: string;

    experience: number;

    languages: string;

    pricePerHour: string;

    pricePerDay: string;

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

    createdAt: string;

    updatedAt: string;

    user: {
        id: string;

        firstName: string;

        lastName: string;

        email: string;

        phone: string;
    };
}

export interface PendingGuidesResponse {
    success: boolean;

    guides: PendingGuide[];
}

export interface PendingDriver {
    id: string;

    userId: string;

    fullName: string;

    phone: string;

    bio: string | null;

    city: string;

    experience: number;

    vehicleType: string;

    vehicleBrand: string;

    vehicleModel: string;

    vehicleNumber: string;

    vehicleColor: string | null;

    seatCapacity: number;

    airConditioned: boolean;

    pricePerHour: string;

    pricePerDay: string;

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

    createdAt: string;

    updatedAt: string;

    user: {
        id: string;

        firstName: string;

        lastName: string;

        email: string;

        phone: string;
    };
}

export interface PendingDriversResponse {
    success: boolean;

    drivers: PendingDriver[];
}