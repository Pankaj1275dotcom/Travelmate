import { Request, Response } from "express";

import hotelService from "./hotel.service.js";
import {
    createHotelSchema,
    hotelFilterSchema,
    updateHotelSchema,
} from "./hotel.validation.js";
import { AuthRequest } from "../../middleware/auth.middleware.js";
class HotelController {
    async createHotel(
        req: AuthRequest,
        res: Response
    ) {
        const data = createHotelSchema.parse(req.body);

        const hotel = await hotelService.createHotel(
            req.user!.id,
            data
        );

        return res.status(201).json({
            success: true,
            ...hotel,
        });
    }

    async getHotelById(
        req: Request,
        res: Response
    ) {
        const hotel =
            await hotelService.getHotelById(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            hotel,
        });
    }

    async getMyHotel(
        req: AuthRequest,
        res: Response
    ) {
        const hotel =
            await hotelService.getMyHotel(
                req.user!.id
            );

        return res.status(200).json({
            success: true,
            hotel,
        });
    }

    async getMyHotels(
        req: AuthRequest,
        res: Response
    ) {
        const hotels =
            await hotelService.getHotelsByOwner(
                req.user!.id
            );

        return res.status(200).json({
            success: true,
            hotels,
        });
    }

    async getAllHotels(
        req: Request,
        res: Response
    ) {
        const filters =
            hotelFilterSchema.parse(req.query);

        const hotels =
            await hotelService.getAllHotels(
                filters
            );

        return res.status(200).json({
            success: true,
            count: hotels.length,
            hotels,
        });
    }

    async updateHotel(
        req: Request,
        res: Response
    ) {
        const data =
    updateHotelSchema.parse(req.body);

        const hotel =
            await hotelService.updateHotel(
                req.params.id as string,
                data
            );

        return res.status(200).json({
            success: true,
            message:
                "Hotel updated successfully",
            hotel,
        });
    }

    async deleteHotel(
        req: Request,
        res: Response
    ) {
        const result =
            await hotelService.deleteHotel(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            ...result,
        });
    }
}

export default new HotelController();