import {
    CalendarDays,
    Car,
    Hotel,
    User,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

import useBooking from "../../hooks/useBooking";

function BookingsPage() {

    const {
        bookings,
        bookingsLoading,
        isError,
    } = useBooking();

    if (bookingsLoading) {

        return (

            <div className="space-y-8">

                <PageHeader
                    title="Booking Management"
                    description="View and monitor all platform bookings."
                />

                <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

                    <p className="text-slate-500">
                        Loading bookings...
                    </p>

                </div>

            </div>

        );

    }

    if (isError) {

        return (

            <div className="space-y-8">

                <PageHeader
                    title="Booking Management"
                    description="View and monitor all platform bookings."
                />

                <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

                    <p className="font-medium text-red-600">

                        Unable to load bookings.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <PageHeader
                title="Booking Management"
                description="View and monitor all platform bookings."
            />

            <div className="rounded-2xl bg-white shadow-sm">

                <div className="border-b p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-semibold">

                                All Bookings

                            </h2>

                            <p className="mt-1 text-sm text-slate-500">

                                {bookings.length} booking
                                {bookings.length !== 1 ? "s" : ""}

                            </p>

                        </div>

                    </div>

                </div>

                {bookings.length === 0 ? (

                    <div className="p-12 text-center">

                        <p className="text-slate-500">

                            No bookings found.

                        </p>

                    </div>

                ) : (

                    <div className="divide-y">

                        {bookings.map((booking) => (

                            <div
                                key={booking.id}
                                className="p-6 transition hover:bg-slate-50"
                            >

                                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                                    <div className="min-w-0">

                                        <div className="flex flex-wrap items-center gap-3">

                                            <h3 className="font-semibold">

                                                {booking.bookingNumber}

                                            </h3>

                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                                                {booking.status}

                                            </span>

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                                                {booking.paymentStatus}

                                            </span>

                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-500">

                                            <span className="flex items-center gap-2">

                                                <User size={16} />

                                                {booking.user?.name ||
                                                    booking.user?.fullName ||
                                                    booking.user?.email ||
                                                    "Tourist"}

                                            </span>

                                            <span className="flex items-center gap-2">

                                                <CalendarDays size={16} />

                                                {new Date(
                                                    booking.startDate
                                                ).toLocaleDateString()}

                                                {" - "}

                                                {new Date(
                                                    booking.endDate
                                                ).toLocaleDateString()}

                                            </span>

                                            <span>

                                                Trip: {booking.tripStatus}

                                            </span>

                                        </div>

                                    </div>

                                    <div className="text-left xl:text-right">

                                        <p className="text-sm text-slate-500">

                                            Booking Amount

                                        </p>

                                        <p className="mt-1 text-2xl font-bold">

                                            ₹
                                            {Number(
                                                booking.totalAmount
                                            ).toLocaleString()}

                                        </p>

                                    </div>

                                </div>

                                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">

                                    {booking.items.map((item) => (

                                        <div
                                            key={item.id}
                                            className="rounded-xl border bg-slate-50 p-4"
                                        >

                                            <div className="flex items-center gap-2 font-medium">

                                                {item.bookingType === "HOTEL" ? (

                                                    <Hotel size={18} />

                                                ) : item.bookingType === "GUIDE" ? (

                                                    <User size={18} />

                                                ) : (

                                                    <Car size={18} />

                                                )}

                                                {item.bookingType}

                                            </div>

                                            <p className="mt-2 text-sm text-slate-600">

                                                {item.bookingType === "HOTEL"

                                                    ? item.room?.roomType?.hotel?.name ||
                                                      "Hotel"

                                                    : item.bookingType === "GUIDE"

                                                    ? item.guide?.fullName ||
                                                      "Guide"

                                                    : item.driver?.fullName ||
                                                      "Driver"}

                                            </p>

                                            <div className="mt-3 flex items-center justify-between">

                                                <span className="text-sm font-semibold">

                                                    ₹
                                                    {Number(
                                                        item.totalPrice
                                                    ).toLocaleString()}

                                                </span>

                                                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium">

                                                    {item.status}

                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default BookingsPage;