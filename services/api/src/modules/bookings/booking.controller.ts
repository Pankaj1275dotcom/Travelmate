import { Request, Response } from "express";

import bookingService from "./booking.service.js";

import {
    createHotelBookingSchema,
    createGuideBookingSchema,
    createDriverBookingSchema,
    bookingFilterSchema,
} from "./booking.validation.js";

import { AuthRequest } from "../../middleware/auth.middleware.js";

class BookingController {

    async addHotelToCart(
        req: AuthRequest,
        res: Response
    ) {

        const data =
            createHotelBookingSchema.parse(
                req.body
            );

        const result =
            await bookingService.addHotelToCart(
                req.user!.id,
                data
            );

        return res.status(201).json({

            success: true,

            ...result,

        });

    }


    async addGuideToCart(
        req: AuthRequest,
        res: Response
    ) {

        const data =
            createGuideBookingSchema.parse(
                req.body
            );

        const result =
            await bookingService.addGuideToCart(
                req.user!.id,
                data
            );

        return res.status(201).json({

            success: true,

            ...result,

        });

    }


    async addDriverToCart(
        req: AuthRequest,
        res: Response
    ) {

        const data =
            createDriverBookingSchema.parse(
                req.body
            );

        const result =
            await bookingService.addDriverToCart(
                req.user!.id,
                data
            );

        return res.status(201).json({

            success: true,

            ...result,

        });

    }


    async getMyCart(
        req: AuthRequest,
        res: Response
    ) {

        const cart =
            await bookingService.getMyCart(
                req.user!.id
            );

        return res.status(200).json({

            success: true,

            cart,

        });

    }    async removeCartItem(
        req: AuthRequest,
        res: Response
    ) {

        const result =
            await bookingService.removeCartItem(
                req.user!.id,
                req.params.itemId as string
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }


    async clearCart(
        req: AuthRequest,
        res: Response
    ) {

        const result =
            await bookingService.clearCart(
                req.user!.id
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }


    async checkoutCart(
        req: AuthRequest,
        res: Response
    ) {

        const cart =
            await bookingService.checkoutCart(
                req.user!.id
            );

        return res.status(200).json({

            success: true,

            cart,

        });

    }


    async createBookingFromCart(
        req: AuthRequest,
        res: Response
    ) {

        const booking =
            await bookingService.createBookingFromCart(
                req.user!.id
            );

        return res.status(201).json({

            success: true,

            ...booking,

        });

    }


    async getBookingById(
        req: Request,
        res: Response
    ) {

        const booking =
            await bookingService.getBookingById(
               req.params.id as string
            );

        return res.status(200).json({

            success: true,

            booking,

        });

    }


    async getBookingByNumber(
        req: Request,
        res: Response
    ) {

        const booking =
            await bookingService.getBookingByNumber(
                req.params.bookingNumber as string
            );

        return res.status(200).json({

            success: true,

            booking,

        });

    }    async getMyBookings(
        req: AuthRequest,
        res: Response
    ) {

        const bookings =
            await bookingService.getMyBookings(
                req.user!.id
            );

        return res.status(200).json({

            success: true,

            count:
                bookings.length,

            bookings,

        });

    }


async getAllBookings(
    req: Request,
    res: Response
) {

    await bookingFilterSchema.parse(
        req.query
    );

    const bookings =
        await bookingService.getAllBookings();

    return res.status(200).json({

        success: true,

        count: bookings.length,

        bookings,

    });

}
async getDriverEarnings(
    req: AuthRequest,
    res: Response
) {

    const result =
        await bookingService.getDriverEarnings(
            req.user!.id
        );

    return res.status(200).json({

        success: true,

        ...result,

    });

}
async getGuideBookingRequests(
    req: AuthRequest,
    res: Response
) {

    const requests =
        await bookingService.getGuideBookingRequests(
            req.user!.id
        );

    return res.status(200).json({

        success: true,

        count:
            requests.length,

        requests,

    });

}

async getDriverBookingRequests(
    req: AuthRequest,
    res: Response
) {

    const requests =
        await bookingService.getDriverBookingRequests(
            req.user!.id
        );

    return res.status(200).json({

        success: true,

        count:
            requests.length,

        requests,

    });

}

async acceptBookingRequest(
    req: AuthRequest,
    res: Response
) {

    const result =
        await bookingService.acceptBookingRequest(
    req.params.requestId as string,
    req.user!.id
);

    return res.status(200).json({

        success: true,

        ...result,

    });

}

async rejectBookingRequest(
    req: AuthRequest,
    res: Response
) {

    const result =
        await bookingService.rejectBookingRequest(
    req.params.requestId as string,
    req.user!.id,
    req.body.reason
);

    return res.status(200).json({

        success: true,

        ...result,

    });

}
async expireBookingRequest(
    req: AuthRequest,
    res: Response
) {

    const result =
        await bookingService.expireBookingRequest(
            req.params.requestId as string,
            req.user!.id
        );

    return res.status(200).json({

        success: true,

        ...result,

    });

}
async removeGuideRequest(
    req: AuthRequest,
    res: Response
) {

    const result =
        await bookingService.removeGuideRequest(
            req.params.requestId as string,
            req.user!.id
        );

    return res.status(200).json({

        success: true,

        ...result,

    });

}

async removeDriverRequest(
    req: AuthRequest,
    res: Response
) {

    const result =
        await bookingService.removeDriverRequest(
            req.params.requestId as string,
            req.user!.id
        );

    return res.status(200).json({

        success: true,

        ...result,

    });

}

    async cancelBooking(
        req: Request,
        res: Response
    ) {

        const result =
            await bookingService.cancelBooking(
                req.params.itemId as string,
                req.body.reason
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }


    async confirmBooking(
        req: Request,
        res: Response
    ) {

        const result =
            await bookingService.confirmBooking(
                req.params.id as string
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }


    async markPaymentSuccess(
        req: Request,
        res: Response
    ) {

        const {
            transactionId,
            gatewayPaymentId,
            gatewayOrderId,
            gatewaySignature,
        } = req.body;

        const result =
            await bookingService.markPaymentSuccess(
                req.params.id as string,
                transactionId,
                gatewayPaymentId,
                gatewayOrderId,
                gatewaySignature
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }


    async markPaymentFailed(
        req: Request,
        res: Response
    ) {

        const result =
            await bookingService.markPaymentFailed(
                req.params.id as string
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }


    async deleteBooking(
        req: Request,
        res: Response
    ) {

        const result =
            await bookingService.deleteBooking(
                req.params.id as string
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

}

export default new BookingController();