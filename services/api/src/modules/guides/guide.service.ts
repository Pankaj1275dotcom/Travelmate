import guideRepository from "./guide.repository.js";

import {
    CreateGuideDto,
    UpdateGuideDto,
    UpdateGuideAvailabilityDto,
} from "./guide.types.js";


class GuideService {

    async createGuide(
        data: CreateGuideDto
    ) {

        const existingGuide =
            await guideRepository.findGuideByUserId(
                data.userId
            );


        if (existingGuide) {

            throw new Error(
                "Guide profile already exists"
            );

        }


        const pricePerDay =
            data.pricePerHour * 5;


        const guide =
            await guideRepository.createGuide({

                user: {
                    connect: {
                        id: data.userId,
                    },
                },

                fullName:
                    data.fullName,

                phone:
                    data.phone,

                bio:
                    data.bio,

                city:
                    data.city,

                experience:
                    data.experience,

                languages:
                    data.languages,

                pricePerHour:
                    data.pricePerHour,

                pricePerDay,

            });


        return {

            message:
                "Guide created successfully",

            guide,

        };

    }


    async getMyGuide(
        userId: string
    ) {

        const guide =
            await guideRepository.findGuideByUserId(
                userId
            );


        const user =
            await guideRepository.findUserById(
                userId
            );


        if (!user) {

            throw new Error(
                "User not found"
            );

        }


        return {

            guide,

            user: {

                id:
                    user.id,

                fullName:
                    `${user.firstName} ${user.lastName}`,

                phone:
                    user.phone,

                email:
                    user.email,

            },

        };

    }


    async getAvailability(
        userId: string
    ) {

        const guide =
            await guideRepository.getAvailability(
                userId
            );


        if (!guide) {

            throw new Error(
                "Guide not found"
            );

        }


        return guide;

    }


    async updateAvailability(
        userId: string,
        data: UpdateGuideAvailabilityDto
    ) {

        const guide =
            await guideRepository.findGuideByUserId(
                userId
            );


        if (!guide) {

            throw new Error(
                "Guide not found"
            );

        }


        return guideRepository.updateAvailability(
            userId,
            data
        );

    }


    async getGuideById(
        id: string
    ) {

        const guide =
            await guideRepository.findGuideById(
                id
            );


        if (!guide) {

            throw new Error(
                "Guide not found"
            );

        }


        return guide;

    }


    async getAllGuides() {

        return guideRepository.getAllGuides();

    }


    async getGuidesByCity(
        city: string
    ) {

        const formattedCity =
            city
                .trim()
                .charAt(0)
                .toUpperCase() +

            city
                .trim()
                .slice(1)
                .toLowerCase();


        return guideRepository.getGuidesByCity(
            formattedCity
        );

    }


    async updateGuide(
        id: string,
        data: UpdateGuideDto
    ) {

        const guide =
            await guideRepository.findGuideById(
                id
            );


        if (!guide) {

            throw new Error(
                "Guide not found"
            );

        }


        const updateData: any = {

            fullName:
                data.fullName,

            phone:
                data.phone,

            bio:
                data.bio,

            city:
                data.city,

            experience:
                data.experience,

            languages:
                data.languages,

        };


        if (
            data.pricePerHour !==
            undefined
        ) {

            updateData.pricePerHour =
                data.pricePerHour;

            updateData.pricePerDay =
                data.pricePerHour * 5;

        }


        return guideRepository.updateGuide(
            id,
            updateData
        );

    }


    async deleteGuide(
        id: string
    ) {

        const guide =
            await guideRepository.findGuideById(
                id
            );


        if (!guide) {

            throw new Error(
                "Guide not found"
            );

        }


        await guideRepository.deleteGuide(
            id
        );


        return {

            message:
                "Guide deleted successfully",

        };

    }


    async getGuideEarnings(
        userId: string
    ) {

        const earnings =
            await guideRepository.getGuideEarnings(
                userId
            );


        if (!earnings) {

            throw new Error(
                "Guide not found"
            );

        }


        const totalEarnings =
            earnings.reduce(

                (
                    total,
                    item
                ) =>
                    total +
                    Number(
                        item.providerAmount
                    ),

                0

            );


        const totalPlatformFee =
            earnings.reduce(

                (
                    total,
                    item
                ) =>
                    total +
                    Number(
                        item.platformFee
                    ),

                0

            );


        const totalBookingAmount =
            earnings.reduce(

                (
                    total,
                    item
                ) =>
                    total +
                    Number(
                        item.totalPrice
                    ),

                0

            );


        const currentDate =
            new Date();


        const currentMonth =
            currentDate.getMonth();


        const currentYear =
            currentDate.getFullYear();


        const thisMonthEarnings =
            earnings.reduce(

                (
                    total,
                    item
                ) => {

                    if (
                        !item.paidAt
                    ) {
                        return total;
                    }


                    const paidDate =
                        new Date(
                            item.paidAt
                        );


                    if (
                        paidDate.getMonth() ===
                            currentMonth &&

                        paidDate.getFullYear() ===
                            currentYear
                    ) {

                        return (
                            total +
                            Number(
                                item.providerAmount
                            )
                        );

                    }


                    return total;

                },

                0

            );


        return {

            totalEarnings,

            thisMonthEarnings,

            totalPlatformFee,

            totalBookingAmount,

            paidBookings:
                earnings.length,

            earnings,

        };

    }

}


export default new GuideService();