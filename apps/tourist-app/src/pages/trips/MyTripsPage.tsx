import {
    useMemo,
} from "react";

import {
    Link,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import useTrips from "../../hooks/useTrips";

import { ROUTES } from "../../constants/routes";

function MyTripsPage() {

    const {

        trips,

        isLoading,

    } = useTrips();

    const upcomingTrips =
        useMemo(

            () =>

                trips.filter(

                    (

                        booking

                    ) => {

                        const now =
                            new Date();

                        const tripStart =
                            new Date(
                                booking.startDate
                            );

                        return (

                            booking.status ===
                                "CONFIRMED" &&

                            tripStart >
                                now

                        );

                    }

                ),

            [trips]

        );

    const activeTrips =
        useMemo(

            () =>

                trips.filter(

                    (

                        booking

                    ) =>

                        booking.status ===
                            "IN_PROGRESS"

                ),

            [trips]

        );

    const completedTrips =
        useMemo(

            () =>

                trips.filter(

                    (

                        booking

                    ) =>

                        booking.status ===
                            "COMPLETED"

                ),

            [trips]

        );

    const cancelledTrips =
        useMemo(

            () =>

                trips.filter(

                    (

                        booking

                    ) =>

                        booking.status ===
                            "CANCELLED"

                ),

            [trips]

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

            return "Trip Started";

        }

        const minutes =
            Math.floor(

                difference /

                    1000 /

                    60

            );

        const hours =
            Math.floor(

                minutes / 60

            );

        const days =
            Math.floor(

                hours / 24

            );

        if (

            days > 0

        ) {

            return `${days} Day${
                days > 1
                    ? "s"
                    : ""
            } To Go`;

        }

        if (

            hours > 0

        ) {

            return `${hours} Hour${
                hours > 1
                    ? "s"
                    : ""
            } To Go`;

        }

        return `${minutes} Minute${
            minutes > 1
                ? "s"
                : ""
        } To Go`;

    }

    if (

        isLoading

    ) {

        return (

            <Layout>

                <div className="mx-auto max-w-7xl py-20 text-center">

                    Loading trips...

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <section className="mx-auto max-w-7xl px-4 py-10">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">

                            My Trips

                        </h1>

                        <p className="mt-3 text-slate-500">

                            Track every confirmed,
                            upcoming and completed
                            journey from one place.

                        </p>

                    </div>

                    <Link

                        to={ROUTES.HOTELS}

                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

                    >

                        Book New Trip

                    </Link>

                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <p className="text-sm text-slate-500">

                            Upcoming

                        </p>

                        <h2 className="mt-2 text-4xl font-bold">

                            {

                                upcomingTrips.length

                            }

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <p className="text-sm text-slate-500">

                            Active

                        </p>

                        <h2 className="mt-2 text-4xl font-bold">

                            {

                                activeTrips.length

                            }

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <p className="text-sm text-slate-500">

                            Completed

                        </p>

                        <h2 className="mt-2 text-4xl font-bold">

                            {

                                completedTrips.length

                            }

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <p className="text-sm text-slate-500">

                            Cancelled

                        </p>

                        <h2 className="mt-2 text-4xl font-bold">

                            {

                                cancelledTrips.length

                            }

                        </h2>

                    </div>

                </div>

                <div className="mt-10 space-y-8">                {

                    trips.length === 0 && (

                        <div className="mt-10 rounded-3xl bg-white p-16 text-center shadow-sm">

                            <h2 className="text-3xl font-bold">

                                No Trips Yet

                            </h2>

                            <p className="mt-4 text-slate-500">

                                Your confirmed trips will appear here
                                after successful payment.

                            </p>

                        </div>

                    )

                }

                {

                    trips.map(

                        (

                            booking

                        ) => (

                            <div

                                key={booking.id}

                                className="rounded-3xl bg-white shadow-sm"

                            >

                                <div className="border-b p-8">

                                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                                        <div>

                                            <h2 className="text-2xl font-bold">

                                                {

                                                    booking.bookingNumber

                                                }

                                            </h2>

                                            <p className="mt-2 text-slate-500">

                                                {

                                                    new Date(

                                                        booking.startDate

                                                    ).toLocaleDateString()

                                                }

                                                {" - "}

                                                {

                                                    new Date(

                                                        booking.endDate

                                                    ).toLocaleDateString()

                                                }

                                            </p>

                                        </div>

                                        <div className="flex flex-wrap gap-3">

                                            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                                {

                                                    booking.status

                                                }

                                            </span>

                                            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                                {

                                                    booking.paymentStatus

                                                }

                                            </span>

                                        </div>

                                    </div>

                                    <div className="mt-8 grid gap-5 md:grid-cols-4">

                                        <div>

                                            <p className="text-sm text-slate-500">

                                                Total Amount

                                            </p>

                                            <p className="mt-1 text-xl font-bold">

                                                ₹{

                                                    booking.payableAmount

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

                                                Countdown

                                            </p>

                                            <p className="mt-1 font-bold text-blue-600">

                                                {

                                                    getCountdown(

                                                        booking.startDate

                                                    )

                                                }

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="space-y-5 p-8">

                                    {

                                        booking.items.map(

                                            (

                                                item

                                            ) => (

                                                <div

                                                    key={item.id}

                                                    className="rounded-2xl border border-slate-200 p-6"

                                                >                                                    {

                                                        item.room && (

                                                            <div>

                                                                <div className="flex items-center justify-between">

                                                                    <h3 className="text-xl font-bold">

                                                                        Hotel Booking

                                                                    </h3>

                                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">

                                                                        {

                                                                            item.status

                                                                        }

                                                                    </span>

                                                                </div>

                                                                <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

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

                                                                            Location

                                                                        </p>

                                                                        <p className="mt-1 font-semibold">

                                                                            {

                                                                                item.room

                                                                                    .roomType

                                                                                    .hotel

                                                                                    .city

                                                                            }

                                                                            {", "}

                                                                            {

                                                                                item.room

                                                                                    .roomType

                                                                                    .hotel

                                                                                    .state

                                                                            }

                                                                        </p>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        )

                                                    }

                                                    {

                                                        item.guide && (

                                                            <div className="mt-8">

                                                                <div className="flex items-center justify-between">

                                                                    <h3 className="text-xl font-bold">

                                                                        Guide

                                                                    </h3>

                                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">

                                                                        {

                                                                            item.status

                                                                        }

                                                                    </span>

                                                                </div>

                                                                <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                                                                    <div>

                                                                        <p className="text-sm text-slate-500">

                                                                            Name

                                                                        </p>

                                                                        <p className="mt-1 font-semibold">

                                                                            {

                                                                                item.guide

                                                                                    .fullName

                                                                            }

                                                                        </p>

                                                                    </div>

                                                                    <div>

                                                                        <p className="text-sm text-slate-500">

                                                                            Phone

                                                                        </p>

                                                                        <p className="mt-1 font-semibold">

                                                                            {

                                                                                item.guide

                                                                                    .phone

                                                                            }

                                                                        </p>

                                                                    </div>

                                                                    <div>

                                                                        <p className="text-sm text-slate-500">

                                                                            Experience

                                                                        </p>

                                                                        <p className="mt-1 font-semibold">

                                                                            {

                                                                                item.guide

                                                                                    .experience

                                                                            }

                                                                            {" Years"}

                                                                        </p>

                                                                    </div>

                                                                    <div>

                                                                        <p className="text-sm text-slate-500">

                                                                            Languages

                                                                        </p>

                                                                        <p className="mt-1 font-semibold">

                                                                            {
    Array.isArray(
        item.guide.languages
    )
        ? item.guide.languages.join(", ")
        : item.guide.languages
}

                                                                        </p>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        )

                                                    }

                                                    {

                                                        item.driver && (

                                                            <div className="mt-8">

                                                                <div className="flex items-center justify-between">

                                                                    <h3 className="text-xl font-bold">

                                                                        Driver

                                                                    </h3>

                                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">

                                                                        {

                                                                            item.status

                                                                        }

                                                                    </span>

                                                                </div>

                                                                <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">                                                                    <div>

                                                                        <p className="text-sm text-slate-500">

                                                                            Name

                                                                        </p>

                                                                        <p className="mt-1 font-semibold">

                                                                            {

                                                                                item.driver

                                                                                    .fullName

                                                                            }

                                                                        </p>

                                                                    </div>

                                                                    <div>

                                                                        <p className="text-sm text-slate-500">

                                                                            Phone

                                                                        </p>

                                                                        <p className="mt-1 font-semibold">

                                                                            {

                                                                                item.driver

                                                                                    .phone

                                                                            }

                                                                        </p>

                                                                    </div>

                                                                    <div>

                                                                        <p className="text-sm text-slate-500">

                                                                            Vehicle

                                                                        </p>

                                                                        <p className="mt-1 font-semibold">

                                                                            {

                                                                                item.driver

                                                                                    .vehicleBrand

                                                                            }

                                                                            {" "}

                                                                            {

                                                                                item.driver

                                                                                    .vehicleModel

                                                                            }

                                                                        </p>

                                                                    </div>

                                                                    <div>

                                                                        <p className="text-sm text-slate-500">

                                                                            Vehicle Number

                                                                        </p>

                                                                        <p className="mt-1 font-semibold">

                                                                            {

                                                                                item.driver

                                                                                    .vehicleNumber

                                                                            }

                                                                        </p>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        )

                                                    }

                                                    <div className="mt-8 border-t pt-6">

                                                        <div className="grid gap-5 md:grid-cols-4">

                                                            <div>

                                                                <p className="text-sm text-slate-500">

                                                                    Booking Type

                                                                </p>

                                                                <p className="mt-1 font-semibold">

                                                                    {

                                                                        item.bookingType

                                                                    }

                                                                </p>

                                                            </div>

                                                            <div>

                                                                <p className="text-sm text-slate-500">

                                                                    Item Status

                                                                </p>

                                                                <p className="mt-1 font-semibold">

                                                                    {

                                                                        item.status

                                                                    }

                                                                </p>

                                                            </div>

                                                            <div>

                                                                <p className="text-sm text-slate-500">

                                                                    Payment

                                                                </p>

                                                                <p className="mt-1 font-semibold">

                                                                    {

                                                                        item.paymentStatus

                                                                    }

                                                                </p>

                                                            </div>

                                                            <div>

                                                                <p className="text-sm text-slate-500">

                                                                    Amount

                                                                </p>

                                                                <p className="mt-1 font-bold text-green-600">

                                                                    ₹

                                                                    {

                                                                        item.totalPrice

                                                                    }

                                                                </p>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            )

                                        )

                                    }

                                    <div className="mt-8 flex flex-wrap gap-4">

                                        <Link

                                            to={`/trips/${booking.id}`}

                                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

                                        >

                                            View Details

                                        </Link>

                                        <Link

                                            to={`/trips/${booking.id}/pass`}

                                            className="rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"

                                        >

                                            Trip Pass

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        )

                    )

                }

                </div>

            </section>

        </Layout>

    );

}

export default MyTripsPage;