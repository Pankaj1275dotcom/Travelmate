import bookingRepository from "./booking.repository.js";
import tripService from "../trips/trip.service.js";
import {
    CreateHotelBookingDto,
    CreateGuideBookingDto,
    CreateDriverBookingDto,
} from "./booking.types.js";

class BookingService {

    async getOrCreateCart(
        userId: string
    ) {

        let cart =
            await bookingRepository.findCartByUserId(
                userId
            );

        if (!cart) {

            cart =
                await bookingRepository.createCart({

                    user: {

                        connect: {

                            id: userId,

                        },

                    },

                });

        }

        return cart;

    }
    private async updateCartTotals(
    cartId: string
) {
    const cart =
        await bookingRepository.findCartById(
            cartId
        );

    if (!cart) {
        return;
    }

    const totalAmount =
        cart.items.reduce(
            (sum, item) =>
                sum +
                Number(item.totalPrice),
            0
        );

   
    const platformFee =
        Number(
            (
                totalAmount * 0.05
            ).toFixed(2)
        );

    /*
     * Tourist pays only the booking amount.
     */
    const payableAmount =
        totalAmount;

    await bookingRepository.updateCart(
        cart.id,
        {
            totalAmount,
            platformFee,
            payableAmount,
        }
    );
}private getGuideRequestedHours(
    startTime: string,
    endTime: string
) {

    const [startHour, startMinute] =
        startTime.split(":").map(Number);

    const [endHour, endMinute] =
        endTime.split(":").map(Number);

    const start =
        startHour * 60 + startMinute;

    const end =
        endHour * 60 + endMinute;

    if (end <= start) {

        throw new Error(
            "End time must be after start time."
        );

    }

    const hours =
        (end - start) / 60;

    if (hours > 6) {

        throw new Error(
            "Guide can be booked for a maximum of 6 hours per day."
        );

    }

    return hours;

}

private getGuideBookingDays(
    startDate: Date,
    endDate: Date
) {

    const diff =
        endDate.getTime() -
        startDate.getTime();

    const days =
        Math.floor(
            diff /
                (1000 * 60 * 60 * 24)
        ) + 1;

    if (days <= 0) {

        throw new Error(
            "Invalid booking dates."
        );

    }

    return days;

}
private getDriverRequestedHours(
    startTime: string,
    endTime: string
) {

    const [startHour, startMinute] =
        startTime.split(":").map(Number);

    const [endHour, endMinute] =
        endTime.split(":").map(Number);

    const start =
        startHour * 60 + startMinute;

    const end =
        endHour * 60 + endMinute;

    if (end <= start) {

        throw new Error(
            "End time must be after start time."
        );

    }

    return (end - start) / 60;

}

private getDriverBookingDays(
    startDate: Date,
    endDate: Date
) {

    const diff =
        endDate.getTime() -
        startDate.getTime();

    const days =
        Math.floor(
            diff /
            (1000 * 60 * 60 * 24)
        ) + 1;

    if (days <= 0) {

        throw new Error(
            "Invalid booking dates."
        );

    }

    return days;

}

