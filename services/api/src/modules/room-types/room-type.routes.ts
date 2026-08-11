import { Router } from "express";

import roomTypeController from "./room-type.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authenticate,
    roomTypeController.createRoomType
);

router.get(
    "/hotel/:hotelId",
    roomTypeController.getRoomTypesByHotel
);

router.get(
    "/:id",
    roomTypeController.getRoomTypeById
);

router.put(
    "/:id",
    authenticate,
    roomTypeController.updateRoomType
);

router.delete(
    "/:id",
    authenticate,
    roomTypeController.deleteRoomType
);

export default router;