import roomRepository from "./room.repository.js";
import roomTypeRepository from "../room-types/room-type.repository.js";
import {
    CreateRoomDto,
    UpdateRoomDto,
    RoomFilterDto,
} from "./room.types.js";

class RoomService {
    async createRoom(data: CreateRoomDto) {
        const roomType =
            await roomTypeRepository.findRoomTypeById(
                data.roomTypeId
            );

        if (!roomType) {
            throw new Error(
                "Room type not found"
            );
        }

        const existingRoom =
            await roomRepository.findRoomByNumber(
                data.roomTypeId,
                data.roomNumber
            );

        if (existingRoom) {
            throw new Error(
                "Room number already exists"
            );
        }

        const room =
            await roomRepository.createRoom({
                roomType: {
                    connect: {
                        id: data.roomTypeId,
                    },
                },
                roomNumber:
                    data.roomNumber,
                status:
                    data.status ??
                    "AVAILABLE",
            });

        return {
            message:
                "Room created successfully",
            room,
        };
    }

    async getRoomById(id: string) {
        const room =
            await roomRepository.findRoomById(
                id
            );

        if (!room) {
            throw new Error(
                "Room not found"
            );
        }

        return room;
    }

    async getRooms(
        filters: RoomFilterDto
    ) {
        return roomRepository.getRooms(
            filters
        );
    }

    async getRoomsByRoomType(
        roomTypeId: string
    ) {
        const roomType =
            await roomTypeRepository.findRoomTypeById(
                roomTypeId
            );

        if (!roomType) {
            throw new Error(
                "Room type not found"
            );
        }

        return roomRepository.getRoomsByRoomType(
            roomTypeId
        );
    }

    async updateRoom(
        id: string,
        data: UpdateRoomDto
    ) {
        const room =
            await roomRepository.findRoomById(
                id
            );

        if (!room) {
            throw new Error(
                "Room not found"
            );
        }

        if (
            data.roomNumber &&
            data.roomNumber !==
                room.roomNumber
        ) {
            const existingRoom =
                await roomRepository.findRoomByNumber(
                    room.roomTypeId,
                    data.roomNumber
                );

            if (
                existingRoom &&
                existingRoom.id !== room.id
            ) {
                throw new Error(
                    "Room number already exists"
                );
            }
        }

        const updatedRoom =
            await roomRepository.updateRoom(
                id,
                {
                    roomNumber:
                        data.roomNumber,
                    status:
                        data.status,
                }
            );

        return {
            message:
                "Room updated successfully",
            room: updatedRoom,
        };
    }

    async deleteRoom(id: string) {
        const room =
            await roomRepository.findRoomById(
                id
            );

        if (!room) {
            throw new Error(
                "Room not found"
            );
        }

        await roomRepository.deleteRoom(
            id
        );

        return {
            message:
                "Room deleted successfully",
        };
    }
}

export default new RoomService();