    async addHotelToCart(
    userId: string,
    data: CreateHotelBookingDto
) {

    const room =
        await bookingRepository.findAvailableRoomByRoomType(
            data.roomTypeId,
            data.checkIn,
            data.checkOut
        );

    if (!room) {
        throw new Error(
            "No rooms available for the selected dates."
        );
    }

    const cart =
        await this.getOrCreateCart(
            userId
        );

    const nights =
        Math.ceil(
            (
                data.checkOut.getTime() -
                data.checkIn.getTime()
            ) /
            (1000 * 60 * 60 * 24)
        );

    if (nights <= 0) {
        throw new Error(
            "Invalid booking dates"
        );
    }

    const unitPrice =
        Number(
            room.roomType.pricePerNight
        );

    const totalPrice =
        unitPrice * nights;

    const item =
        await bookingRepository.addCartItem({

            cart: {

                connect: {

                    id: cart.id,

                },

            },

            bookingType:
                "HOTEL",

            room: {

                connect: {

                    id: room.id,

                },

            },

            checkIn:
                data.checkIn,

            checkOut:
                data.checkOut,

            quantity:
                nights,

            unitPrice,

            totalPrice,

        });

    await this.updateCartTotals(
        cart.id
    );

    return {

        message:
            "Hotel added to cart successfully",

        item,

    };

}
async addGuideToCart(
    userId: string,
    data: CreateGuideBookingDto
) {

    const guide =
        await bookingRepository.findGuideById(
            data.guideId
        );

    if (!guide) {

        throw new Error(
            "Guide not found"
        );

    }

    if (!guide.isAvailable) {

        throw new Error(
            "Guide is not available"
        );

    }

    const cart =
        await this.getOrCreateCart(
            userId
        );

    const requestedHours =
        this.getGuideRequestedHours(
            data.startTime,
            data.endTime
        );

    const totalDays =
        this.getGuideBookingDays(
            data.startDate,
            data.endDate
        );

    const unitPrice =
        Number(
            guide.pricePerDay
        );

    const totalPrice =
        unitPrice * totalDays;

    const requestSentAt =
        new Date();

    const requestExpiresAt =
        new Date(
            requestSentAt.getTime() +
            30 * 60 * 1000
        );

    const item =
        await bookingRepository.addCartItem({

            cart: {

                connect: {

                    id: cart.id,

                },

            },

            bookingType:
                "GUIDE",

            guide: {

                connect: {

                    id: guide.id,

                },

            },

            guideStartDate:
                data.startDate,

            guideEndDate:
                data.endDate,

            guideStartTime:
                data.startTime,

            guideEndTime:
                data.endTime,

            guideRequestedHours:
                requestedHours,

            quantity:
                totalDays,

            unitPrice,

            totalPrice,

            requestStatus:
                "PENDING",

            requestSentAt,

            requestExpiresAt,

            notes:
                data.specialRequest,

        });

    await this.updateCartTotals(
        cart.id
    );

    await bookingRepository.createBookingRequest({

        cartItem: {

            connect: {

                id: item.id,

            },

        },

        tourist: {

            connect: {

                id: userId,

            },

        },

        providerType:
            "GUIDE",

        guide: {

            connect: {

                id: guide.id,

            },

        },

        status:
            "PENDING",

        requestedAt:
            requestSentAt,

        expiresAt:
            requestExpiresAt,

    });

    return {

        message:
            "Guide request sent successfully.",

        item,

    };

}

async addDriverToCart(
    userId: string,
    data: CreateDriverBookingDto
) {

    const driver =
        await bookingRepository.findDriverById(
            data.driverId
        );

    if (!driver) {

        throw new Error(
            "Driver not found"
        );

    }

    if (!driver.isAvailable) {

        throw new Error(
            "Driver is not available"
        );

    }

    const cart =
        await this.getOrCreateCart(
            userId
        );

    const requestedHours =
        this.getDriverRequestedHours(
            data.startTime,
            data.endTime
        );

    const totalDays =
        this.getDriverBookingDays(
            data.startDate,
            data.endDate
        );

    const unitPrice =
        Number(
            driver.pricePerDay
        );

    /*
     * Version 1 Pricing
     * -----------------
     * Daily package price × total days.
     *
     * Package includes up to 5 driving
     * hours/day.
     *
     * Any additional driving hours are
     * settled directly with the driver.
     */
    const totalPrice =
        unitPrice *
        totalDays;

    const requestSentAt =
        new Date();

    const requestExpiresAt =
        new Date(
            requestSentAt.getTime() +
            30 * 60 * 1000
        );

    const item =
        await bookingRepository.addCartItem({
            
            cart: {

                connect: {

                    id: cart.id,

                },

            },

            bookingType:
                "DRIVER",

            driver: {

                connect: {

                    id: driver.id,

                },

            },

driverStartDate:
    data.startDate,

driverEndDate:
    data.endDate,

driverStartTime:
    data.startTime,

driverEndTime:
    data.endTime,

driverRequestedHours:
    requestedHours,
            

            quantity:
                totalDays,

            unitPrice,

            totalPrice,

            requestStatus:
                "PENDING",

            requestSentAt,

            requestExpiresAt,

            notes:
                data.specialRequest,

        });

    await this.updateCartTotals(
        cart.id
    );

    await bookingRepository.createBookingRequest({

        cartItem: {

            connect: {

                id: item.id,

            },

        },

        tourist: {

            connect: {

                id: userId,

            },

        },

        providerType:
            "DRIVER",

        driver: {

            connect: {

                id: driver.id,

            },

        },

        status:
            "PENDING",

        requestedAt:
            requestSentAt,

        expiresAt:
            requestExpiresAt,

    });

    return {

        message:
            "Driver request sent successfully",

        item,

    };

}

