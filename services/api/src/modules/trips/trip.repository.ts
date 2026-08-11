import prisma from "../../lib/prisma.js";

import {
    BookingStatus,
    PaymentStatus,
    Prisma,
    TripPass,
    TripTimeline,
    TripVerification,
    TripStatus,
} from "@travelmate/database";

class TripRepository {

    async getMyTrips(
        userId: string
    ) {
        return prisma.booking.findMany({
            where: {
                userId,
                paymentStatus:
                    PaymentStatus.PAID,
            },
            include: {
                items: {
                    include: {
                        room: {
                            include: {
                                roomType: {
                                    include: {
                                        hotel: true,
                                    },
                                },
                            },
                        },
                        guide: true,
                        driver: true,
                    },
                },
                payment: true,
                tripPass: true,
                tripTimeline: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getTripById(
        bookingId: string,
        userId: string
    ) {
        return prisma.booking.findFirst({
            where: {
                id: bookingId,
                userId,
            },
            include: {
                items: {
                    include: {
                        room: {
                            include: {
                                roomType: {
                                    include: {
                                        hotel: true,
                                    },
                                },
                            },
                        },
                        guide: true,
                        driver: true,
                    },
                },
                payment: true,
                tripPass: true,
                tripTimeline: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
                tripVerifications: true,
            },
        });
    }
    async getTripByBookingId(
    bookingId: string
) {
    return prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
        include: {
            items: true,
            tripVerifications: true,
            tripPass: true,
        },
    });
}

    async findTripPass(
        bookingId: string
    ) {
        return prisma.tripPass.findUnique({
            where: {
                bookingId,
            },
        });
    }

    async createTripPass(
        data: Prisma.TripPassCreateInput
    ): Promise<TripPass> {
        return prisma.tripPass.create({
            data,
        });
    }

    async updateTripPass(
        bookingId: string,
        data: Prisma.TripPassUpdateInput
    ): Promise<TripPass> {
        return prisma.tripPass.update({
            where: {
                bookingId,
            },
            data,
        });
    }

    async createTimeline(
        data: Prisma.TripTimelineCreateInput
    ): Promise<TripTimeline> {
        return prisma.tripTimeline.create({
            data,
        });
    }

    async createVerification(
        data: Prisma.TripVerificationCreateInput
    ): Promise<TripVerification> {
        return prisma.tripVerification.create({
            data,
        });
    }

    async updateVerification(
        id: string,
        data: Prisma.TripVerificationUpdateInput
    ): Promise<TripVerification> {
        return prisma.tripVerification.update({
            where: {
                id,
            },
            data,
        });
    }

    async updateTripStatus(
        bookingId: string,
        tripStatus: TripStatus
    ) {
        return prisma.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                tripStatus,
            },
        });
    }

    async updateBookingStatus(
        bookingId: string,
        status: BookingStatus
    ) {
        return prisma.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status,
            },
        });
    }

