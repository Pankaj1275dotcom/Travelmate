import { Response } from "express";

import tripService from "./trip.service.js";

import {
    AuthRequest,
} from "../../middleware/auth.middleware.js";

import {
    bookingIdSchema,
    generateTripPassSchema,
    verifyTripOtpSchema,
    verifyTripQrSchema,
    startTripSchema,
    completeTripSchema,
} from "./trip.validation.js";

class TripController {

    async getMyTrips(
        req: AuthRequest,
        res: Response
    ) {

        const result =
            await tripService.getMyTrips(
                req.user!.id
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async getTripDetails(
        req: AuthRequest,
        res: Response
    ) {

        const {
            bookingId,
        } =
            bookingIdSchema.parse(
                req.params
            );

        const result =
            await tripService.getTripDetails(

                req.user!.id,

                bookingId

            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }
    async getTripPass(
    req: AuthRequest,
    res: Response
) {

    const {
        bookingId,
    } =
        bookingIdSchema.parse(
            req.params
        );

    const result =
        await tripService.getTripPass(

            req.user!.id,

            bookingId

        );

    return res.status(200).json({

        success: true,

        ...result,

    });

}

    async generateTripPass(
        req: AuthRequest,
        res: Response
    ) {

        const {
            bookingId,
        } =
            generateTripPassSchema.parse(
                req.body
            );

        const result =
            await tripService.generateTripPass(

                req.user!.id,

                bookingId

            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async getCountdown(
        req: AuthRequest,
        res: Response
    ) {

        const {
            bookingId,
        } =
            bookingIdSchema.parse(
                req.params
            );

        const result =
            await tripService.getTripCountdown(

                req.user!.id,

                bookingId

            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async regenerateOtp(
        req: AuthRequest,
        res: Response
    ) {

        const {
            bookingId,
        } =
            bookingIdSchema.parse(
                req.body
            );

        const result =
            await tripService.regenerateOtp(
                bookingId
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async regenerateQr(
        req: AuthRequest,
        res: Response
    ) {

        const {
            bookingId,
        } =
            bookingIdSchema.parse(
                req.body
            );

        const result =
            await tripService.regenerateQr(
                bookingId
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async verifyTripQr(
        req: AuthRequest,
        res: Response
    ) {

        const {
            bookingId,
            qrToken,
        } =
            verifyTripQrSchema.parse(
                req.body
            );

        const result =
            await tripService.verifyTripPass(

                bookingId,

                qrToken,

                undefined

            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async verifyTripOtp(
        req: AuthRequest,
        res: Response
    ) {

        const {
            bookingId,
            otp,
        } =
            verifyTripOtpSchema.parse(
                req.body
            );

        const result =
            await tripService.verifyTripPass(

                bookingId,

                undefined,

                otp

            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async startTrip(
        req: AuthRequest,
        res: Response
    ) {

        const {

            bookingId,

            bookingItemId,

            otp,

            qrToken,

        } =
            startTripSchema.parse(
                req.body
            );

        const result =
            await tripService.startTrip(

                bookingId,

                bookingItemId,

                req.user!.role,

                otp,

                qrToken

            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async completeTrip(
        req: AuthRequest,
        res: Response
    ) {

        const {

            bookingId,

            bookingItemId,

            otp,

        } =
            completeTripSchema.parse(
                req.body
            );

        const result =
            await tripService.completeTrip(

                bookingId,

                bookingItemId,

                req.user!.role,

                otp

            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }

    async getHotelTrips(
        req: AuthRequest,
        res: Response
    ) {

        const result =
            await tripService.getHotelTrips(
                req.user!.id
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }
    async dismissHotelTrip(
    req: AuthRequest,
    res: Response
) {

    const {
        bookingId,
    } =
        bookingIdSchema.parse(
            req.params
        );

    const result =
        await tripService.dismissHotelTrip(

            req.user!.id,

            bookingId

        );

    return res.status(200).json({

        success: true,

        ...result,

    });

}
    async getHotelTripDetails(
    req: AuthRequest,
    res: Response
) {

    const {
        bookingId,
    } =
        bookingIdSchema.parse(
            req.params
        );

    const result =
        await tripService.getHotelTripDetails(

            req.user!.id,

            bookingId

        );

    return res.status(200).json({

        success: true,

        ...result,

    });

}

    async getGuideTrips(
        req: AuthRequest,
        res: Response
    ) {

        const result =
            await tripService.getGuideTrips(
                req.user!.id
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }
    async getGuideTripDetails(
    req: AuthRequest,
    res: Response
) {

    const {
        bookingId,
    } =
        bookingIdSchema.parse(
            req.params
        );

    const result =
        await tripService.getGuideTripDetails(

            req.user!.id,

            bookingId

        );

    return res.status(200).json({

        success: true,

        ...result,

    });
    

}

    async getDriverTrips(
        req: AuthRequest,
        res: Response
    ) {

        const result =
            await tripService.getDriverTrips(
                req.user!.id
            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }
    async getDriverTripDetails(
    req: AuthRequest,
    res: Response
) {

    const {
        bookingId,
    } =
        bookingIdSchema.parse(
            req.params
        );

    const result =
        await tripService.getDriverTripDetails(

            req.user!.id,

            bookingId

        );

    return res.status(200).json({

        success: true,

        ...result,

    });

}

    async getTripTimeline(
        req: AuthRequest,
        res: Response
    ) {

        const {
            bookingId,
        } =
            bookingIdSchema.parse(
                req.params
            );

        const result =
            await tripService.getTripTimeline(

                req.user!.id,

                bookingId

            );

        return res.status(200).json({

            success: true,

            ...result,

        });

    }
    

}

export default new TripController();