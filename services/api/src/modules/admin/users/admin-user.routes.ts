import { Router } from "express";

import adminUserController from "./admin-user.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";

import { authorizeRole } from "../../../middleware/role.middleware.js";

import { Role } from "@travelmate/database";

const router = Router();

router.post(
    "/search",
    authenticate,
    authorizeRole(Role.ADMIN),
    adminUserController.searchUsers
);

router.get(
    "/:id",
    authenticate,
    authorizeRole(Role.ADMIN),
    adminUserController.getUserDetails
);

router.patch(
    "/:id/suspend",
    authenticate,
    authorizeRole(Role.ADMIN),
    adminUserController.suspendUser
);

router.patch(
    "/:id/activate",
    authenticate,
    authorizeRole(Role.ADMIN),
    adminUserController.activateUser
);

export default router;