import { Request, Response } from "express";

import roomService from "./room.service.js";
import {
    createRoomSchema,
    updateRoomSchema,
    roomFilterSchema,
} from "./room.validation.js";

class RoomController {
    async createRoom(
        req: Request,
        res: Response
    ) {
        const data =
            createRoomSchema.parse(req.body);

        const result =
            await roomService.createRoom(
                data
            );

        return res.status(201).json({
            success: true,
            ...result,
        });
    }

    async getRoomById(
        req: Request,
        res: Response
    ) {
        const room =
            await roomService.getRoomById(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            room,
        });
    }

    async getRooms(
        req: Request,
        res: Response
    ) {
        const filters =
            roomFilterSchema.parse(
                req.query
            );

        const rooms =
            await roomService.getRooms(
                filters
            );

        return res.status(200).json({
            success: true,
            count: rooms.length,
            rooms,
        });
    }

    async getRoomsByRoomType(
        req: Request,
        res: Response
    ) {
        const rooms =
            await roomService.getRoomsByRoomType(
                req.params
                    .roomTypeId as string
            );

        return res.status(200).json({
            success: true,
            count: rooms.length,
            rooms,
        });
    }

    async updateRoom(
        req: Request,
        res: Response
    ) {
        const data =
            updateRoomSchema.parse(
                req.body
            );

        const result =
            await roomService.updateRoom(
                req.params.id as string,
                data
            );

        return res.status(200).json({
            success: true,
            ...result,
        });
    }

    async deleteRoom(
        req: Request,
        res: Response
    ) {
        const result =
            await roomService.deleteRoom(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            ...result,
        });
    }
}

export default new RoomController();