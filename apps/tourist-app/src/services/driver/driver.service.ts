import api from "../api/axios";
import { API } from "../../constants/api";

import type {
    Driver,
    CreateDriverRequest,
    UpdateDriverRequest,
} from "../../types/driver.types";

interface DriversResponse {
    success: boolean;
    count: number;
    drivers: Driver[];
}

interface DriverResponse {
    success: boolean;
    driver: Driver;
}

interface CreateDriverResponse {
    success: boolean;
    message: string;
    driver: Driver;
}

interface UpdateDriverResponse {
    success: boolean;
    message: string;
    driver: Driver;
}

interface DeleteDriverResponse {
    success: boolean;
    message: string;
}

class DriverService {
    async getAllDrivers(): Promise<DriversResponse> {
        const response = await api.get<DriversResponse>(
            API.DRIVERS
        );

        return response.data;
    }

    async getDriverById(
        driverId: string
    ): Promise<DriverResponse> {
        const response = await api.get<DriverResponse>(
            `${API.DRIVERS}/${driverId}`
        );

        return response.data;
    }

    async getDriversByCity(
        city: string
    ): Promise<DriversResponse> {
        const response = await api.get<DriversResponse>(
            `${API.DRIVERS}/city/${city}`
        );

        return response.data;
    }

    async createDriver(
        data: CreateDriverRequest
    ): Promise<CreateDriverResponse> {
        const response =
            await api.post<CreateDriverResponse>(
                API.DRIVERS,
                data
            );

        return response.data;
    }

    async updateDriver(
        driverId: string,
        data: UpdateDriverRequest
    ): Promise<UpdateDriverResponse> {
        const response =
            await api.put<UpdateDriverResponse>(
                `${API.DRIVERS}/${driverId}`,
                data
            );

        return response.data;
    }

    async deleteDriver(
        driverId: string
    ): Promise<DeleteDriverResponse> {
        const response =
            await api.delete<DeleteDriverResponse>(
                `${API.DRIVERS}/${driverId}`
            );

        return response.data;
    }
}

const driverService = new DriverService();

export default driverService;