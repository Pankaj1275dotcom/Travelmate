import prisma from "../../lib/prisma.js";
import {
    Prisma,
    Hotel,
    RoomType,
    Room,
} from "@prisma/client";

class RoomTypeRepository {
    async createRoomType(
        data: Prisma.RoomTypeCreateInput
    ): Promise<RoomType> {
        return prisma.roomType.create({
            data,
        });
    }

    async createRooms(
        data: Prisma.RoomCreateManyInput[]
    ) {
        return prisma.room.createMany({
            data,
        });
    }

    async findHotelById(
        id: string
    ): Promise<Hotel | null> {
        return prisma.hotel.findUnique({
            where: {
                id,
            },
        });
    }

    async findRoomTypeById(
        id: string
    ): Promise<RoomType | null> {
        return prisma.roomType.findUnique({
            where: {
                id,
            },
        });
    }

    async findRoomTypeByName(
        hotelId: string,
        name: string
    ): Promise<RoomType | null> {
        return prisma.roomType.findFirst({
            where: {
                hotelId,
                name,
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

    async getRoomTypesByHotel(
        hotelId: string
    ) {
        return prisma.roomType.findMany({
            where: {
                hotelId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async updateRoomType(
        id: string,
        data: Prisma.RoomTypeUpdateInput
    ) {
        return prisma.roomType.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteRoomType(
        id: string
    ): Promise<RoomType> {
        return prisma.roomType.delete({
            where: {
                id,
            },
        });
    }
    async getRoomsByRoomType(
    roomTypeId: string
): Promise<Room[]> {
    return prisma.room.findMany({
        where: {
            roomTypeId,
        },
        orderBy: {
            roomNumber: "asc",
        },
    });
}


async deleteRooms(
    ids: string[]
) {
    return prisma.room.deleteMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
}
}

export default new RoomTypeRepository();