import { useEffect, useState } from "react";

import {
    ArrowLeft,
    BedDouble,
    CalendarDays,
    CircleDollarSign,
    Users,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import tripService from "../../services/trips/trip.service";

import type {
    Booking,
    BookingItem,
} from "../../types/booking.types";

function formatDate(date: string | null) {
    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
}

function formatStatus(status: string) {
    return status
        .toLowerCase()
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");
}

function getStatusClassName(status: string) {
    switch (status) {
        case "COMPLETED":
            return "bg-green-100 text-green-700";

        case "IN_PROGRESS":
            return "bg-blue-100 text-blue-700";

        case "CANCELLED":
            return "bg-red-100 text-red-700";

        case "UPCOMING":
        case "READY_TO_START":
            return "bg-orange-100 text-orange-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
}

function TripDetailsPage() {
    const navigate = useNavigate();

    const { bookingId } = useParams();

    const [trip, setTrip] =
        useState<Booking | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        async function loadTrip() {
            if (!bookingId) {
                setError(
                    "Trip ID is missing."
                );

                setIsLoading(false);

                return;
            }

            try {
                setIsLoading(true);

                setError("");

                const response =
                    await tripService.getTripDetails(
                        bookingId
                    );

                setTrip(response.trip);
            } catch (error: any) {
                setError(
                    error?.response?.data?.message ??
                        "Unable to load trip details."
                );
            } finally {
                setIsLoading(false);
            }
        }

        loadTrip();
    }, [bookingId]);

    const hotelItems =
        trip?.items.filter(
            (item) =>
                item.bookingType === "HOTEL"
        ) ?? [];

    if (isLoading) {
        return (
            <div className="rounded-3xl bg-white p-10 shadow-sm">
                <p className="text-slate-500">
                    Loading trip details...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-3xl bg-white p-10 shadow-sm">
                <button
                    type="button"
                    onClick={() =>
                        navigate("/trips")
                    }
                    className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600"
                >
                    <ArrowLeft size={18} />

                    Back to Trips
                </button>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
                    {error}
                </div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="rounded-3xl bg-white p-10 shadow-sm">
                <p className="text-slate-500">
                    Trip details are not available.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
                <button
                    type="button"
                    onClick={() =>
                        navigate("/trips")
                    }
                    className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                    <ArrowLeft size={18} />

                    Back to Trips
                </button>

                <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">
                            Booking Number
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-slate-900">
                            {trip.bookingNumber}
                        </h1>

                        <p className="mt-3 text-sm text-slate-500">
                            Created on{" "}
                            {formatDate(
                                trip.createdAt
                            )}
                        </p>
                    </div>

                    <span
                        className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusClassName(
                            trip.tripStatus
                        )}`}
                    >
                        {formatStatus(
                            trip.tripStatus
                        )}
                    </span>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                            <Users size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Guest
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {trip.user.firstName}{" "}
                                {trip.user.lastName}
                            </p>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        {trip.user.email}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        {trip.user.phone}
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                            <CalendarDays size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Stay Dates
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {formatDate(
                                    trip.startDate
                                )}
                            </p>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        To{" "}
                        {formatDate(
                            trip.endDate
                        )}
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-green-50 p-3 text-green-600">
                            <CircleDollarSign
                                size={22}
                            />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Hotel Booking Amount
                            </p>

                            <p className="mt-1 text-xl font-bold text-slate-900">
                                ₹
                                {hotelItems
                                    .reduce(
                                        (
                                            total: number,
                                            item: BookingItem
                                        ) =>
                                            total +
                                            Number(
                                                item.totalPrice
                                            ),
                                        0
                                    )
                                    .toLocaleString(
                                        "en-IN"
                                    )}
                            </p>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        Payment:{" "}
                        {formatStatus(
                            trip.paymentStatus
                        )}
                    </p>
                </div>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex items-center gap-3">
                    <BedDouble
                        size={24}
                        className="text-blue-600"
                    />

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Hotel Stay Details
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Rooms included in this
                            hotel booking.
                        </p>
                    </div>
                </div>

                {hotelItems.length === 0 ? (
                    <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                        <p className="text-sm text-slate-500">
                            No hotel booking items
                            found.
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 space-y-4">
                        {hotelItems.map(
                            (
                                item: BookingItem
                            ) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-slate-200 p-5"
                                >
                                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <p className="text-lg font-semibold text-slate-900">
                                                {
                                                    item.room
                                                        ?.roomType
                                                        .name ??
                                                        "Hotel Room"
                                                }
                                            </p>

                                            <p className="mt-2 text-sm text-slate-500">
                                                Room Number:{" "}
                                                {item.room
                                                    ?.roomNumber ??
                                                    "-"}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Check-in:{" "}
                                                {formatDate(
                                                    item.checkIn
                                                )}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Check-out:{" "}
                                                {formatDate(
                                                    item.checkOut
                                                )}
                                            </p>
                                        </div>

                                        <div className="md:text-right">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClassName(
                                                    item.status
                                                )}`}
                                            >
                                                {formatStatus(
                                                    item.status
                                                )}
                                            </span>

                                            <p className="mt-3 text-lg font-bold text-slate-900">
                                                ₹
                                                {Number(
                                                    item.totalPrice
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Quantity:{" "}
                                                {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>

            {trip.specialRequest && (
                <div className="rounded-3xl bg-white p-7 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900">
                        Special Request
                    </h2>

                    <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600">
                        {trip.specialRequest}
                    </p>
                </div>
            )}
        </div>
    );
}

export default TripDetailsPage;