    async getMyCart(
        userId: string
    ) {

        const cart =
            await bookingRepository.findCartByUserId(
                userId
            );

        if (!cart) {

            return {

                items: [],

                totalAmount: 0,

                platformFee: 0,

                payableAmount: 0,

            };

        }

        return cart;

    }


    async removeCartItem(
        userId: string,
        itemId: string
    ) {

        const cart =
            await bookingRepository.findCartByUserId(
                userId
            );

        if (!cart) {
            throw new Error(
                "Cart not found"
            );
        }

        const item =
            await bookingRepository.findCartItemById(
                itemId
            );

        if (!item) {
            throw new Error(
                "Cart item not found"
            );
        }

        if (item.cartId !== cart.id) {
            throw new Error(
                "Unauthorized cart item"
            );
        }

await bookingRepository.removeCartItem(
    itemId
);

await this.updateCartTotals(
    cart.id
);

return {

    message:
        "Item removed from cart successfully",

};

    }


    async clearCart(
        userId: string
    ) {

        const cart =
            await bookingRepository.findCartByUserId(
                userId
            );

        if (!cart) {

            return {

                message:
                    "Cart is already empty",

            };

        }

        for (const item of cart.items) {

            await bookingRepository.removeCartItem(
                item.id
            );

        }

        await bookingRepository.updateCart(
            cart.id,
            {

                totalAmount: 0,

                platformFee: 0,

                payableAmount: 0,

                isCheckedOut: false,

                checkedOutAt: null,

            }

        );

        return {

            message:
                "Cart cleared successfully",

        };

    }


