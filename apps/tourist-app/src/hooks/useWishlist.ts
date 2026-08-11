import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import wishlistService from "../services/wishlist/wishlist.service";

function useWishlist() {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["wishlist"],
        queryFn: () => wishlistService.getWishlist(),
    });

    const addWishlistMutation = useMutation({
        mutationFn: (hotelId: string) =>
            wishlistService.addToWishlist({
                hotelId,
            }),

        onSuccess: () => {
            toast.success("Added to wishlist");

            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                    "Unable to add to wishlist"
            );
        },
    });

    const removeWishlistMutation = useMutation({
        mutationFn: (hotelId: string) =>
            wishlistService.removeFromWishlist(
                hotelId
            ),

        onSuccess: () => {
            toast.success(
                "Removed from wishlist"
            );

            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                    "Unable to remove from wishlist"
            );
        },
    });

    const isWishlisted = (
        hotelId: string
    ) => {
        return (
            data?.wishlist.some(
                (item) =>
                    item.hotelId === hotelId
            ) ?? false
        );
    };

    const toggleWishlist = (
        hotelId: string
    ) => {
        if (isWishlisted(hotelId)) {
            removeWishlistMutation.mutate(
                hotelId
            );
        } else {
            addWishlistMutation.mutate(
                hotelId
            );
        }
    };

    return {
        wishlist: data?.wishlist ?? [],

        isWishlisted,

        toggleWishlist,

        isLoading:
            addWishlistMutation.isPending ||
            removeWishlistMutation.isPending,
    };
}

export default useWishlist;