export interface CreateHotelDto {
    // Basic Information
    name: string;
    hotelType: string;
    description: string;

    // Contact
    email: string;
    phone: string;

    // Address
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;

    // Location
    latitude?: number;
    longitude?: number;
    mapUrl?: string;

    // Media
    coverImage?: string;

    // Hotel Facilities
    hasParking?: boolean;
    hasRestaurant?: boolean;
    hasSwimmingPool?: boolean;
    hasGym?: boolean;
    hasLaundry?: boolean;
    hasRoomService?: boolean;
    hasLift?: boolean;
    hasPowerBackup?: boolean;

    // Pricing
    pricePerNight: number;
}
export interface UpdateHotelDto
    extends Partial<CreateHotelDto> {}
export type HotelSort =
    | "newest"
    | "price_asc"
    | "price_desc"
    | "rating";

export interface HotelFilterDto {
    search?: string;

    city?: string;

    state?: string;

    minPrice?: number;

    maxPrice?: number;

    rating?: number;

    sort?: HotelSort;
}