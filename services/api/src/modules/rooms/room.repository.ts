import prisma from "../../lib/prisma.js";
import {
    Prisma,
    Room,
    RoomStatus,
} from "@prisma/client";

class RoomRepository {
    async createRoom(
        data: Prisma.RoomCreateInput
    ) {
        return prisma.room.create({
            data,
        });
    }

    async findRoomById(id: string) {
        return prisma.room.findUnique({
            where: {
                id,
            },
            include: {
                roomType: true,
            },
        });
    }

    async findRoomByNumber(
        roomTypeId: string,
        roomNumber: string
    ): Promise<Room | null> {
        return prisma.room.findFirst({
            where: {
                roomTypeId,
                roomNumber,
            },
        });
    }

    async getRoomsByRoomType(
        roomTypeId: string
    ) {
        return prisma.room.findMany({
            where: {
                roomTypeId,
            },
            orderBy: {
                roomNumber: "asc",
            },
        });
    }

    async getRooms(filters?: {
        roomTypeId?: string;
        status?: RoomStatus;
    }) {
        return prisma.room.findMany({
            where: {
                ...(filters?.roomTypeId && {
                    roomTypeId:
                        filters.roomTypeId,
                }),
                ...(filters?.status && {
                    status: filters.status,
                }),
            },
            include: {
                roomType: true,
            },
            orderBy: {
                roomNumber: "asc",
            },
        });
    }

    async updateRoom(
        id: string,
        data: Prisma.RoomUpdateInput
    ) {
        return prisma.room.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteRoom(id: string) {
        return prisma.room.delete({
            where: {
                id,
            },
        });
    }
}

export default new RoomRepository();