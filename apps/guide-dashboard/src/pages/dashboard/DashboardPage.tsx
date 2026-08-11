import {
    ArrowRight,
    Bell,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock3,
    MapPinned,
    Star,
    Users,
    Wallet,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";

import useGuide from "../../hooks/useGuide";
import useBooking from "../../hooks/useBooking";

import tripService from "../../services/trips/trip.service";

import type {
    Booking,
    BookingRequest,
} from "../../types/booking.types";


function formatDate(
    date: string
) {

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
    date: string
) {

    return new Date(
        date
    ).toLocaleTimeString(
        "en-IN",
        {
            hour: "numeric",
            minute: "2-digit",
        }
    );

}


function isToday(
    date: string
) {

    const today =
        new Date();

    const target =
        new Date(date);

    return (
        today.getFullYear() ===
            target.getFullYear() &&

        today.getMonth() ===
            target.getMonth() &&

        today.getDate() ===
            target.getDate()
    );

}


function getGreeting() {

    const hour =
        new Date().getHours();

    if (hour < 12) {
        return "Good Morning";
    }

    if (hour < 17) {
        return "Good Afternoon";
    }

    return "Good Evening";

}


function getStatusClasses(
    status: Booking["tripStatus"]
) {

    switch (status) {

        case "COMPLETED":
            return "bg-emerald-100 text-emerald-700";

        case "IN_PROGRESS":
            return "bg-orange-100 text-orange-700";

        case "READY_TO_START":
            return "bg-blue-100 text-blue-700";

        default:
            return "bg-slate-100 text-slate-600";

    }

}


function getStatusLabel(
    status: Booking["tripStatus"]
) {

    switch (status) {

        case "COMPLETED":
            return "Completed";

        case "IN_PROGRESS":
            return "In Progress";

        case "READY_TO_START":
            return "Ready to Start";

        default:
            return "Upcoming";

    }

}


function StatCard({
    title,
    value,
    icon: Icon,
    color,
}: {
    title: string;
    value: string | number;
    icon: typeof Users;
    color: string;
}) {

    return (

        <div
            className="
                group
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-xl
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
                        {title}
                    </p>

                    <h2
                        className="
                            mt-3
                            text-4xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        "
                    >
                        {value}
                    </h2>

                </div>

                <div
                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        ${color}
                    `}
                >

                    <Icon size={28} />

                </div>

            </div>

        </div>

    );

}


function EmptyState({
    title,
    description,
}: {
    title: string;
    description: string;
}) {

    return (

        <div
            className="
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-slate-50
                p-8
                text-center
            "
        >

            <div
                className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    text-slate-400
                    shadow-sm
                "
            >

                <CalendarDays
                    size={22}
                />

            </div>

            <h3
                className="
                    mt-4
                    font-semibold
                    text-slate-900
                "
            >
                {title}
            </h3>

            <p
                className="
                    mt-2
                    text-sm
                    leading-6
                    text-slate-500
                "
            >
                {description}
            </p>

        </div>

    );

}


function DashboardPage() {

    const {
        myGuide,
        registeredUser,
        isLoading: guideLoading,
    } = useGuide();


    const {
        requests,
        loading: requestsLoading,
        acceptBookingRequest,
        rejectBookingRequest,
        isSubmitting,
    } = useBooking();


    const {
        data: tripsData,
        isLoading: tripsLoading,
    } = useQuery({

        queryKey: [
            "guide-trips",
        ],

        queryFn: () =>
            tripService.getGuideTrips(),

    });


    const trips =
        tripsData?.trips ?? [];


    const pendingRequests =
        requests.filter(
            (
                request: BookingRequest
            ) =>
                request.status ===
                "PENDING"
        );


    const todayTrips =
        trips.filter(
            (
                trip: Booking
            ) =>
                isToday(
                    trip.startDate
                ) &&
                trip.tripStatus !==
                    "COMPLETED"
        );


    const completedTrips =
        trips.filter(
            (
                trip: Booking
            ) =>
                trip.tripStatus ===
                "COMPLETED"
        );


    const upcomingTrips =
        [...trips]
            .filter(
                (
                    trip: Booking
                ) =>
                    trip.tripStatus !==
                    "COMPLETED"
            )
            .sort(
                (
                    first,
                    second
                ) =>
                    new Date(
                        first.startDate
                    ).getTime() -
                    new Date(
                        second.startDate
                    ).getTime()
            );


    const guideName =
        myGuide?.fullName ??
        registeredUser?.fullName ??
        "Guide";


    const guideRating =
        myGuide?.rating ?? 0;


    const totalReviews =
        myGuide?.totalReviews ?? 0;


    const handleReject =
        (
            requestId: string
        ) => {

            const reason =
                window.prompt(
                    "Please enter a reason for rejecting this booking request."
                );

            if (
                reason === null
            ) {
                return;
            }

            rejectBookingRequest(
                requestId,
                reason.trim()
            );

        };


    const dashboardLoading =
        guideLoading ||
        requestsLoading ||
        tripsLoading;


    if (
        dashboardLoading
    ) {

        return (

            <div
                className="
                    space-y-8
                    animate-pulse
                "
            >

                <div
                    className="
                        h-80
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

                            <Bell
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
                                New Booking{" "}
                                {pendingRequests.length === 1
                                    ? "Request"
                                    : "Requests"}
                            </span>

                        </div>

                        <h1
                            className="
                                mt-8
                                text-5xl
                                font-bold
                                leading-tight
                                tracking-tight
                                text-slate-900
                            "
                        >

                            {getGreeting()},
                            <br />

                            {guideName}

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
                            Manage your booking requests,
                            tours, availability and guide
                            profile from one place.
                        </p>

                        <div
                            className="
                                mt-10
                                flex
                                flex-wrap
                                gap-4
                            "
                        >

                            <Link
                                to="/booking-requests"
                                className="
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
                                View Booking Requests
                            </Link>

                            <Link
                                to="/availability"
                                className="
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
                            </Link>

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
                                    {todayTrips.length === 1
                                        ? "Tour"
                                        : "Tours"}
                                </h2>

                            </div>

                            <MapPinned
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
                                    Pending
                                </span>

                                <strong>
                                    {pendingRequests.length}
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
                                    Completed
                                </span>

                                <strong>
                                    {completedTrips.length}
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
                                    ⭐{" "}
                                    {guideRating.toFixed(
                                        1
                                    )}
                                </strong>

                            </div>

                        </div>


                        <Link
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

                            <ChevronRight
                                size={18}
                            />

                        </Link>

                    </div>

                </div>

            </section>            {/* Statistics */}

            <section
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >

                <StatCard
                    title="Pending Requests"
                    value={
                        pendingRequests.length
                    }
                    icon={Users}
                    color="
                        bg-blue-50
                        text-blue-600
                    "
                />

                <StatCard
                    title="Today's Tours"
                    value={
                        todayTrips.length
                    }
                    icon={CalendarDays}
                    color="
                        bg-emerald-50
                        text-emerald-600
                    "
                />

                <StatCard
                    title="Completed Tours"
                    value={
                        completedTrips.length
                    }
                    icon={CheckCircle2}
                    color="
                        bg-orange-50
                        text-orange-600
                    "
                />

                <StatCard
                    title="Rating"
                    value={
                        guideRating
                            ? guideRating.toFixed(
                                  1
                              )
                            : "—"
                    }
                    icon={Star}
                    color="
                        bg-yellow-50
                        text-yellow-600
                    "
                />

            </section>


            {/* Main Content */}

            <section
                className="
                    grid
                    gap-8
                    xl:grid-cols-3
                "
            >

                {/* Booking Requests */}

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
                                BOOKINGS
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                New Booking Requests
                            </h2>

                        </div>

                        <Link
                            to="/booking-requests"
                            className="
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
                        </Link>

                    </div>


                    {pendingRequests.length === 0 ? (

                        <EmptyState
                            title="
                                No new booking requests
                            "
                            description="
                                New tourist requests will
                                appear here when they arrive.
                            "
                        />

                    ) : (

                        <div
                            className="
                                space-y-6
                            "
                        >

                            {pendingRequests
                                .slice(0, 3)
                                .map(
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
                                                transition-all
                                                duration-300
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
                                                            text-lg
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
                                                            Guide
                                                            Booking
                                                            Request
                                                        </p>


                                                        <div
                                                            className="
                                                                mt-5
                                                                grid
                                                                grid-cols-2
                                                                gap-x-8
                                                                gap-y-3
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
                                                                        font-medium
                                                                    "
                                                                >
                                                                    {request
                                                                        .cartItem
                                                                        .guideStartDate
                                                                        ? formatDate(
                                                                              request
                                                                                  .cartItem
                                                                                  .guideStartDate
                                                                          )
                                                                        : "Not specified"}
                                                                </p>

                                                            </div>


                                                            <div>

                                                                <p
                                                                    className="
                                                                        text-slate-400
                                                                    "
                                                                >
                                                                    Time
                                                                </p>

                                                                <p
                                                                    className="
                                                                        font-medium
                                                                    "
                                                                >
                                                                    {request
                                                                        .cartItem
                                                                        .guideStartTime ??
                                                                        "Not specified"}
                                                                </p>

                                                            </div>


                                                            <div>

                                                                <p
                                                                    className="
                                                                        text-slate-400
                                                                    "
                                                                >
                                                                    Guests
                                                                </p>

                                                                <p
                                                                    className="
                                                                        font-medium
                                                                    "
                                                                >
                                                                    {
                                                                        request
                                                                            .cartItem
                                                                            .quantity
                                                                    }{" "}
                                                                    {request
                                                                        .cartItem
                                                                        .quantity ===
                                                                    1
                                                                        ? "Person"
                                                                        : "Persons"}
                                                                </p>

                                                            </div>


                                                            <div>

                                                                <p
                                                                    className="
                                                                        text-slate-400
                                                                    "
                                                                >
                                                                    Amount
                                                                </p>

                                                                <p
                                                                    className="
                                                                        font-semibold
                                                                        text-emerald-600
                                                                    "
                                                                >
                                                                    ₹
                                                                    {request
                                                                        .cartItem
                                                                        .totalPrice.toLocaleString(
                                                                            "en-IN"
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

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isSubmitting
                                                        }
                                                        onClick={() =>
                                                            acceptBookingRequest(
                                                                request.id
                                                            )
                                                        }
                                                        className="
                                                            rounded-xl
                                                            bg-emerald-600
                                                            px-6
                                                            py-3
                                                            font-semibold
                                                            text-white
                                                            transition
                                                            hover:bg-emerald-700
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-50
                                                        "
                                                    >
                                                        Accept
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isSubmitting
                                                        }
                                                        onClick={() =>
                                                            handleReject(
                                                                request.id
                                                            )
                                                        }
                                                        className="
                                                            rounded-xl
                                                            border
                                                            border-red-200
                                                            px-6
                                                            py-3
                                                            font-semibold
                                                            text-red-600
                                                            transition
                                                            hover:bg-red-50
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-50
                                                        "
                                                    >
                                                        Reject
                                                    </button>

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
                            Schedule
                        </h2>

                    </div>


                    {todayTrips.length === 0 ? (

                        <div
                            className="
                                mt-10
                            "
                        >

                            <EmptyState
                                title="
                                    No tours today
                                "
                                description="
                                    Your schedule is clear
                                    for today.
                                "
                            />

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

                            {todayTrips
                                .slice(0, 5)
                                .map(
                                    (
                                        trip
                                    ) => (

                                        <div
                                            key={
                                                trip.id
                                            }
                                            className="
                                                relative
                                                mb-10
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
                                                    rounded-full
                                                    border-4
                                                    border-white
                                                    bg-blue-600
                                                "
                                            />

                                            <div
                                                className="
                                                    flex-1
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                        text-slate-400
                                                    "
                                                >

                                                    <Clock3
                                                        size={14}
                                                    />

                                                    {formatTime(
                                                        trip.startDate
                                                    )}

                                                </div>

                                                <h3
                                                    className="
                                                        mt-1
                                                        text-lg
                                                        font-semibold
                                                        text-slate-900
                                                    "
                                                >
                                                    Tour with{" "}
                                                    {
                                                        trip
                                                            .user
                                                            .firstName
                                                    }{" "}
                                                    {
                                                        trip
                                                            .user
                                                            .lastName
                                                    }
                                                </h3>

                                                <span
                                                    className={`
                                                        mt-3
                                                        inline-block
                                                        rounded-full
                                                        px-4
                                                        py-1
                                                        text-xs
                                                        font-semibold
                                                        ${getStatusClasses(
                                                            trip.tripStatus
                                                        )}
                                                    `}
                                                >
                                                    {getStatusLabel(
                                                        trip.tripStatus
                                                    )}
                                                </span>

                                            </div>

                                        </div>

                                    )
                                )}

                        </div>

                    )}

                </div>

            </section>            {/* Bottom Section */}

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

                        <Link
                            to="/booking-requests"
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
                                    Booking Requests
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {pendingRequests.length}{" "}
                                    pending{" "}
                                    {pendingRequests.length ===
                                    1
                                        ? "request"
                                        : "requests"}
                                </p>

                            </div>

                            <ArrowRight
                                className="
                                    text-blue-600
                                    transition
                                    group-hover:translate-x-1
                                "
                            />

                        </Link>


                        <Link
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
                                    {myGuide?.isAvailable
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

                        </Link>


                        <Link
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
                                    Edit Profile
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    Manage your guide profile
                                </p>

                            </div>

                            <ArrowRight
                                className="
                                    text-blue-600
                                    transition
                                    group-hover:translate-x-1
                                "
                            />

                        </Link>


                        <Link
                            to="/trips"
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
                                    View Trips
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {upcomingTrips.length}{" "}
                                    upcoming{" "}
                                    {upcomingTrips.length ===
                                    1
                                        ? "tour"
                                        : "tours"}
                                </p>

                            </div>

                            <ArrowRight
                                className="
                                    text-blue-600
                                    transition
                                    group-hover:translate-x-1
                                "
                            />

                        </Link>

                    </div>

                </div>


                {/* Guide Overview */}

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
                        GUIDE OVERVIEW
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
                            space-y-6
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-slate-100
                                pb-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <Star
                                    size={20}
                                    className="
                                        text-yellow-500
                                    "
                                />

                                <span
                                    className="
                                        text-slate-600
                                    "
                                >
                                    Rating
                                </span>

                            </div>

                            <strong
                                className="
                                    text-slate-900
                                "
                            >
                                {guideRating
                                    ? guideRating.toFixed(
                                          1
                                      )
                                    : "—"}
                            </strong>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-slate-100
                                pb-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <Users
                                    size={20}
                                    className="
                                        text-blue-600
                                    "
                                />

                                <span
                                    className="
                                        text-slate-600
                                    "
                                >
                                    Reviews
                                </span>

                            </div>

                            <strong
                                className="
                                    text-slate-900
                                "
                            >
                                {totalReviews}
                            </strong>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-slate-100
                                pb-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <Clock3
                                    size={20}
                                    className="
                                        text-orange-500
                                    "
                                />

                                <span
                                    className="
                                        text-slate-600
                                    "
                                >
                                    Experience
                                </span>

                            </div>

                            <strong
                                className="
                                    text-slate-900
                                "
                            >
                                {myGuide?.experience ?? 0}{" "}
                                {myGuide?.experience ===
                                1
                                    ? "year"
                                    : "years"}
                            </strong>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-slate-100
                                pb-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <Wallet
                                    size={20}
                                    className="
                                        text-emerald-600
                                    "
                                />

                                <span
                                    className="
                                        text-slate-600
                                    "
                                >
                                    Hourly Rate
                                </span>

                            </div>

                            <strong
                                className="
                                    text-slate-900
                                "
                            >
                                ₹
                                {(
                                    myGuide?.pricePerHour ??
                                    0
                                ).toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <CheckCircle2
                                    size={20}
                                    className="
                                        text-emerald-600
                                    "
                                />

                                <span
                                    className="
                                        text-slate-600
                                    "
                                >
                                    Profile Status
                                </span>

                            </div>

                            <span
                                className="
                                    rounded-full
                                    bg-emerald-100
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    text-emerald-700
                                "
                            >
                                {myGuide?.approvalStatus ??
                                    "PENDING"}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Upcoming Tours */}

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
                            items-start
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
                                Upcoming Tours
                            </h2>

                        </div>

                        <Link
                            to="/trips"
                            className="
                                text-sm
                                font-semibold
                                text-blue-600
                                hover:text-blue-700
                            "
                        >
                            View all
                        </Link>

                    </div>


                    <div
                        className="
                            mt-8
                            space-y-5
                        "
                    >

                        {upcomingTrips.length ===
                        0 ? (

                            <EmptyState
                                title="
                                    No upcoming tours
                                "
                                description="
                                    Accepted and scheduled
                                    tours will appear here.
                                "
                            />

                        ) : (

                            upcomingTrips
                                .slice(0, 4)
                                .map(
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
                                                border-slate-200
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

                                                <div>

                                                    <p
                                                        className="
                                                            text-sm
                                                            font-semibold
                                                            text-slate-900
                                                        "
                                                    >
                                                        {
                                                            trip
                                                                .user
                                                                .firstName
                                                        }{" "}
                                                        {
                                                            trip
                                                                .user
                                                                .lastName
                                                        }
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-xs
                                                            text-slate-500
                                                        "
                                                    >
                                                        Booking #
                                                        {
                                                            trip.bookingNumber
                                                        }
                                                    </p>

                                                </div>

                                                <span
                                                    className={`
                                                        rounded-full
                                                        px-3
                                                        py-1
                                                        text-xs
                                                        font-semibold
                                                        ${getStatusClasses(
                                                            trip.tripStatus
                                                        )}
                                                    `}
                                                >
                                                    {getStatusLabel(
                                                        trip.tripStatus
                                                    )}
                                                </span>

                                            </div>


                                            <div
                                                className="
                                                    mt-4
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    text-slate-500
                                                "
                                            >

                                                <CalendarDays
                                                    size={15}
                                                />

                                                {formatDate(
                                                    trip.startDate
                                                )}

                                            </div>

                                        </div>

                                    )
                                )

                        )}

                    </div>

                </div>

            </section>            {/* Recent Activity */}

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
                        RECENT ACTIVITY
                    </p>

                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Activity Feed
                    </h2>

                </div>


                <div
                    className="
                        mt-8
                        grid
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >

                    {[
                        ...pendingRequests
                            .slice(0, 3)
                            .map(
                                (
                                    request
                                ) => ({

                                    id:
                                        `request-${request.id}`,

                                    title:
                                        "New Booking Request",

                                    description:
                                        `${request.tourist.name} sent a new guide booking request.`,

                                    date:
                                        request.requestedAt,

                                    icon:
                                        Users,

                                    iconClass:
                                        "bg-blue-100 text-blue-600",

                                })
                            ),

                        ...trips
                            .slice(0, 3)
                            .map(
                                (
                                    trip
                                ) => ({

                                    id:
                                        `trip-${trip.id}`,

                                    title:
                                        getStatusLabel(
                                            trip.tripStatus
                                        ),

                                    description:
                                        `Tour with ${trip.user.firstName} ${trip.user.lastName}.`,

                                    date:
                                        trip.startDate,

                                    icon:
                                        trip.tripStatus ===
                                        "COMPLETED"
                                            ? CheckCircle2
                                            : MapPinned,

                                    iconClass:
                                        trip.tripStatus ===
                                        "COMPLETED"
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-orange-100 text-orange-600",

                                })
                            ),

                    ]
                        .sort(
                            (
                                first,
                                second
                            ) =>
                                new Date(
                                    second.date
                                ).getTime() -
                                new Date(
                                    first.date
                                ).getTime()
                        )
                        .slice(0, 6)
                        .map(
                            (
                                activity
                            ) => {

                                const Icon =
                                    activity.icon;

                                return (

                                    <div
                                        key={
                                            activity.id
                                        }
                                        className="
                                            flex
                                            gap-4
                                            rounded-2xl
                                            border
                                            border-slate-100
                                            p-5
                                        "
                                    >

                                        <div
                                            className={`
                                                flex
                                                h-12
                                                w-12
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                ${activity.iconClass}
                                            `}
                                        >

                                            <Icon
                                                size={21}
                                            />

                                        </div>

                                        <div>

                                            <h3
                                                className="
                                                    font-semibold
                                                    text-slate-900
                                                "
                                            >
                                                {
                                                    activity.title
                                                }
                                            </h3>

                                            <p
                                                className="
                                                    mt-1
                                                    text-sm
                                                    leading-6
                                                    text-slate-500
                                                "
                                            >
                                                {
                                                    activity.description
                                                }
                                            </p>

                                            <span
                                                className="
                                                    mt-2
                                                    block
                                                    text-xs
                                                    text-slate-400
                                                "
                                            >
                                                {formatDate(
                                                    activity.date
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    {pendingRequests.length ===
                        0 &&
                        trips.length ===
                            0 && (

                            <div
                                className="
                                    md:col-span-2
                                    xl:col-span-3
                                "
                            >

                                <EmptyState
                                    title="
                                        No recent activity
                                    "
                                    description="
                                        Booking and trip activity
                                        will appear here.
                                    "
                                />

                            </div>

                        )}

                </div>

            </section>


            {/* Bottom Summary */}

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
                            TRAVELMATE GUIDE
                        </p>

                        <h2
                            className="
                                mt-3
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Keep Growing Your Guide
                            Business
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
                            respond to booking requests
                            quickly and maintain a strong
                            profile to attract more tourists.
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
                                Completed Tours
                            </p>

                            <h3
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                {
                                    completedTrips.length
                                }
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
                                {totalReviews}
                            </h3>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );

}


export default DashboardPage;