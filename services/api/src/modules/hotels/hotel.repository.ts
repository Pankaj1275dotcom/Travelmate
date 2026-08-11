import prisma from "../../lib/prisma.js";
import { Prisma, Hotel } from "@prisma/client";
import { HotelFilterDto } from "./hotel.types.js";

class HotelRepository {
    async createHotel(
        data: Prisma.HotelCreateInput
    ): Promise<Hotel> {
        return prisma.hotel.create({
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
            include: {

                images: true,

                roomTypes: {
                    include: {
                        rooms: true,
                    },
                },

            },
        });
    }


    async findHotelByOwnerId(
        ownerId: string
    ): Promise<Hotel | null> {
        return prisma.hotel.findFirst({
            where: {
                ownerId,
            },
            include: {

                images: true,

                roomTypes: {
                    include: {
                        rooms: true,
                    },
                },

            },
        });
    }


    async findHotelsByOwner(
        ownerId: string
    ): Promise<Hotel[]> {
        return prisma.hotel.findMany({
            where: {
                ownerId,
            },
            include: {

                images: true,

                roomTypes: {
                    include: {
                        rooms: true,
                    },
                },

            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }


    async getAllHotels(
        filters: HotelFilterDto
    ) {

        const {
            search,
            city,
            state,
            rating,
            sort,
        } = filters;


        const where: Prisma.HotelWhereInput = {
            isApproved: true,
        };


        if (search) {
            where.OR = [
                {
                    name: {
                        contains: search,
                    },
                },
                {
                    city: {
                        contains: search,
                    },
                },
                {
                    state: {
                        contains: search,
                    },
                },
                {
                    hotelType: {
                        contains: search,
                    },
                },
            ];
        }


        if (city) {
            where.city = city;
        }


        if (state) {
            where.state = state;
        }


        if (rating !== undefined) {
            where.rating = {
                gte: rating,
            };
        }


        let orderBy: Prisma.HotelOrderByWithRelationInput =
            {
                createdAt: "desc",
            };


        switch (sort) {

            case "rating":

                orderBy = {
                    rating: "desc",
                };

                break;


            default:

                orderBy = {
                    createdAt: "desc",
                };

        }



        return prisma.hotel.findMany({

            where,

            include: {

                images: true,

                roomTypes: {
                    include: {
                        rooms: true,
                    },
                },

            },

            orderBy,

        });

    }


    async updateHotel(
        id: string,
        data: Prisma.HotelUpdateInput
    ) {
        return prisma.hotel.update({
            where: {
                id,
            },
            data,
        });
    }


    async deleteHotel(
        id: string
    ): Promise<Hotel> {

        return prisma.hotel.delete({

            where: {
                id,
            },

        });

    }
}


export default new HotelRepository();