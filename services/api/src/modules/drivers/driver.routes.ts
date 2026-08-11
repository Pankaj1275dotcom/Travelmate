import { Router } from "express";

import driverController from "./driver.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

// Public APIs
router.get("/", driverController.getAllDrivers);
router.get("/city/:city", driverController.getDriversByCity);

// Create Profile
router.post("/", authenticate, driverController.createDriver);

// Driver Dashboard
router.get("/me", authenticate, driverController.getMyDriver);
router.put("/me", authenticate, driverController.updateMyProfile);

router.get(
    "/me/availability",
    authenticate,
    driverController.getAvailability
);

router.put(
    "/me/availability",
    authenticate,
    driverController.updateAvailability
);

router.get(
    "/me/vehicle",
    authenticate,
    driverController.getVehicleDetails
);

router.put(
    "/me/vehicle",
    authenticate,
    driverController.updateVehicleDetails
);

// Public Driver Details
router.get("/:id", driverController.getDriverById);

// Temporary Admin/Legacy APIs
router.put("/:id", authenticate, driverController.updateDriver);
router.delete("/:id", authenticate, driverController.deleteDriver);

export default router;