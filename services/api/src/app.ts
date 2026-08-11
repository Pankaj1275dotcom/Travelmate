import "express-async-errors";
import healthRouter from "./routes/health.routes.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { authRouter } from "./modules/auth/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import protectedRouter from "./routes/protected.routes.js";
import { hotelRouter } from "./modules/hotels/index.js";
import { roomTypeRouter } from "./modules/room-types/index.js";
import { roomRouter } from "./modules/rooms/index.js";
import { hotelImageRouter } from "./modules/hotel-images/index.js";
import { bookingRouter } from "./modules/bookings/index.js";
import { guideRouter } from "./modules/guides/index.js";
import { driverRouter } from "./modules/drivers/index.js";
import { wishlistRouter } from "./modules/wishlist/index.js";
import { dashboardRouter } from "./modules/admin/dashboard/index.js";
import { approvalRouter } from "./modules/admin/approvals/index.js";
import { adminUserRouter } from "./modules/admin/users/index.js";
import {
    paymentRouter,
} from "./modules/payments/index.js";
import {
    tripRouter,
} from "./modules/trips/index.js";
const app = express();
app.use(helmet());

const defaultAllowedOrigins = [
    "http://localhost:5174", // Tourist App
    "http://localhost:5173", // Guide Dashboard
    "http://localhost:5175", // Driver Dashboard
    "http://localhost:5176", // Hotel Dashboard
    "http://localhost:5177", // Admin Dashboard
];

const configuredOrigins = (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])];

const isAllowedOrigin = (origin: string) => {
    if (!origin) {
        return true;
    }

    if (allowedOrigins.includes(origin)) {
        return true;
    }

    return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};

app.use(
    cors({
        origin(origin, callback) {
            if (isAllowedOrigin(origin ?? "")) {
                return callback(null, true);
            }

            return callback(
                new Error("Not allowed by CORS")
            );
        },
        credentials: true,
    })
);
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/room-types", roomTypeRouter);
app.use("/api/v1/hotel-images", hotelImageRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use(
    "/api/v1/payments",
    paymentRouter
);
app.use(
    "/api/v1/trips",
    tripRouter
);
app.use("/api/v1/guides", guideRouter);
app.use("/api/v1/drivers", driverRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use(
    "/api/v1/admin/dashboard",
    dashboardRouter
);
app.use("/api/v1", protectedRouter);
app.use(
    "/api/v1/admin/approvals",
    approvalRouter
);
app.use(
    "/api/v1/admin/users",
    adminUserRouter
);


app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "TravelMate API is running",
    });
});

app.use("/health", healthRouter);
app.use(errorMiddleware);
export default app;