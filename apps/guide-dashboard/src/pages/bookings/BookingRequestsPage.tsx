import {
    useState,
} from "react";

import {
    CheckCircle,
    XCircle,
    Clock,
    User,
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

            <div className="p-6">

                Loading booking requests...

            </div>

        );

    }

    return (

        <div className="p-6">

            <div className="mb-6">

                <h1 className="text-2xl font-bold">

                    Booking Requests

                </h1>

                <p className="text-gray-500">

                    Accept or reject tourist booking requests.

                </p>

            </div>

            {

                requests.length === 0 && (

                    <div className="rounded-lg border p-10 text-center">

                        <Clock
                            className="mx-auto mb-4"
                            size={48}
                        />

                        <h2 className="text-lg font-semibold">

                            No Booking Requests

                        </h2>

                        <p className="text-gray-500">

                            You don't have any pending requests.

                        </p>

                    </div>

                )

            }

            <div className="space-y-6">                {

                    requests.map(
                        (request) => (

                            <div
                                key={
                                    request.id
                                }
                                className="rounded-xl border bg-white p-6 shadow-sm"
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h2 className="text-lg font-semibold">

                                            Tourist Request

                                        </h2>

                                        <p className="text-sm text-gray-500">

                                            Request ID

                                            {" "}

                                            {request.id}

                                        </p>

                                    </div>

                                    <div className="flex flex-col items-end gap-2">

    <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${
            request.status ===
            "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : request.status ===
                  "ACCEPTED"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
        }`}
    >

        {request.status}

    </span>

    {

        request.status ===
            "PENDING" && (

            <CountdownTimer

                expiresAt={
                    request.expiresAt
                }

            />

        )

    }

</div>

                                </div>

                                <div className="mt-6">

    <div className="grid gap-4 md:grid-cols-2">

        <div className="flex items-center gap-3">

            <User size={20} />

            <div>

                <p className="text-sm text-gray-500">

                    Tourist

                </p>

                <p className="font-medium">

                    {request.tourist.name}

                </p>

            </div>

        </div>

        <div>

            <p className="text-sm text-gray-500">

                Email

            </p>

            <p className="font-medium">

                {request.tourist.email}

            </p>

        </div>

        <div>

            <p className="text-sm text-gray-500">

                Phone

            </p>

            <p className="font-medium">

                {request.tourist.phone ?? "Not Available"}

            </p>

        </div>

        <div>

            <p className="text-sm text-gray-500">

                Requested At

            </p>

            <p className="font-medium">

                {new Date(
                    request.requestedAt
                ).toLocaleString()}

            </p>

        </div>

    </div>

    <div className="mt-6 rounded-lg border bg-gray-50 p-5">

        <h3 className="mb-4 text-lg font-semibold">

            Trip Details

        </h3>

        <div className="grid gap-4 md:grid-cols-2">

            <div>

                <p className="text-sm text-gray-500">

                    Booking Dates

                </p>

                <p className="font-medium">

                    {request.cartItem.guideStartDate
                        ? new Date(
                              request.cartItem.guideStartDate
                          ).toLocaleDateString()
                        : "-"}

                    {" → "}

                    {request.cartItem.guideEndDate
                        ? new Date(
                              request.cartItem.guideEndDate
                          ).toLocaleDateString()
                        : "-"}

                </p>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Daily Time

                </p>

                <p className="font-medium">

                    {request.cartItem.guideStartTime ?? "-"}

                    {" - "}

                    {request.cartItem.guideEndTime ?? "-"}

                </p>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Requested Hours

                </p>

                <p className="font-medium">

                    {request.cartItem.guideRequestedHours ?? "-"}

                    {" Hours"}

                </p>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Total Days

                </p>

                <p className="font-medium">

                    {request.cartItem.quantity}

                </p>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Total Price

                </p>

                <p className="text-lg font-bold text-green-600">

                    ₹
                    {Number(
                        request.cartItem.totalPrice
                    ).toLocaleString()}

                </p>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Special Request

                </p>

                <p className="font-medium">

                    {request.cartItem.notes ??
                        "No special request"}

                </p>

            </div>

        </div>

    </div>

</div>                              {

    request.status === "PENDING" && (

        <div className="mt-6 border-t pt-6">

            <label className="mb-2 block text-sm font-medium">

                Rejection Reason (Optional)

            </label>

            <textarea

                value={rejectionReason}

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

                    disabled={isSubmitting}

                    className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"

                >

                    <CheckCircle size={18} />

                    Accept

                </button>

                <button

                    onClick={() =>
                        rejectBookingRequest(
                            request.id,
                            rejectionReason
                        )
                    }

                    disabled={isSubmitting}

                    className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"

                >

                    <XCircle size={18} />

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

                    This booking request was automatically rejected
                    because it was not accepted within 30 minutes.

                </p>

                <p className="mt-2 text-sm text-red-600">

                    The tourist can send you a new booking request
                    if they still wish to book your service.

                </p>

            </div>

        </div>

    )

}

{

    request.status === "REJECTED" &&
    request.rejectionReason !==
        "Request expired" && (

        <div className="mt-6 border-t pt-6">

            <div className="rounded-lg border border-red-200 bg-red-50 p-4">

                <h3 className="text-lg font-semibold text-red-700">

                    Booking Request Rejected

                </h3>

                <p className="mt-2 text-sm text-red-600">

                    Reason:

                    {" "}

                    {

                        request.rejectionReason ||

                        "No reason provided."

                    }

                </p>

            </div>

        </div>

    )

}

{

    request.status === "ACCEPTED" && (

        <div className="mt-6 border-t pt-6">

            <div className="rounded-lg border border-green-200 bg-green-50 p-4">

                <h3 className="text-lg font-semibold text-green-700">

                    Booking Request Accepted

                </h3>

                <p className="mt-2 text-sm text-green-600">

                    Waiting for the tourist to complete
                    the payment within 30 minutes.

                </p>

            </div>

        </div>

    )

}

{

    request.status !== "PENDING" && (

        <div className="mt-6 flex justify-end border-t pt-6">

            <button

                onClick={() =>
                    removeBookingRequest(
                        request.id
                    )
                }

                disabled={isSubmitting}

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