async getHotelTrips(
    ownerId: string
) {

    return prisma.booking.findMany({

       where: {

    hotelDismissed: false,

    items: {

                some: {

                    room: {

                        roomType: {

                            hotel: {

                                ownerId,

                            },

                        },

                    },

                },

            },

        },

        include: {

            user: {

                select: {

                    id: true,

                    firstName: true,

                    lastName: true,

                    email: true,

                    phone: true,

                    profileImage: true,

                },

            },

            items: {

    where: {

        bookingType: "HOTEL",

    },

    include: {

        room: {

            include: {

                roomType: {

                    include: {

                        hotel: true,

                    },

                },

            },

        },

    },

},

            tripPass: true,

            tripTimeline: {

                orderBy: {

                    createdAt: "asc",

                },

            },

            tripVerifications: true,

        },

        orderBy: {

            startDate: "asc",

        },

    });

}
async getGuideTrips(
    guideId: string
) {

    return prisma.booking.findMany({

        where: {

            items: {

                some: {

                    guideId,

                },

            },

        },

        include: {

            user: {

                select: {

                    id: true,

                    firstName: true,

                    lastName: true,

                    email: true,

                    phone: true,

                    profileImage: true,

                },

            },

            items: {

                where: {

                    bookingType: "GUIDE",

                },

                include: {

                    guide: true,

                },

            },

            tripPass: true,

            tripTimeline: {

                orderBy: {

                    createdAt: "asc",

                },

            },

            tripVerifications: true,

        },

        orderBy: {

            startDate: "asc",

        },

    });

}
    async getGuideTripById(
    bookingId: string,
    guideId: string
) {

    return prisma.booking.findFirst({

        where: {

            id: bookingId,

            items: {

                some: {

                    guideId,

                },

            },

        },

        include: {

            user: {

                select: {

                    id: true,

                    firstName: true,

                    lastName: true,

                    email: true,

                    phone: true,

                    profileImage: true,

                },

            },

            items: {

                where: {

                    bookingType: "GUIDE",

                },

                include: {

                    guide: true,

                },

            },

            tripPass: true,

            tripTimeline: {

                orderBy: {

                    createdAt: "asc",

                },

            },

            tripVerifications: true,

        },

    });

}

    async getDriverTrips(
    driverId: string
) {

    return prisma.booking.findMany({

        where: {

            items: {

                some: {

                    driverId,

                },

            },

        },

        include: {

            user: {

                select: {

                    id: true,

                    firstName: true,

                    lastName: true,

                    email: true,

                    phone: true,

                    profileImage: true,

                },

            },

            items: {

                where: {

                    bookingType: "DRIVER",

                },

                include: {

                    driver: true,

                },

            },

            tripPass: true,

            tripTimeline: {

                orderBy: {

                    createdAt: "asc",

                },

            },

            tripVerifications: true,

        },

        orderBy: {

            startDate: "asc",

        },

    });

}
async getDriverTripById(
    bookingId: string,
    driverId: string
) {

    return prisma.booking.findFirst({

        where: {

            id: bookingId,

            items: {

                some: {

                    driverId,

                },

            },

        },

        include: {

            user: {

                select: {

                    id: true,

                    firstName: true,

                    lastName: true,

                    email: true,

                    phone: true,

                    profileImage: true,

                },

            },

            items: {

                where: {

                    bookingType: "DRIVER",

                },

                include: {

                    driver: true,

                },

            },

            tripPass: true,

            tripTimeline: {

                orderBy: {

                    createdAt: "asc",

                },

            },

            tripVerifications: true,

        },

    });

}
    async getHotelTripById(
    bookingId: string,
    ownerId: string
) {

    return prisma.booking.findFirst({

        where: {

    id: bookingId,

    hotelDismissed: false,

    items: {

                some: {

                    room: {

                        roomType: {

                            hotel: {

                                ownerId,

                            },

                        },

                    },

                },

            },

        },

        include: {

            user: {

                select: {

                    id: true,

                    firstName: true,

                    lastName: true,

                    email: true,

                    phone: true,

                    profileImage: true,

                },

            },

            items: {

    where: {

        bookingType: "HOTEL",

    },

    include: {

        room: {

            include: {

                roomType: {

                    include: {

                        hotel: true,

                    },

                },

            },

        },

    },

},

            tripPass: true,

            tripTimeline: {

                orderBy: {

                    createdAt: "asc",

                },

            },

            tripVerifications: true,

        },

    });

}
async dismissHotelTrip(
    bookingId: string
) {

    return prisma.booking.update({

        where: {

            id: bookingId,

        },

        data: {

            hotelDismissed: true,

        },

    });

}
async updateBookingItem(
    bookingItemId: string,
    data: Prisma.BookingItemUpdateInput
) {

    return prisma.bookingItem.update({

        where: {

            id: bookingItemId,

        },

        data,

    });

}

async updateRoom(
    roomId: string,
    data: Prisma.RoomUpdateInput
) {

    return prisma.room.update({

        where: {

            id: roomId,

        },

        data,

    });

}

}

export default new TripRepository();