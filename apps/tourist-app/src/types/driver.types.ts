export interface Driver {
    id: string;

    userId: string;

    fullName: string;
    phone: string;

    bio: string | null;

    city: string;

    experience: number;

    vehicleType: string;

    pricePerHour: number;
    pricePerDay: number;

    rating: number;

    totalReviews: number;

    isAvailable: boolean;

    approvalStatus: "PENDING" | "APPROVED" | "REJECTED";

    createdAt: string;
    updatedAt: string;
}

export interface CreateDriverRequest {
    fullName: string;
    phone: string;

    bio?: string;

    city: string;

    experience: number;

    vehicleType: string;

    pricePerHour: number;
    pricePerDay: number;
}

export interface UpdateDriverRequest
    extends Partial<CreateDriverRequest> {}