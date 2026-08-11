import { Router } from "express";

import hotelController from "./hotel.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

// Public Routes
router.get("/", hotelController.getAllHotels);

// Protected Routes
router.get(
    "/my",
    authenticate,
    hotelController.getMyHotels
);

router.get(
    "/my-hotel",
    authenticate,
    hotelController.getMyHotel
);

router.post(
    "/",
    authenticate,
    hotelController.createHotel
);

router.put(
    "/:id",
    authenticate,
    hotelController.updateHotel
);

router.delete(
    "/:id",
    authenticate,
    hotelController.deleteHotel
);

// Keep this LAST
router.get(
    "/:id",
    hotelController.getHotelById
);

export default router;