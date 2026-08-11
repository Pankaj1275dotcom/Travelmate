import {
    useEffect,
    useMemo,
    useState,
} from "react";

import toast from "react-hot-toast";

import tripService from "../../services/trips/trip.service";

import type {
    Booking,
    BookingItem,
} from "../../types/booking.types";

function TripsPage() {

    const [
        trips,
        setTrips,
    ] = useState<Booking[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        tripStatus,
        setTripStatus,
    ] = useState("ALL");

    const [
        qrInputs,
        setQrInputs,
    ] = useState<
        Record<string, string>
    >({});

    const [
        otpInputs,
        setOtpInputs,
    ] = useState<
        Record<string, string>
    >({});

    async function loadTrips() {

        try {

            setLoading(true);

            const response =
                await tripService.getHotelTrips();

            setTrips(
                response.trips
            );

        } catch (error: any) {

            toast.error(

                error?.response?.data?.message ??

                "Unable to load hotel trips."

            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadTrips();

    }, []);

    async function verifyQr(
        bookingId: string,
        bookingItemId: string
    ) {

        const qrToken =
            qrInputs[
                bookingItemId
            ];

        if (!qrToken) {

            toast.error(
                "Please enter QR Token."
            );

            return;

        }

        try {

            const response =
                await tripService.verifyQr(

                    bookingId,

                    qrToken

                );

            toast.success(
                response.message
            );

            await loadTrips();

        } catch (error: any) {

            toast.error(

                error?.response?.data?.message ??

                "QR verification failed."

            );

        }

    }

    async function verifyOtp(
        bookingId: string,
        bookingItemId: string
    ) {

        const otp =
            otpInputs[
                bookingItemId
            ];

        if (!otp) {

            toast.error(
                "Please enter OTP."
            );

            return;

        }

        try {

            const response =
                await tripService.verifyOtp(

                    bookingId,

                    otp

                );

            toast.success(
                response.message
            );

            await loadTrips();

        } catch (error: any) {

            toast.error(

                error?.response?.data?.message ??

                "OTP verification failed."

            );

        }

    }

    const filteredTrips =
        useMemo(() => {

            return trips.filter(

                (trip) => {

                    const matchesSearch =

                        trip.bookingNumber
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );

                    const matchesStatus =

                        tripStatus === "ALL"

                        ||

                        trip.tripStatus ===
                        tripStatus;

                    return (

                        matchesSearch &&

                        matchesStatus

                    );

                }

            );

        }, [

            trips,

            search,

            tripStatus,

        ]);

    if (loading) {

        return (

            <div className="rounded-3xl bg-white p-10 shadow-sm">

                <h2 className="text-2xl font-bold">

                    Loading Hotel Trips...

                </h2>

            </div>

        );

    }

    return (

        <div className="space-y-8">            <div>

                <h1 className="text-3xl font-bold text-slate-900">

                    Hotel Trips

                </h1>

                <p className="mt-2 text-slate-500">

                    Manage all hotel stays assigned to your property.

                </p>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">

                <div className="grid gap-4 lg:grid-cols-2">

                    <input

                        type="text"

                        value={search}

                        onChange={(event) =>

                            setSearch(
                                event.target.value
                            )

                        }

                        placeholder="Search Booking Number..."

                        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"

                    />

                    <select

                        value={tripStatus}

                        onChange={(event) =>

                            setTripStatus(
                                event.target.value
                            )

                        }

                        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"

                    >

                        <option value="ALL">

                            All Trips

                        </option>

                        <option value="UPCOMING">

                            Upcoming

                        </option>

                        <option value="READY_TO_START">

                            Ready To Start

                        </option>

                        <option value="IN_PROGRESS">

                            In Progress

                        </option>

                        <option value="COMPLETED">

                            Completed

                        </option>

                    </select>

                </div>

            </div>

            {

                filteredTrips.length === 0 && (

                    <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

                        <h2 className="text-2xl font-bold">

                            No Trips Found

                        </h2>

                        <p className="mt-3 text-slate-500">

                            There are no hotel trips available.

                        </p>

                    </div>

                )

            }

            <div className="space-y-6">

                {

                    filteredTrips.map(

                        (

                            trip

                        ) => {

                            const tourist =
                                trip.user;

                            return (

                                <div

                                    key={trip.id}

                                    className="rounded-3xl bg-white p-8 shadow-sm"

                                >

                                    <div className="flex flex-wrap items-center justify-between gap-4">

                                        <div>

                                            <h2 className="text-2xl font-bold">

                                                {

                                                    trip.bookingNumber

                                                }

                                            </h2>

                                            <p className="mt-1 text-slate-500">

                                                Tourist Booking

                                            </p>

                                        </div>

                                        <div className="flex gap-3">

                                            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                                {

                                                    trip.tripStatus

                                                }

                                            </span>

                                            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                                {

                                                    trip.paymentStatus

                                                }

                                            </span>

                                        </div>

                                    </div>

                                    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                                        <div>

                                            <p className="text-sm text-slate-500">

                                                Tourist

                                            </p>

                                            <p className="mt-1 font-semibold">

                                                {

                                                    tourist.firstName

                                                }

                                                {" "}

                                                {

                                                    tourist.lastName

                                                }

                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-sm text-slate-500">

                                                Email

                                            </p>

                                            <p className="mt-1 font-semibold">

                                                {

                                                    tourist.email

                                                }

                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-sm text-slate-500">

                                                Phone

                                            </p>

                                            <p className="mt-1 font-semibold">

                                                {

                                                    tourist.phone

                                                }

                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-8 space-y-6">

                                        {

                                            trip.items.map(

                                                (

                                                    item: BookingItem

                                                ) => (

                                                    <div

                                                        key={item.id}

                                                        className="rounded-2xl border border-slate-200 p-6"

                                                    >

                                                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                                                            <div>

                                                                <p className="text-sm text-slate-500">

                                                                    Hotel

                                                                </p>

                                                                <p className="mt-1 font-semibold">

                                                                    {

                                                                        item.room?.roomType.hotel.name

                                                                    }

                                                                </p>

                                                            </div>

                                                            <div>

                                                                <p className="text-sm text-slate-500">

                                                                    Room Number

                                                                </p>

                                                                <p className="mt-1 font-semibold">

                                                                    {

                                                                        item.room?.roomNumber

                                                                    }

                                                                </p>

                                                            </div>

                                                            <div>

                                                                <p className="text-sm text-slate-500">

                                                                    Check In

                                                                </p>

                                                                <p className="mt-1 font-semibold">

                                                                    {

                                                                        item.checkIn

                                                                            ?

                                                                            new Date(

                                                                                item.checkIn

                                                                            ).toLocaleDateString()

                                                                            :

                                                                            "-"

                                                                    }

                                                                </p>

                                                            </div>

                                                            <div>

                                                                <p className="text-sm text-slate-500">

                                                                    Check Out

                                                                </p>

                                                                <p className="mt-1 font-semibold">

                                                                    {

                                                                        item.checkOut

                                                                            ?

                                                                            new Date(

                                                                                item.checkOut

                                                                            ).toLocaleDateString()

                                                                            :

                                                                            "-"

                                                                    }

                                                                </p>

                                                            </div>

                                                        </div>

                                                        <div className="mt-8 grid gap-6 lg:grid-cols-2">

                                                            <div>

                                                                <label className="mb-2 block text-sm font-medium">

                                                                    QR Token

                                                                </label>

                                                                <input

                                                                    type="text"

                                                                    value={

                                                                        qrInputs[

                                                                            item.id

                                                                        ] ?? ""

                                                                    }

                                                                    onChange={(event) =>

                                                                        setQrInputs({

                                                                            ...qrInputs,

                                                                            [

                                                                                item.id

                                                                            ]:

                                                                                event.target.value,

                                                                        })

                                                                    }

                                                                    placeholder="Enter QR Token"

                                                                    className="w-full rounded-xl border border-slate-300 px-4 py-3"

                                                                />

                                                            </div>

                                                            <div className="flex items-end">

                                                                <button

                                                                    onClick={() =>

                                                                        verifyQr(

                                                                            trip.id,

                                                                            item.id

                                                                        )

                                                                    }

                                                                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"

                                                                >

                                                                    Verify QR

                                                                </button>

                                                            </div>

                                                            <div>

                                                                <label className="mb-2 block text-sm font-medium">

                                                                    OTP

                                                                </label>

                                                                <input

                                                                    type="text"

                                                                    value={

                                                                        otpInputs[

                                                                            item.id

                                                                        ] ?? ""

                                                                    }

                                                                    onChange={(event) =>

                                                                        setOtpInputs({

                                                                            ...otpInputs,

                                                                            [

                                                                                item.id

                                                                            ]:

                                                                                event.target.value,

                                                                        })

                                                                    }

                                                                    placeholder="Enter OTP"

                                                                    className="w-full rounded-xl border border-slate-300 px-4 py-3"

                                                                />

                                                            </div>

                                                            <div className="flex items-end">

                                                                <button

                                                                    onClick={() =>

                                                                        verifyOtp(

                                                                            trip.id,

                                                                            item.id

                                                                        )

                                                                    }

                                                                    className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"

                                                                >

                                                                    Verify OTP

                                                                </button>

                                                            </div>

                                                        </div>                                                        <div className="mt-8 flex flex-wrap gap-4">

                                                            {

                                                                trip.tripStatus ===

                                                                "READY_TO_START" && (

                                                                    <button

                                                                        onClick={async () => {

                                                                            try {

                                                                                const response =

                                                                                    await tripService.startTrip({

                                                                                        bookingId:

                                                                                            trip.id,

                                                                                        bookingItemId:

                                                                                            item.id,

                                                                                        otp:

                                                                                            otpInputs[item.id],

                                                                                    });

                                                                                toast.success(

                                                                                    response.message

                                                                                );

                                                                                await loadTrips();

                                                                            } catch (error: any) {

                                                                                toast.error(

                                                                                    error?.response?.data?.message ??

                                                                                    "Unable to start service."

                                                                                );

                                                                            }

                                                                        }}

                                                                        className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"

                                                                    >

                                                                        Start Service

                                                                    </button>

                                                                )

                                                            }

                                                            {

                                                                trip.tripStatus ===

                                                                "IN_PROGRESS" && (

                                                                    <button

                                                                        onClick={async () => {

                                                                            try {

                                                                                const response =

                                                                                    await tripService.completeTrip({

                                                                                        bookingId:

                                                                                            trip.id,

                                                                                        bookingItemId:

                                                                                            item.id,

                                                                                        otp:

                                                                                            otpInputs[item.id],

                                                                                    });

                                                                                toast.success(

                                                                                    response.message

                                                                                );

                                                                                await loadTrips();

                                                                            } catch (error: any) {

                                                                                toast.error(

                                                                                    error?.response?.data?.message ??

                                                                                    "Unable to complete service."

                                                                                );

                                                                            }

                                                                        }}

                                                                        className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"

                                                                    >

                                                                        Complete Service

                                                                    </button>

                                                                )
                                                                

                                                            }

                                                        </div>

                                                    </div>

                                                )

                                            )
                                            
                                        }
                                        {
    trip.tripStatus ===
    "COMPLETED" && (

        <button

            onClick={async () => {

                try {

                    const response =
                        await tripService.dismissTrip(
                            trip.id
                        );

                    toast.success(
                        response.message
                    );

                    await loadTrips();

                } catch (error: any) {

                    toast.error(

                        error?.response?.data?.message ??

                        "Unable to dismiss trip."

                    );

                }

            }}

            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"

        >

            Dismiss

        </button>

    )

}

                                    </div>

                                    {

                                        trip.tripTimeline.length >

                                        0 && (

                                            <div className="mt-8 rounded-2xl border border-slate-200 p-6">

                                                <h3 className="text-lg font-bold">

                                                    Timeline

                                                </h3>

                                                <div className="mt-5 space-y-4">

                                                    {

                                                        trip.tripTimeline.map(

                                                            (

                                                                timeline

                                                            ) => (

                                                                <div

                                                                    key={timeline.id}

                                                                    className="rounded-xl border border-slate-100 p-4"

                                                                >

                                                                    <p className="font-semibold">

                                                                        {

                                                                            timeline.title

                                                                        }

                                                                    </p>

                                                                    {

                                                                        timeline.description && (

                                                                            <p className="mt-1 text-sm text-slate-500">

                                                                                {

                                                                                    timeline.description

                                                                                }

                                                                            </p>

                                                                        )

                                                                    }

                                                                    <p className="mt-2 text-xs text-slate-400">

                                                                        {

                                                                            new Date(

                                                                                timeline.createdAt

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

                                    {

                                        trip.tripVerifications.length >

                                        0 && (

                                            <div className="mt-8 rounded-2xl border border-slate-200 p-6">

                                                <h3 className="text-lg font-bold">

                                                    Verification History

                                                </h3>

                                                <div className="mt-5 space-y-4">

                                                    {

                                                        trip.tripVerifications.map(

                                                            (

                                                                verification

                                                            ) => (

                                                                <div

                                                                    key={verification.id}

                                                                    className="rounded-xl border border-slate-100 p-4"

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

                                                                    <p className="mt-2 text-sm text-slate-500">

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

                            );

                        }

                    )

                }

            </div>

        </div>

    );

}

export default TripsPage;