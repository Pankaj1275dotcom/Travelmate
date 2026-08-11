import prisma from "../../lib/prisma.js";
import { HotelImage } from "@prisma/client";


class HotelImageRepository {


    async createImage(
        data: {
            hotelId: string;
            url: string;
            publicId: string;
        }
    ): Promise<HotelImage> {

        return prisma.hotelImage.create({
            data,
        });

    }



    async createImages(
        data: {
            hotelId: string;
            url: string;
            publicId: string;
        }[]
    ) {

        return prisma.hotelImage.createMany({
            data,
        });

    }




    async getImagesByHotel(
        hotelId: string
    ) {

        return prisma.hotelImage.findMany({

            where: {
                hotelId,
            },

            orderBy: {
                createdAt: "desc",
            },

        });

    }




    async findImageById(
        id: string
    ): Promise<HotelImage | null> {

        return prisma.hotelImage.findUnique({

            where: {
                id,
            },

        });

    }




    async deleteImage(
        id: string
    ): Promise<HotelImage> {

        return prisma.hotelImage.delete({

            where: {
                id,
            },

        });

    }




    async findHotelOwner(
        hotelId: string
    ) {

        return prisma.hotel.findUnique({

            where: {
                id: hotelId,
            },

            select: {
                ownerId: true,
            },

        });

    }

}


export default new HotelImageRepository();