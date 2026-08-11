import {
    CalendarDays,
    Clock3,
    Hotel,
    Moon,
    Users,
} from "lucide-react";

import {
    formatDate,
    formatTime,
} from "../../utils/date";

import CartStatusBadge from "./CartStatusBadge";

import CartPaymentTimer from "./CartPaymentTimer";

import CartSelection from "./CartSelection";

interface CartItemCardProps {

    item: any;

    checked: boolean;

    loading: boolean;

    onRemove: () => void;

    onSelect: (
        checked: boolean
    ) => void;

}

function CartItemCard({

    item,

    checked,

    loading,

    onRemove,

    onSelect,

}: CartItemCardProps) {

    const getHotelNights = (

        checkIn: string,

        checkOut: string

    ) => {

        const start =
            new Date(
                checkIn
            );

        const end =
            new Date(
                checkOut
            );

        const difference =
            end.getTime() -
            start.getTime();

        const nights =
            Math.ceil(

                difference /

                (1000 * 60 * 60 * 24)

            );

        return nights > 0
            ? nights
            : 1;

    };

    const nights =

        item.bookingType ===
            "HOTEL" &&

        item.checkIn &&

        item.checkOut

            ? getHotelNights(

                  item.checkIn,

                  item.checkOut

              )

            : 1;

const blurCard =

    item.requestStatus ===
        "PENDING" ||

    item.requestStatus ===
        "REJECTED" ||

    item.requestStatus ===
        "PAYMENT_EXPIRED";

    return (

        <div

            className={`overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition-all ${

                blurCard

                    ? "bg-slate-100 opacity-60"

                    : "bg-white"

            }`}

        >            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">

                <div className="flex items-start justify-between gap-6">

                    <div>

                        {

                            item.bookingType ===
                                "HOTEL" && (

                                <div className="flex items-center gap-4">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">

                                        <Hotel
                                            size={28}
                                            className="text-blue-600"
                                        />

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">

                                            Hotel

                                        </p>

                                        <h2 className="text-2xl font-bold text-slate-900">

                                            {

                                                item.room
                                                    ?.roomType
                                                    ?.hotel
                                                    ?.name

                                            }

                                        </h2>

                                        <p className="mt-1 text-slate-500">

                                            {

                                                item.room
                                                    ?.roomType
                                                    ?.name

                                            }

                                        </p>

                                    </div>

                                </div>

                            )

                        }

                        {

                            item.bookingType ===
                                "GUIDE" && (

                                <>

                                    <h2 className="text-2xl font-bold text-slate-900">

                                        {

                                            item.guide
                                                ?.fullName

                                        }

                                    </h2>

                                    <p className="mt-1 text-slate-500">

                                        Guide Service

                                    </p>

                                </>

                            )

                        }

                        {

                            item.bookingType ===
                                "DRIVER" && (

                                <>

                                    <h2 className="text-2xl font-bold text-slate-900">

                                        {

                                            item.driver
                                                ?.fullName

                                        }

                                    </h2>

                                    <p className="mt-1 text-slate-500">

                                        Driver Service

                                    </p>

                                </>

                            )

                        }

                    </div>

                    <div className="flex flex-col items-end gap-3">

                        <CartStatusBadge

                            requestStatus={
                                item.requestStatus
                            }

                            rejectionReason={
                                item.rejectionReason
                            }

                        />

                        <CartSelection

                            checked={
                                checked
                            }

                            disabled={
                                blurCard
                            }

                            onChange={
                                onSelect
                            }

                        />

                    </div>

                </div>

            </div>

            <div className="space-y-6 p-6">                {

                    item.bookingType ===
                        "HOTEL" && (

                        <>

                            <div className="grid gap-4 md:grid-cols-2">

                                <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

                                        <CalendarDays

                                            size={22}

                                            className="text-blue-600"

                                        />

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">

                                            Check-in Date

                                        </p>

                                        <p className="font-semibold">

                                            {

                                                formatDate(
                                                    item.checkIn
                                                )

                                            }

                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

                                        <Clock3

                                            size={22}

                                            className="text-blue-600"

                                        />

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">

                                            Check-in Time

                                        </p>

                                        <p className="font-semibold">

                                            {

                                                formatTime(
                                                    item.checkIn
                                                )

                                            }

                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

                                        <CalendarDays

                                            size={22}

                                            className="text-blue-600"

                                        />

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">

                                            Check-out Date

                                        </p>

                                        <p className="font-semibold">

                                            {

                                                formatDate(
                                                    item.checkOut
                                                )

                                            }

                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

                                        <Clock3

                                            size={22}

                                            className="text-blue-600"

                                        />

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">

                                            Check-out Time

                                        </p>

                                        <p className="font-semibold">

                                            {

                                                formatTime(
                                                    item.checkOut
                                                )

                                            }

                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">

                                <div className="rounded-xl border border-slate-200 p-5">

                                    <div className="flex items-center gap-3">

                                        <Users

                                            size={22}

                                            className="text-blue-600"

                                        />

                                        <span className="text-slate-500">

                                            Guests

                                        </span>

                                    </div>

                                    <p className="mt-3 text-2xl font-bold">

                                        {

                                            item.room
                                                ?.roomType
                                                ?.capacity

                                        }

                                    </p>

                                    <p className="text-sm text-slate-500">

                                        Maximum Capacity

                                    </p>

                                </div>

                                <div className="rounded-xl border border-slate-200 p-5">

                                    <div className="flex items-center gap-3">

                                        <Moon

                                            size={22}

                                            className="text-blue-600"

                                        />

                                        <span className="text-slate-500">

                                            Stay

                                        </span>

                                    </div>

                                    <p className="mt-3 text-2xl font-bold">

                                        {

                                            nights

                                        }

                                    </p>

                                    <p className="text-sm text-slate-500">

                                        {

                                            nights === 1

                                                ? "Night"

                                                : "Nights"

                                        }

                                    </p>

                                </div>

                                <div className="rounded-xl border border-slate-200 p-5">

                                    <p className="text-slate-500">

                                        Price / Night

                                    </p>

                                    <p className="mt-3 text-2xl font-bold text-blue-600">

                                        ₹

                                        {

                                            item.room
                                                ?.roomType
                                                ?.pricePerNight

                                        }

                                    </p>

                                </div>

                            </div>

                            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <h3 className="text-lg font-semibold">

                                    Price Breakdown

                                </h3>

                                <div className="mt-4 flex items-center justify-between">

                                    <span className="text-slate-600">

                                        ₹

                                        {

                                            item.room
                                                ?.roomType
                                                ?.pricePerNight

                                        }

                                        {" × "}

                                        {

                                            nights

                                        }

                                        {" "}

                                        {

                                            nights === 1

                                                ? "Night"

                                                : "Nights"

                                        }

                                    </span>

                                    <span className="text-xl font-bold text-blue-600">

                                        ₹

                                        {

                                            Number(
                                                item.totalPrice
                                            ).toLocaleString()

                                        }

                                    </span>

                                </div>

                            </div>

                        </>

                    )

                }                {

                    (item.bookingType === "GUIDE" ||

                        item.bookingType === "DRIVER") && (

                        <>

                            <div className="rounded-xl border border-slate-200 p-5">

                                <h3 className="mb-4 text-lg font-semibold">

                                    Trip Details

                                </h3>

                                <div className="grid gap-5 md:grid-cols-2">

                                    <div>

                                        <p className="text-sm text-slate-500">

                                            Booking Dates

                                        </p>

                                        <p className="mt-1 font-semibold">

                                            {

                                                item.bookingType === "GUIDE"

                                                    ? item.guideStartDate &&

                                                      item.guideEndDate

                                                        ? `${formatDate(

                                                              item.guideStartDate

                                                          )} - ${formatDate(

                                                              item.guideEndDate

                                                          )}`

                                                        : "-"

                                                    : item.driverStartDate &&

                                                      item.driverEndDate

                                                        ? `${formatDate(

                                                              item.driverStartDate

                                                          )} - ${formatDate(

                                                              item.driverEndDate

                                                          )}`

                                                        : "-"

                                            }

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">

                                            Daily Time

                                        </p>

                                        <p className="mt-1 font-semibold">

                                            {

                                                item.bookingType === "GUIDE"

                                                    ? `${item.guideStartTime} - ${item.guideEndTime}`

                                                    : `${item.driverStartTime} - ${item.driverEndTime}`

                                            }

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">

                                            Total Days

                                        </p>

                                        <p className="mt-1 font-semibold">

                                            {

                                                item.quantity

                                            }

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-slate-500">

                                            Booking Amount

                                        </p>

                                        <p className="mt-1 text-lg font-bold text-green-600">

                                            ₹

                                            {

                                                Number(

                                                    item.totalPrice

                                                ).toLocaleString()

                                            }

                                        </p>

                                    </div>

                                </div>

                            </div>

                            {

                                item.requestStatus === "ACCEPTED" && (

                                    <CartPaymentTimer
    requestId={item.requests?.[0]?.id}
    requestStatus={item.requestStatus}
    paymentExpiresAt={item.paymentDueAt}
/>

                                )

                            }

                            {

                                item.requestStatus === "REJECTED" && (

                                    <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                                        <h3 className="text-lg font-semibold text-red-700">

                                            {

                                                item.rejectionReason ===

                                                "Request expired"

                                                    ? "Request Expired"

                                                    : "Booking Request Rejected"

                                            }

                                        </h3>

                                        <p className="mt-2 text-sm text-red-600">

                                            {

                                                item.rejectionReason ??

                                                "This request has been rejected."

                                            }

                                        </p>

                                    </div>

                                )

                            }

                            {

                                item.requestStatus ===

                                    "PAYMENT_EXPIRED" && (

                                    <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

                                        <h3 className="text-lg font-semibold text-orange-700">

                                            Payment Expired

                                        </h3>

                                        <p className="mt-2 text-sm text-orange-600">

                                            Payment was not completed within

                                            30 minutes.

                                        </p>

                                    </div>

                                )

                            }

                        </>

                    )

                }                <div className="flex items-center justify-between border-t border-slate-200 pt-6">

                    <div>

                        <p className="text-sm text-slate-500">

                            Total

                        </p>

                        <p className="text-3xl font-bold text-blue-600">

                            ₹

                            {

                                Number(
                                    item.totalPrice
                                ).toLocaleString()

                            }

                        </p>

                    </div>

                    <button

                        onClick={
                            onRemove
                        }

                        disabled={
                            loading
                        }

                        className="rounded-xl border border-red-600 px-6 py-3 font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"

                    >

                        Remove

                    </button>

                </div>

            </div>

        </div>

    );

}

export default CartItemCard;