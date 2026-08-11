export interface CreateGuideDto {
    userId: string;
    fullName: string;
    phone: string;
    bio?: string;
    city: string;
    experience: number;
    languages: string;
    pricePerHour: number;
}
export interface UpdateGuideAvailabilityDto {
    isAvailable: boolean;
    vacationMode: boolean;
    workingDays: string;
    workingStartTime: string;
    workingEndTime: string;
}
export interface UpdateGuideDto {
    fullName?: string;
    phone?: string;
    bio?: string;
    city?: string;
    experience?: number;
    languages?: string;
    pricePerHour?: number;
}

export interface GuideResponseDto {
    id: string;
    userId: string;
    fullName: string;
    phone: string;
    bio?: string;
    city: string;
    experience: number;
    languages: string;
    pricePerHour: number;
    pricePerDay: number;
    rating: number;
    totalReviews: number;
    isAvailable: boolean;
}