export interface HotelRoom {
    id: string;

    roomNumber: string;

    status:
        | "AVAILABLE"
        | "OCCUPIED"
        | "MAINTENANCE";
}


export interface HotelRoomType {
    id: string;

    name: string;

    description: string | null;

    pricePerNight: number;

    capacity: number;

    totalRooms: number;

    availableRooms: number;

    rooms: HotelRoom[];
}


export interface HotelImage {

    id: string;

    url: string;

    publicId: string;

    createdAt: string;

}



export interface Hotel {

    id: string;

    ownerId: string;


    name: string;

    description: string;


    coverImage: string | null;


    images: HotelImage[];


    address: string;

    city: string;

    state: string;

    country: string;

    zipCode: string;


    latitude: number | null;

    longitude: number | null;


    pricePerNight: number;

    rating: number;

    isApproved: boolean;



    hasParking: boolean;

    hasRestaurant: boolean;

    hasSwimmingPool: boolean;

    hasGym: boolean;

    hasLaundry: boolean;

    hasRoomService: boolean;

    hasLift: boolean;

    hasPowerBackup: boolean;



    roomTypes?: HotelRoomType[];


    createdAt: string;

    updatedAt: string;

}



export interface CreateHotelRequest {

    name: string;

    description: string;


    address: string;

    city: string;

    state: string;

    country: string;

    zipCode: string;


    latitude?: number;

    longitude?: number;


    pricePerNight: number;

}



export interface UpdateHotelRequest
    extends Partial<CreateHotelRequest> {}



export interface HotelFilters {

    search?: string;

    city?: string;

    state?: string;


    minPrice?: number;

    maxPrice?: number;


    rating?: number;


    sort?:
        | "newest"
        | "price_asc"
        | "price_desc"
        | "rating";

}