import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import guideService from "../services/guide/guide.service";

import type {
    CreateGuideRequest,
    UpdateGuideRequest,
    UpdateGuideAvailabilityRequest,
} from "../types/guide.types";

function useGuide() {
    const myGuideQuery = useQuery({
        queryKey: ["my-guide"],
        queryFn: () =>
            guideService.getMyGuide(),
    });

    const guidesQuery = useQuery({
        queryKey: ["guides"],
        queryFn: () =>
            guideService.getAllGuides(),
    });

    const availabilityQuery = useQuery({
        queryKey: ["guide-availability"],
        queryFn: () =>
            guideService.getAvailability(),
        enabled: !!myGuideQuery.data,
    });

    const createGuideMutation =
        useMutation({
            mutationFn: (
                data: CreateGuideRequest
            ) =>
                guideService.createGuide(
                    data
                ),

            onSuccess: () => {
                toast.success(
                    "Guide profile created successfully"
                );

                myGuideQuery.refetch();

                guidesQuery.refetch();
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Failed to create guide profile"
                );
            },
        });

    const updateGuideMutation =
        useMutation({
            mutationFn: (
                data: UpdateGuideRequest
            ) => {
                const guide =
                    myGuideQuery.data?.guide;

                if (!guide) {
                    throw new Error(
                        "Guide profile not found"
                    );
                }

                return guideService.updateGuide(
                    guide.id,
                    data
                );
            },

            onSuccess: () => {
                toast.success(
                    "Profile updated successfully"
                );

                myGuideQuery.refetch();

                guidesQuery.refetch();
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        error.message ??
                        "Failed to update profile"
                );
            },
        });

    const updateAvailabilityMutation =
        useMutation({
            mutationFn: (
                data: UpdateGuideAvailabilityRequest
            ) =>
                guideService.updateAvailability(
                    data
                ),

            onSuccess: () => {
                toast.success(
                    "Availability updated successfully"
                );

                availabilityQuery.refetch();

                myGuideQuery.refetch();

                guidesQuery.refetch();
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Failed to update availability"
                );
            },
        });

    return {
        myGuide:
            myGuideQuery.data?.guide ??
            null,

        registeredUser:
            myGuideQuery.data?.user ??
            null,

        availability:
            availabilityQuery.data
                ?.availability ??
            null,

        guides:
            guidesQuery.data?.guides ??
            [],

        isLoading:
            myGuideQuery.isLoading,

        isFetching:
            myGuideQuery.isFetching,

        isAvailabilityLoading:
            availabilityQuery.isLoading,

        createGuide:
            createGuideMutation.mutate,

        updateGuide:
            updateGuideMutation.mutate,

        updateAvailability:
            updateAvailabilityMutation.mutate,

        isCreating:
            createGuideMutation.isPending,

        isUpdating:
            updateGuideMutation.isPending,

        isUpdatingAvailability:
            updateAvailabilityMutation.isPending,

        refetchGuides:
            guidesQuery.refetch,

        refetchMyGuide:
            myGuideQuery.refetch,

        refetchAvailability:
            availabilityQuery.refetch,
    };
}

export default useGuide;