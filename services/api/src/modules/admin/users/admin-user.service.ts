import adminUserRepository from "./admin-user.repository.js";

import { SearchUserDto } from "./admin-user.types.js";

class AdminUserService {

    async searchUsers(
        filters: SearchUserDto
    ) {

        if (
            !filters.firstName &&
            !filters.lastName &&
            !filters.email &&
            !filters.phone &&
            !filters.role
        ) {

            throw new Error(
                "Please enter at least one search field."
            );

        }

        const users =
            await adminUserRepository.searchUsers(
                filters
            );

        return {

            message:
                "Users fetched successfully",

            users,

        };

    }


    async getUserDetails(
        userId: string
    ) {

        const user =
            await adminUserRepository.getUserDetails(
                userId
            );

        if (!user) {

            throw new Error(
                "User not found"
            );

        }

        return {

            message:
                "User details fetched successfully",

            user,

        };

    }


    async suspendUser(
        userId: string
    ) {

        const user =
            await adminUserRepository.getUserDetails(
                userId
            );

        if (!user) {

            throw new Error(
                "User not found"
            );

        }

        if (!user.isActive) {

            throw new Error(
                "User account is already suspended."
            );

        }

        const updatedUser =
            await adminUserRepository.updateUserStatus(
                userId,
                false
            );

        return {

            message:
                "User account suspended successfully",

            user:
                updatedUser,

        };

    }


    async activateUser(
        userId: string
    ) {

        const user =
            await adminUserRepository.getUserDetails(
                userId
            );

        if (!user) {

            throw new Error(
                "User not found"
            );

        }

        if (user.isActive) {

            throw new Error(
                "User account is already active."
            );

        }

        const updatedUser =
            await adminUserRepository.updateUserStatus(
                userId,
                true
            );

        return {

            message:
                "User account activated successfully",

            user:
                updatedUser,

        };

    }

}

export default new AdminUserService();