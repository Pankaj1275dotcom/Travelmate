import crypto from "crypto";
import bookingRepository from "../bookings/booking.repository.js";
import {
    BookingStatus,
    Role,
    TripStatus,
    TripVerificationStatus,
    TripVerificationType,
} from "@travelmate/database";
import {
    BookingItemStatus,
} from "@travelmate/database";

import tripRepository from "./trip.repository.js";

class TripService {

    private generateOtp(): string {

        return Math.floor(
            100000 +
            Math.random() * 900000
        ).toString();

    }

    private generateQrToken(): string {

        return crypto
            .randomBytes(32)
            .toString("hex");

    }

    async getMyTrips(
        userId: string
    ) {

        const trips =
            await tripRepository.getMyTrips(
                userId
            );

        return {

            message:
                "Trips fetched successfully.",

            trips,

        };

    }

    async getTripDetails(
        userId: string,
        bookingId: string
    ) {

        const trip =
            await tripRepository.getTripById(
                bookingId,
                userId
            );

        if (!trip) {

            throw new Error(
                "Trip not found."
            );

        }

        return {

            message:
                "Trip fetched successfully.",

            trip,

        };

    }

    async getTripPass(
        userId: string,
        bookingId: string
    ) {

        const booking =
            await tripRepository.getTripById(
                bookingId,
                userId
            );

        if (!booking) {

            throw new Error(
                "Trip not found."
            );

        }

        if (!booking.tripPass) {

            throw new Error(
                "Trip Pass has not been generated yet."
            );

        }

        return {

            message:
                "Trip Pass fetched successfully.",

            pass:
                booking.tripPass,

        };

    }
    async generateTripPass(
        userId: string,
        bookingId: string
    ) {

        const booking =
            await tripRepository.getTripById(
                bookingId,
                userId
            );

        if (!booking) {

            throw new Error(
                "Booking not found."
            );

        }

        if (
            booking.paymentStatus !==
            "PAID"
        ) {

            throw new Error(
                "Trip Pass can only be generated after successful payment."
            );

        }

        const existingPass =
            await tripRepository.findTripPass(
                booking.id
            );

        const qrToken =
            this.generateQrToken();

        const startOtp =
            this.generateOtp();

        const completionOtp =
            this.generateOtp();

        const otpExpiresAt =
            new Date(
                Date.now() +
                15 *
                    60 *
                    1000
            );

        const qrExpiresAt =
            new Date(
                Date.now() +
                24 *
                    60 *
                    60 *
                    1000
            );

        if (existingPass) {

            const pass =
                await tripRepository.updateTripPass(
                    booking.id,
                    {
                        qrToken,
                        startOtp,
                        completionOtp,
                        otpExpiresAt,
                        qrExpiresAt,
                    }
                );

            await tripRepository.createTimeline({
                booking: {
                    connect: {
                        id: booking.id,
                    },
                },
                title:
                    "Trip Pass Regenerated",
                description:
                    "New QR and OTP generated.",
                createdBy:
                    Role.TOURIST,
            });

            return {

                message:
                    "Trip Pass regenerated successfully.",

                pass,

            };

        }

        const pass =
            await tripRepository.createTripPass({
                booking: {
                    connect: {
                        id: booking.id,
                    },
                },
                qrToken,
                startOtp,
                completionOtp,
                otpExpiresAt,
                qrExpiresAt,
            });

        await tripRepository.createTimeline({
            booking: {
                connect: {
                    id: booking.id,
                },
            },
            title:
                "Trip Pass Generated",
            description:
                "QR Code and OTP created.",
            createdBy:
                Role.TOURIST,
        });

        return {

            message:
                "Trip Pass generated successfully.",

            pass,

        };

    }    async getTripCountdown(
        userId: string,
        bookingId: string
    ) {

        const booking =
            await tripRepository.getTripById(
                bookingId,
                userId
            );

        if (!booking) {

            throw new Error(
                "Trip not found."
            );

        }

        const startDate =
            new Date(
                booking.startDate
            );

        const now =
            new Date();

        const difference =
            startDate.getTime() -
            now.getTime();

        if (difference <= 0) {

            return {

                days: 0,

                hours: 0,

                minutes: 0,

                message:
                    "Trip Started",

            };

        }

        const days =
            Math.floor(
                difference /
                    (1000 *
                        60 *
                        60 *
                        24)
            );

        const hours =
            Math.floor(
                (difference %
                    (1000 *
                        60 *
                        60 *
                        24)) /
                    (1000 *
                        60 *
                        60)
            );

        const minutes =
            Math.floor(
                (difference %
                    (1000 *
                        60 *
                        60)) /
                    (1000 * 60)
            );

        let message =
            "Upcoming Trip";

        if (days >= 2) {

            message =
                `${days} Days to Go`;

        } else if (days === 1) {

            message =
                "24 Hours to Go";

        } else {

            message =
                `${hours} Hours to Go`;

        }

        return {

            days,

            hours,

            minutes,

            message,

        };

    }

