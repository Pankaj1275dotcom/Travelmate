import { Router } from "express";

import guideController from "./guide.controller.js";

import {
    authenticate,
} from "../../middleware/auth.middleware.js";


const router = Router();


router.post(
    "/",
    authenticate,
    guideController.createGuide
);


router.get(
    "/me",
    authenticate,
    guideController.getMyGuide
);


router.get(
    "/me/availability",
    authenticate,
    guideController.getAvailability
);


router.put(
    "/me/availability",
    authenticate,
    guideController.updateAvailability
);


router.get(
    "/me/earnings",
    authenticate,
    guideController.getGuideEarnings
);


router.get(
    "/",
    guideController.getAllGuides
);


router.get(
    "/city/:city",
    guideController.getGuidesByCity
);


router.get(
    "/:id",
    guideController.getGuideById
);


router.put(
    "/:id",
    authenticate,
    guideController.updateGuide
);


router.delete(
    "/:id",
    authenticate,
    guideController.deleteGuide
);


export default router;