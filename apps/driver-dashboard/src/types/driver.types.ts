export interface CreateDriverRequest {
    fullName: string;

    phone: string;

    bio?: string;

    city: string;

    experience: number;

    vehicleType: string;

    vehicleBrand: string;

    vehicleModel: string;

    vehicleNumber: string;

    vehicleColor?: string;

    seatCapacity: number;

    airConditioned: boolean;

    pricePerHour: number;
}

export interface UpdateDriverRequest {
    fullName?: string;

    phone?: string;

    bio?: string;

    city?: string;

    experience?: number;

    vehicleType?: string;

    vehicleBrand?: string;

    vehicleModel?: string;

    vehicleNumber?: string;

    vehicleColor?: string;

    seatCapacity?: number;

    airConditioned?: boolean;

    pricePerHour?: number;
}

export interface UpdateDriverAvailabilityRequest {
    isAvailable: boolean;

    vacationMode: boolean;

    workingDays: string;

    workingStartTime: string;

    workingEndTime: string;
}

export interface UpdateVehicleRequest {
    vehicleType: string;

    vehicleBrand: string;

    vehicleModel: string;

    vehicleNumber: string;

    vehicleColor?: string;

    seatCapacity: number;

    airConditioned: boolean;
}

export interface Driver {
    id: string;

    userId: string;

    fullName: string;

    phone: string;

    bio?: string;

    city: string;

    experience: number;

    vehicleType: string;

    vehicleBrand: string;

    vehicleModel: string;

    vehicleNumber: string;

    vehicleColor?: string;

    seatCapacity: number;

    airConditioned: boolean;

    pricePerHour: number;

    pricePerDay: number;

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
        | "REJECTED"
        | "SUSPENDED";
}

export interface MyDriverUser {
    id: string;

    fullName: string;

    phone: string;

    email: string;
}

export interface MyDriverResponse {
    success: boolean;

    driver: Driver | null;

    user: MyDriverUser;
}

export interface DriverResponse {
    success: boolean;

    message: string;

    driver: Driver;
}

export interface DriversResponse {
    success: boolean;

    count: number;

    drivers: Driver[];
}

export interface DriverAvailabilityResponse {
    success: boolean;

    availability: Driver;
}

export interface VehicleResponse {
    success: boolean;

    vehicle: Driver;
}