import { Router } from "express";

import hotelImageController from "./hotel-image.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

import upload from "../../middleware/upload.middleware.js";


const router = Router();



// Upload hotel images
router.post(
    "/hotels/:hotelId/images",
    authenticate,
    upload.array(
        "images",
        10
    ),
    hotelImageController.uploadImages
);



// Get hotel gallery
router.get(
    "/hotels/:hotelId/images",
    hotelImageController.getHotelImages
);



// Delete image
router.delete(
    "/images/:id",
    authenticate,
    hotelImageController.deleteImage
);


export default router;