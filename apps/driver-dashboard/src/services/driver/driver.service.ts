import api from "../api/axios";

import type {
    CreateDriverRequest,
    DriverAvailabilityResponse,
    DriverResponse,
    DriversResponse,
    MyDriverResponse,
    UpdateDriverAvailabilityRequest,
    UpdateDriverRequest,
    UpdateVehicleRequest,
    VehicleResponse,
} from "../../types/driver.types";

class DriverService {
    async createDriver(
        data: CreateDriverRequest
    ): Promise<DriverResponse> {
        const response =
            await api.post<DriverResponse>(
                "/drivers",
                data
            );

        return response.data;
    }

    async getDriverById(
        id: string
    ): Promise<DriverResponse> {
        const response =
            await api.get<DriverResponse>(
                `/drivers/${id}`
            );

        return response.data;
    }

    async getAllDrivers(): Promise<DriversResponse> {
        const response =
            await api.get<DriversResponse>(
                "/drivers"
            );

        return response.data;
    }

    // ==========================
    // Driver Dashboard
    // ==========================

    async getMyDriver(): Promise<MyDriverResponse> {
        const response =
            await api.get<MyDriverResponse>(
                "/drivers/me"
            );

        return response.data;
    }

    async updateMyProfile(
        data: UpdateDriverRequest
    ): Promise<DriverResponse> {
        const response =
            await api.put<DriverResponse>(
                "/drivers/me",
                data
            );

        return response.data;
    }

    async getAvailability(): Promise<DriverAvailabilityResponse> {
        const response =
            await api.get<DriverAvailabilityResponse>(
                "/drivers/me/availability"
            );

        return response.data;
    }

    async updateAvailability(
        data: UpdateDriverAvailabilityRequest
    ): Promise<DriverAvailabilityResponse> {
        const response =
            await api.put<DriverAvailabilityResponse>(
                "/drivers/me/availability",
                data
            );

        return response.data;
    }

    async getVehicle(): Promise<VehicleResponse> {
        const response =
            await api.get<VehicleResponse>(
                "/drivers/me/vehicle"
            );

        return response.data;
    }

    async updateVehicle(
        data: UpdateVehicleRequest
    ): Promise<VehicleResponse> {
        const response =
            await api.put<VehicleResponse>(
                "/drivers/me/vehicle",
                data
            );

        return response.data;
    }

    async deleteDriver(id: string) {
        const response =
            await api.delete(
                `/drivers/${id}`
            );

        return response.data;
    }
}

const driverService = new DriverService();

export default driverService;