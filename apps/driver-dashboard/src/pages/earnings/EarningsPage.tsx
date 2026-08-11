import {
    Banknote,
    CalendarDays,
    CheckCircle2,
    IndianRupee,
    ReceiptText,
} from "lucide-react";

import useEarnings from "../../hooks/useEarnings";


function EarningsPage() {

    const {
        summary,
        earnings,
        isLoading,
    } = useEarnings();


    const formatAmount = (
        amount: number
    ) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
            }
        ).format(amount);

    };


    const formatDate = (
        date: string | null
    ) => {

        if (!date) {
            return "—";
        }

        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    if (isLoading) {

        return (

            <div className="space-y-6">

                <div>
                    <div className="h-8 w-40 animate-pulse rounded bg-slate-200" />

                    <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-200" />
                </div>


                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                    {Array.from({
                        length: 4,
                    }).map(
                        (_, index) => (

                            <div
                                key={index}
                                className="h-32 animate-pulse rounded-2xl bg-slate-200"
                            />

                        )
                    )}

                </div>


                <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />

            </div>

        );

    }


    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold text-slate-900">
                    Earnings
                </h1>

                <p className="mt-1 text-slate-500">
                    Track your completed bookings and earnings.
                </p>

            </div>


            {/* Summary */}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">


                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Total Earnings
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                {formatAmount(
                                    summary.totalEarnings
                                )}
                            </h2>

                        </div>

                        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">

                            <IndianRupee
                                size={22}
                            />

                        </div>

                    </div>

                </div>


                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Gross Revenue
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                {formatAmount(
                                    summary.totalGross
                                )}
                            </h2>

                        </div>

                        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">

                            <Banknote
                                size={22}
                            />

                        </div>

                    </div>

                </div>


                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Platform Fee
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                {formatAmount(
                                    summary.totalPlatformFee
                                )}
                            </h2>

                        </div>

                        <div className="rounded-xl bg-orange-50 p-3 text-orange-600">

                            <ReceiptText
                                size={22}
                            />

                        </div>

                    </div>

                </div>


                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Paid Bookings
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                {summary.completedBookings}
                            </h2>

                        </div>

                        <div className="rounded-xl bg-purple-50 p-3 text-purple-600">

                            <CheckCircle2
                                size={22}
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* Earnings History */}

            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

                <div className="border-b px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-blue-50 p-2 text-blue-600">

                            <ReceiptText
                                size={20}
                            />

                        </div>

                        <div>

                            <h2 className="text-lg font-bold text-slate-900">
                                Earnings History
                            </h2>

                            <p className="text-sm text-slate-500">
                                Your paid Driver bookings
                            </p>

                        </div>

                    </div>

                </div>


                {earnings.length === 0 ? (

                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                        <div className="rounded-full bg-slate-100 p-4 text-slate-400">

                            <Banknote
                                size={28}
                            />

                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-slate-900">
                            No earnings yet
                        </h3>

                        <p className="mt-1 max-w-md text-sm text-slate-500">
                            Your paid Driver bookings will appear here once you start earning.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[900px]">

                            <thead className="bg-slate-50">

                                <tr className="text-left text-sm text-slate-500">

                                    <th className="px-6 py-4 font-medium">
                                        Booking
                                    </th>

                                    <th className="px-6 py-4 font-medium">
                                        Trip Date
                                    </th>

                                    <th className="px-6 py-4 font-medium">
                                        Gross Amount
                                    </th>

                                    <th className="px-6 py-4 font-medium">
                                        Platform Fee
                                    </th>

                                    <th className="px-6 py-4 font-medium">
                                        Your Earnings
                                    </th>

                                    <th className="px-6 py-4 font-medium">
                                        Payment
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y">

                                {earnings.map(
                                    (earning) => (

                                        <tr
                                            key={
                                                earning.id
                                            }
                                            className="text-sm"
                                        >

                                            <td className="px-6 py-5">

                                                <p className="font-semibold text-slate-900">
                                                    #{earning.booking.bookingNumber}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {earning.booking.status}
                                                </p>

                                            </td>


                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-2 text-slate-700">

                                                    <CalendarDays
                                                        size={16}
                                                        className="text-slate-400"
                                                    />

                                                    <span>
                                                        {formatDate(
                                                            earning.driverStartDate
                                                        )}
                                                    </span>

                                                    {earning.driverEndDate && (
                                                        <>
                                                            <span className="text-slate-400">
                                                                -
                                                            </span>

                                                            <span>
                                                                {formatDate(
                                                                    earning.driverEndDate
                                                                )}
                                                            </span>
                                                        </>
                                                    )}

                                                </div>

                                            </td>


                                            <td className="px-6 py-5 font-medium text-slate-700">

                                                {formatAmount(
                                                    Number(
                                                        earning.totalPrice
                                                    )
                                                )}

                                            </td>


                                            <td className="px-6 py-5 text-slate-500">

                                                {formatAmount(
                                                    Number(
                                                        earning.platformFee
                                                    )
                                                )}

                                            </td>


                                            <td className="px-6 py-5">

                                                <span className="font-bold text-emerald-600">

                                                    {formatAmount(
                                                        Number(
                                                            earning.providerAmount
                                                        )
                                                    )}

                                                </span>

                                            </td>


                                            <td className="px-6 py-5">

                                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">

                                                    {earning.paymentStatus}

                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}


export default EarningsPage;