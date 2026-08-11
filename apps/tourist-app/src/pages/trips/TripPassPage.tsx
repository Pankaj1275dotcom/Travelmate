import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";

import tripService from "../../services/trips/trip.service";

import useTrips from "../../hooks/useTrips";

import type {
    TripPass,
} from "../../types/booking.types";

function TripPassPage() {

    const {
        bookingId,
    } = useParams();

    const {
        trips,
    } = useTrips();

    const booking =
        useMemo(

            () =>

                trips.find(

                    (

                        trip

                    ) =>

                        trip.id ===
                        bookingId

                ),

            [

                bookingId,

                trips,

            ]

        );

    const [

        tripPass,

        setTripPass,

    ] =
        useState<TripPass | null>(

            null

        );

    const [

        loading,

        setLoading,

    ] =
        useState(true);

    const [

        regeneratingOtp,

        setRegeneratingOtp,

    ] =
        useState(false);

    const [

        regeneratingQr,

        setRegeneratingQr,

    ] =
        useState(false);

    async function loadTripPass() {

        if (

            !bookingId

        ) {

            return;

        }

        try {

            setLoading(
                true
            );

            const response =
                await tripService.getTripPass(
                    bookingId
                );

            setTripPass(
                response.pass
            );

        } catch (

            error: any

        ) {

            toast.error(

                error?.response?.data?.message ??

                "Unable to load trip pass."

            );

        } finally {

            setLoading(
                false
            );

        }

    }

    useEffect(

        () => {

            loadTripPass();

        },

        [

            bookingId,

        ]

    );

    function formatCountdown(
        value: string | null
    ) {

        if (

            !value

        ) {

            return "Expired";

        }

        const target =
            new Date(
                value
            );

        const now =
            new Date();

        const diff =
            target.getTime() -
            now.getTime();

        if (

            diff <= 0

        ) {

            return "Expired";

        }

        const hours =
            Math.floor(
                diff /
                    (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (
                    diff %
                    (1000 * 60 * 60)
                ) /
                    (1000 * 60)
            );

        return `${hours}h ${minutes}m`;

    }

    if (

        loading

    ) {

        return (

            <Layout>

                <div className="mx-auto max-w-7xl py-24 text-center">

                    Loading Trip Pass...

                </div>

            </Layout>

        );

    }

    if (

        !booking ||

        !tripPass

    ) {

        return (

            <Layout>

                <div className="mx-auto max-w-5xl py-24 text-center">

                    <h1 className="text-3xl font-bold">

                        Trip Pass Not Available

                    </h1>

                    <p className="mt-4 text-slate-500">

                        This booking does not have
                        a generated trip pass.

                    </p>

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

                            Digital Trip Pass

                        </h1>

                        <p className="mt-2 text-slate-500">

                            Booking #

                            {

                                booking.bookingNumber

                            }

                        </p>

                    </div>

                    <Link

                        to={`/trips/${booking.id}`}

                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"

                    >

                        Back To Trip

                    </Link>

                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-3">                <div className="lg:col-span-2 space-y-8">

                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-bold">

                                    Trip Information

                                </h2>

                                <p className="mt-2 text-slate-500">

                                    Present this pass before starting your trip.

                                </p>

                            </div>

                            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                {

                                    booking.tripStatus

                                }

                            </span>

                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                            <div>

                                <p className="text-sm text-slate-500">

                                    Booking Number

                                </p>

                                <p className="mt-1 font-semibold">

                                    {

                                        booking.bookingNumber

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

                        </div>

                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <div className="flex items-center justify-between">

                            <h2 className="text-2xl font-bold">

                                QR Verification

                            </h2>

                            <button

                                onClick={async () => {

                                    try {

                                        setRegeneratingQr(

                                            true

                                        );

                                        const response =
                                            await tripService.regenerateQr(

                                                booking.id

                                            );

                                        setTripPass(

                                            response.pass

                                        );

                                        toast.success(

                                            response.message

                                        );

                                    } catch (

                                        error: any

                                    ) {

                                        toast.error(

                                            error?.response?.data?.message ??

                                            "Unable to regenerate QR."

                                        );

                                    } finally {

                                        setRegeneratingQr(

                                            false

                                        );

                                    }

                                }}

                                disabled={

                                    regeneratingQr

                                }

                                className="rounded-xl border border-blue-600 px-5 py-2 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed"

                            >

                                {

                                    regeneratingQr

                                        ? "Generating..."

                                        : "Regenerate QR"

                                }

                            </button>

                        </div>

                        <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 p-8">

                            <p className="text-center text-sm text-slate-500">

                                QR Token

                            </p>

                            <p className="mt-5 break-all text-center font-mono text-lg font-semibold">

                                {

                                    tripPass.qrToken

                                }

                            </p>

                        </div>

                        <div className="mt-6">

                            <p className="text-sm text-slate-500">

                                QR Expires In

                            </p>

                            <p className="mt-2 text-xl font-bold text-orange-600">

                                {

                                    formatCountdown(

                                        tripPass.qrExpiresAt

                                    )

                                }

                            </p>

                        </div>

                    </div>                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <div className="flex items-center justify-between">

                            <h2 className="text-2xl font-bold">

                                OTP Verification

                            </h2>

                            <button

                                onClick={async () => {

                                    try {

                                        setRegeneratingOtp(
                                            true
                                        );

                                        const response =
                                            await tripService.regenerateOtp(
                                                booking.id
                                            );

                                        setTripPass(
                                            response.pass
                                        );

                                        toast.success(
                                            response.message
                                        );

                                    } catch (
                                        error: any
                                    ) {

                                        toast.error(

                                            error?.response?.data?.message ??

                                            "Unable to regenerate OTP."

                                        );

                                    } finally {

                                        setRegeneratingOtp(
                                            false
                                        );

                                    }

                                }}

                                disabled={
                                    regeneratingOtp
                                }

                                className="rounded-xl border border-blue-600 px-5 py-2 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed"

                            >

                                {

                                    regeneratingOtp

                                        ? "Generating..."

                                        : "Regenerate OTP"

                                }

                            </button>

                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">

                            <div className="rounded-2xl bg-slate-50 p-6">

                                <p className="text-sm text-slate-500">

                                    Start Trip OTP

                                </p>

                                <h3 className="mt-4 text-4xl font-bold tracking-[0.4em]">

                                    {

                                        tripPass.startOtp

                                    }

                                </h3>

                                <p className="mt-5 text-sm text-slate-500">

                                    Share this OTP with the Hotel,
                                    Guide or Driver to begin your
                                    booked service.

                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 p-6">

                                <p className="text-sm text-slate-500">

                                    Completion OTP

                                </p>

                                {

                                    booking.tripStatus ===
                                    "IN_PROGRESS"

                                        ? (

                                            <>

                                                <h3 className="mt-4 text-4xl font-bold tracking-[0.4em]">

                                                    {

                                                        tripPass.completionOtp

                                                    }

                                                </h3>

                                                <p className="mt-5 text-sm text-slate-500">

                                                    Give this OTP only after
                                                    every booked service has
                                                    been completed.

                                                </p>

                                            </>

                                        )

                                        : (

                                            <div className="mt-6 rounded-xl bg-yellow-50 p-4">

                                                <p className="text-sm font-medium text-yellow-700">

                                                    Completion OTP will be
                                                    available after the trip
                                                    has started.

                                                </p>

                                            </div>

                                        )

                                }

                            </div>

                        </div>

                        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                            <div className="flex items-center justify-between">

                                <p className="font-semibold">

                                    OTP Validity

                                </p>

                                <span className="text-lg font-bold text-blue-700">

                                    {

                                        formatCountdown(

                                            tripPass.otpExpiresAt

                                        )

                                    }

                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <h2 className="text-2xl font-bold">

                            Verification Timeline

                        </h2>

                        <div className="mt-8 space-y-6">

                            {

                                booking.tripTimeline.map(

                                    (

                                        event

                                    ) => (

                                        <div

                                            key={event.id}

                                            className="flex gap-4"

                                        >

                                            <div className="mt-1 h-3 w-3 rounded-full bg-blue-600" />

                                            <div className="flex-1">

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

                                        </div>

                                    )

                                )

                            }

                        </div>

                    </div>

                </div>                <div>

                    <div className="sticky top-24 space-y-6">

                        <div className="rounded-3xl bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold">

                                Trip Status

                            </h2>

                            <div className="mt-6 space-y-4">

                                <div className="flex justify-between">

                                    <span className="text-slate-500">

                                        Booking Status

                                    </span>

                                    <span className="font-semibold">

                                        {

                                            booking.status

                                        }

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-slate-500">

                                        Trip Status

                                    </span>

                                    <span className="font-semibold text-blue-600">

                                        {

                                            booking.tripStatus

                                        }

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-slate-500">

                                        Payment

                                    </span>

                                    <span className="font-semibold text-green-600">

                                        {

                                            booking.paymentStatus

                                        }

                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold">

                                Services

                            </h2>

                            <div className="mt-6 space-y-5">

                                {

                                    booking.items.map(

                                        (

                                            item

                                        ) => (

                                            <div

                                                key={item.id}

                                                className="rounded-xl border p-4"

                                            >

                                                <div className="flex items-center justify-between">

                                                    <span className="font-semibold">

                                                        {

                                                            item.bookingType

                                                        }

                                                    </span>

                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">

                                                        {

                                                            item.status

                                                        }

                                                    </span>

                                                </div>

                                                {

                                                    item.room && (

                                                        <p className="mt-3 text-sm text-slate-600">

                                                            {

                                                                item.room

                                                                    .roomType

                                                                    .hotel

                                                                    .name

                                                            }

                                                        </p>

                                                    )

                                                }

                                                {

                                                    item.guide && (

                                                        <p className="mt-3 text-sm text-slate-600">

                                                            {

                                                                item.guide

                                                                    .fullName

                                                            }

                                                        </p>

                                                    )

                                                }

                                                {

                                                    item.driver && (

                                                        <p className="mt-3 text-sm text-slate-600">

                                                            {

                                                                item.driver

                                                                    .fullName

                                                            }

                                                        </p>

                                                    )

                                                }

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        </div>

                        {
    (booking.tripVerifications ?? []).length > 0 && (

        <div className="rounded-3xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">

                Verification History

            </h2>

            <div className="mt-6 space-y-4">

                {

                    (booking.tripVerifications ?? []).map(

                        (

                            verification

                        ) => (

                            <div

                                key={verification.id}

                                className="rounded-xl border p-4"

                            >

                                <div className="flex items-center justify-between">

                                    <span className="font-semibold">

                                        {

                                            verification.verificationType

                                        }

                                    </span>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                                        {

                                            verification.verificationStatus

                                        }

                                    </span>

                                </div>

                                <p className="mt-3 text-sm text-slate-600">

                                    Verified By :

                                    {" "}

                                    {

                                        verification.verifiedBy

                                    }

                                </p>

                                {

                                    verification.verifiedAt && (

                                        <p className="mt-2 text-xs text-slate-400">

                                            {

                                                new Date(

                                                    verification.verifiedAt

                                                ).toLocaleString()

                                            }

                                        </p>

                                    )

                                }

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

export default TripPassPage;