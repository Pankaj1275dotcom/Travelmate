export interface CreateDriverDto {
    userId: string;
    fullName: string;
    phone: string;
    bio?: string;

    city: string;
    experience: number;

    // Vehicle
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehicleNumber: string;
    vehicleColor?: string;
    seatCapacity: number;
    airConditioned: boolean;

    // Pricing
    pricePerHour: number;
}

export interface UpdateDriverDto {
    fullName?: string;
    phone?: string;
    bio?: string;

    city?: string;
    experience?: number;

    // Vehicle
    vehicleType?: string;
    vehicleBrand?: string;
    vehicleModel?: string;
    vehicleNumber?: string;
    vehicleColor?: string;
    seatCapacity?: number;
    airConditioned?: boolean;

    // Pricing
    pricePerHour?: number;

    // Availability
    isAvailable?: boolean;
    vacationMode?: boolean;
    workingDays?: string;
    workingStartTime?: string;
    workingEndTime?: string;
}

export interface DriverAvailabilityDto {
    isAvailable: boolean;
    vacationMode: boolean;
    workingDays: string;
    workingStartTime: string;
    workingEndTime: string;
}

export interface DriverVehicleDto {
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehicleNumber: string;
    vehicleColor?: string;
    seatCapacity: number;
    airConditioned: boolean;
}

export interface DriverResponseDto {
    id: string;
    userId: string;

    fullName: string;
    phone: string;
    bio?: string;

    city: string;
    experience: number;

    // Vehicle
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehicleNumber: string;
    vehicleColor?: string;
    seatCapacity: number;
    airConditioned: boolean;

    // Pricing
    pricePerHour: number;
    pricePerDay: number;

    // Ratings
    rating: number;
    totalReviews: number;

    // Availability
    isAvailable: boolean;
    vacationMode: boolean;
    workingDays: string;
    workingStartTime: string;
    workingEndTime: string;

    approvalStatus: string;

    createdAt: Date;
    updatedAt: Date;
}