    async startTrip(
    bookingId: string,
    bookingItemId: string,
    role: Role,
    otp?: string,
    qrToken?: string
) {

    const pass =
        await tripRepository.findTripPass(
            bookingId
        );

    if (!pass) {

        throw new Error(
            "Trip Pass not found."
        );

    }

    if (
        pass.otpExpiresAt &&
        pass.otpExpiresAt <
        new Date()
    ) {

        throw new Error(
            "OTP expired."
        );

    }

    if (
        otp &&
        pass.startOtp !== otp
    ) {

        throw new Error(
            "Invalid OTP."
        );

    }

    if (
        qrToken &&
        pass.qrToken !== qrToken
    ) {

        throw new Error(
            "Invalid QR Token."
        );

    }

    const trip =
        await tripRepository.getTripByBookingId(
            bookingId
        );

    if (!trip) {

        throw new Error(
            "Trip not found."
        );

    }

    if (
        trip.tripStatus !==
        TripStatus.READY_TO_START
    ) {

        throw new Error(
            "Trip is not ready to start."
        );

    }

    await tripRepository.createVerification({

        booking: {

            connect: {

                id: bookingId,

            },

        },

        bookingItem: {

            connect: {

                id: bookingItemId,

            },

        },

        verificationType:
            TripVerificationType.START,

        verificationStatus:
            TripVerificationStatus.VERIFIED,

        verifiedBy:
            role,

        verifiedAt:
            new Date(),

        otp,

        qrToken,

    });

    await tripRepository.updateTripStatus(

        bookingId,

        TripStatus.IN_PROGRESS

    );

    await tripRepository.createTimeline({

        booking: {

            connect: {

                id: bookingId,

            },

        },

        title:
            "Trip Started",

        description:
            `${role} started the service.`,

        createdBy:
            role,

    });

    return {

        message:
            "Trip started successfully.",

    };

}
     async completeTrip(
    bookingId: string,
    bookingItemId: string,
    role: Role,
    otp: string
) {

    const pass =
        await tripRepository.findTripPass(
            bookingId
        );

    if (!pass) {

        throw new Error(
            "Trip Pass not found."
        );

    }

    if (
        pass.completionOtp !==
        otp
    ) {

        throw new Error(
            "Invalid completion OTP."
        );

    }

    await tripRepository.createVerification({

        booking: {

            connect: {

                id: bookingId,

            },

        },

        bookingItem: {

            connect: {

                id: bookingItemId,

            },

        },

        verificationType:
            TripVerificationType.COMPLETE,

        verificationStatus:
            TripVerificationStatus.VERIFIED,

        verifiedBy:
            role,

        verifiedAt:
            new Date(),

        otp,

    });

    await tripRepository.createTimeline({

        booking: {

            connect: {

                id: bookingId,

            },

        },

        title:
            "Service Completed",

        description:
            `${role} completed the service.`,

        createdBy:
            role,

    });

    const trip =
        await tripRepository.getTripByBookingId(
            bookingId
        );

    if (!trip) {

        throw new Error(
            "Trip not found."
        );

    }

    await tripRepository.updateBookingItem(

        bookingItemId,

        {

            status:
                BookingItemStatus.COMPLETED,

            completedAt:
                new Date(),

        }

    );

    const bookingItem =
        trip.items.find(

            item =>

                item.id ===
                bookingItemId

        );

    if (
        bookingItem?.roomId
    ) {

        await tripRepository.updateRoom(

            bookingItem.roomId,

            {

                status:
                    "AVAILABLE",

            }

        );

    }

    const completedServices =
        trip.tripVerifications.filter(

            verification =>

                verification.verificationType ===
                TripVerificationType.COMPLETE &&

                verification.verificationStatus ===
                TripVerificationStatus.VERIFIED

        ).length;

    if (

        completedServices >=
        trip.items.length

    ) {

        await tripRepository.updateTripStatus(

            bookingId,

            TripStatus.COMPLETED

        );

        await tripRepository.updateBookingStatus(

            bookingId,

            BookingStatus.COMPLETED

        );

        await tripRepository.createTimeline({

            booking: {

                connect: {

                    id: bookingId,

                },

            },

            title:
                "Trip Completed",

            description:
                "All booked services have been completed successfully.",

            createdBy:
                role,

        });

    }

    return {

        message:
            "Trip completed successfully.",

    };

}