    async checkoutCart(
        userId: string
    ) {

        const cart =
            await bookingRepository.findCartByUserId(
                userId
            );

        if (!cart) {
            throw new Error(
                "Cart not found"
            );
        }

        if (cart.items.length === 0) {
            throw new Error(
                "Cart is empty"
            );
        }

        return cart;

    }


async createBookingFromCart(
    userId: string
) {

    const cart =
        await bookingRepository.findCartByUserId(
            userId
        );

    if (!cart) {
        throw new Error(
            "Cart not found"
        );
    }

    if (cart.items.length === 0) {
        throw new Error(
            "Cart is empty"
        );
    }

    const bookingNumber =
        `TM-${Date.now()}`;

    let startDate = new Date();

    let endDate = new Date();

    const hotelItem =
        cart.items.find(
            (item) =>
                item.bookingType ===
                "HOTEL"
        );

    if (
        hotelItem?.checkIn &&
        hotelItem?.checkOut
    ) {

        startDate =
            hotelItem.checkIn;

        endDate =
            hotelItem.checkOut;

    } else {

        const guideItem =
            cart.items.find(
                (item) =>
                    item.bookingType ===
                    "GUIDE"
            );

        if (
            guideItem?.guideStartDate &&
            guideItem?.guideEndDate
        ) {

            startDate =
                guideItem.guideStartDate;

            endDate =
                guideItem.guideEndDate;

        }

    }

    const booking =
        await bookingRepository.createBooking({

            bookingNumber,

            user: {

                connect: {

                    id: userId,

                },

            },

            cart: {

                connect: {

                    id: cart.id,

                },

            },

            totalAmount:
                cart.totalAmount,

            platformFee:
                cart.platformFee,

            payableAmount:
                cart.payableAmount,

            adults: 1,

            children: 0,

            startDate,

            endDate,

            paymentStatus:
                "PENDING",

            status:
                "PENDING",

        });

    for (const item of cart.items) {

       const platformFee =
    Number(item.totalPrice) * 0.05;

const providerAmount =
    Number(item.totalPrice) -
    platformFee;

        await bookingRepository.createBookingItem({

            booking: {

                connect: {

                    id: booking.id,

                },

            },

            bookingType:
                item.bookingType,

            room:
                item.roomId
                    ? {
                          connect: {
                              id: item.roomId,
                          },
                      }
                    : undefined,

            guide:
                item.guideId
                    ? {
                          connect: {
                              id: item.guideId,
                          },
                      }
                    : undefined,

            driver:
                item.driverId
                    ? {
                          connect: {
                              id: item.driverId,
                          },
                      }
                    : undefined,

            cartItem: {

                connect: {

                    id: item.id,

                },

            },

            // -------------------------
            // Hotel
            // -------------------------
            checkIn:
                item.checkIn,

            checkOut:
                item.checkOut,

            // -------------------------
            // Guide
            // -------------------------
            guideStartDate:
                item.guideStartDate,

            guideEndDate:
                item.guideEndDate,

            guideStartTime:
                item.guideStartTime,

            guideEndTime:
                item.guideEndTime,

            guideRequestedHours:
                item.guideRequestedHours,

            // -------------------------
            // Driver
            // -------------------------
            driverStartDate:
                item.driverStartDate,

            driverEndDate:
                item.driverEndDate,

            driverStartTime:
                item.driverStartTime,

            driverEndTime:
                item.driverEndTime,
            driverRequestedHours:
    item.driverRequestedHours,

            quantity:
                item.quantity,

            unitPrice:
                item.unitPrice,

            totalPrice:
                item.totalPrice,

           platformFee,

providerAmount,

            paymentStatus:
                "PENDING",

            status:
                "PENDING",

        });

    }

    await bookingRepository.createPayment({

    booking: {

        connect: {

            id: booking.id,

        },

    },

    amount:
        cart.totalAmount,

    platformFee:
        cart.platformFee,

    providerAmount:
        Number(cart.totalAmount) -
        Number(cart.platformFee),

    method:
        "RAZORPAY",

    status:
        "PENDING",

});

    await bookingRepository.updateCart(
        cart.id,
        {

            isCheckedOut:
                true,

            checkedOutAt:
                new Date(),

        }
    );

    return {

        message:
            "Booking created successfully",

        booking,

    };

}


    async getBookingById(
        id: string
    ) {

        const booking =
            await bookingRepository.findBookingById(
                id
            );

        if (!booking) {
            throw new Error(
                "Booking not found"
            );
        }

        return booking;

    }


    async getBookingByNumber(
        bookingNumber: string
    ) {

        const booking =
            await bookingRepository.findBookingByBookingNumber(
                bookingNumber
            );

        if (!booking) {
            throw new Error(
                "Booking not found"
            );
        }

        return booking;

    }


    async getMyBookings(
        userId: string
    ) {

        return bookingRepository.findBookingsByUser(
            userId
        );

    }


