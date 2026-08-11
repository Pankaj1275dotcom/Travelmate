import { Router } from "express";

import bookingController from "./booking.controller.js";

import {
    authenticate,
} from "../../middleware/auth.middleware.js";

const router = Router();

// ==============================
// CART
// ==============================

router.post(
    "/cart/hotel",
    authenticate,
    bookingController.addHotelToCart
);

router.post(
    "/cart/guide",
    authenticate,
    bookingController.addGuideToCart
);

router.post(
    "/cart/driver",
    authenticate,
    bookingController.addDriverToCart
);

router.get(
    "/cart",
    authenticate,
    bookingController.getMyCart
);

router.delete(
    "/cart/item/:itemId",
    authenticate,
    bookingController.removeCartItem
);

router.delete(
    "/cart",
    authenticate,
    bookingController.clearCart
);

router.post(
    "/cart/checkout",
    authenticate,
    bookingController.checkoutCart
);

router.post(
    "/create",
    authenticate,
    bookingController.createBookingFromCart
);
// ==============================
// GUIDE / DRIVER REQUESTS
// ==============================

router.get(
    "/guide/requests",
    authenticate,
    bookingController.getGuideBookingRequests
);

router.get(
    "/driver/requests",
    authenticate,
    bookingController.getDriverBookingRequests
);

router.patch(
    "/requests/:requestId/accept",
    authenticate,
    bookingController.acceptBookingRequest
);

router.patch(
    "/requests/:requestId/reject",
    authenticate,
    bookingController.rejectBookingRequest
);
router.patch(
    "/requests/:requestId/payment-expired",
    authenticate,
    bookingController.expireBookingRequest
);
router.delete(
    "/guide/requests/:requestId",
    authenticate,
    bookingController.removeGuideRequest
);

router.delete(
    "/driver/requests/:requestId",
    authenticate,
    bookingController.removeDriverRequest
);
// ==============================
// BOOKINGS
// ==============================

router.get(
    "/my",
    authenticate,
    bookingController.getMyBookings
);
router.get(
    "/driver/earnings",
    authenticate,
    bookingController.getDriverEarnings
);
router.get(
    "/",
    authenticate,
    bookingController.getAllBookings
);

router.get(
    "/number/:bookingNumber",
    authenticate,
    bookingController.getBookingByNumber
);

router.get(
    "/:id",
    authenticate,
    bookingController.getBookingById
);

router.patch(
    "/:id/cancel",
    authenticate,
    bookingController.cancelBooking
);

router.patch(
    "/:id/confirm",
    authenticate,
    bookingController.confirmBooking
);

// ==============================
// PAYMENT
// ==============================

router.patch(
    "/:id/payment-success",
    authenticate,
    bookingController.markPaymentSuccess
);

router.patch(
    "/:id/payment-failed",
    authenticate,
    bookingController.markPaymentFailed
);

router.delete(
    "/:id",
    authenticate,
    bookingController.deleteBooking
);

export default router;