import { Prisma } from "@prisma/client";

import hotelRepository from "./hotel.repository.js";

import {
    CreateHotelDto,
    UpdateHotelDto,
    HotelFilterDto,
} from "./hotel.types.js";


type HotelWithRooms =
    Prisma.HotelGetPayload<{
        include: {
            roomTypes: {
                include: {
                    rooms: true;
                };
            };
        };
    }>;


class HotelService {

    async createHotel(
        ownerId: string,
        data: CreateHotelDto
    ) {
        const existingHotel =
            await hotelRepository.findHotelByOwnerId(
                ownerId
            );

        if (existingHotel) {
            throw new Error(
                "You have already registered a hotel."
            );
        }


        const hotel =
            await hotelRepository.createHotel({
                owner: {
                    connect: {
                        id: ownerId,
                    },
                },

                name:
                    data.name,

                hotelType:
                    data.hotelType,

                description:
                    data.description,


                email:
                    data.email,

                phone:
                    data.phone,


                address:
                    data.address,

                city:
                    data.city,

                state:
                    data.state,

                country:
                    data.country,

                zipCode:
                    data.zipCode,


                latitude:
                    data.latitude,

                longitude:
                    data.longitude,

                mapUrl:
                    data.mapUrl,


                coverImage:
                    data.coverImage,


                hasParking:
                    data.hasParking ?? false,

                hasRestaurant:
                    data.hasRestaurant ?? false,

                hasSwimmingPool:
                    data.hasSwimmingPool ?? false,

                hasGym:
                    data.hasGym ?? false,

                hasLaundry:
                    data.hasLaundry ?? false,

                hasRoomService:
                    data.hasRoomService ?? false,

                hasLift:
                    data.hasLift ?? false,

                hasPowerBackup:
                    data.hasPowerBackup ?? false,


                isApproved:
                    false,
            });


        return {
            message:
                "Hotel registered successfully. Waiting for admin approval.",

            hotel,
        };
    }



    async getHotelById(
        id: string
    ) {
        const hotel =
            await hotelRepository.findHotelById(
                id
            ) as HotelWithRooms | null;


        if (!hotel) {
            throw new Error(
                "Hotel not found"
            );
        }


        const roomTypes =
            hotel.roomTypes.map(
                (roomType) => {

                    const availableRooms =
                        roomType.rooms.filter(
                            (room) =>
                                room.status === "AVAILABLE"
                        ).length;


                    return {
                        id:
                            roomType.id,

                        name:
                            roomType.name,

                        description:
                            roomType.description,

                        pricePerNight:
                            roomType.pricePerNight,

                        capacity:
                            roomType.capacity,

                        totalRooms:
                            roomType.rooms.length,

                        availableRooms,

                        rooms:
                            roomType.rooms,
                    };
                }
            );


        return {
            ...hotel,

            roomTypes,
        };
    }



    async getHotelsByOwner(
        ownerId: string
    ) {
        return hotelRepository.findHotelsByOwner(
            ownerId
        );
    }



    async getMyHotel(
        ownerId: string
    ) {
        return hotelRepository.findHotelByOwnerId(
            ownerId
        );
    }



   async updateHotel(
    id: string,
    data: UpdateHotelDto
) {
        const hotel =
            await hotelRepository.findHotelById(
                id
            );


        if (!hotel) {
            throw new Error(
                "Hotel not found"
            );
        }


        return hotelRepository.updateHotel(
            id,
            {
                name:
                    hotel.isApproved
                        ? hotel.name
                        : data.name,

                hotelType:
                    hotel.isApproved
                        ? hotel.hotelType
                        : data.hotelType,

                description:
                    data.description,


                email:
                    data.email,

                phone:
                    data.phone,


                address:
                    data.address,

                city:
                    data.city,

                state:
                    data.state,

                country:
                    data.country,

                zipCode:
                    data.zipCode,


                latitude:
                    data.latitude,

                longitude:
                    data.longitude,

                mapUrl:
                    data.mapUrl,


                coverImage:
                    data.coverImage,


                hasParking:
                    data.hasParking,

                hasRestaurant:
                    data.hasRestaurant,

                hasSwimmingPool:
                    data.hasSwimmingPool,

                hasGym:
                    data.hasGym,

                hasLaundry:
                    data.hasLaundry,

                hasRoomService:
                    data.hasRoomService,

                hasLift:
                    data.hasLift,

                hasPowerBackup:
                    data.hasPowerBackup,
            }
        );
    }



    async getAllHotels(
        filters: HotelFilterDto
    ) {
        return hotelRepository.getAllHotels(
            filters
        );
    }



    async deleteHotel(
        id: string
    ) {
        const hotel =
            await hotelRepository.findHotelById(
                id
            );


        if (!hotel) {
            throw new Error(
                "Hotel not found"
            );
        }


        await hotelRepository.deleteHotel(
            id
        );


        return {
            message:
                "Hotel deleted successfully",
        };
    }

}


export default new HotelService();