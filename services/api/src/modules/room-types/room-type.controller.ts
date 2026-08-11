import { Request, Response } from "express";

import roomTypeService from "./room-type.service.js";

import {
    createRoomTypeSchema,
    updateRoomTypeSchema,
} from "./room-type.validation.js";


class RoomTypeController {

    async createRoomType(
        req: Request,
        res: Response
    ) {
        const data =
            createRoomTypeSchema.parse(
                req.body
            );


        const roomType =
            await roomTypeService.createRoomType(
                data
            );


        return res.status(201).json({
            success: true,
            ...roomType,
        });
    }


    async getRoomTypeById(
        req: Request,
        res: Response
    ) {
        const roomType =
            await roomTypeService.getRoomTypeById(
                req.params.id as string
            );


        return res.status(200).json({
            success: true,
            roomType,
        });
    }


    async getRoomTypesByHotel(
        req: Request,
        res: Response
    ) {
        const roomTypes =
            await roomTypeService.getRoomTypesByHotel(
                req.params.hotelId as string
            );


        return res.status(200).json({
            success: true,
            count: roomTypes.length,
            roomTypes,
        });
    }


    async updateRoomType(
        req: Request,
        res: Response
    ) {
        const data =
            updateRoomTypeSchema.parse(
                req.body
            );


        const roomType =
            await roomTypeService.updateRoomType(
                req.params.id as string,
                data
            );


        return res.status(200).json({
            success: true,
            ...roomType,
        });
    }


    async deleteRoomType(
        req: Request,
        res: Response
    ) {
        const result =
            await roomTypeService.deleteRoomType(
                req.params.id as string
            );


        return res.status(200).json({
            success: true,
            ...result,
        });
    }

}

export default new RoomTypeController();