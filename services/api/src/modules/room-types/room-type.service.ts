import roomTypeRepository from "./room-type.repository.js";

import {
    CreateRoomTypeDto,
    UpdateRoomTypeDto,
} from "./room-type.types.js";

import { RoomStatus } from "@prisma/client";


class RoomTypeService {

    async createRoomType(
        data: CreateRoomTypeDto
    ) {
        const hotel =
            await roomTypeRepository.findHotelById(
                data.hotelId
            );

        if (!hotel) {
            throw new Error(
                "Hotel not found"
            );
        }


        const existingRoomType =
            await roomTypeRepository.findRoomTypeByName(
                data.hotelId,
                data.name
            );

        if (existingRoomType) {
            throw new Error(
                "Room type already exists"
            );
        }


        const roomType =
            await roomTypeRepository.createRoomType({
                hotel: {
                    connect: {
                        id: data.hotelId,
                    },
                },

                name: data.name,

                description:
                    data.description,

                pricePerNight:
                    data.pricePerNight,

                capacity:
                    data.capacity,

                totalRooms:
                    data.totalRooms,

                startingRoomNumber:
                    data.startingRoomNumber,

                bedType:
                    data.bedType,

                roomSize:
                    data.roomSize,

                images:
                    data.images,

                amenities:
                    data.amenities,
            });


        const rooms = [];


        for (
            let i = 0;
            i < data.totalRooms;
            i++
        ) {
            const roomNumber =
                String(
                    data.startingRoomNumber + i
                );


            const existingRoom =
                await roomTypeRepository.findRoomByNumber(
                    roomType.id,
                    roomNumber
                );


            if (existingRoom) {
                throw new Error(
                    `Room number ${roomNumber} already exists`
                );
            }


            rooms.push({
                roomTypeId:
                    roomType.id,

                roomNumber,

                status:
                    RoomStatus.AVAILABLE,
            });
        }


        await roomTypeRepository.createRooms(
            rooms
        );


        return {
            message:
                "Room type created successfully",

            roomType,
        };
    }



    async getRoomTypeById(
        id: string
    ) {
        const roomType =
            await roomTypeRepository.findRoomTypeById(
                id
            );


        if (!roomType) {
            throw new Error(
                "Room type not found"
            );
        }


        return roomType;
    }



    async getRoomTypesByHotel(
        hotelId: string
    ) {
        return roomTypeRepository.getRoomTypesByHotel(
            hotelId
        );
    }



    async updateRoomType(
        id: string,
        data: UpdateRoomTypeDto
    ) {
        const roomType =
            await roomTypeRepository.findRoomTypeById(
                id
            );


        if (!roomType) {
            throw new Error(
                "Room type not found"
            );
        }


        const currentRooms =
            await roomTypeRepository.getRoomsByRoomType(
                id
            );


        const oldTotalRooms =
            currentRooms.length;


        const newTotalRooms =
            data.totalRooms ??
            oldTotalRooms;


        const updatedRoomType =
            await roomTypeRepository.updateRoomType(
                id,
                {
                    name:
                        data.name,

                    description:
                        data.description,

                    pricePerNight:
                        data.pricePerNight,

                    capacity:
                        data.capacity,

                    totalRooms:
                        newTotalRooms,

                    startingRoomNumber:
                        data.startingRoomNumber,

                    bedType:
                        data.bedType,

                    roomSize:
                        data.roomSize,

                    images:
                        data.images,

                    amenities:
                        data.amenities,
                }
            );



        // Increase rooms
        if (
            newTotalRooms > oldTotalRooms
        ) {

            const roomsToCreate = [];


            const startingNumber =
                data.startingRoomNumber ??
                roomType.startingRoomNumber;


            for (
                let i = oldTotalRooms;
                i < newTotalRooms;
                i++
            ) {
                roomsToCreate.push({
                    roomTypeId:
                        id,

                    roomNumber:
                        String(
                            startingNumber + i
                        ),

                    status:
                        RoomStatus.AVAILABLE,
                });
            }


            await roomTypeRepository.createRooms(
                roomsToCreate
            );
        }



        // Decrease rooms
        if (
            newTotalRooms < oldTotalRooms
        ) {

            const roomsToDelete =
                currentRooms
                    .slice(newTotalRooms)
                    .map(
                        (room) =>
                            room.id
                    );


            if (
                roomsToDelete.length > 0
            ) {
                await roomTypeRepository.deleteRooms(
                    roomsToDelete
                );
            }
        }



        return {
            message:
                "Room type updated successfully",

            roomType:
                updatedRoomType,
        };
    }




    async deleteRoomType(
        id: string
    ) {
        const roomType =
            await roomTypeRepository.findRoomTypeById(
                id
            );


        if (!roomType) {
            throw new Error(
                "Room type not found"
            );
        }


        await roomTypeRepository.deleteRoomType(
            id
        );


        return {
            message:
                "Room type deleted successfully",
        };
    }

}


export default new RoomTypeService();