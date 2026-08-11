import { Response } from "express";

import hotelImageService from "./hotel-image.service.js";

import {
    AuthRequest,
} from "../../middleware/auth.middleware.js";



class HotelImageController {



    async uploadImages(
        req: AuthRequest,
        res: Response
    ) {


        const result =
            await hotelImageService.uploadImages(
                req.user!.id,

                req.params.hotelId as string,

                req.files as Express.Multer.File[]
            );


        return res.status(201).json({

            success: true,

            ...result,

        });

    }





    async getHotelImages(
        req: AuthRequest,
        res: Response
    ) {


        const images =
            await hotelImageService.getHotelImages(

                req.params.hotelId as string

            );


        return res.status(200).json({

            success: true,

            images,

        });

    }





    async deleteImage(
        req: AuthRequest,
        res: Response
    ) {


        const result =
            await hotelImageService.deleteImage(

                req.user!.id,

                req.params.id as string

            );



        return res.status(200).json({

            success: true,

            ...result,

        });

    }



}


export default new HotelImageController();