    async regenerateOtp(
        bookingId: string
    ) {

        const pass =
            await tripRepository.findTripPass(
                bookingId
            );

        if (!pass) {

            throw new Error(
                "Trip Pass not found."
            );

        }

        const startOtp =
            this.generateOtp();

        const completionOtp =
            this.generateOtp();

        const otpExpiresAt =
            new Date(
                Date.now() +
                15 *
                    60 *
                    1000
            );

        const updatedPass =
            await tripRepository.updateTripPass(

                bookingId,

                {

                    startOtp,

                    completionOtp,

                    otpExpiresAt,

                }

            );

        await tripRepository.createTimeline({

            booking: {

                connect: {

                    id: bookingId,

                },

            },

            title:
                "OTP Regenerated",

            description:
                "Trip verification OTP has been regenerated.",

            createdBy:
                Role.TOURIST,

        });

        return {

            message:
                "OTP regenerated successfully.",

            pass:
                updatedPass,

        };

    }

    async regenerateQr(
        bookingId: string
    ) {

        const pass =
            await tripRepository.findTripPass(
                bookingId
            );

        if (!pass) {

            throw new Error(
                "Trip Pass not found."
            );

        }

        const qrToken =
            this.generateQrToken();

        const qrExpiresAt =
            new Date(
                Date.now() +
                24 *
                    60 *
                    60 *
                    1000
            );

        const updatedPass =
            await tripRepository.updateTripPass(

                bookingId,

                {

                    qrToken,

                    qrExpiresAt,

                }

            );

        await tripRepository.createTimeline({

            booking: {

                connect: {

                    id: bookingId,

                },

            },

            title:
                "QR Regenerated",

            description:
                "Trip QR has been regenerated.",

            createdBy:
                Role.TOURIST,

        });

        return {

            message:
                "QR regenerated successfully.",

            pass:
                updatedPass,

        };

    }   async verifyTripPass(
    bookingId: string,
    qrToken?: string,
    otp?: string
) {

    const pass =
        await tripRepository.findTripPass(
            bookingId
        );

    if (!pass) {

        throw new Error(
            "Trip Pass not found."
        );

    }

    if (
        qrToken &&
        pass.qrToken !== qrToken
    ) {

        throw new Error(
            "Invalid QR Token."
        );

    }

    if (
        otp &&
        pass.startOtp !== otp &&
        pass.completionOtp !== otp
    ) {

        throw new Error(
            "Invalid OTP."
        );

    }
    const trip =
    await tripRepository.getTripByBookingId(
        bookingId
    );

if (!trip) {

    throw new Error(
        "Trip not found."
    );

}

    if (
        qrToken &&
        otp &&
        pass.qrToken === qrToken &&
        pass.startOtp === otp
    ) {

        await tripRepository.updateTripStatus(

            bookingId,

            TripStatus.READY_TO_START

        );

        await tripRepository.createTimeline({

            booking: {

                connect: {

                    id: bookingId,

                },

            },

            title:
                "Verification Completed",

            description:
                "QR and OTP verified successfully.",

            createdBy:
                Role.HOTEL_OWNER,

        });

    }

if (qrToken) {

    await tripRepository.createVerification({

        booking: {

            connect: {

                id: bookingId,

            },

        },

        verificationType:
            TripVerificationType.QR,

        verificationStatus:
            TripVerificationStatus.VERIFIED,

        verifiedBy:
            Role.HOTEL_OWNER,

        verifiedAt:
            new Date(),

        qrToken,

    });

}

if (otp) {

    await tripRepository.createVerification({

        booking: {

            connect: {

                id: bookingId,

            },

        },

        verificationType:
            TripVerificationType.OTP,

        verificationStatus:
            TripVerificationStatus.VERIFIED,

        verifiedBy:
            Role.HOTEL_OWNER,

        verifiedAt:
            new Date(),

        otp,

    });

}

const qrVerified =
    trip.tripVerifications.some(

        verification =>

            verification.verificationType ===
            TripVerificationType.QR &&

            verification.verificationStatus ===
            TripVerificationStatus.VERIFIED

    ) || !!qrToken;

const otpVerified =
    trip.tripVerifications.some(

        verification =>

            verification.verificationType ===
            TripVerificationType.OTP &&

            verification.verificationStatus ===
            TripVerificationStatus.VERIFIED

    ) || !!otp;

if (

    qrVerified &&

    otpVerified &&

    trip.tripStatus !==
    TripStatus.READY_TO_START

) {

    await tripRepository.updateTripStatus(

        bookingId,

        TripStatus.READY_TO_START

    );

    await tripRepository.createTimeline({

        booking: {

            connect: {

                id: bookingId,

            },

        },

        title:
            "Verification Completed",

        description:
            "QR and OTP verified successfully.",

        createdBy:
            Role.HOTEL_OWNER,

    });

}

return {

    message:
        "Trip verification successful.",

    verified: true,

};

}