    async getAllBookings() {

        return bookingRepository.getAllBookings();

    }
    async getDriverEarnings(
    userId: string
) {

    const driver =
        await bookingRepository.findDriverByUserId(
            userId
        );

    if (!driver) {

        throw new Error(
            "Driver profile not found."
        );

    }

    const earnings =
        await bookingRepository.getDriverEarnings(
            driver.id
        );

    const totalGross =
        earnings.reduce(
            (sum, item) =>
                sum +
                Number(item.totalPrice),
            0
        );

    const totalPlatformFee =
        earnings.reduce(
            (sum, item) =>
                sum +
                Number(item.platformFee),
            0
        );

    const totalEarnings =
        earnings.reduce(
            (sum, item) =>
                sum +
                Number(item.providerAmount),
            0
        );

    return {

        summary: {

            totalGross:
                Number(
                    totalGross.toFixed(2)
                ),

            totalPlatformFee:
                Number(
                    totalPlatformFee.toFixed(2)
                ),

            totalEarnings:
                Number(
                    totalEarnings.toFixed(2)
                ),

            completedBookings:
                earnings.length,

        },

        earnings,

    };

}
async getGuideBookingRequests(
    userId: string
) {

    const guide =
        await bookingRepository.findGuideByUserId(
            userId
        );

    if (!guide) {

        throw new Error(
            "Guide profile not found."
        );

    }

    const requests =
        await bookingRepository.getGuideBookingRequests(
            guide.id
        );

    for (const request of requests) {

        if (

            request.status === "PENDING" &&

            request.expiresAt.getTime() <=
            Date.now()

        ) {

            await bookingRepository.updateBookingRequest(
                request.id,
                {

                    status:
                        "REJECTED",

                    rejectionReason:
                        "Request expired",

                    respondedAt:
                        new Date(),

                }
            );

            await bookingRepository.updateCartItem(
                request.cartItemId,
                {

                    requestStatus:
                        "REJECTED",

                    rejectionReason:
                        "Request expired",

                }
            );

            request.status =
                "REJECTED";

            request.rejectionReason =
                "Request expired";

        }

    }

    return requests;

}

async getDriverBookingRequests(
    userId: string
) {

    const driver =
        await bookingRepository.findDriverByUserId(
            userId
        );

    if (!driver) {

        throw new Error(
            "Driver profile not found."
        );

    }

    const requests =
        await bookingRepository.getDriverBookingRequests(
            driver.id
        );

    for (const request of requests) {

        if (

            request.status === "PENDING" &&

            request.expiresAt.getTime() <= Date.now()

        ) {

            await bookingRepository.updateBookingRequest(
                request.id,
                {

                    status: "REJECTED",

                    rejectionReason:
                        "Request expired",

                    respondedAt:
                        new Date(),

                }
            );

            await bookingRepository.updateCartItem(
                request.cartItemId,
                {

                    requestStatus:
                        "REJECTED",

                    rejectionReason:
                        "Request expired",

                }
            );

            request.status =
                "REJECTED";

            request.rejectionReason =
                "Request expired";

        }

    }

    return requests;

}
async acceptBookingRequest(
    requestId: string,
    userId: string
) {

    const request =
        await bookingRepository.findBookingRequestById(
            requestId
        );

    if (!request) {

        throw new Error(
            "Booking request not found"
        );

    }

    if (
        request.status !== "PENDING"
    ) {

        throw new Error(
            "Request has already been processed."
        );

    }

    if (

        request.expiresAt.getTime() <=
        Date.now()

    ) {

        await bookingRepository.updateBookingRequest(
            request.id,
            {

                status:
                    "REJECTED",

                rejectionReason:
                    "Request expired",

                respondedAt:
                    new Date(),

            }
        );

        await bookingRepository.updateCartItem(
            request.cartItemId,
            {

                requestStatus:
                    "REJECTED",

                rejectionReason:
                    "Request expired",

            }
        );

        throw new Error(
            "Request has expired."
        );

    }

    /*
     * Only the assigned provider
     * can accept this request.
     */
    if (
        request.providerType ===
        "GUIDE"
    ) {

        const guide =
            await bookingRepository.findGuideByUserId(
                userId
            );

        if (
            !guide ||
            request.guideId !==
                guide.id
        ) {

            throw new Error(
                "Unauthorized request."
            );

        }

    }

    if (
        request.providerType ===
        "DRIVER"
    ) {

        const driver =
            await bookingRepository.findDriverByUserId(
                userId
            );

        if (
            !driver ||
            request.driverId !==
                driver.id
        ) {

            throw new Error(
                "Unauthorized request."
            );

        }

    }

    const respondedAt =
    new Date();

const paymentDueAt =
    new Date(
        respondedAt.getTime() +
        30 * 60 * 1000
    );

await bookingRepository.updateBookingRequest(
    request.id,
    {
        status: "ACCEPTED",
        respondedAt,
        paymentDeadline: paymentDueAt,
    }
);

await bookingRepository.updateCartItem(
    request.cartItemId,
    {
        requestStatus: "ACCEPTED",
        acceptedAt: respondedAt,
        paymentDueAt,
    }
);
    return {

        message:
            "Booking request accepted successfully.",

    };

}

async rejectBookingRequest(
    requestId: string,
    userId: string,
    reason: string
) {

    const request =
        await bookingRepository.findBookingRequestById(
            requestId
        );

    if (!request) {

        throw new Error(
            "Booking request not found"
        );

    }

    if (request.status !== "PENDING") {

        throw new Error(
            "Request has already been processed."
        );

    }

    /*
     * Only the assigned provider
     * can reject this request.
     */
    if (
        request.providerType ===
        "GUIDE"
    ) {

        const guide =
            await bookingRepository.findGuideByUserId(
                userId
            );

        if (
            !guide ||
            request.guideId !==
                guide.id
        ) {

            throw new Error(
                "Unauthorized request."
            );

        }

    }

    if (
        request.providerType ===
        "DRIVER"
    ) {

        const driver =
            await bookingRepository.findDriverByUserId(
                userId
            );

        if (
            !driver ||
            request.driverId !==
                driver.id
        ) {

            throw new Error(
                "Unauthorized request."
            );

        }

    }

    const respondedAt =
        new Date();

    await bookingRepository.updateBookingRequest(
        request.id,
        {

            status:
                "REJECTED",

            respondedAt,

            rejectionReason:
                reason,

        }
    );
    

    await bookingRepository.updateCartItem(
        request.cartItemId,
        {

            requestStatus:
                "REJECTED",

            rejectionReason:
                reason,

        }
    );

    return {

        message:
            "Booking request rejected successfully.",

    };

}
async expireBookingRequest(
    requestId: string,
    userId: string
) {

    const request =
        await bookingRepository.findBookingRequestById(
            requestId
        );

    if (!request) {

        throw new Error(
            "Booking request not found."
        );

    }

    if (
        request.status !== "ACCEPTED"
    ) {

        return {

            message:
                "Request already processed.",

        };

    }

    // Only the tourist who owns the booking
    // can expire the payment timer.
    if (
        request.touristId !== userId
    ) {

        throw new Error(
            "Unauthorized request."
        );

    }

    await bookingRepository.updateBookingRequest(
        request.id,
        {

            status:
                "PAYMENT_EXPIRED",

        }
    );

    await bookingRepository.updateCartItem(
        request.cartItemId,
        {

            requestStatus:
                "PAYMENT_EXPIRED",

        }
    );

    return {

        message:
            "Payment expired.",

    };

}
async removeGuideRequest(
    requestId: string,
    userId: string
) {

    const guide =
        await bookingRepository.findGuideByUserId(
            userId
        );

    if (!guide) {

        throw new Error(
            "Guide profile not found."
        );

    }

    const request =
        await bookingRepository.findBookingRequestById(
            requestId
        );

    if (!request) {

        throw new Error(
            "Booking request not found."
        );

    }

    if (
        request.guideId !==
        guide.id
    ) {

        throw new Error(
            "Unauthorized request."
        );

    }

    await bookingRepository.hideGuideRequest(
        requestId
    );

    return {

        message:
            "Request removed successfully.",

    };

}

async removeDriverRequest(
    requestId: string,
    userId: string
) {

    const driver =
        await bookingRepository.findDriverByUserId(
            userId
        );

    if (!driver) {

        throw new Error(
            "Driver profile not found."
        );

    }

    const request =
        await bookingRepository.findBookingRequestById(
            requestId
        );

    if (!request) {

        throw new Error(
            "Booking request not found."
        );

    }

    if (
        request.driverId !==
        driver.id
    ) {

        throw new Error(
            "Unauthorized request."
        );

    }

    await bookingRepository.hideDriverRequest(
        requestId
    );

    return {

        message:
            "Request removed successfully.",

    };

}


