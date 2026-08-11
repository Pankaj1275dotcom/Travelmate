import {
    Role,
    TripStatus,
    TripVerificationStatus,
    TripVerificationType,
} from "@travelmate/database";

export interface GenerateTripPassDto {
    bookingId: string;
}

export interface VerifyTripDto {
    bookingId: string;
    otp?: string;
    qrToken?: string;
}

export interface CompleteTripDto {
    bookingId: string;
    otp: string;
}

export interface TripCountdownResponse {
    days: number;
    hours: number;
    minutes: number;
    message: string;
}

export interface CreateTimelineDto {
    bookingId: string;
    title: string;
    description?: string;
    createdBy?: Role;
}

export interface CreateVerificationDto {
    bookingId: string;
    bookingItemId?: string;
    verificationType: TripVerificationType;
    verificationStatus?: TripVerificationStatus;
    verifiedBy: Role;
    otp?: string;
    qrToken?: string;
}

export interface UpdateTripStatusDto {
    bookingId: string;
    tripStatus: TripStatus;
}

export interface TripPassResponse {
    qrToken: string;
    startOtp: string | null;
    completionOtp: string | null;
    otpExpiresAt: Date | null;
    qrExpiresAt: Date | null;
}