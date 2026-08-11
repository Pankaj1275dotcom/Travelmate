import { Router } from "express";

import wishlistController from "./wishlist.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    wishlistController.getWishlist
);

router.post(
    "/",
    wishlistController.addToWishlist
);

router.delete(
    "/:hotelId",
    wishlistController.removeFromWishlist
);

export default router;