    async cancelBooking(
        bookingId: string,
        reason?: string
    ) {

        const booking =
            await bookingRepository.findBookingById(
                bookingId
            );

        if (!booking) {
            throw new Error(
                "Booking not found"
            );
        }

        if (
            booking.status ===
            "COMPLETED"
        ) {
            throw new Error(
                "Completed booking cannot be cancelled"
            );
        }

        await bookingRepository.updateBooking(
            booking.id,
            {

                status:
                    "CANCELLED",

                cancelledAt:
                    new Date(),

                cancellationReason:
                    reason,

            }
        );

        for (const item of booking.items) {

            await bookingRepository.updateBookingItem(
                item.id,
                {

                    status:
                        "CANCELLED",

                    cancelledAt:
                        new Date(),

                    cancellationReason:
                        reason,

                }
            );

        }

        return {

            message:
                "Booking cancelled successfully",

        };

    }


    async confirmBooking(
        bookingId: string
    ) {

        const booking =
            await bookingRepository.findBookingById(
                bookingId
            );

        if (!booking) {
            throw new Error(
                "Booking not found"
            );
        }

        await bookingRepository.updateBooking(
            booking.id,
            {

                status:
                    "CONFIRMED",

                confirmedAt:
                    new Date(),

            }
        );

        for (const item of booking.items) {

            await bookingRepository.updateBookingItem(
                item.id,
                {

                    status:
                        "CONFIRMED",

                    confirmedAt:
                        new Date(),

                }
            );

        }

        return {

            message:
                "Booking confirmed successfully",

        };

    }


