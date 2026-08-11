import { useQuery } from "@tanstack/react-query";

import usersService from "../services/users/users.service";

import type {
    UserSearchParams,
} from "../types/users.types";

function useUsers(
    params: UserSearchParams = {}
) {

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({

        queryKey: [
            "admin-users",
            params,
        ],

        queryFn: () =>
            usersService.searchUsers(
                params
            ),

        enabled:
            Object.values(params).some(
                (value) =>
                    value &&
                    value.trim().length > 0
            ),

    });

    return {

        users:
            data?.users ?? [],

        isLoading,

        isError,

        refetch,

    };

}

export default useUsers;