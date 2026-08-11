import { Router } from "express";

import tripController from "./trip.controller.js";

import {
    authenticate,
} from "../../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get(
    "/my",
    tripController.getMyTrips
);

router.get(
    "/hotel",
    tripController.getHotelTrips
);
router.get(
    "/hotel/:bookingId",
    tripController.getHotelTripDetails
);
router.patch(
    "/hotel/:bookingId/dismiss",
    tripController.dismissHotelTrip
);
router.get(
    "/guide",
    tripController.getGuideTrips
);
router.get(
    "/guide/:bookingId",
    tripController.getGuideTripDetails
);

router.get(
    "/driver",
    tripController.getDriverTrips
);
router.get(
    "/driver/:bookingId",
    tripController.getDriverTripDetails
);

router.get(
    "/:bookingId",
    tripController.getTripDetails
);
router.get(
    "/:bookingId/pass",
    tripController.getTripPass
);

router.get(
    "/:bookingId/timeline",
    tripController.getTripTimeline
);

router.get(
    "/:bookingId/countdown",
    tripController.getCountdown
);

router.post(
    "/generate-pass",
    tripController.generateTripPass
);

router.post(
    "/verify/qr",
    tripController.verifyTripQr
);

router.post(
    "/verify/otp",
    tripController.verifyTripOtp
);

router.post(
    "/start",
    tripController.startTrip
);

router.post(
    "/complete",
    tripController.completeTrip
);

router.patch(
    "/regenerate-otp",
    tripController.regenerateOtp
);

router.patch(
    "/regenerate-qr",
    tripController.regenerateQr
);

export default router;