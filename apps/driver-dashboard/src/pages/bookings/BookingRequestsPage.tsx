import {
    useState,
} from "react";

import {
    CheckCircle,
    User,
    XCircle,
} from "lucide-react";

import useBooking from "../../hooks/useBooking";

import CountdownTimer from "../../components/common/CountdownTimer";

function BookingRequestsPage() {

    const {

        requests,

        loading,

        acceptBookingRequest,

        rejectBookingRequest,

        removeBookingRequest,

        isSubmitting,

    } = useBooking();

    const [

        rejectionReason,

        setRejectionReason,

    ] = useState("");

    if (loading) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                <div className="text-lg font-medium">

                    Loading booking requests...

                </div>

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-4xl font-bold">

                    Booking Requests

                </h1>

                <p className="mt-2 text-gray-500">

                    Accept or reject tourist booking requests.

                </p>

            </div>

            {

                requests.length === 0 && (

                    <div className="rounded-xl border bg-white p-10 text-center">

                        <h2 className="text-xl font-semibold">

                            No Booking Requests

                        </h2>

                        <p className="mt-2 text-gray-500">

                            New driver booking requests will appear here.

                        </p>

                    </div>

                )

            }

            <div className="space-y-6">

                {

                    requests.map(

                        (request) => (

                            <div

                                key={request.id}

                                className="rounded-xl border bg-white p-6 shadow-sm"

                            >

                                <div className="flex items-start justify-between">

                                    <div>

                                        <h2 className="text-xl font-semibold">

                                            Tourist Request

                                        </h2>

                                        <p className="text-sm text-gray-500">

                                            Request ID {request.id}

                                        </p>

                                    </div>

                                    <div className="flex flex-col items-end gap-2">

                                        <span

                                            className={`rounded-full px-3 py-1 text-sm font-medium ${

                                                request.status === "PENDING"

                                                    ? "bg-yellow-100 text-yellow-700"

                                                    : request.status === "ACCEPTED"

                                                    ? "bg-green-100 text-green-700"

                                                    : "bg-red-100 text-red-700"

                                            }`}

                                        >

                                            {request.status}

                                        </span>

                                        {

                                            request.status === "PENDING" &&
request.rejectionReason !== "Request expired" && (

                                                <CountdownTimer

                                                    expiresAt={

                                                        request.expiresAt

                                                    }

                                                />

                                            )

                                        }

                                    </div>

                                </div>                                <div className="mt-6 grid gap-4 md:grid-cols-2">

                                    <div className="flex items-center gap-3">

                                        <User
                                            size={20}
                                        />

                                        <div>

                                            <p className="text-sm text-gray-500">

                                                Tourist

                                            </p>

                                            <p className="font-medium">

                                                {
                                                    request
                                                        .tourist
                                                        .name
                                                }

                                            </p>

                                        </div>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">

                                            Email

                                        </p>

                                        <p className="font-medium">

                                            {
                                                request
                                                    .tourist
                                                    .email
                                            }

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">

                                            Phone

                                        </p>

                                        <p className="font-medium">

                                            {

                                                request
                                                    .tourist
                                                    .phone ??

                                                "Not Available"

                                            }

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">

                                            Requested At

                                        </p>

                                        <p className="font-medium">

                                            {

                                                new Date(
                                                    request.requestedAt
                                                ).toLocaleString()

                                            }

                                        </p>

                                    </div>

                                </div>

                                <div className="mt-6 rounded-lg border bg-gray-50 p-4">

    <h3 className="mb-4 text-lg font-semibold">

        Trip Details

    </h3>

    <div className="grid gap-4 md:grid-cols-2">

    <div>

        <p className="text-sm text-gray-500">

            Booking Dates

        </p>

        <p className="font-medium">

            {

                request.cartItem.driverStartDate

                    ? new Date(

                          request.cartItem.driverStartDate

                      ).toLocaleDateString(

                          "en-IN",

                          {

                              day: "numeric",

                              month: "short",

                              year: "numeric",

                          }

                      )

                    : "-"

            }

            {" — "}

            {

                request.cartItem.driverEndDate

                    ? new Date(

                          request.cartItem.driverEndDate

                      ).toLocaleDateString(

                          "en-IN",

                          {

                              day: "numeric",

                              month: "short",

                              year: "numeric",

                          }

                      )

                    : "-"

            }

        </p>

    </div>
    <div>

    <p className="text-sm text-gray-500">

        Daily Time

    </p>

    <p className="font-medium">

        {

            request.cartItem.driverStartTime

        }

        {" — "}

        {

            request.cartItem.driverEndTime

        }

    </p>

</div>

<div>

    <p className="text-sm text-gray-500">

        Duration

    </p>

    <p className="font-medium">

        {

            (() => {

                const [

                    startHour,

                    startMinute,

                ] = (

                    request.cartItem.driverStartTime ??

                    "00:00"

                ).split(":").map(Number);

                const [

                    endHour,

                    endMinute,

                ] = (

                    request.cartItem.driverEndTime ??

                    "00:00"

                ).split(":").map(Number);

                const startMinutes =
                    startHour * 60 +
                    startMinute;

                const endMinutes =
                    endHour * 60 +
                    endMinute;

                const difference =
                    endMinutes -
                    startMinutes;

                const hours =
                    Math.floor(
                        difference / 60
                    );

                const minutes =
                    difference % 60;

                if (minutes === 0) {

                    return `${hours}h`;

                }

                return `${hours}h ${minutes}m`;

            })()

        }

    </p>

</div>

    <div>

        <p className="text-sm text-gray-500">

            Total Days

        </p>

        <p className="font-medium">

            {

                request.cartItem.quantity

            }

            {

                request.cartItem.quantity > 1

                    ? " Days"

                    : " Day"

            }

        </p>

    </div>

    <div>

        <p className="text-sm text-gray-500">

            Booking Amount

        </p>

        <p className="text-lg font-bold text-green-600">

            ₹

            {

                Number(

                    request.cartItem.totalPrice

                ).toLocaleString()

            }

        </p>

    </div>

    <div>

        <p className="text-sm text-gray-500">

            Special Request

        </p>

        <p className="font-medium">

            {

                request.cartItem.notes?.trim()

                    ? request.cartItem.notes

                    : "No special request"

            }

        </p>

    </div>

</div>
    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-5">

        <h4 className="text-lg font-semibold text-blue-900">

            Payment Information

        </h4>

        <p className="mt-3 text-sm leading-6 text-blue-800">

            The <strong>Booking Amount</strong> shown above is an
            advance payment and includes up to
            <strong> 5 hours </strong>
            of driver service.

        </p>

        <p className="mt-3 text-sm leading-6 text-blue-800">

            If the tourist has booked the driver for
            <strong> more than 5 hours</strong>, the additional
            hours are <strong>not included</strong> in this
            online payment.

        </p>

        <p className="mt-3 text-sm leading-6 text-blue-800">

            Any charges for extra hours will be paid
            directly by the tourist to the driver after
            the trip is completed.

        </p>

        <div className="mt-4 rounded-lg border border-blue-100 bg-white p-4">

            <p className="text-sm font-semibold text-blue-900">

                Important

            </p>

            <p className="mt-2 text-sm text-gray-700">

                This online payment confirms the booking only.
                If the tourist uses your service for more than
                <strong> 5 hours</strong>, the remaining amount
                for the extra hours will be settled directly
                between you and the tourist after the trip.

            </p>

        </div>

    </div>

</div>                                                               {

                                    request.status === "PENDING" && (

                                        <div className="mt-6 border-t pt-6">

                                            <label className="mb-2 block text-sm font-medium">

                                                Rejection Reason (Optional)

                                            </label>

                                            <textarea

                                                value={
                                                    rejectionReason
                                                }

                                                onChange={(event) =>

                                                    setRejectionReason(
                                                        event.target.value
                                                    )

                                                }

                                                rows={3}

                                                className="w-full rounded-lg border p-3"

                                                placeholder="Reason for rejection..."

                                            />

                                            <div className="mt-4 flex gap-3">

                                                <button

                                                    onClick={() =>

                                                        acceptBookingRequest(
                                                            request.id
                                                        )

                                                    }

                                                    disabled={
                                                        isSubmitting
                                                    }

                                                    className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"

                                                >

                                                    <CheckCircle
                                                        size={18}
                                                    />

                                                    Accept

                                                </button>

                                                <button

                                                    onClick={() =>

                                                        rejectBookingRequest(

                                                            request.id,

                                                            rejectionReason

                                                        )

                                                    }

                                                    disabled={
                                                        isSubmitting
                                                    }

                                                    className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"

                                                >

                                                    <XCircle
                                                        size={18}
                                                    />

                                                    Reject

                                                </button>

                                            </div>

                                        </div>

                                    )

                                }

                                {

                                    request.status === "REJECTED" &&
                                    request.rejectionReason ===
                                        "Request expired" && (

                                        <div className="mt-6 border-t pt-6">

                                            <div className="rounded-lg border border-red-200 bg-red-50 p-4">

                                                <h3 className="text-lg font-semibold text-red-700">

                                                    Request Expired

                                                </h3>

                                                <p className="mt-2 text-sm text-red-600">

                                                    This booking request was
                                                    automatically rejected
                                                    because it was not accepted
                                                    within 30 minutes.

                                                </p>

                                            </div>

                                        </div>

                                    )

                                }

                                {

                                    request.status !==
                                        "PENDING" && (

                                        <div className="mt-6 flex justify-end border-t pt-6">

                                            <button

                                                onClick={() =>

                                                    removeBookingRequest(
                                                        request.id
                                                    )

                                                }

                                                disabled={
                                                    isSubmitting
                                                }

                                                className="rounded-lg bg-gray-800 px-5 py-2 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"

                                            >

                                                Remove

                                            </button>

                                        </div>

                                    )

                                }

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default BookingRequestsPage;