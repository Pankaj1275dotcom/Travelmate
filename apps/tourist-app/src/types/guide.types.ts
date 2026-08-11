export interface Guide {
    id: string;

    userId: string;

    fullName: string;
    phone: string;

    bio: string | null;

    city: string;

    experience: number;

    languages: string;

    pricePerHour: number;
    pricePerDay: number;

    rating: number;

    totalReviews: number;

    isAvailable: boolean;

    approvalStatus: "PENDING" | "APPROVED" | "REJECTED";

    createdAt: string;
    updatedAt: string;
}

export interface CreateGuideRequest {
    fullName: string;
    phone: string;

    bio?: string;

    city: string;

    experience: number;

    languages: string;

    pricePerHour: number;
    pricePerDay: number;
}

export interface UpdateGuideRequest
    extends Partial<CreateGuideRequest> {}