import prisma from "../../lib/prisma.js";
import { Prisma, Booking } from "@prisma/client";

class BookingRepository {

    // ==================================================
    // CART
    // ==================================================

    async findCartByUserId(
        userId: string
    ) {

        return prisma.tripCart.findUnique({

            where: {
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

        requests: {

            select: {

                id: true,

            },

            where: {

                status: "ACCEPTED",

            },

            take: 1,

        },

    },

    orderBy: {

        createdAt: "asc",

    },

},

            },

        });

    }


async createCart(
    data: Prisma.TripCartCreateInput
) {

    return prisma.tripCart.create({

        data,

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

    requests: {

        select: {

            id: true,

        },

        where: {

            status: "ACCEPTED",

        },

        take: 1,

    },

},

                orderBy: {

                    createdAt: "asc",

                },

            },

        },

    });

}

    async updateCart(
        id: string,
        data: Prisma.TripCartUpdateInput
    ) {

        return prisma.tripCart.update({

            where: {

                id,

            },

            data,

        });

    }


    async addCartItem(
        data: Prisma.TripCartItemCreateInput
    ) {

        return prisma.tripCartItem.create({

            data,

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

    requests: {

        select: {

            id: true,

        },

        where: {

            status: "ACCEPTED",

        },

        take: 1,

    },

},

        });

    }


    async updateCartItem(
        id: string,
        data: Prisma.TripCartItemUpdateInput
    ) {

        return prisma.tripCartItem.update({

            where: {

                id,

            },

            data,

        });

    }


    async removeCartItem(
        id: string
    ) {

        return prisma.tripCartItem.delete({

            where: {

                id,

            },

        });

    }


    async findCartItemById(
        id: string
    ) {

        return prisma.tripCartItem.findUnique({

            where: {

                id,

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

                guide: true,

                driver: true,

                cart: true,

            },

        });

    }    // ==================================================
    // BOOKING REQUESTS
    // ==================================================

    async createBookingRequest(
        data: Prisma.BookingRequestCreateInput
    ) {

        return prisma.bookingRequest.create({

            data,

            include: {

                tourist: true,

                guide: true,

                driver: true,

                cartItem: true,

            },

        });

    }


    async findBookingRequestById(
        id: string
    ) {

        return prisma.bookingRequest.findUnique({

            where: {

                id,

            },

            include: {

                tourist: true,

                guide: true,

                driver: true,

                cartItem: {

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

            },

        });

    }


    async getGuideBookingRequests(
        guideId: string
    ) {

        return prisma.bookingRequest.findMany({

           where: {

    guideId,

    hiddenForGuide: false,

},

            include: {

    tourist: true,

    guide: true,

    cartItem: {

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

},

orderBy: {

    createdAt: "desc",

},

        });

    }


    async getDriverBookingRequests(
        driverId: string
    ) {

        return prisma.bookingRequest.findMany({

           where: {

    driverId,

    hiddenForDriver: false,

},

            include: {

    tourist: true,

    guide: true,

    cartItem: {

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

},

orderBy: {

    createdAt: "desc",

},

        });

    }


    async updateBookingRequest(
        id: string,
        data: Prisma.BookingRequestUpdateInput
    ) {

        return prisma.bookingRequest.update({

            where: {

                id,

            },

            data,

        });

    }


    async findPendingGuideRequest(
        guideId: string
    ) {

        return prisma.bookingRequest.findMany({

            where: {

                guideId,

                status: "PENDING",

            },

            orderBy: {

                requestedAt: "asc",

            },

        });

    }


    async findPendingDriverRequest(
        driverId: string
    ) {

        return prisma.bookingRequest.findMany({

            where: {

                driverId,

                status: "PENDING",

            },

            orderBy: {

                requestedAt: "asc",

            },

        });

    }    // ==================================================
    // BOOKINGS
    // ==================================================

    async createBooking(
        data: Prisma.BookingCreateInput
    ): Promise<Booking> {

        return prisma.booking.create({

            data,

            include: {

                user: true,

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

                        cartItem: true,

                    },

                },

                payment: true,

            },

        });

    }


    async createBookingItem(
        data: Prisma.BookingItemCreateInput
    ) {

        return prisma.bookingItem.create({

            data,

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

                cartItem: true,

            },

        });

    }


    async findBookingById(
        id: string
    ) {

        return prisma.booking.findUnique({

            where: {

                id,

            },

            include: {

                user: true,

                cart: true,

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

                        cartItem: true,

                    },

                },

                payment: true,

            },

        });

    }


    async findBookingByBookingNumber(
        bookingNumber: string
    ) {

        return prisma.booking.findUnique({

            where: {

                bookingNumber,

            },

            include: {

                user: true,

                cart: true,

                items: true,

                payment: true,

            },

        });

    }


    async findBookingsByUser(
        userId: string
    ) {

        return prisma.booking.findMany({

            where: {

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

            },

            orderBy: {

                createdAt: "desc",

            },

        });

    }

