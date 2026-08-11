import {
    ArrowRight,
    Car,
    CalendarDays,
    CheckCircle2,
    Clock3,
    MapPinned,
    Star,
    Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import useDriver from "../../hooks/useDriver";
import useBooking from "../../hooks/useBooking";
import useTrip from "../../hooks/useTrip";


function formatDate(
    date: string | null
) {

    if (!date) {
        return "—";
    }

    return new Date(
        date
    ).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

}


function formatTime(
    time: string | null
) {

    if (!time) {
        return "—";
    }

    return time;

}


function formatAmount(
    amount: string | number
) {

    return Number(
        amount
    ).toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2,
        }
    );

}


function getTripStatusClasses(
    status: string
) {

    switch (
        status
    ) {

        case "COMPLETED":

            return `
                bg-emerald-100
                text-emerald-700
            `;

        case "IN_PROGRESS":

            return `
                bg-blue-100
                text-blue-700
            `;

        case "READY_TO_START":

            return `
                bg-orange-100
                text-orange-700
            `;

        case "CANCELLED":

            return `
                bg-red-100
                text-red-700
            `;

        default:

            return `
                bg-slate-100
                text-slate-600
            `;

    }

}


function DashboardPage() {

    const {
        driver,
        registeredUser,
        availability,
        vehicle,
        isLoading:
            isDriverLoading,
    } = useDriver();


    const {
        requests,
        loading:
            requestsLoading,
    } = useBooking();


    const {
        trips,
        isLoading:
            tripsLoading,
    } = useTrip();


    const driverName =
        driver?.fullName ??
        registeredUser?.fullName ??
        "Driver";


    const today =
        new Date();


    const todayKey =
        today.toISOString()
            .split("T")[0];


    const todayTrips =
        trips.filter(
            (trip) => {

                const driverItem =
                    trip.items.find(
                        (item) =>
                            item.bookingType ===
                            "DRIVER"
                    );


                const tripDate =
                    driverItem
                        ?.driverStartDate ??
                    trip.startDate;


                if (!tripDate) {
                    return false;
                }


                return tripDate
                    .split("T")[0] ===
                    todayKey;

            }
        );


    const upcomingTrips =
        trips.filter(
            (trip) =>
                trip.tripStatus ===
                    "UPCOMING" ||
                trip.tripStatus ===
                    "READY_TO_START"
        );


    const completedTrips =
        trips.filter(
            (trip) =>
                trip.tripStatus ===
                "COMPLETED"
        );


    const activeTrips =
        trips.filter(
            (trip) =>
                trip.tripStatus ===
                "IN_PROGRESS"
        );


    const pendingRequests =
        requests.filter(
            (request) =>
                request.status ===
                "PENDING"
        );


    const visibleRequests =
        pendingRequests.slice(
            0,
            3
        );


    const recentTrips =
        [...trips]
            .sort(
                (
                    a,
                    b
                ) =>
                    new Date(
                        b.startDate
                    ).getTime() -
                    new Date(
                        a.startDate
                    ).getTime()
            )
            .slice(
                0,
                4
            );


    const isLoading =
        isDriverLoading ||
        requestsLoading ||
        tripsLoading;


    if (isLoading) {

        return (

            <div
                className="
                    space-y-8
                    animate-pulse
                "
            >

                <div
                    className="
                        h-72
                        rounded-[32px]
                        bg-slate-200
                    "
                />

                <div
                    className="
                        grid
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-4
                    "
                >

                    {[
                        1,
                        2,
                        3,
                        4,
                    ].map(
                        (item) => (

                            <div
                                key={item}
                                className="
                                    h-32
                                    rounded-3xl
                                    bg-slate-200
                                "
                            />

                        )
                    )}

                </div>

                <div
                    className="
                        h-96
                        rounded-[32px]
                        bg-slate-200
                    "
                />

            </div>

        );

    }


    return (

        <div
            className="
                space-y-8
            "
        >

            {/* Hero */}

            <section
                className="
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-10
                        p-10
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div
                        className="
                            max-w-2xl
                        "
                    >

                        {pendingRequests.length >
                            0 && (

                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-blue-50
                                    px-4
                                    py-2
                                "
                            >

                                <Users
                                    size={16}
                                    className="
                                        text-blue-600
                                    "
                                />

                                <span
                                    className="
                                        text-sm
                                        font-semibold
                                        text-blue-700
                                    "
                                >
                                    {pendingRequests.length}{" "}
                                    New Ride{" "}
                                    {pendingRequests.length ===
                                    1
                                        ? "Request"
                                        : "Requests"}
                                </span>

                            </div>

                        )}


                        <h1
                            className="
                                mt-6
                                text-4xl
                                font-bold
                                leading-tight
                                tracking-tight
                                text-slate-900
                                lg:text-5xl
                            "
                        >

                            Welcome back,
                            <br />

                            {driverName}

                        </h1>


                        <p
                            className="
                                mt-6
                                max-w-xl
                                text-lg
                                leading-8
                                text-slate-500
                            "
                        >
                            Manage your ride requests,
                            trips, availability and vehicle
                            information from your TravelMate
                            Driver Dashboard.
                        </p>


                        <div
                            className="
                                mt-8
                                flex
                                flex-wrap
                                gap-4
                            "
                        >

                            <NavLink
                                to="/bookings"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-2xl
                                    bg-blue-600
                                    px-7
                                    py-4
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-blue-700
                                "
                            >

                                View Ride Requests

                                <ArrowRight
                                    size={18}
                                />

                            </NavLink>


                            <NavLink
                                to="/availability"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-2xl
                                    border
                                    border-slate-300
                                    px-7
                                    py-4
                                    font-semibold
                                    text-slate-700
                                    transition
                                    hover:bg-slate-100
                                "
                            >

                                Update Availability

                            </NavLink>

                        </div>

                    </div>


                    {/* Today Card */}

                    <div
                        className="
                            w-full
                            max-w-sm
                            rounded-3xl
                            bg-slate-900
                            p-8
                            text-white
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-slate-400
                                    "
                                >
                                    Today
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        text-3xl
                                        font-bold
                                    "
                                >
                                    {todayTrips.length}{" "}
                                    {todayTrips.length ===
                                    1
                                        ? "Trip"
                                        : "Trips"}
                                </h2>

                            </div>


                            <Car
                                size={36}
                                className="
                                    text-blue-400
                                "
                            />

                        </div>


                        <div
                            className="
                                mt-10
                                space-y-6
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <span
                                    className="
                                        text-slate-400
                                    "
                                >
                                    Pending Requests
                                </span>

                                <strong>
                                    {
                                        pendingRequests.length
                                    }
                                </strong>

                            </div>


                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <span
                                    className="
                                        text-slate-400
                                    "
                                >
                                    Active Trip
                                </span>

                                <strong>
                                    {
                                        activeTrips.length
                                    }
                                </strong>

                            </div>


                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <span
                                    className="
                                        text-slate-400
                                    "
                                >
                                    Rating
                                </span>

                                <strong>
                                    {driver?.rating ??
                                        0}
                                    {" "}
                                    / 5
                                </strong>

                            </div>

                        </div>


                        <NavLink
                            to="/trips"
                            className="
                                mt-10
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-white
                                py-4
                                font-semibold
                                text-slate-900
                                transition
                                hover:bg-slate-100
                            "
                        >

                            Open Trips

                            <ArrowRight
                                size={18}
                            />

                        </NavLink>

                    </div>

                </div>

            </section>


            {/* Statistics */}

            <section
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >

                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        transition
                        hover:-translate-y-1
                        hover:shadow-lg
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-500
                                "
                            >
                                Pending Requests
                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-4xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                {
                                    pendingRequests.length
                                }
                            </h2>

                        </div>

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-blue-50
                                text-blue-600
                            "
                        >

                            <Users
                                size={28}
                            />

                        </div>

                    </div>

                </div>


                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        transition
                        hover:-translate-y-1
                        hover:shadow-lg
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-500
                                "
                            >
                                Today's Trips
                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-4xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                {
                                    todayTrips.length
                                }
                            </h2>

                        </div>

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-emerald-50
                                text-emerald-600
                            "
                        >

                            <CalendarDays
                                size={28}
                            />

                        </div>

                    </div>

                </div>


                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        transition
                        hover:-translate-y-1
                        hover:shadow-lg
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-500
                                "
                            >
                                Upcoming Trips
                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-4xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                {
                                    upcomingTrips.length
                                }
                            </h2>

                        </div>

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-orange-50
                                text-orange-600
                            "
                        >

                            <MapPinned
                                size={28}
                            />

                        </div>

                    </div>

                </div>


                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        transition
                        hover:-translate-y-1
                        hover:shadow-lg
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-500
                                "
                            >
                                Driver Rating
                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-4xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                {driver?.rating ??
                                    0}
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                "
                            >
                                {
                                    driver?.totalReviews ??
                                    0
                                }{" "}
                                reviews
                            </p>

                        </div>

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-yellow-50
                                text-yellow-600
                            "
                        >

                            <Star
                                size={28}
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* Main Content */}

            <section
                className="
                    grid
                    gap-8
                    xl:grid-cols-3
                "
            >

                {/* Ride Requests */}

                <div
                    className="
                        rounded-[32px]
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                        xl:col-span-2
                    "
                >

                    <div
                        className="
                            mb-8
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-blue-600
                                "
                            >
                                RIDES
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                New Ride Requests
                            </h2>

                        </div>


                        <NavLink
                            to="/bookings"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-300
                                px-5
                                py-2
                                font-medium
                                transition
                                hover:bg-slate-100
                            "
                        >

                            View All

                            <ArrowRight
                                size={16}
                            />

                        </NavLink>

                    </div>


                    {visibleRequests.length ===
                    0 ? (

                        <div
                            className="
                                rounded-3xl
                                bg-slate-50
                                px-6
                                py-14
                                text-center
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-white
                                    text-slate-400
                                    shadow-sm
                                "
                            >

                                <CheckCircle2
                                    size={28}
                                />

                            </div>

                            <h3
                                className="
                                    mt-5
                                    text-xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                No pending ride requests
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-slate-500
                                "
                            >
                                New requests from tourists
                                will appear here.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                                space-y-5
                            "
                        >

                            {visibleRequests.map(
                                (
                                    request
                                ) => (

                                    <div
                                        key={
                                            request.id
                                        }
                                        className="
                                            rounded-3xl
                                            border
                                            border-slate-200
                                            p-6
                                            transition
                                            hover:border-blue-300
                                            hover:shadow-lg
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                flex-col
                                                gap-6
                                                lg:flex-row
                                                lg:items-center
                                                lg:justify-between
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    gap-5
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        h-16
                                                        w-16
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-2xl
                                                        bg-blue-50
                                                        text-xl
                                                        font-bold
                                                        text-blue-600
                                                    "
                                                >

                                                    {request
                                                        .tourist
                                                        .name
                                                        .charAt(
                                                            0
                                                        )
                                                        .toUpperCase()}

                                                </div>


                                                <div>

                                                    <h3
                                                        className="
                                                            text-xl
                                                            font-semibold
                                                            text-slate-900
                                                        "
                                                    >
                                                        {
                                                            request
                                                                .tourist
                                                                .name
                                                        }
                                                    </h3>


                                                    <p
                                                        className="
                                                            mt-1
                                                            text-slate-500
                                                        "
                                                    >
                                                        {
                                                            request
                                                                .tourist
                                                                .email
                                                        }
                                                    </p>


                                                    <div
                                                        className="
                                                            mt-5
                                                            grid
                                                            grid-cols-2
                                                            gap-x-8
                                                            gap-y-4
                                                            text-sm
                                                        "
                                                    >

                                                        <div>

                                                            <p
                                                                className="
                                                                    text-slate-400
                                                                "
                                                            >
                                                                Date
                                                            </p>

                                                            <p
                                                                className="
                                                                    mt-1
                                                                    font-medium
                                                                "
                                                            >
                                                                {formatDate(
                                                                    request
                                                                        .cartItem
                                                                        .driverStartDate
                                                                )}
                                                            </p>

                                                        </div>


                                                        <div>

                                                            <p
                                                                className="
                                                                    text-slate-400
                                                                "
                                                            >
                                                                Pickup
                                                            </p>

                                                            <p
                                                                className="
                                                                    mt-1
                                                                    font-medium
                                                                "
                                                            >
                                                                {formatTime(
                                                                    request
                                                                        .cartItem
                                                                        .driverStartTime
                                                                )}
                                                            </p>

                                                        </div>


                                                        <div>

                                                            <p
                                                                className="
                                                                    text-slate-400
                                                                "
                                                            >
                                                                Hours
                                                            </p>

                                                            <p
                                                                className="
                                                                    mt-1
                                                                    font-medium
                                                                "
                                                            >
                                                                {
                                                                    request
                                                                        .cartItem
                                                                        .driverRequestedHours ??
                                                                    "—"
                                                                }
                                                            </p>

                                                        </div>


                                                        <div>

                                                            <p
                                                                className="
                                                                    text-slate-400
                                                                "
                                                            >
                                                                Fare
                                                            </p>

                                                            <p
                                                                className="
                                                                    mt-1
                                                                    font-semibold
                                                                    text-emerald-600
                                                                "
                                                            >
                                                                ₹
                                                                {formatAmount(
                                                                    request
                                                                        .cartItem
                                                                        .totalPrice
                                                                )}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>


                                            <div
                                                className="
                                                    flex
                                                    flex-col
                                                    gap-3
                                                "
                                            >

                                                <NavLink
                                                    to="/bookings"
                                                    className="
                                                        rounded-xl
                                                        bg-emerald-600
                                                        px-6
                                                        py-3
                                                        text-center
                                                        font-semibold
                                                        text-white
                                                        transition
                                                        hover:bg-emerald-700
                                                    "
                                                >
                                                    Review Request
                                                </NavLink>

                                                <p
                                                    className="
                                                        text-center
                                                        text-xs
                                                        text-slate-400
                                                    "
                                                >
                                                    Expires{" "}
                                                    {formatDate(
                                                        request.expiresAt
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>


                {/* Today's Schedule */}

                <div
                    className="
                        rounded-[32px]
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wider
                                text-blue-600
                            "
                        >
                            TODAY
                        </p>

                        <h2
                            className="
                                mt-2
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Trip Schedule
                        </h2>

                    </div>


                    {todayTrips.length ===
                    0 ? (

                        <div
                            className="
                                mt-10
                                rounded-3xl
                                bg-slate-50
                                p-8
                                text-center
                            "
                        >

                            <CalendarDays
                                size={28}
                                className="
                                    mx-auto
                                    text-slate-400
                                "
                            />

                            <p
                                className="
                                    mt-4
                                    font-semibold
                                    text-slate-700
                                "
                            >
                                No trips scheduled today
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-slate-400
                                "
                            >
                                Your schedule will appear
                                here when you have a trip.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                                relative
                                mt-10
                            "
                        >

                            <div
                                className="
                                    absolute
                                    left-3
                                    top-0
                                    h-full
                                    w-[2px]
                                    bg-slate-200
                                "
                            />


                            {todayTrips.map(
                                (
                                    trip
                                ) => {

                                    const driverItem =
                                        trip.items.find(
                                            (
                                                item
                                            ) =>
                                                item.bookingType ===
                                                "DRIVER"
                                        );


                                    return (

                                        <div
                                            key={
                                                trip.id
                                            }
                                            className="
                                                relative
                                                mb-8
                                                flex
                                                gap-5
                                            "
                                        >

                                            <div
                                                className="
                                                    z-10
                                                    mt-1
                                                    h-6
                                                    w-6
                                                    shrink-0
                                                    rounded-full
                                                    border-4
                                                    border-white
                                                    bg-blue-600
                                                "
                                            />


                                            <div
                                                className="
                                                    min-w-0
                                                    flex-1
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-sm
                                                        text-slate-400
                                                    "
                                                >
                                                    {
                                                        driverItem
                                                            ?.driverStartTime ??
                                                        "Time not set"
                                                    }
                                                </p>


                                                <h3
                                                    className="
                                                        mt-1
                                                        font-semibold
                                                        text-slate-900
                                                    "
                                                >
                                                    Trip #
                                                    {
                                                        trip.bookingNumber
                                                    }
                                                </h3>


                                                <p
                                                    className="
                                                        mt-1
                                                        truncate
                                                        text-sm
                                                        text-slate-500
                                                    "
                                                >
                                                    {
                                                        trip.user
                                                            .firstName
                                                    }{" "}
                                                    {
                                                        trip.user
                                                            .lastName
                                                    }
                                                </p>


                                                <span
                                                    className={`
                                                        mt-3
                                                        inline-block
                                                        rounded-full
                                                        px-3
                                                        py-1
                                                        text-xs
                                                        font-semibold
                                                        ${getTripStatusClasses(
                                                            trip.tripStatus
                                                        )}
                                                    `}
                                                >
                                                    {
                                                        trip.tripStatus
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}

                </div>

            </section>


            {/* Quick Actions + Driver Snapshot + Recent Trips */}

            <section
                className="
                    grid
                    gap-8
                    xl:grid-cols-3
                "
            >

                {/* Quick Actions */}

                <div
                    className="
                        rounded-[32px]
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                    "
                >

                    <p
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-wider
                            text-blue-600
                        "
                    >
                        QUICK ACTIONS
                    </p>

                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Shortcuts
                    </h2>


                    <div
                        className="
                            mt-8
                            space-y-4
                        "
                    >

                        <NavLink
                            to="/bookings"
                            className="
                                group
                                flex
                                w-full
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                border-slate-200
                                p-5
                                transition-all
                                hover:border-blue-500
                                hover:bg-blue-50
                            "
                        >

                            <div>

                                <h3
                                    className="
                                        font-semibold
                                    "
                                >
                                    Ride Requests
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {
                                        pendingRequests.length
                                    }{" "}
                                    pending requests
                                </p>

                            </div>

                            <ArrowRight
                                className="
                                    text-blue-600
                                    transition
                                    group-hover:translate-x-1
                                "
                            />

                        </NavLink>


                        <NavLink
                            to="/availability"
                            className="
                                group
                                flex
                                w-full
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                border-slate-200
                                p-5
                                transition-all
                                hover:border-blue-500
                                hover:bg-blue-50
                            "
                        >

                            <div>

                                <h3
                                    className="
                                        font-semibold
                                    "
                                >
                                    Update Availability
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {availability
                                        ?.isAvailable
                                        ? "Currently available"
                                        : "Currently unavailable"}
                                </p>

                            </div>

                            <ArrowRight
                                className="
                                    text-blue-600
                                    transition
                                    group-hover:translate-x-1
                                "
                            />

                        </NavLink>


                        <NavLink
                            to="/vehicle"
                            className="
                                group
                                flex
                                w-full
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                border-slate-200
                                p-5
                                transition-all
                                hover:border-blue-500
                                hover:bg-blue-50
                            "
                        >

                            <div>

                                <h3
                                    className="
                                        font-semibold
                                    "
                                >
                                    Vehicle Details
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {vehicle
                                        ? `${vehicle.vehicleBrand} ${vehicle.vehicleModel}`
                                        : "Vehicle not configured"}
                                </p>

                            </div>

                            <ArrowRight
                                className="
                                    text-blue-600
                                    transition
                                    group-hover:translate-x-1
                                "
                            />

                        </NavLink>


                        <NavLink
                            to="/profile"
                            className="
                                group
                                flex
                                w-full
                                items-center
                                justify-between
                                rounded-2xl
                                border
                                border-slate-200
                                p-5
                                transition-all
                                hover:border-blue-500
                                hover:bg-blue-50
                            "
                        >

                            <div>

                                <h3
                                    className="
                                        font-semibold
                                    "
                                >
                                    Driver Profile
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {driver?.city ??
                                        "Manage your profile"}
                                </p>

                            </div>

                            <ArrowRight
                                className="
                                    text-blue-600
                                    transition
                                    group-hover:translate-x-1
                                "
                            />

                        </NavLink>

                    </div>

                </div>


                {/* Driver Snapshot */}

                <div
                    className="
                        rounded-[32px]
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                    "
                >

                    <p
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-wider
                            text-blue-600
                        "
                    >
                        DRIVER SNAPSHOT
                    </p>

                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Your Profile
                    </h2>


                    <div
                        className="
                            mt-8
                            space-y-5
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                bg-slate-50
                                p-4
                            "
                        >

                            <span
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Availability
                            </span>

                            <span
                                className={`
                                    rounded-full
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    ${
                                        availability
                                            ?.isAvailable
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-red-100 text-red-700"
                                    }
                                `}
                            >
                                {availability
                                    ?.isAvailable
                                    ? "Available"
                                    : "Unavailable"}
                            </span>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                bg-slate-50
                                p-4
                            "
                        >

                            <span
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Vehicle
                            </span>

                            <span
                                className="
                                    max-w-[180px]
                                    truncate
                                    text-right
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                "
                            >
                                {vehicle
                                    ? `${vehicle.vehicleBrand} ${vehicle.vehicleModel}`
                                    : "Not configured"}
                            </span>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                bg-slate-50
                                p-4
                            "
                        >

                            <span
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Experience
                            </span>

                            <span
                                className="
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                "
                            >
                                {driver?.experience ??
                                    0}{" "}
                                years
                            </span>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                bg-slate-50
                                p-4
                            "
                        >

                            <span
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Reviews
                            </span>

                            <span
                                className="
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                "
                            >
                                {driver?.totalReviews ??
                                    0}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Recent Trips */}

                <div
                    className="
                        rounded-[32px]
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-blue-600
                                "
                            >
                                TRIPS
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                Recent Trips
                            </h2>

                        </div>


                        <NavLink
                            to="/trips"
                            className="
                                text-sm
                                font-semibold
                                text-blue-600
                                hover:text-blue-700
                            "
                        >
                            View all
                        </NavLink>

                    </div>


                    {recentTrips.length ===
                    0 ? (

                        <div
                            className="
                                mt-8
                                rounded-2xl
                                bg-slate-50
                                p-8
                                text-center
                            "
                        >

                            <Car
                                size={26}
                                className="
                                    mx-auto
                                    text-slate-400
                                "
                            />

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    text-slate-500
                                "
                            >
                                No trips available yet.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                                mt-8
                                space-y-5
                            "
                        >

                            {recentTrips.map(
                                (
                                    trip
                                ) => (

                                    <div
                                        key={
                                            trip.id
                                        }
                                        className="
                                            rounded-2xl
                                            border
                                            border-slate-100
                                            p-4
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                            "
                                        >

                                            <div
                                                className="
                                                    min-w-0
                                                "
                                            >

                                                <p
                                                    className="
                                                        font-semibold
                                                        text-slate-900
                                                    "
                                                >
                                                    #
                                                    {
                                                        trip.bookingNumber
                                                    }
                                                </p>

                                                <p
                                                    className="
                                                        mt-1
                                                        truncate
                                                        text-sm
                                                        text-slate-500
                                                    "
                                                >
                                                    {
                                                        trip.user
                                                            .firstName
                                                    }{" "}
                                                    {
                                                        trip.user
                                                            .lastName
                                                    }
                                                </p>

                                                <p
                                                    className="
                                                        mt-2
                                                        text-xs
                                                        text-slate-400
                                                    "
                                                >
                                                    {formatDate(
                                                        trip.startDate
                                                    )}
                                                </p>

                                            </div>


                                            <span
                                                className={`
                                                    shrink-0
                                                    rounded-full
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-semibold
                                                    ${getTripStatusClasses(
                                                        trip.tripStatus
                                                    )}
                                                `}
                                            >
                                                {
                                                    trip.tripStatus
                                                }
                                            </span>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </section>


            {/* Current Activity */}

            <section
                className="
                    rounded-[32px]
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-sm
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wider
                                text-blue-600
                            "
                        >
                            CURRENT STATUS
                        </p>

                        <h2
                            className="
                                mt-2
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Driver Activity
                        </h2>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            bg-slate-50
                            px-4
                            py-2
                            text-sm
                            text-slate-600
                        "
                    >

                        <Clock3
                            size={16}
                        />

                        Live dashboard data

                    </div>

                </div>


                <div
                    className="
                        mt-8
                        grid
                        gap-5
                        md:grid-cols-3
                    "
                >

                    <div
                        className="
                            rounded-2xl
                            bg-blue-50
                            p-6
                        "
                    >

                        <Users
                            size={24}
                            className="
                                text-blue-600
                            "
                        />

                        <p
                            className="
                                mt-4
                                text-sm
                                text-slate-500
                            "
                        >
                            Pending Requests
                        </p>

                        <p
                            className="
                                mt-1
                                text-2xl
                                font-bold
                                text-slate-900
                            "
                        >
                            {
                                pendingRequests.length
                            }
                        </p>

                    </div>


                    <div
                        className="
                            rounded-2xl
                            bg-emerald-50
                            p-6
                        "
                    >

                        <Car
                            size={24}
                            className="
                                text-emerald-600
                            "
                        />

                        <p
                            className="
                                mt-4
                                text-sm
                                text-slate-500
                            "
                        >
                            Completed Trips
                        </p>

                        <p
                            className="
                                mt-1
                                text-2xl
                                font-bold
                                text-slate-900
                            "
                        >
                            {
                                completedTrips.length
                            }
                        </p>

                    </div>


                    <div
                        className="
                            rounded-2xl
                            bg-yellow-50
                            p-6
                        "
                    >

                        <Star
                            size={24}
                            className="
                                text-yellow-600
                            "
                        />

                        <p
                            className="
                                mt-4
                                text-sm
                                text-slate-500
                            "
                        >
                            Customer Rating
                        </p>

                        <p
                            className="
                                mt-1
                                text-2xl
                                font-bold
                                text-slate-900
                            "
                        >
                            {driver?.rating ??
                                0}{" "}
                            / 5
                        </p>

                    </div>

                </div>

            </section>


            {/* Footer */}

            <section
                className="
                    rounded-[32px]
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-sm
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-8
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-widest
                                text-blue-600
                            "
                        >
                            TRAVELMATE DRIVER
                        </p>

                        <h2
                            className="
                                mt-3
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Keep Your Driving Business Moving
                        </h2>

                        <p
                            className="
                                mt-4
                                max-w-2xl
                                leading-7
                                text-slate-500
                            "
                        >
                            Keep your availability updated,
                            respond to ride requests quickly,
                            and stay on top of your scheduled
                            trips to provide a great experience
                            for travellers.
                        </p>

                    </div>


                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-4
                        "
                    >

                        <div
                            className="
                                rounded-2xl
                                bg-slate-100
                                px-6
                                py-5
                                text-center
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Trips
                            </p>

                            <h3
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                {trips.length}
                            </h3>

                        </div>


                        <div
                            className="
                                rounded-2xl
                                bg-slate-100
                                px-6
                                py-5
                                text-center
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Reviews
                            </p>

                            <h3
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                {driver?.totalReviews ??
                                    0}
                            </h3>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );

}


export default DashboardPage;