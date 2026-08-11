import { Request, Response } from "express";

import adminUserService from "./admin-user.service.js";

import { SearchUserDto } from "./admin-user.types.js";

class AdminUserController {

    async searchUsers(
        req: Request,
        res: Response
    ) {

        const filters =
            req.body as SearchUserDto;

        const result =
            await adminUserService.searchUsers(
                filters
            );

        return res.status(200).json({

            success: true,

            message:
                result.message,

            users:
                result.users,

        });

    }


    async getUserDetails(
        req: Request,
        res: Response
    ) {

        const result =
            await adminUserService.getUserDetails(
                req.params.id as string
            );

        return res.status(200).json({

            success: true,

            message:
                result.message,

            user:
                result.user,

        });

    }


    async suspendUser(
        req: Request,
        res: Response
    ) {

        const result =
            await adminUserService.suspendUser(
                req.params.id as string
            );

        return res.status(200).json({

            success: true,

            message:
                result.message,

            user:
                result.user,

        });

    }


    async activateUser(
        req: Request,
        res: Response
    ) {

        const result =
            await adminUserService.activateUser(
                req.params.id as string
            );

        return res.status(200).json({

            success: true,

            message:
                result.message,

            user:
                result.user,

        });

    }

}

export default new AdminUserController();