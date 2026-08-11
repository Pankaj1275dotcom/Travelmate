import { Request, Response } from "express";

import { AuthRequest } from "../../middleware/auth.middleware.js";

import guideService from "./guide.service.js";

import {
    createGuideSchema,
    updateGuideSchema,
    updateGuideAvailabilitySchema,
} from "./guide.validation.js";


class GuideController {

    async createGuide(
        req: AuthRequest,
        res: Response
    ) {

        const data =
            createGuideSchema.parse(
                req.body
            );


        const result =
            await guideService.createGuide({

                ...data,

                userId:
                    req.user!.id,

            });


        return res.status(201).json({

            success: true,

            ...result,

        });

    }


    async getGuideById(
        req: Request,
        res: Response
    ) {

        const guide =
            await guideService.getGuideById(
                req.params.id as string
            );


        return res.status(200).json({

            success: true,

            guide,

        });

    }


    async getMyGuide(
        req: AuthRequest,
        res: Response
    ) {

        const result =
            await guideService.getMyGuide(
                req.user!.id
            );


        return res.status(200).json({

            success: true,

            ...result,

        });

    }


    async getAvailability(
        req: AuthRequest,
        res: Response
    ) {

        const availability =
            await guideService.getAvailability(
                req.user!.id
            );


        return res.status(200).json({

            success: true,

            availability,

        });

    }


    async updateAvailability(
        req: AuthRequest,
        res: Response
    ) {

        const data =
            updateGuideAvailabilitySchema.parse(
                req.body
            );


        const availability =
            await guideService.updateAvailability(

                req.user!.id,

                data

            );


        return res.status(200).json({

            success: true,

            message:
                "Availability updated successfully",

            availability,

        });

    }


    async getAllGuides(
        req: Request,
        res: Response
    ) {

        const guides =
            await guideService.getAllGuides();


        return res.status(200).json({

            success: true,

            count:
                guides.length,

            guides,

        });

    }


    async getGuidesByCity(
        req: Request,
        res: Response
    ) {

        const guides =
            await guideService.getGuidesByCity(
                req.params.city as string
            );


        return res.status(200).json({

            success: true,

            count:
                guides.length,

            guides,

        });

    }


    async updateGuide(
        req: Request,
        res: Response
    ) {

        const data =
            updateGuideSchema.parse(
                req.body
            );


        const guide =
            await guideService.updateGuide(

                req.params.id as string,

                data

            );


        return res.status(200).json({

            success: true,

            message:
                "Guide updated successfully",

            guide,

        });

    }


    async deleteGuide(
        req: Request,
        res: Response
    ) {

        const result =
            await guideService.deleteGuide(
                req.params.id as string
            );


        return res.status(200).json({

            success: true,

            ...result,

        });

    }


    async getGuideEarnings(
        req: AuthRequest,
        res: Response
    ) {

        const result =
            await guideService.getGuideEarnings(
                req.user!.id
            );


        return res.status(200).json({

            success: true,

            ...result,

        });

    }

}


export default new GuideController();