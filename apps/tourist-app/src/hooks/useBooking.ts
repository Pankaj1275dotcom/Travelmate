import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import bookingService from "../services/booking/booking.service";

import type {
    CreateHotelBookingDto,
    CreateGuideBookingDto,
    CreateDriverBookingDto,
} from "../types/booking.types";

function useBooking() {

    const queryClient =
        useQueryClient();


const {
    data: cartData,
    isLoading: cartLoading,
} = useQuery({

    queryKey: ["cart"],

    queryFn: () =>
        bookingService.getMyCart(),

    refetchInterval: 5000,

    refetchIntervalInBackground: true,

    refetchOnWindowFocus: true,

});


    const {
        data: bookingsData,
        isLoading: bookingsLoading,
    } = useQuery({

        queryKey: ["bookings"],

        queryFn: () =>
            bookingService.getMyBookings(),

    });


    const addHotelMutation =
        useMutation({

            mutationFn: (
                data: CreateHotelBookingDto
            ) =>
                bookingService.addHotelToCart(
                    data
                ),

            onSuccess: () => {

                toast.success(
                    "Added to cart"
                );

                queryClient.invalidateQueries({
                    queryKey: ["cart"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??
                        "Unable to add hotel"

                );

            },

        });


    const addGuideMutation =
        useMutation({

            mutationFn: (
                data: CreateGuideBookingDto
            ) =>
                bookingService.addGuideToCart(
                    data
                ),

            onSuccess: () => {

                toast.success(
                    "Guide added to cart"
                );

                queryClient.invalidateQueries({
                    queryKey: ["cart"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??
                        "Unable to add guide"

                );

            },

        });


    const addDriverMutation =
        useMutation({

            mutationFn: (
                data: CreateDriverBookingDto
            ) =>
                bookingService.addDriverToCart(
                    data
                ),

            onSuccess: () => {

                toast.success(
                    "Driver added to cart"
                );

                queryClient.invalidateQueries({
                    queryKey: ["cart"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??
                        "Unable to add driver"

                );

            },

        });    const removeCartItemMutation =
        useMutation({

            mutationFn: (
                itemId: string
            ) =>
                bookingService.removeCartItem(
                    itemId
                ),

            onSuccess: () => {

                toast.success(
                    "Item removed from cart"
                );

                queryClient.invalidateQueries({
                    queryKey: ["cart"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??
                        "Unable to remove item"

                );

            },

        });


    const clearCartMutation =
        useMutation({

            mutationFn: () =>
                bookingService.clearCart(),

            onSuccess: () => {

                toast.success(
                    "Cart cleared"
                );

                queryClient.invalidateQueries({
                    queryKey: ["cart"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??
                        "Unable to clear cart"

                );

            },

        });


    const checkoutMutation =
        useMutation({

            mutationFn: () =>
                bookingService.checkoutCart(),

            onSuccess: () => {

                toast.success(
                    "Checkout completed"
                );

                queryClient.invalidateQueries({
                    queryKey: ["cart"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??
                        "Checkout failed"

                );

            },

        });


const createBookingMutation =
    useMutation({

        mutationFn: () =>
            bookingService.createBookingFromCart(),

        onSuccess: (data) => {

            toast.success(
                "Booking created successfully"
            );

            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });

            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            return data;

        },

        onError: (error: any) => {

            toast.error(

                error?.response?.data
                    ?.message ??
                    "Unable to create booking"

            );

        },

    });   
        
const cancelBookingMutation =
        useMutation({

            mutationFn: ({
                bookingId,
                reason,
            }: {
                bookingId: string;
                reason?: string;
            }) =>
                bookingService.cancelBooking(
                    bookingId,
                    reason
                ),

            onSuccess: () => {

                toast.success(
                    "Booking cancelled"
                );

                queryClient.invalidateQueries({
                    queryKey: ["bookings"],
                });

            },

            onError: (error: any) => {

                toast.error(

                    error?.response?.data
                        ?.message ??
                        "Unable to cancel booking"

                );

            },

        });


    const confirmBookingMutation =
        useMutation({

            mutationFn: (
                bookingId: string
            ) =>
                bookingService.confirmBooking(
                    bookingId
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: ["bookings"],
                });

            },

        });


return {

    cart:
        cartData?.cart ?? null,

    bookings:
        bookingsData?.bookings ?? [],

        cartLoading,

        bookingsLoading,

        addHotelToCart: (
    variables: CreateHotelBookingDto,
    options?: Parameters<
        typeof addHotelMutation.mutate
    >[1]
) =>
    addHotelMutation.mutate(
        variables,
        options
    ),

addGuideToCart: (
    variables: CreateGuideBookingDto,
    options?: Parameters<
        typeof addGuideMutation.mutate
    >[1]
) =>
    addGuideMutation.mutate(
        variables,
        options
    ),

addDriverToCart: (
    variables: CreateDriverBookingDto,
    options?: Parameters<
        typeof addDriverMutation.mutate
    >[1]
) =>
    addDriverMutation.mutate(
        variables,
        options
    ),

removeCartItem: (
    itemId: string,
    options?: Parameters<
        typeof removeCartItemMutation.mutate
    >[1]
) =>
    removeCartItemMutation.mutate(
        itemId,
        options
    ),

clearCart: (
    options?: Parameters<
        typeof clearCartMutation.mutate
    >[1]
) =>
    clearCartMutation.mutate(
        undefined,
        options
    ),

checkoutCart: (
    options?: Parameters<
        typeof checkoutMutation.mutate
    >[1]
) =>
    checkoutMutation.mutate(
        undefined,
        options
    ),

createBooking: (
    options?: Parameters<
        typeof createBookingMutation.mutate
    >[1]
) =>
    createBookingMutation.mutate(
        undefined,
        options
    ),

cancelBooking: (
    variables: {
        bookingId: string;
        reason?: string;
    },
    options?: Parameters<
        typeof cancelBookingMutation.mutate
    >[1]
) =>
    cancelBookingMutation.mutate(
        variables,
        options
    ),

confirmBooking: (
    bookingId: string,
    options?: Parameters<
        typeof confirmBookingMutation.mutate
    >[1]
) =>
    confirmBookingMutation.mutate(
        bookingId,
        options
    ),

        isLoading:

            addHotelMutation.isPending ||

            addGuideMutation.isPending ||

            addDriverMutation.isPending ||

            removeCartItemMutation.isPending ||

            clearCartMutation.isPending ||

            checkoutMutation.isPending ||

            createBookingMutation.isPending ||

            cancelBookingMutation.isPending ||

            confirmBookingMutation.isPending,

    };

}

export default useBooking;