import { Router } from "express";

import approvalController from "./approval.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/hotels/pending",
    authenticate,
    approvalController.getPendingHotels
);

router.get(
    "/hotels/approved",
    authenticate,
    approvalController.getApprovedHotels
);

router.get(
    "/guides/pending",
    authenticate,
    approvalController.getPendingGuides
);

router.get(
    "/guides/approved",
    authenticate,
    approvalController.getApprovedGuides
);

router.get(
    "/drivers/pending",
    authenticate,
    approvalController.getPendingDrivers
);

router.get(
    "/drivers/approved",
    authenticate,
    approvalController.getApprovedDrivers
);

router.patch(
    "/hotels/:id/approve",
    authenticate,
    approvalController.approveHotel
);

router.patch(
    "/hotels/:id/reject",
    authenticate,
    approvalController.rejectHotel
);

router.patch(
    "/guides/:id/approve",
    authenticate,
    approvalController.approveGuide
);

router.patch(
    "/guides/:id/reject",
    authenticate,
    approvalController.rejectGuide
);

router.patch(
    "/drivers/:id/approve",
    authenticate,
    approvalController.approveDriver
);

router.patch(
    "/drivers/:id/reject",
    authenticate,
    approvalController.rejectDriver
);

export default router;