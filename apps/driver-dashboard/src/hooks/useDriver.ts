import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import driverService from "../services/driver/driver.service";

import type {
    CreateDriverRequest,
    UpdateDriverAvailabilityRequest,
    UpdateDriverRequest,
    UpdateVehicleRequest,
} from "../types/driver.types";

function useDriver() {
    const profileQuery = useQuery({
        queryKey: ["driver-profile"],
        queryFn: () =>
            driverService.getMyDriver(),
    });

    const availabilityQuery = useQuery({
        queryKey: ["driver-availability"],
        queryFn: () =>
            driverService.getAvailability(),
        enabled: !!profileQuery.data,
    });

    const vehicleQuery = useQuery({
        queryKey: ["driver-vehicle"],
        queryFn: () =>
            driverService.getVehicle(),
        enabled: !!profileQuery.data,
    });

    const createDriverMutation = useMutation({
        mutationFn: (
            data: CreateDriverRequest
        ) =>
            driverService.createDriver(
                data
            ),

        onSuccess: () => {
            toast.success(
                "Driver profile created successfully"
            );

            profileQuery.refetch();
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data
                    ?.message ??
                    "Failed to create driver profile"
            );
        },
    });

    const updateProfileMutation =
        useMutation({
            mutationFn: (
                data: UpdateDriverRequest
            ) =>
                driverService.updateMyProfile(
                    data
                ),

            onSuccess: () => {
                toast.success(
                    "Profile updated successfully"
                );

                profileQuery.refetch();
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Failed to update profile"
                );
            },
        });

    const updateAvailabilityMutation =
        useMutation({
            mutationFn: (
                data: UpdateDriverAvailabilityRequest
            ) =>
                driverService.updateAvailability(
                    data
                ),

            onSuccess: () => {
                toast.success(
                    "Availability updated successfully"
                );

                availabilityQuery.refetch();
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Failed to update availability"
                );
            },
        });

    const updateVehicleMutation =
        useMutation({
            mutationFn: (
                data: UpdateVehicleRequest
            ) =>
                driverService.updateVehicle(
                    data
                ),

            onSuccess: () => {
                toast.success(
                    "Vehicle details updated successfully"
                );

                vehicleQuery.refetch();
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Failed to update vehicle details"
                );
            },
        });

    return {
        driver:
            profileQuery.data?.driver ??
            null,

        registeredUser:
            profileQuery.data?.user ??
            null,

        availability:
            availabilityQuery.data
                ?.availability ?? null,

        vehicle:
            vehicleQuery.data?.vehicle ??
            null,

        isLoading:
            profileQuery.isLoading,

        isAvailabilityLoading:
            availabilityQuery.isLoading,

        isVehicleLoading:
            vehicleQuery.isLoading,

        createDriver:
            createDriverMutation.mutate,

        updateProfile:
            updateProfileMutation.mutate,

        updateAvailability:
            updateAvailabilityMutation.mutate,

        updateVehicle:
            updateVehicleMutation.mutate,

        isCreating:
            createDriverMutation.isPending,

        isUpdating:
            updateProfileMutation.isPending,

        isUpdatingAvailability:
            updateAvailabilityMutation.isPending,

        isUpdatingVehicle:
            updateVehicleMutation.isPending,

        refetchProfile:
            profileQuery.refetch,

        refetchAvailability:
            availabilityQuery.refetch,

        refetchVehicle:
            vehicleQuery.refetch,
    };
}

export default useDriver;