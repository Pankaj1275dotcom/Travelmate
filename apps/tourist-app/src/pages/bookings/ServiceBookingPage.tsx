import { useMemo, useState } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    IndianRupee,
    Loader2,
    MapPin,
    User,
} from "lucide-react";

import Layout from "../../components/layout/Layout";

import { ROUTES } from "../../constants/routes";

import guideService from "../../services/guide/guide.service";
import driverService from "../../services/driver/driver.service";

import useBooking from "../../hooks/useBooking";

function ServiceBookingPage() {

    const navigate =
        useNavigate();

    const {
        guideId,
        driverId,
    } = useParams();

    const isGuideBooking =
        !!guideId;

    const {
        addGuideToCart,
        addDriverToCart,
        isLoading,
    } = useBooking();

    /*
     * Booking Dates
     */
    const [
        startDate,
        setStartDate,
    ] = useState("");

    const [
        endDate,
        setEndDate,
    ] = useState("");

    /*
     * Daily Timing
     */
    const [
        startTime,
        setStartTime,
    ] = useState("");

    const [
        endTime,
        setEndTime,
    ] = useState("");

    /*
     * Special Request
     */
    const [
        specialRequest,
        setSpecialRequest,
    ] = useState("");

    /*
     * Guide / Driver Details
     */
    const {
        data: guideResponse,
        isLoading: guideLoading,
    } = useQuery({

        queryKey: [
            "guide",
            guideId,
        ],

        queryFn: () =>
            guideService.getGuideById(
                guideId!
            ),

        enabled:
            isGuideBooking,

    });

    const {
        data: driverResponse,
        isLoading: driverLoading,
    } = useQuery({

        queryKey: [
            "driver",
            driverId,
        ],

        queryFn: () =>
            driverService.getDriverById(
                driverId!
            ),

        enabled:
            !isGuideBooking,

    });

    const service =
        useMemo(() => {

            return isGuideBooking
                ? guideResponse?.guide
                : driverResponse?.driver;

        }, [

            guideResponse,
            driverResponse,
            isGuideBooking,

        ]);

    /*
     * Total Booking Days
     */
    const totalDays =
        useMemo(() => {

            if (
                !startDate ||
                !endDate
            ) {

                return 0;

            }

            const start =
                new Date(startDate);

            const end =
                new Date(endDate);

            const diff =
                end.getTime() -
                start.getTime();

            if (diff < 0) {

                return 0;

            }

            return (
                Math.floor(
                    diff /
                        (
                            1000 *
                            60 *
                            60 *
                            24
                        )
                ) + 1
            );

        }, [

            startDate,
            endDate,

        ]);

    /*
     * Daily Hours
     */
    const requestedHours =
        useMemo(() => {

            if (
                !startTime ||
                !endTime
            ) {

                return 0;

            }

            const [
                sh,
                sm,
            ] =
                startTime
                    .split(":")
                    .map(Number);

            const [
                eh,
                em,
            ] =
                endTime
                    .split(":")
                    .map(Number);

            const start =
                sh * 60 + sm;

            const end =
                eh * 60 + em;

            if (
                end <= start
            ) {

                return 0;

            }

            return (
                end - start
            ) / 60;

        }, [

            startTime,
            endTime,

        ]);

const isValidHours =
    isGuideBooking
        ? requestedHours > 0 &&
          requestedHours <= 6
        : requestedHours > 0;

    /*
     * Total Price
     */
    const totalPrice =
        useMemo(() => {

            if (!service) {

                return 0;

            }

            return (
                service.pricePerDay *
                totalDays
            );

        }, [

            service,
            totalDays,

        ]);

    if (
        guideLoading ||
        driverLoading
    ) {

        return (

            <Layout>

                <div className="flex h-[70vh] items-center justify-center">

                    <Loader2
                        size={50}
                        className="animate-spin text-blue-600"
                    />

                </div>

            </Layout>

        );

    }    if (!service) {

        return (

            <Layout>

                <div className="flex h-[70vh] items-center justify-center">

                    <h1 className="text-4xl font-bold">

                        Service Not Found

                    </h1>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <section className="bg-gradient-to-br from-blue-600 via-sky-600 to-cyan-500 py-16">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

                    <div>

                        <Link
                            to={
                                isGuideBooking
                                    ? `/guides/${guideId}`
                                    : `/drivers/${driverId}`
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 font-medium text-white backdrop-blur-md transition hover:bg-white/30"
                        >

                            <ArrowLeft size={18} />

                            Back

                        </Link>

                        <h1 className="mt-8 text-5xl font-black text-white">

                            {
                                isGuideBooking
                                    ? "Book Guide"
                                    : "Book Driver"
                            }

                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-blue-100">

                           {
    isGuideBooking
        ? (
            <>
                Select your travel dates,
                choose your preferred
                daily timing and add
                the guide to your
                Trip Cart.
            </>
        )
        : (
            <>
                Select your travel dates
                and preferred daily
                driving time.

                The booking amount is
                calculated using the
                Driver Daily Package.
            </>
        )
}

                        </p>

                    </div>

                </div>

            </section>

            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-3">

                <div className="space-y-8 lg:col-span-2">

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">

                                    {
                                        isGuideBooking
                                            ? "Guide"
                                            : "Driver"
                                    }

                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-slate-900">

                                    {service.fullName}

                                </h2>

                            </div>

                            <div className="rounded-2xl bg-blue-50 p-5">

                                <div className="flex items-center text-3xl font-black text-blue-600">

                                    <IndianRupee size={28} />

                                    {service.pricePerDay}

                                </div>

                                <p className="text-sm text-slate-500">

    {
        isGuideBooking
            ? "Per Day"
            : "Driver Daily Package"
    }

</p>

{
    !isGuideBooking && (

        <p className="mt-2 text-xs leading-5 text-slate-500">

            Includes up to
            <strong> 5 driving hours/day</strong>

        </p>

    )
}

                            </div>

                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">

                            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">

                                <User
                                    size={24}
                                    className="text-blue-600"
                                />

                                <div>

                                    <p className="text-sm text-slate-500">

                                        Experience

                                    </p>

                                    <p className="font-semibold">

                                        {service.experience} Years

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">

                                <MapPin
                                    size={24}
                                    className="text-blue-600"
                                />

                                <div>

                                    <p className="text-sm text-slate-500">

                                        City

                                    </p>

                                    <p className="font-semibold">

                                        {service.city}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                        <h2 className="text-2xl font-bold">

                            Booking Details

                        </h2>

                        <p className="mt-2 text-slate-500">

                            Select your travel dates.
                            You can book this service
                            for multiple days.

                        </p>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">                            {/* Start Date */}
                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Start Date

                                </label>

                                <div className="relative">

                                    <CalendarDays
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="date"
                                        value={startDate}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        onChange={(event) =>
                                            setStartDate(
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-500"
                                    />

                                </div>

                            </div>

                            {/* End Date */}
                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    End Date

                                </label>

                                <div className="relative">

                                    <CalendarDays
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="date"
                                        value={endDate}
                                        min={
                                            startDate ||
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        onChange={(event) =>
                                            setEndDate(
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-500"
                                    />

                                </div>

                            </div>

                            {/* Start Time */}
                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Daily Start Time

                                </label>

                                <div className="relative">

                                    <Clock3
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(event) =>
                                            setStartTime(
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-500"
                                    />

                                </div>

                            </div>

                            {/* End Time */}
                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Daily End Time

                                </label>

                                <div className="relative">

                                    <Clock3
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(event) =>
                                            setEndTime(
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-500"
                                    />

                                </div>

                            </div>

                            <div className="md:col-span-2">

                                <div className="rounded-2xl bg-blue-50 p-5">

                                    <div className="flex justify-between">

                                        <span>

                                            Booking Days

                                        </span>

                                        <span className="font-bold">

                                            {totalDays || "--"}

                                        </span>

                                    </div>

                                    <div className="mt-3 flex justify-between">

                                        <span>

                                            Hours Per Day

                                        </span>

                                        <span
                                            className={
                                                isValidHours
                                                    ? "font-bold text-green-600"
                                                    : "font-bold text-red-600"
                                            }
                                        >

                                            {requestedHours || "--"} hrs

                                        </span>

                                    </div>

                                </div>

                                {
    isGuideBooking &&
    requestedHours > 6 && (

        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">

            <p className="text-sm font-medium text-red-600">

                A guide can be booked for a maximum of
                <strong> 6 hours per day.</strong>

            </p>

        </div>

    )
}

{
    !isGuideBooking &&
    requestedHours > 5 && (

        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-5">

            <h3 className="font-semibold text-amber-800">

                Driver Package Information

            </h3>

            <p className="mt-2 text-sm leading-6 text-amber-700">

                Your booking amount includes the
                driver's daily package price, which
                covers up to <strong>5 driving hours per day</strong>.

            </p>

            <p className="mt-3 text-sm leading-6 text-amber-700">

                You have selected
                <strong> {requestedHours} hours/day</strong>.

            </p>

            <p className="mt-3 text-sm leading-6 text-amber-700">

                Any driving beyond 5 hours per day
                is not included in the TravelMate
                booking amount.

            </p>

            <p className="mt-3 text-sm leading-6 font-medium text-amber-800">

                Additional hourly charges, if any,
                should be paid directly to the
                driver after the trip.

            </p>

        </div>

    )
}

                            </div>

                            <div className="md:col-span-2">

                                <label className="mb-2 block font-medium text-slate-700">

                                    Special Request (Optional)

                                </label>

                                <textarea
                                    rows={5}
                                    value={specialRequest}
                                    onChange={(event) =>
                                        setSpecialRequest(
                                            event.target.value
                                        )
                                    }
                                    placeholder={
                                        isGuideBooking
                                            ? "Share itinerary, preferred language, pickup location or other instructions..."
                                            : "Mention pickup location or any special instructions..."
                                    }
                                    className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-blue-500"
                                />

                            </div>

                        </div>

                    </div>

                </div>                <div>

                    <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

                        <h2 className="text-2xl font-bold">

                            Booking Summary

                        </h2>

                        <div className="mt-8 space-y-5">

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">

                                    Service

                                </span>

                                <span className="font-semibold">

                                    {
                                        isGuideBooking
                                            ? "Guide"
                                            : "Driver"
                                    }

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">

                                    Name

                                </span>

                                <span className="text-right font-semibold">

                                    {service.fullName}

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">

                                    Booking Dates

                                </span>

                                <span className="text-right font-semibold">

                                    {
                                        startDate &&
                                        endDate
                                            ? `${startDate} → ${endDate}`
                                            : "--"
                                    }

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">

                                    Daily Timing

                                </span>

                                <span className="font-semibold">

                                    {
                                        startTime &&
                                        endTime
                                            ? `${startTime} - ${endTime}`
                                            : "--"
                                    }

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">

                                    Total Days

                                </span>

                                <span className="font-semibold">

                                    {totalDays || "--"}

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">

                                    Hours / Day

                                </span>

                                <span
                                    className={
                                        isValidHours
                                            ? "font-semibold text-green-600"
                                            : "font-semibold text-red-600"
                                    }
                                >

                                    {requestedHours || "--"}

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

    <span className="text-slate-500">

        Package Price / Day

    </span>

    <span className="font-semibold">

        ₹{service.pricePerDay}

    </span>

</div>

{
    !isGuideBooking && (

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">

            <p className="text-sm font-semibold text-amber-800">

                Driver Daily Package

            </p>

            <p className="mt-2 text-sm leading-6 text-amber-700">

                ✓ Includes up to
                <strong> 5 driving hours per day.</strong>

            </p>

            <p className="mt-2 text-sm leading-6 text-amber-700">

                ✓ Booking Amount =
                <strong>
                    {" "}
                    ₹{service.pricePerDay}
                </strong>
                {" "}×{" "}
                <strong>
                    {totalDays || 0}
                </strong>
                {" "}day(s)

            </p>

            {
                requestedHours > 5 && (

                    <p className="mt-2 text-sm leading-6 font-medium text-red-600">

                        Selected Driving Time:
                        {" "}
                        {requestedHours}
                        {" "}hours/day

                    </p>

                )
            }

        </div>

    )
}

                            <div className="border-t border-dashed border-slate-300 pt-5">

                                <div className="flex items-center justify-between">

                                    <span className="text-xl font-bold">

                                        Total Price

                                    </span>

                                    <span className="text-3xl font-black text-blue-600">

                                        ₹{totalPrice}

                                    </span>

                                </div>

                            </div>

                            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">

<h3 className="font-bold text-blue-700">

    Booking Information

</h3>

                                <ul className="mt-3 space-y-2 text-sm text-slate-600">

                                    <li>

                                        • Your booking request will be sent automatically.

                                    </li>

                                    <li>

                                        • The guide / driver has 30 minutes to respond.

                                    </li>

                                    <li>

                                        • Payment becomes available only after approval.

                                    </li>

                                    <li>

                                        • If the request expires or is rejected, this item will be removed from the payable amount.

                                    </li>

                                   {
    isGuideBooking ? (

        <li>

            • Maximum guide booking time is
            6 hours per day.

        </li>

    ) : (

        <li>

            • Driver package includes
            5 driving hours per day.
            Additional driving time,
            if required, should be settled
            directly with the driver.

        </li>

    )
}

                                </ul>

                            </div>                            <button
                                disabled={
                                    isLoading ||
                                    !startDate ||
                                    !endDate ||
                                    !startTime ||
                                    !endTime ||
                                    totalDays <= 0 ||
                                    !isValidHours
                                }
                                onClick={() => {

                                    if (isGuideBooking) {

                                        addGuideToCart(

                                            {

                                                guideId:
                                                    service.id,

                                                startDate,

                                                endDate,

                                                startTime,

                                                endTime,

                                                specialRequest,

                                            },

                                            {

                                                onSuccess: () => {

                                                    navigate(
                                                        ROUTES.CART
                                                    );

                                                },

                                            }

                                        );

                                    } else {

                                        addDriverToCart(

                                            {

                                                driverId:
                                                    service.id,

                                                startDate,

                                                endDate,

                                                startTime,

                                                endTime,

                                                specialRequest,

                                            },

                                            {

                                                onSuccess: () => {

                                                    navigate(
                                                        ROUTES.CART
                                                    );

                                                },

                                            }

                                        );

                                    }

                                }}
                                className="mt-8 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                            >

                                {
                                    isLoading
                                        ? "Adding..."
                                        : "Add To Trip Cart"
                                }

                            </button>

                        </div>

                    </div>

                </div>            </section>

        </Layout>

    );

}

export default ServiceBookingPage;