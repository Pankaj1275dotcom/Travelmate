import api from "../api/axios";

import { API } from "../../constants/api";

import type {
    UserSearchParams,
    UsersResponse,
    UserResponse,
} from "../../types/users.types";

class UsersService {

    async searchUsers(
        params: UserSearchParams
    ): Promise<UsersResponse> {

        const response =
            await api.post<UsersResponse>(
                `${API.USERS}/search`,
                params
            );

        return response.data;

    }


    async getUserById(
        id: string
    ): Promise<UserResponse> {

        const response =
            await api.get<UserResponse>(
                `${API.USERS}/${id}`
            );

        return response.data;

    }


    async suspendUser(
        id: string
    ): Promise<UserResponse> {

        const response =
            await api.patch<UserResponse>(
                `${API.USERS}/${id}/suspend`
            );

        return response.data;

    }


    async activateUser(
        id: string
    ): Promise<UserResponse> {

        const response =
            await api.patch<UserResponse>(
                `${API.USERS}/${id}/activate`
            );

        return response.data;

    }

}

const usersService =
    new UsersService();

export default usersService;