import driverRepository from "./driver.repository.js";
import { CreateDriverDto, UpdateDriverDto } from "./driver.types.js";

class DriverService {
    async createDriver(data: CreateDriverDto) {
        const existingDriver = await driverRepository.findDriverByUserId(
            data.userId
        );

        if (existingDriver) {
            throw new Error("Driver profile already exists");
        }

        const pricePerDay = data.pricePerHour * 5;

        const driver = await driverRepository.createDriver({
            user: {
                connect: {
                    id: data.userId,
                },
            },

            fullName: data.fullName,
            phone: data.phone,
            bio: data.bio,

            city: data.city,
            experience: data.experience,

            vehicleType: data.vehicleType,
            vehicleBrand: data.vehicleBrand,
            vehicleModel: data.vehicleModel,
            vehicleNumber: data.vehicleNumber,
            vehicleColor: data.vehicleColor,
            seatCapacity: data.seatCapacity,
            airConditioned: data.airConditioned,

            pricePerHour: data.pricePerHour,
            pricePerDay,
        });

        return {
            message: "Driver created successfully",
            driver,
        };
    }

    async getDriverById(id: string) {
        const driver = await driverRepository.findDriverById(id);

        if (!driver) {
            throw new Error("Driver not found");
        }

        return driver;
    }

    async getAllDrivers() {
        return driverRepository.getAllDrivers();
    }

    async getDriversByCity(city: string) {
        const formattedCity =
            city.trim().charAt(0).toUpperCase() +
            city.trim().slice(1).toLowerCase();

        return driverRepository.getDriversByCity(formattedCity);
    }

   async getMyDriver(userId: string) {
    const driver =
        await driverRepository.getMyDriver(
            userId
        );

    const user =
        await driverRepository.findUserById(
            userId
        );

    if (!user) {
        throw new Error("User not found");
    }

    return {
        driver,
        user: {
            id: user.id,
            fullName: `${user.firstName} ${user.lastName}`,
            phone: user.phone,
            email: user.email,
        },
    };
}

    async updateMyProfile(
    userId: string,
    data: UpdateDriverDto
) {
    const updateData: any = {};

    if (data.bio !== undefined) {
        updateData.bio = data.bio;
    }

    if (data.city !== undefined) {
        updateData.city = data.city;
    }

    if (data.experience !== undefined) {
        updateData.experience = data.experience;
    }

    if (data.pricePerHour !== undefined) {
        updateData.pricePerHour = data.pricePerHour;
        updateData.pricePerDay = data.pricePerHour * 5;
    }

    return driverRepository.updateMyProfile(
        userId,
        updateData
    );
}    async updateDriver(id: string, data: UpdateDriverDto) {
        const driver = await driverRepository.findDriverById(id);

        if (!driver) {
            throw new Error("Driver not found");
        }

        const updateData: any = {
            fullName: data.fullName,
            phone: data.phone,
            bio: data.bio,

            city: data.city,
            experience: data.experience,

            vehicleType: data.vehicleType,
            vehicleBrand: data.vehicleBrand,
            vehicleModel: data.vehicleModel,
            vehicleNumber: data.vehicleNumber,
            vehicleColor: data.vehicleColor,
            seatCapacity: data.seatCapacity,
            airConditioned: data.airConditioned,

            isAvailable: data.isAvailable,
            vacationMode: data.vacationMode,
            workingDays: data.workingDays,
            workingStartTime: data.workingStartTime,
            workingEndTime: data.workingEndTime,
        };

        if (data.pricePerHour !== undefined) {
            updateData.pricePerHour = data.pricePerHour;
            updateData.pricePerDay = data.pricePerHour * 5;
        }

        return driverRepository.updateDriver(id, updateData);
    }

    async getAvailability(userId: string) {
        const availability =
            await driverRepository.getAvailability(userId);

        if (!availability) {
            throw new Error("Driver not found");
        }

        return availability;
    }

    async updateAvailability(
        userId: string,
        data: UpdateDriverDto
    ) {
        const driver = await driverRepository.findDriverByUserId(
            userId
        );

        if (!driver) {
            throw new Error("Driver not found");
        }

        return driverRepository.updateAvailability(userId, {
            isAvailable: data.isAvailable,
            vacationMode: data.vacationMode,
            workingDays: data.workingDays,
            workingStartTime: data.workingStartTime,
            workingEndTime: data.workingEndTime,
        });
    }

    async getVehicleDetails(userId: string) {
        const vehicle =
            await driverRepository.getVehicleDetails(userId);

        if (!vehicle) {
            throw new Error("Driver not found");
        }

        return vehicle;
    }

    async updateVehicleDetails(
        userId: string,
        data: UpdateDriverDto
    ) {
        const driver = await driverRepository.findDriverByUserId(
            userId
        );

        if (!driver) {
            throw new Error("Driver not found");
        }

        return driverRepository.updateVehicleDetails(userId, {
            vehicleType: data.vehicleType,
            vehicleBrand: data.vehicleBrand,
            vehicleModel: data.vehicleModel,
            vehicleNumber: data.vehicleNumber,
            vehicleColor: data.vehicleColor,
            seatCapacity: data.seatCapacity,
            airConditioned: data.airConditioned,
        });
    }

    async deleteDriver(id: string) {
        const driver = await driverRepository.findDriverById(id);

        if (!driver) {
            throw new Error("Driver not found");
        }

        await driverRepository.deleteDriver(id);

        return {
            message: "Driver deleted successfully",
        };
    }
}

export default new DriverService();