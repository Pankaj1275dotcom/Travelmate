import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Calendar,
    CheckCircle2,
    Clock3,
    MapPin,
    ShieldCheck,
    User,
} from "lucide-react";

import toast from "react-hot-toast";

import tripService from "../../services/trips/trip.service";

import type {
    Booking,
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
        selectedTrip,
        setSelectedTrip,
    ] = useState<Booking | null>(
        null
    );

    const [
        qrToken,
        setQrToken,
    ] = useState("");

    const [
        otp,
        setOtp,
    ] = useState("");

    const [
        completionOtp,
        setCompletionOtp,
    ] = useState("");

    const loadTrips =
        async () => {

            try {

                setLoading(true);

                const response =
                    await tripService.getDriverTrips();

                setTrips(
                    response.trips
                );

            } catch {

                toast.error(
                    "Failed to load trips."
                );

            } finally {

                setLoading(false);

            }

        };

    useEffect(() => {

        loadTrips();

    }, []);

    const driverItem =
        useMemo(() => {

            if (!selectedTrip) {

                return null;

            }

            return selectedTrip.items.find(

                item =>

                    item.bookingType ===
                    "DRIVER"

            ) || null;

        }, [selectedTrip]);    if (loading) {

        return (
            <div className="flex h-[70vh] items-center justify-center">
                <div className="text-lg font-semibold text-slate-500">
                    Loading trips...
                </div>
            </div>
        );

    }

    return (
        <div className="grid grid-cols-12 gap-6">

            <div className="col-span-4">

                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-200 p-6">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Driver Trips
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Active and upcoming driver services
                        </p>

                    </div>

                    <div className="max-h-[75vh] overflow-y-auto">

                        {trips.length === 0 && (

                            <div className="p-8 text-center">

                                <p className="text-slate-500">
                                    No trips found.
                                </p>

                            </div>

                        )}

                        {trips.map((trip) => {

                            const currentDriverItem =
                                trip.items.find(

                                    item =>

                                        item.bookingType ===
                                        "DRIVER"

                                );

                            return (

                                <button
                                    key={trip.id}
                                    type="button"
                                    onClick={async () => {

                                        try {

                                            const response =
                                                await tripService.getTripDetails(
                                                    trip.id
                                                );

                                            setSelectedTrip(
                                                response.trip
                                            );

                                            setQrToken("");

                                            setOtp("");

                                            setCompletionOtp("");

                                        } catch {

                                            toast.error(
                                                "Unable to load trip."
                                            );

                                        }

                                    }}
                                    className={`w-full border-b border-slate-100 p-5 text-left transition hover:bg-slate-50 ${
                                        selectedTrip?.id === trip.id
                                            ? "bg-blue-50"
                                            : ""
                                    }`}
                                >

                                    <div className="flex items-center justify-between">

                                        <h3 className="font-semibold text-slate-900">

                                            {trip.user.firstName}{" "}
                                            {trip.user.lastName}

                                        </h3>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                trip.tripStatus ===
                                                "COMPLETED"
                                                    ? "bg-green-100 text-green-700"
                                                    : trip.tripStatus ===
                                                      "IN_PROGRESS"
                                                    ? "bg-orange-100 text-orange-700"
                                                    : trip.tripStatus ===
                                                      "READY_TO_START"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-slate-100 text-slate-700"
                                            }`}
                                        >
                                            {trip.tripStatus}
                                        </span>

                                    </div>

                                    <div className="mt-4 space-y-2 text-sm text-slate-500">

                                        <div className="flex items-center gap-2">

                                            <Calendar size={16} />

                                            {currentDriverItem?.driverStartDate?.split(
                                                "T"
                                            )[0]}

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <Clock3 size={16} />

                                            {
                                                currentDriverItem?.driverStartTime
                                            }

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <User size={16} />

                                            {trip.user.email}

                                        </div>

                                    </div>

                                </button>

                            );

                        })}

                    </div>

                </div>

            </div>            <div className="col-span-8">

                {!selectedTrip ? (

                    <div className="flex h-[75vh] items-center justify-center rounded-3xl border border-slate-200 bg-white">

                        <div className="text-center">

                            <MapPin
                                size={48}
                                className="mx-auto text-slate-300"
                            />

                            <h2 className="mt-4 text-2xl font-bold text-slate-700">
                                Select a Trip
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Choose any trip from the left panel.
                            </p>

                        </div>

                    </div>

                ) : (

                    <div className="space-y-6">

                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h1 className="text-3xl font-bold text-slate-900">
                                        Driver Trip Details
                                    </h1>

                                    <p className="mt-2 text-slate-500">
                                        Booking #
                                        {selectedTrip.bookingNumber}
                                    </p>

                                </div>

                                <span
                                    className={`rounded-full px-5 py-2 text-sm font-semibold ${
                                        selectedTrip.tripStatus ===
                                        "COMPLETED"
                                            ? "bg-green-100 text-green-700"
                                            : selectedTrip.tripStatus ===
                                              "IN_PROGRESS"
                                            ? "bg-orange-100 text-orange-700"
                                            : selectedTrip.tripStatus ===
                                              "READY_TO_START"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-slate-100 text-slate-700"
                                    }`}
                                >
                                    {selectedTrip.tripStatus}
                                </span>

                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-6">

                            <div className="rounded-3xl border border-slate-200 bg-white p-6">

                                <h2 className="mb-5 text-xl font-bold">
                                    Tourist Information
                                </h2>

                                <div className="space-y-4">

                                    <div>

                                        <p className="text-xs uppercase text-slate-500">
                                            Name
                                        </p>

                                        <p className="font-semibold">
                                            {selectedTrip.user.firstName}{" "}
                                            {selectedTrip.user.lastName}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase text-slate-500">
                                            Email
                                        </p>

                                        <p>
                                            {selectedTrip.user.email}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase text-slate-500">
                                            Phone
                                        </p>

                                        <p>
                                            {selectedTrip.user.phone}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-6">

                                <h2 className="mb-5 text-xl font-bold">
                                    Driver Schedule
                                </h2>

                                <div className="space-y-4">

                                    <div>

                                        <p className="text-xs uppercase text-slate-500">
                                            Start Date
                                        </p>

                                        <p>
                                            {driverItem?.driverStartDate?.split(
                                                "T"
                                            )[0]}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase text-slate-500">
                                            End Date
                                        </p>

                                        <p>
                                            {driverItem?.driverEndDate?.split(
                                                "T"
                                            )[0]}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase text-slate-500">
                                            Time
                                        </p>

                                        <p>

                                            {driverItem?.driverStartTime}

                                            {" - "}

                                            {driverItem?.driverEndTime}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase text-slate-500">
                                            Requested Hours
                                        </p>

                                        <p>
                                            {driverItem?.driverRequestedHours}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>                        <div className="rounded-3xl border border-slate-200 bg-white p-6">

                            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">

                                <ShieldCheck size={22} />

                                Driver Verification

                            </h2>

                            <div className="space-y-6">

                                {selectedTrip.tripStatus ===
                                    "UPCOMING" && (
                                    <>
                                        <div>

                                            <label className="mb-2 block text-sm font-medium">

                                                QR Token

                                            </label>

                                            <input
                                                type="text"
                                                value={qrToken}
                                                onChange={(e) =>
                                                    setQrToken(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                                            />

                                            <button
                                                type="button"
                                                onClick={async () => {

                                                    try {

                                                        await tripService.verifyQr(

                                                            selectedTrip.id,

                                                            qrToken

                                                        );

                                                        toast.success(
                                                            "QR verified."
                                                        );

                                                        const response =
                                                            await tripService.getTripDetails(
                                                                selectedTrip.id
                                                            );

                                                        setSelectedTrip(
                                                            response.trip
                                                        );

                                                    } catch {

                                                        toast.error(
                                                            "Invalid QR."
                                                        );

                                                    }

                                                }}
                                                className="mt-3 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
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
                                                value={otp}
                                                onChange={(e) =>
                                                    setOtp(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                                            />

                                            <button
                                                type="button"
                                                onClick={async () => {

                                                    try {

                                                        await tripService.verifyOtp(

                                                            selectedTrip.id,

                                                            otp

                                                        );

                                                        toast.success(
                                                            "OTP verified."
                                                        );

                                                        const response =
                                                            await tripService.getTripDetails(
                                                                selectedTrip.id
                                                            );

                                                        setSelectedTrip(
                                                            response.trip
                                                        );

                                                    } catch {

                                                        toast.error(
                                                            "Invalid OTP."
                                                        );

                                                    }

                                                }}
                                                className="mt-3 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
                                            >
                                                Verify OTP
                                            </button>

                                        </div>
                                    </>
                                )}

                                {selectedTrip.tripStatus ===
                                    "READY_TO_START" && (
                                    <button
                                        type="button"
                                        onClick={async () => {

                                            try {

                                                await tripService.startTrip({

                                                    bookingId:
                                                        selectedTrip.id,

                                                    bookingItemId:
                                                        driverItem!.id,

                                                });

                                                toast.success(
                                                    "Driver service started."
                                                );

                                                const response =
                                                    await tripService.getTripDetails(
                                                        selectedTrip.id
                                                    );

                                                setSelectedTrip(
                                                    response.trip
                                                );

                                            } catch {

                                                toast.error(
                                                    "Unable to start service."
                                                );

                                            }

                                        }}
                                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
                                    >
                                        Start Driver Service
                                    </button>
                                )}

                                {selectedTrip.tripStatus ===
                                    "IN_PROGRESS" && (
                                    <>

                                        <label className="block text-sm font-medium">

                                            Completion OTP

                                        </label>

                                        <input
                                            type="text"
                                            value={completionOtp}
                                            onChange={(e) =>
                                                setCompletionOtp(
                                                    e.target.value
                                                )
                                            }
                                            className="rounded-xl border border-slate-300 px-4 py-3"
                                        />

                                        <button
                                            type="button"
                                            onClick={async () => {

                                                try {

                                                    await tripService.completeTrip({

                                                        bookingId:
                                                            selectedTrip.id,

                                                        bookingItemId:
                                                            driverItem!.id,

                                                        otp:
                                                            completionOtp,

                                                    });

                                                    toast.success(
                                                        "Driver service completed."
                                                    );

                                                    const response =
                                                        await tripService.getTripDetails(
                                                            selectedTrip.id
                                                        );

                                                    setSelectedTrip(
                                                        response.trip
                                                    );

                                                } catch {

                                                    toast.error(
                                                        "Completion failed."
                                                    );

                                                }

                                            }}
                                            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"
                                        >
                                            Complete Driver Service
                                        </button>

                                    </>
                                )}

                                {selectedTrip.tripStatus ===
                                    "COMPLETED" && (

                                    <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-5 text-green-700">

                                        <CheckCircle2 />

                                        <span className="font-semibold">

                                            Driver service completed successfully.

                                        </span>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}

export default TripsPage;