async getDriverEarnings(
    driverId: string
) {

    return prisma.bookingItem.findMany({

        where: {

            driverId,

            bookingType: "DRIVER",

            paymentStatus: "PAID",

        },

        include: {

            booking: {

                select: {

                    id: true,

                    bookingNumber: true,

                    startDate: true,

                    endDate: true,

                    paymentStatus: true,

                    status: true,

                    createdAt: true,

                },

            },

            driver: {

                select: {

                    id: true,

                    fullName: true,

                },

            },

        },

        orderBy: {

            createdAt: "desc",

        },

    });

}
    async getAllBookings() {

        return prisma.booking.findMany({

            include: {

                user: true,

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

            },

            orderBy: {

                createdAt: "desc",

            },

        });

    }


    async updateBooking(
        id: string,
        data: Prisma.BookingUpdateInput
    ) {

        return prisma.booking.update({

            where: {

                id,

            },

            data,

        });

    }


    async updateBookingItem(
        id: string,
        data: Prisma.BookingItemUpdateInput
    ) {

        return prisma.bookingItem.update({

            where: {

                id,

            },

            data,

        });

    }


    async deleteBooking(
        id: string
    ) {

        return prisma.booking.delete({

            where: {

                id,

            },

        });

    }    // ==================================================
    // PAYMENTS
    // ==================================================

    async createPayment(
        data: Prisma.PaymentCreateInput
    ) {

        return prisma.payment.create({

            data,

        });

    }


    async findPaymentByBookingId(
        bookingId: string
    ) {

        return prisma.payment.findUnique({

            where: {

                bookingId,

            },

        });

    }


    async updatePayment(
        id: string,
        data: Prisma.PaymentUpdateInput
    ) {

        return prisma.payment.update({

            where: {

                id,

            },

            data,

        });

    }


    // ==================================================
    // LOOKUPS
    // ==================================================

    async findRoomById(
        id: string
    ) {

        return prisma.room.findUnique({

            where: {

                id,

            },

            include: {

                roomType: {

                    include: {

                        hotel: true,

                    },

                },

            },

        });

    }
async findAvailableRoomByRoomType(
    roomTypeId: string,
    checkIn: Date,
    checkOut: Date
) {

    const rooms =
        await prisma.room.findMany({

            where: {

                roomTypeId,

                status: "AVAILABLE",

            },

            include: {

                roomType: {

                    include: {

                        hotel: true,

                    },

                },

            },

            orderBy: {

                createdAt: "asc",

            },

        });

    for (const room of rooms) {

        const conflict =
            await this.findRoomBookingConflict(
                room.id,
                checkIn,
                checkOut
            );

        if (!conflict) {

            return room;

        }

    }

    return null;

}

    async findGuideById(
        id: string
    ) {

        return prisma.guide.findUnique({

            where: {

                id,

            },

            include: {

                user: true,

            },

        });

    }
    async findGuideByUserId(
    userId: string
) {

    return prisma.guide.findUnique({

        where: {

            userId,

        },

    });

}

    async findDriverById(
        id: string
    ) {

        return prisma.driver.findUnique({

            where: {

                id,

            },

            include: {

                user: true,

            },

        });

    }
async findDriverByUserId(
    userId: string
) {

    return prisma.driver.findUnique({

        where: {

            userId,

        },

    });

}

    // ==================================================
    // AVAILABILITY
    // ==================================================

    async findRoomBookingConflict(
        roomId: string,
        checkIn: Date,
        checkOut: Date
    ) {

        return prisma.bookingItem.findFirst({

            where: {

                roomId,

                status: {

                    in: [
                        "ACCEPTED",
                        "CONFIRMED",
                        "PAYMENT_PENDING",
                        "COMPLETED",
                    ],

                },

                checkIn: {

                    lt: checkOut,

                },

                checkOut: {

                    gt: checkIn,

                },

            },

        });

    }


    async findGuideBookingConflict(
    guideId: string
) {

    return prisma.bookingRequest.findFirst({

        where: {

            guideId,

            status: {

                in: [
                    "PENDING",
                    "ACCEPTED",
                ],

            },

        },

        include: {

            cartItem: true,

        },

    });

}

async findDriverBookingConflict(
    driverId: string
) {

    return prisma.bookingRequest.findFirst({

        where: {

            driverId,

            status: {

                in: [
                    "PENDING",
                    "ACCEPTED",
                ],

            },

        },

        include: {

            cartItem: true,

        },

    });

}
    async findCartById(
        id: string
    ) {

        return prisma.tripCart.findUnique({

            where: {

                id,

            },

            include: {

                items: true,

            },

        });

    }


    async findBookingItemById(
        id: string
    ) {

        return prisma.bookingItem.findUnique({

            where: {

                id,

            },

            include: {

                booking: true,

                room: true,

                guide: true,

                driver: true,

                cartItem: true,

            },

        });

    }
    async hideGuideRequest(
    requestId: string
) {

    return prisma.bookingRequest.update({

        where: {

            id: requestId,

        },

        data: {

            hiddenForGuide: true,

        },

    });

}

async hideDriverRequest(
    requestId: string
) {

    return prisma.bookingRequest.update({

        where: {

            id: requestId,

        },

        data: {

            hiddenForDriver: true,

        },

    });

}
async findBookingItemByCartItemId(
    cartItemId: string
) {

    return prisma.bookingItem.findFirst({

        where: {

            cartItemId,

        },

    });

}

}

export default new BookingRepository();