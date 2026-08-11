import {
    ArrowRight,
    BedDouble,
    Building2,
    CalendarDays,
    ChevronRight,
    Star,
    Users,
    Wallet,
} from "lucide-react";
import type { RoomType } from "../../types/room-type.types";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/auth.store";

import useHotel from "../../hooks/useHotel";
import useRoomTypes from "../../hooks/useRoomTypes";

import tripService from "../../services/trips/trip.service";

import type {
    Booking,
    BookingItem,
} from "../../types/booking.types";

function StatCard({
    title,
    value,
    icon: Icon,
    color,
}: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{
        size?: number;
        className?: string;
    }>;
    color: string;
}) {
    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                        {value}
                    </h2>
                </div>

                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
                >
                    <Icon size={28} />
                </div>
            </div>
        </div>
    );
}

function DashboardPage() {
    const navigate = useNavigate();

    const { hotel: hotelOwner } = useAuthStore();

    const {
        data: hotelResponse,
        isLoading: isHotelLoading,
    } = useHotel();

    const currentHotel = hotelResponse?.hotel;

    const {
        data: roomTypesResponse,
        isLoading: isRoomTypesLoading,
    } = useRoomTypes(currentHotel?.id);

    const [trips, setTrips] = useState<Booking[]>([]);
    const [isTripsLoading, setIsTripsLoading] =
        useState(true);

    const [tripsError, setTripsError] =
        useState("");

    useEffect(() => {
        async function fetchTrips() {
            try {
                setIsTripsLoading(true);
                setTripsError("");

                const response =
                    await tripService.getHotelTrips();

                setTrips(response.trips ?? []);
            } catch {
                setTripsError(
                    "Unable to load hotel trips."
                );
            } finally {
                setIsTripsLoading(false);
            }
        }

        fetchTrips();
    }, []);

const roomTypes: RoomType[] =
    roomTypesResponse?.roomTypes ?? [];

  const totalRooms = useMemo(() => {
    return roomTypes.reduce(
        (
            total: number,
            roomType: RoomType
        ) => total + roomType.totalRooms,
        0
    );
}, [roomTypes]);

    const hotelBookingItems = useMemo(() => {
        return trips.flatMap((trip) =>
            trip.items.filter(
                (item) =>
                    item.bookingType === "HOTEL"
            )
        );
    }, [trips]);

    const today = new Date()
        .toISOString()
        .split("T")[0];

    const todayCheckIns = useMemo(() => {
        return hotelBookingItems.filter(
            (item) =>
                item.checkIn &&
                item.checkIn.split("T")[0] === today
        ).length;
    }, [hotelBookingItems, today]);

    const todayCheckOuts = useMemo(() => {
        return hotelBookingItems.filter(
            (item) =>
                item.checkOut &&
                item.checkOut.split("T")[0] === today
        ).length;
    }, [hotelBookingItems, today]);

    const activeTrips = useMemo(() => {
        return trips.filter(
            (trip) =>
                trip.tripStatus === "IN_PROGRESS"
        ).length;
    }, [trips]);

    const upcomingTrips = useMemo(() => {
        return trips.filter(
            (trip) =>
                trip.tripStatus === "UPCOMING" ||
                trip.tripStatus === "READY_TO_START"
        ).length;
    }, [trips]);

    const completedTrips = useMemo(() => {
        return trips.filter(
            (trip) =>
                trip.tripStatus === "COMPLETED"
        ).length;
    }, [trips]);

    const totalGuests = useMemo(() => {
        return trips.reduce(
            (total, trip) =>
                total +
                trip.adults +
                trip.children,
            0
        );
    }, [trips]);

const totalPaidHotelAmount = useMemo(() => {
    return hotelBookingItems.reduce(
        (total: number, item: BookingItem) => {
            if (
                item.paymentStatus === "PAID"
            ) {
                return (
                    total + Number(item.totalPrice)
                );
            }

            return total;
        },
        0
    );
}, [hotelBookingItems]);

const hotelPlatformCommission =
    totalPaidHotelAmount * 0.05;

const paidHotelRevenue =
    totalPaidHotelAmount -
    hotelPlatformCommission;

    const recentTrips = useMemo(() => {
        return [...trips]
            .sort(
                (a, b) =>
                    new Date(
                        b.createdAt
                    ).getTime() -
                    new Date(
                        a.createdAt
                    ).getTime()
            )
            .slice(0, 5);
    }, [trips]);

    const stats = [
        {
            title: "Today's Check-ins",
            value: todayCheckIns,
            icon: CalendarDays,
            color:
                "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Total Rooms",
            value: totalRooms,
            icon: BedDouble,
            color:
                "bg-blue-50 text-blue-600",
        },
        {
            title: "Paid Hotel Revenue",
            value: `₹${paidHotelRevenue.toLocaleString(
                "en-IN"
            )}`,
            icon: Wallet,
            color:
                "bg-orange-50 text-orange-600",
        },
        {
            title: "Hotel Rating",
            value:
                currentHotel?.rating ?? 0,
            icon: Star,
            color:
                "bg-yellow-50 text-yellow-600",
        },
    ];

    const getHotelItem = (
        trip: Booking
    ): BookingItem | undefined => {
        return trip.items.find(
            (item) =>
                item.bookingType === "HOTEL"
        );
    };

    const formatDate = (
        value: string | null
    ) => {
        if (!value) {
            return "Not available";
        }

        return new Intl.DateTimeFormat(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        ).format(new Date(value));
    };

    const formatTripStatus = (
        status: Booking["tripStatus"]
    ) => {
        return status
            .toLowerCase()
            .replaceAll("_", " ");
    };

    const getStatusClassName = (
        status: Booking["tripStatus"]
    ) => {
        if (
            status === "IN_PROGRESS"
        ) {
            return "bg-blue-100 text-blue-700";
        }

        if (
            status === "COMPLETED"
        ) {
            return "bg-emerald-100 text-emerald-700";
        }

        if (
            status === "CANCELLED"
        ) {
            return "bg-red-100 text-red-700";
        }

        return "bg-orange-100 text-orange-700";
    };

    const isLoading =
        isHotelLoading ||
        isRoomTypesLoading ||
        isTripsLoading;

    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-10 p-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
                            <Building2
                                size={16}
                                className="text-blue-600"
                            />

                            <span className="text-sm font-semibold text-blue-700">
                                {currentHotel?.name ??
                                    "Your Hotel"}
                            </span>
                        </div>

                        <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-slate-900">
                            Welcome Back,
                            <br />
                            {hotelOwner?.firstName ??
                                "Hotel Owner"}
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
                            Manage your hotel stays,
                            rooms, amenities, gallery,
                            customer reviews and hotel
                            operations from one
                            centralized dashboard.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/trips")
                                }
                                className="rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
                            >
                                View Trips
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/rooms")
                                }
                                className="rounded-2xl border border-slate-300 px-7 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                Manage Rooms
                            </button>
                        </div>
                    </div>

                    <div className="w-full max-w-sm rounded-3xl bg-slate-900 p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400">
                                    Today
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {todayCheckIns}{" "}
                                    Check-in
                                    {todayCheckIns === 1
                                        ? ""
                                        : "s"}
                                </h2>
                            </div>

                            <Building2
                                size={36}
                                className="text-blue-400"
                            />
                        </div>

                        <div className="mt-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">
                                    Check-outs
                                </span>

                                <strong>
                                    {todayCheckOuts}
                                </strong>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">
                                    Active Trips
                                </span>

                                <strong>
                                    {activeTrips}
                                </strong>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">
                                    Upcoming Trips
                                </span>

                                <strong>
                                    {upcomingTrips}
                                </strong>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">
                                    Rating
                                </span>

                                <strong>
                                    ⭐{" "}
                                    {currentHotel?.rating ??
                                        0}
                                </strong>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/profile")
                            }
                            className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Manage Hotel

                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </section>            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {isLoading ? (
                    <>
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-40 animate-pulse rounded-3xl bg-slate-200"
                            />
                        ))}
                    </>
                ) : (
                    stats.map((stat) => (
                        <StatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    ))
                )}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Recent Hotel Trips
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Latest stays associated with your hotel.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/trips")
                            }
                            className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                        >
                            View all

                            <ArrowRight size={17} />
                        </button>
                    </div>

                    <div className="mt-8 overflow-x-auto">
                        {isTripsLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="h-20 animate-pulse rounded-2xl bg-slate-100"
                                    />
                                ))}
                            </div>
                        ) : tripsError ? (
                            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
                                {tripsError}
                            </div>
                        ) : recentTrips.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                                <CalendarDays
                                    size={36}
                                    className="mx-auto text-slate-400"
                                />

                                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                    No hotel trips yet
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Hotel trip information will appear here
                                    when bookings are available.
                                </p>
                            </div>
                        ) : (
                            <table className="w-full min-w-[720px]">
                                <thead>
                                    <tr className="border-b border-slate-200 text-left">
                                        <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Guest
                                        </th>

                                        <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Stay
                                        </th>

                                        <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Guests
                                        </th>

                                        <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Status
                                        </th>

                                        <th className="pb-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Details
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentTrips.map((trip) => {
                                        const hotelItem =
                                            getHotelItem(
                                                trip
                                            );

                                        return (
                                            <tr
                                                key={trip.id}
                                                className="border-b border-slate-100 last:border-0"
                                            >
                                                <td className="py-5">
                                                    <div>
                                                        <p className="font-semibold text-slate-900">
                                                            {
                                                                trip.user
                                                                    .firstName
                                                            }{" "}
                                                            {
                                                                trip.user
                                                                    .lastName
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {
                                                                trip.bookingNumber
                                                            }
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="py-5">
                                                    <p className="text-sm font-medium text-slate-700">
                                                        {formatDate(
                                                            hotelItem?.checkIn ??
                                                                null
                                                        )}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        to{" "}
                                                        {formatDate(
                                                            hotelItem?.checkOut ??
                                                                null
                                                        )}
                                                    </p>
                                                </td>

                                                <td className="py-5">
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <Users
                                                            size={16}
                                                            className="text-slate-400"
                                                        />

                                                        {trip.adults +
                                                            trip.children}
                                                    </div>
                                                </td>

                                                <td className="py-5">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClassName(
                                                            trip.tripStatus
                                                        )}`}
                                                    >
                                                        {formatTripStatus(
                                                            trip.tripStatus
                                                        )}
                                                    </span>
                                                </td>

                                                <td className="py-5 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/trips/${trip.id}`
                                                            )
                                                        }
                                                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Hotel Overview
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Real-time summary from your current hotel data.
                    </p>

                    <div className="mt-8 space-y-6">
                        <div className="rounded-2xl bg-slate-50 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500">
                                    Total Hotel Trips
                                </span>

                                <CalendarDays
                                    size={20}
                                    className="text-blue-600"
                                />
                            </div>

                            <p className="mt-3 text-3xl font-bold text-slate-900">
                                {trips.length}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500">
                                    Completed Stays
                                </span>

                                <BedDouble
                                    size={20}
                                    className="text-emerald-600"
                                />
                            </div>

                            <p className="mt-3 text-3xl font-bold text-slate-900">
                                {completedTrips}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500">
                                    Total Guests
                                </span>

                                <Users
                                    size={20}
                                    className="text-purple-600"
                                />
                            </div>

                            <p className="mt-3 text-3xl font-bold text-slate-900">
                                {totalGuests}
                            </p>
                        </div>                        <div className="rounded-2xl bg-slate-50 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500">
                                    Hotel Status
                                </span>

                                <Building2
                                    size={20}
                                    className="text-blue-600"
                                />
                            </div>

                            <p className="mt-3 text-lg font-bold text-slate-900">
                                {currentHotel?.isApproved
                                    ? "Approved"
                                    : "Pending Approval"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/profile")
                            }
                            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            View Hotel Profile

                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Stay Status
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Current distribution of hotel trips.
                            </p>
                        </div>

                        <CalendarDays
                            size={24}
                            className="text-blue-600"
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-slate-100 p-5">
                            <p className="text-sm text-slate-500">
                                Upcoming
                            </p>

                            <p className="mt-2 text-3xl font-bold text-orange-600">
                                {upcomingTrips}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-100 p-5">
                            <p className="text-sm text-slate-500">
                                In Progress
                            </p>

                            <p className="mt-2 text-3xl font-bold text-blue-600">
                                {activeTrips}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-100 p-5">
                            <p className="text-sm text-slate-500">
                                Completed
                            </p>

                            <p className="mt-2 text-3xl font-bold text-emerald-600">
                                {completedTrips}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-100 p-5">
                            <p className="text-sm text-slate-500">
                                Cancelled
                            </p>

                            <p className="mt-2 text-3xl font-bold text-red-600">
                                {
                                    trips.filter(
                                        (trip) =>
                                            trip.tripStatus ===
                                            "CANCELLED"
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Room Summary
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Based on your configured room types.
                            </p>
                        </div>

                        <BedDouble
                            size={24}
                            className="text-blue-600"
                        />
                    </div>

                    {isRoomTypesLoading ? (
                        <div className="mt-8 space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-16 animate-pulse rounded-2xl bg-slate-100"
                                />
                            ))}
                        </div>
                    ) : roomTypes.length === 0 ? (
                        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                            <p className="text-sm text-slate-500">
                                No room types have been added yet.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/rooms")
                                }
                                className="mt-4 font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Manage Rooms
                            </button>
                        </div>
                    ) : (
                        <div className="mt-8 space-y-4">
                            {roomTypes
                                .slice(0, 4)
                                .map((roomType) => (
                                    <div
                                        key={roomType.id}
                                        className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                                    >
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                {roomType.name}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Capacity:{" "}
                                                {
                                                    roomType.capacity
                                                }
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">
                                                {
                                                    roomType.totalRooms
                                                }{" "}
                                                Rooms
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                ₹
                                                {roomType.pricePerNight.toLocaleString(
                                                    "en-IN"
                                                )}
                                                /night
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/rooms")
                        }
                        className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                        Manage all rooms

                        <ArrowRight size={17} />
                    </button>
                </div>
            </section>
        </div>
    );
}

export default DashboardPage;