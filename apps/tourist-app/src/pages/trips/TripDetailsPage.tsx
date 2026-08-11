import {
    useMemo,
} from "react";

import {
    Link,
    useParams,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import useTrips from "../../hooks/useTrips";

import { ROUTES } from "../../constants/routes";

function TripDetailsPage() {

    const {

        bookingId,

    } = useParams();

    const {

        trips,

        isLoading,

    } = useTrips();

    const booking =
        useMemo(

            () =>

                trips.find(

                    (

                        item

                    ) =>

                        item.id ===
                        bookingId

                ),

            [

                trips,

                bookingId,

            ]

        );

    function getCountdown(

        startDate: string

    ) {

        const now =
            new Date();

        const start =
            new Date(
                startDate
            );

        const difference =
            start.getTime() -
            now.getTime();

        if (

            difference <= 0

        ) {

            return {

                value:
                    "Trip Started",

                color:
                    "text-green-600",

            };

        }

        const minutes =
            Math.floor(

                difference /
                    1000 /
                    60

            );

        const hours =
            Math.floor(

                minutes /
                    60

            );

        const days =
            Math.floor(

                hours /
                    24

            );

        if (

            days > 0

        ) {

            return {

                value:
                    `${days} Day${days > 1 ? "s" : ""} To Go`,

                color:
                    "text-blue-600",

            };

        }

        if (

            hours > 0

        ) {

            return {

                value:
                    `${hours} Hour${hours > 1 ? "s" : ""} To Go`,

                color:
                    "text-orange-600",

            };

        }

        return {

            value:
                `${minutes} Minute${minutes > 1 ? "s" : ""} To Go`,

            color:
                "text-red-600",

        };

    }

    if (

        isLoading

    ) {

        return (

            <Layout>

                <div className="mx-auto max-w-7xl py-20 text-center">

                    Loading...

                </div>

            </Layout>

        );

    }

    if (

        !booking

    ) {

        return (

            <Layout>

                <div className="mx-auto max-w-5xl py-20 text-center">

                    <h1 className="text-3xl font-bold">

                        Trip Not Found

                    </h1>

                    <Link

                        to={ROUTES.BOOKINGS}

                        className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"

                    >

                        Back

                    </Link>

                </div>

            </Layout>

        );

    }

    const countdown =
        getCountdown(

            booking.startDate

        );

    return (

        <Layout>

            <section className="mx-auto max-w-7xl px-4 py-10">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Trip Details

                        </h1>

                        <p className="mt-2 text-slate-500">

                            Booking #

                            {

                                booking.bookingNumber

                            }

                        </p>

                    </div>

                    <Link

                        to={`/trips/${booking.id}/pass`}

                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

                    >

                        Open Trip Pass

                    </Link>

                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-4">                <div className="lg:col-span-3 space-y-6">

                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                            <div>

                                <h2 className="text-2xl font-bold">

                                    Trip Overview

                                </h2>

                                <p className="mt-2 text-slate-500">

                                    Complete information about your trip.

                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-sm text-slate-500">

                                    Trip Countdown

                                </p>

                                <h3

                                    className={`mt-2 text-3xl font-bold ${countdown.color}`}

                                >

                                    {

                                        countdown.value

                                    }

                                </h3>

                            </div>

                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                            <div>

                                <p className="text-sm text-slate-500">

                                    Start Date

                                </p>

                                <p className="mt-1 font-semibold">

                                    {

                                        new Date(

                                            booking.startDate

                                        ).toLocaleDateString()

                                    }

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">

                                    End Date

                                </p>

                                <p className="mt-1 font-semibold">

                                    {

                                        new Date(

                                            booking.endDate

                                        ).toLocaleDateString()

                                    }

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">

                                    Adults

                                </p>

                                <p className="mt-1 font-semibold">

                                    {

                                        booking.adults

                                    }

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">

                                    Children

                                </p>

                                <p className="mt-1 font-semibold">

                                    {

                                        booking.children

                                    }

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">

                                    Booking Status

                                </p>

                                <p className="mt-1 font-semibold">

                                    {

                                        booking.status

                                    }

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">

                                    Payment Status

                                </p>

                                <p className="mt-1 font-semibold text-green-600">

                                    {

                                        booking.paymentStatus

                                    }

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">

                                    Total Amount

                                </p>

                                <p className="mt-1 text-xl font-bold">

                                    ₹

                                    {

                                        booking.totalAmount

                                    }

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">

                                    Paid Amount

                                </p>

                                <p className="mt-1 text-xl font-bold text-green-600">

                                    ₹

                                    {

                                        booking.payableAmount

                                    }

                                </p>

                            </div>

                        </div>

                        {

                            booking.specialRequest && (

                                <div className="mt-8 rounded-2xl bg-slate-50 p-5">

                                    <h3 className="font-semibold">

                                        Special Request

                                    </h3>

                                    <p className="mt-2 text-slate-600">

                                        {

                                            booking.specialRequest

                                        }

                                    </p>

                                </div>

                            )

                        }

                    </div>

                    {

                        booking.items.map(

                            (

                                item

                            ) => (

                                <div

                                    key={item.id}

                                    className="rounded-3xl bg-white p-8 shadow-sm"

                                >                                    {

                                        item.room && (

                                            <div>

                                                <div className="mb-6 flex items-center justify-between">

                                                    <h2 className="text-2xl font-bold">

                                                        Hotel Details

                                                    </h2>

                                                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                                        Hotel

                                                    </span>

                                                </div>

                                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Hotel

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.room

                                                                    .roomType

                                                                    .hotel

                                                                    .name

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Room Type

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.room

                                                                    .roomType

                                                                    .name

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Room Number

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.room

                                                                    .roomNumber

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Capacity

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.room

                                                                    .roomType

                                                                    .capacity

                                                            }

                                                            {" Guests"}

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            City

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.room

                                                                    .roomType

                                                                    .hotel

                                                                    .city

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            State

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.room

                                                                    .roomType

                                                                    .hotel

                                                                    .state

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Country

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.room

                                                                    .roomType

                                                                    .hotel

                                                                    .country

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Rating

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.room

                                                                    .roomType

                                                                    .hotel

                                                                    .rating

                                                            }

                                                            {" ⭐"}

                                                        </p>

                                                    </div>

                                                </div>

                                                <div className="mt-8 rounded-2xl bg-slate-50 p-6">

                                                    <h3 className="font-semibold">

                                                        Hotel Address

                                                    </h3>

                                                    <p className="mt-2 text-slate-600">

                                                        {

                                                            item.room

                                                                .roomType

                                                                .hotel

                                                                .address

                                                        }

                                                    </p>

                                                </div>

                                            </div>

                                        )

                                    }

                                    {

                                        item.guide && (

                                            <div className="mt-10">

                                                <div className="mb-6 flex items-center justify-between">

                                                    <h2 className="text-2xl font-bold">

                                                        Guide Details

                                                    </h2>

                                                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                                        Guide

                                                    </span>

                                                </div>

                                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Guide Name

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.guide.fullName

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Phone

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.guide.phone

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Experience

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.guide.experience

                                                            }

                                                            {" Years"}

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Rating

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.guide.rating

                                                            }

                                                            {" ⭐"}

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Languages

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.guide.languages.join(

                                                                    ", "

                                                                )

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Specialities

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.guide.specialties.join(

                                                                    ", "

                                                                )

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            City

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.guide.city

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Price

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            ₹

                                                            {

                                                                item.guide.pricePerDay

                                                            }

                                                            {" / Day"}

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        )

                                    }

                                    {

                                        item.driver && (

                                            <div className="mt-10">

                                                <div className="mb-6 flex items-center justify-between">

                                                    <h2 className="text-2xl font-bold">

                                                        Driver Details

                                                    </h2>

                                                    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">

                                                        Driver

                                                    </span>

                                                </div>

                                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Driver Name

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.driver.fullName

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Phone

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.driver.phone

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Vehicle

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.driver.vehicleBrand

                                                            }

                                                            {" "}

                                                            {

                                                                item.driver.vehicleModel

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Vehicle Number

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.driver.vehicleNumber

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Vehicle Type

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.driver.vehicleType

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Seat Capacity

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.driver.seatCapacity

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Air Conditioned

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            {

                                                                item.driver.airConditioned
                                                                    ? "Yes"
                                                                    : "No"

                                                            }

                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-slate-500">

                                                            Price

                                                        </p>

                                                        <p className="mt-1 font-semibold">

                                                            ₹

                                                            {

                                                                item.driver.pricePerDay

                                                            }

                                                            {" / Day"}

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        )

                                    }

                                </div>

                            )

                        )

                    }

                </div>                <div>

                    <div className="sticky top-24 space-y-6">

                        <div className="rounded-3xl bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold">

                                Payment Summary

                            </h2>

                            <div className="mt-6 space-y-4">

                                <div className="flex justify-between">

                                    <span className="text-slate-500">

                                        Booking Amount

                                    </span>

                                    <span>

                                        ₹{booking.totalAmount}

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-slate-500">

                                        Platform Fee

                                    </span>

                                    <span>

                                        ₹{booking.platformFee}

                                    </span>

                                </div>

                                <div className="flex justify-between border-t pt-4 text-lg font-bold">

                                    <span>

                                        Paid

                                    </span>

                                    <span className="text-green-600">

                                        ₹{booking.payableAmount}

                                    </span>

                                </div>

                                <div className="rounded-xl bg-green-50 p-4">

                                    <p className="text-sm font-medium text-green-700">

                                        Payment Status

                                    </p>

                                    <p className="mt-2 font-semibold">

                                        {

                                            booking.paymentStatus

                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold">

                                Quick Actions

                            </h2>

                            <div className="mt-6 space-y-3">

                                <Link

                                    to={`/trips/${booking.id}/pass`}

                                    className="block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"

                                >

                                    Open Trip Pass

                                </Link>

                                <Link

                                    to="/trips"

                                    className="block rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold transition hover:bg-slate-100"

                                >

                                    Back To Trips

                                </Link>

                            </div>

                        </div>

                        {

                            booking.tripTimeline.length > 0 && (

                                <div className="rounded-3xl bg-white p-6 shadow-sm">

                                    <h2 className="text-xl font-bold">

                                        Timeline

                                    </h2>

                                    <div className="mt-6 space-y-5">

                                        {

                                            booking.tripTimeline.map(

                                                (

                                                    event

                                                ) => (

                                                    <div

                                                        key={event.id}

                                                        className="border-l-4 border-blue-600 pl-4"

                                                    >

                                                        <h3 className="font-semibold">

                                                            {

                                                                event.title

                                                            }

                                                        </h3>

                                                        {

                                                            event.description && (

                                                                <p className="mt-1 text-sm text-slate-600">

                                                                    {

                                                                        event.description

                                                                    }

                                                                </p>

                                                            )

                                                        }

                                                        <p className="mt-2 text-xs text-slate-400">

                                                            {

                                                                new Date(

                                                                    event.createdAt

                                                                ).toLocaleString()

                                                            }

                                                        </p>

                                                    </div>

                                                )

                                            )

                                        }

                                    </div>

                                </div>

                            )

                        }

                    </div>

                </div>

            </div>

        </section>

    </Layout>

);

}

export default TripDetailsPage;