    async getHotelTrips(
        ownerId: string
    ) {

        const trips =
            await tripRepository.getHotelTrips(
                ownerId
            );

        return {

            message:
                "Hotel trips fetched successfully.",

            trips,

        };

    }
    async dismissHotelTrip(
    ownerId: string,
    bookingId: string
) {

    const trip =
        await tripRepository.getHotelTripById(

            bookingId,

            ownerId

        );

    if (!trip) {

        throw new Error(
            "Trip not found."
        );

    }

    await tripRepository.dismissHotelTrip(
        bookingId
    );

    return {

        message:
            "Trip removed from dashboard successfully.",

    };

}
    async getHotelTripDetails(
    ownerId: string,
    bookingId: string
) {

    const trip =
        await tripRepository.getHotelTripById(
            bookingId,
            ownerId
        );

    if (!trip) {

        throw new Error(
            "Trip not found."
        );

    }

    return {

        message:
            "Hotel trip fetched successfully.",

        trip,

    };

}

   async getGuideTrips(
    userId: string
) {

    const guide =
        await bookingRepository.findGuideByUserId(
            userId
        );

    if (!guide) {

        throw new Error(
            "Guide not found."
        );

    }

    const trips =
        await tripRepository.getGuideTrips(
            guide.id
        );

    return {

        message:
            "Guide trips fetched successfully.",

        trips,

    };

}
    async getGuideTripDetails(
    userId: string,
    bookingId: string
) {

    const guide =
        await bookingRepository.findGuideByUserId(
            userId
        );

    if (!guide) {

        throw new Error(
            "Guide not found."
        );

    }

    const trip =
        await tripRepository.getGuideTripById(

            bookingId,

            guide.id

        );

    if (!trip) {

        throw new Error(
            "Trip not found."
        );

    }

    return {

        message:
            "Guide trip fetched successfully.",

        trip,

    };

}

    async getDriverTrips(
    userId: string
) {

    const driver =
        await bookingRepository.findDriverByUserId(
            userId
        );

    if (!driver) {

        throw new Error(
            "Driver not found."
        );

    }

    const trips =
        await tripRepository.getDriverTrips(
            driver.id
        );

    return {

        message:
            "Driver trips fetched successfully.",

        trips,

    };

}
async getDriverTripDetails(
    userId: string,
    bookingId: string
) {

    const driver =
        await bookingRepository.findDriverByUserId(
            userId
        );

    if (!driver) {

        throw new Error(
            "Driver not found."
        );

    }

    const trip =
        await tripRepository.getDriverTripById(

            bookingId,

            driver.id

        );

    if (!trip) {

        throw new Error(
            "Trip not found."
        );

    }

    return {

        message:
            "Driver trip fetched successfully.",

        trip,

    };

}

    async getTripTimeline(
        userId: string,
        bookingId: string
    ) {

        const trip =
            await tripRepository.getTripById(
                bookingId,
                userId
            );

        if (!trip) {

            throw new Error(
                "Trip not found."
            );

        }

        return {

            message:
                "Trip timeline fetched successfully.",

            timeline:
                trip.tripTimeline,

        };

    }

}

export default new TripService();