    async markPaymentSuccess(
        bookingId: string,
        transactionId: string,
        gatewayPaymentId: string,
        gatewayOrderId: string,
        gatewaySignature: string
    ) {

        const booking =
            await bookingRepository.findBookingById(
                bookingId
            );

        if (!booking) {
            throw new Error(
                "Booking not found"
            );
        }

        const payment =
            await bookingRepository.findPaymentByBookingId(
                bookingId
            );

        if (!payment) {
            throw new Error(
                "Payment not found"
            );
        }

        const paidAt =
            new Date();

        await bookingRepository.updatePayment(
            payment.id,
            {

                status:
                    "PAID",

                transactionId,

                gatewayPaymentId,

                gatewayOrderId,

                gatewaySignature,

                paidAt,

            }
        );

        await bookingRepository.updateBooking(
            booking.id,
            {

                paymentStatus:
                    "PAID",

                status:
                    "CONFIRMED",

                paidAt,

                confirmedAt:
                    paidAt,

            }
        );

        for (const item of booking.items) {

            await bookingRepository.updateBookingItem(
                item.id,
                {

                    paymentStatus:
                        "PAID",

                    status:
                        "CONFIRMED",

                    paidAt,

                    confirmedAt:
                        paidAt,

                }
            );


        }
        await tripService.generateTripPass(
    booking.userId,
    booking.id
);

        return {

            message:
                "Payment completed successfully",

        };

    }


    async markPaymentFailed(
        bookingId: string
    ) {

        const booking =
            await bookingRepository.findBookingById(
                bookingId
            );

        if (!booking) {
            throw new Error(
                "Booking not found"
            );
        }

        const payment =
            await bookingRepository.findPaymentByBookingId(
                bookingId
            );

        if (!payment) {
            throw new Error(
                "Payment not found"
            );
        }

        await bookingRepository.updatePayment(
            payment.id,
            {

                status:
                    "FAILED",

            }
        );

        await bookingRepository.updateBooking(
            booking.id,
            {

                paymentStatus:
                    "FAILED",

            }
        );

        return {

            message:
                "Payment marked as failed",

        };

    }


    async deleteBooking(
        bookingId: string
    ) {

        const booking =
            await bookingRepository.findBookingById(
                bookingId
            );

        if (!booking) {
            throw new Error(
                "Booking not found"
            );
        }

        await bookingRepository.deleteBooking(
            bookingId
        );

        return {

            message:
                "Booking deleted successfully",

        };

    }

}

export default new BookingService();