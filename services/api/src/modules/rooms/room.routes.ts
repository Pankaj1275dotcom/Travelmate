import { Router } from "express";

import roomController from "./room.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authenticate,
    roomController.createRoom
);

router.get(
    "/",
    roomController.getRooms
);

router.get(
    "/room-type/:roomTypeId",
    roomController.getRoomsByRoomType
);

router.get(
    "/:id",
    roomController.getRoomById
);

router.put(
    "/:id",
    authenticate,
    roomController.updateRoom
);

router.delete(
    "/:id",
    authenticate,
    roomController.deleteRoom
);

export default router;