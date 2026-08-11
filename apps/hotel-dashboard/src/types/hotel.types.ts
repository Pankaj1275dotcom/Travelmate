export interface Hotel {
    id: string;
    ownerId: string;

    name: string;
    description: string;
    hotelType: string;

    email: string;
    phone: string;

    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;

    latitude: number | null;
    longitude: number | null;
    mapUrl: string | null;

    coverImage: string | null;

    hasParking: boolean;
    hasRestaurant: boolean;
    hasSwimmingPool: boolean;
    hasGym: boolean;
    hasLaundry: boolean;
    hasRoomService: boolean;
    hasLift: boolean;
    hasPowerBackup: boolean;

    amenities: string[];
    pricePerNight: number;

    rating: number;

    isApproved: boolean;

    createdAt: string;
    updatedAt: string;
}

export interface MyHotelResponse {
    success: boolean;
    message: string;
    hotel: Hotel;
}