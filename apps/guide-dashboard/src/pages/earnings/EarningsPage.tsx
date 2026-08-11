import {
    ArrowDownToLine,
    CheckCircle2,
    Clock3,
    IndianRupee,
    Receipt,
    TrendingUp,
    Wallet,
} from "lucide-react";

import useEarnings from "../../hooks/useEarnings";


function formatAmount(
    amount: number | string
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
        return "";
    }


    return time;

}


function getPaymentStatusClasses(
    status: string
) {

    switch (
        status.toUpperCase()
    ) {

        case "PAID":

            return `
                bg-emerald-100
                text-emerald-700
            `;

        case "PENDING":

            return `
                bg-yellow-100
                text-yellow-700
            `;

        case "FAILED":

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


function EarningsPage() {

    const {
        totalEarnings,
        thisMonthEarnings,
        totalPlatformFee,
        totalBookingAmount,
        paidBookings,
        earnings,
        isLoading,
        isError,
        isFetching,
        refetch,
    } = useEarnings();


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
                        h-32
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


    if (isError) {

        return (

            <div
                className="
                    flex
                    min-h-[500px]
                    items-center
                    justify-center
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                        rounded-[32px]
                        border
                        border-red-200
                        bg-white
                        p-10
                        text-center
                        shadow-sm
                    "
                >

                    <div
                        className="
                            mx-auto
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-red-50
                            text-red-600
                        "
                    >

                        <Wallet
                            size={26}
                        />

                    </div>

                    <h2
                        className="
                            mt-5
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Unable to load earnings
                    </h2>

                    <p
                        className="
                            mt-3
                            text-sm
                            leading-6
                            text-slate-500
                        "
                    >
                        We couldn't retrieve your
                        earnings information right now.
                        Please try again.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            refetch()
                        }
                        className="
                            mt-6
                            rounded-xl
                            bg-blue-600
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >
                        Try Again
                    </button>

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

            {/* Header */}

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
                        gap-6
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-emerald-50
                                    text-emerald-600
                                "
                            >

                                <Wallet
                                    size={24}
                                />

                            </div>

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-emerald-600
                                    "
                                >
                                    GUIDE FINANCE
                                </p>

                                <h1
                                    className="
                                        mt-1
                                        text-4xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                    "
                                >
                                    Earnings
                                </h1>

                            </div>

                        </div>

                        <p
                            className="
                                mt-5
                                max-w-2xl
                                leading-7
                                text-slate-500
                            "
                        >
                            Track your earnings from paid
                            guide bookings and see how much
                            you have earned after the
                            platform commission.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            refetch()
                        }
                        disabled={
                            isFetching
                        }
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-300
                            px-5
                            py-3
                            font-semibold
                            text-slate-700
                            transition
                            hover:bg-slate-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        <TrendingUp
                            size={18}
                        />

                        {isFetching
                            ? "Refreshing..."
                            : "Refresh"}

                    </button>

                </div>

            </section>


            {/* Summary Cards */}

            <section
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {/* Total Earnings */}

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
                                Total Earnings
                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                ₹
                                {formatAmount(
                                    totalEarnings
                                )}
                            </h2>

                        </div>

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-emerald-50
                                text-emerald-600
                            "
                        >

                            <IndianRupee
                                size={24}
                            />

                        </div>

                    </div>

                    <p
                        className="
                            mt-4
                            text-xs
                            text-slate-400
                        "
                    >
                        Your provider amount from
                        paid guide bookings
                    </p>

                </div>


                {/* This Month */}

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
                                This Month
                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                ₹
                                {formatAmount(
                                    thisMonthEarnings
                                )}
                            </h2>

                        </div>

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-blue-50
                                text-blue-600
                            "
                        >

                            <TrendingUp
                                size={24}
                            />

                        </div>

                    </div>

                    <p
                        className="
                            mt-4
                            text-xs
                            text-slate-400
                        "
                    >
                        Earnings from payments received
                        this month
                    </p>

                </div>


                {/* Paid Bookings */}

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
                                Paid Bookings
                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                {paidBookings}
                            </h2>

                        </div>

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-orange-50
                                text-orange-600
                            "
                        >

                            <Receipt
                                size={24}
                            />

                        </div>

                    </div>

                    <p
                        className="
                            mt-4
                            text-xs
                            text-slate-400
                        "
                    >
                        Guide bookings with successful
                        payment
                    </p>

                </div>


                {/* Platform Commission */}

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
                                Platform Commission
                            </p>

                            <h2
                                className="
                                    mt-3
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                ₹
                                {formatAmount(
                                    totalPlatformFee
                                )}
                            </h2>

                        </div>

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-slate-100
                                text-slate-600
                            "
                        >

                            <ArrowDownToLine
                                size={24}
                            />

                        </div>

                    </div>

                    <p
                        className="
                            mt-4
                            text-xs
                            text-slate-400
                        "
                    >
                        Commission deducted from your
                        guide bookings
                    </p>

                </div>

            </section>


            {/* Earnings Breakdown */}

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
                            BREAKDOWN
                        </p>

                        <h2
                            className="
                                mt-2
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Earnings Overview
                        </h2>

                    </div>


                    <div
                        className="
                            rounded-2xl
                            bg-slate-50
                            px-5
                            py-4
                        "
                    >

                        <p
                            className="
                                text-xs
                                text-slate-500
                            "
                        >
                            Total Booking Value
                        </p>

                        <p
                            className="
                                mt-1
                                text-xl
                                font-bold
                                text-slate-900
                            "
                        >
                            ₹
                            {formatAmount(
                                totalBookingAmount
                            )}
                        </p>

                    </div>

                </div>


                <div
                    className="
                        mt-8
                        grid
                        gap-6
                        md:grid-cols-3
                    "
                >

                    <div
                        className="
                            rounded-2xl
                            bg-slate-50
                            p-6
                        "
                    >

                        <p
                            className="
                                text-sm
                                text-slate-500
                            "
                        >
                            Booking Value
                        </p>

                        <p
                            className="
                                mt-2
                                text-2xl
                                font-bold
                                text-slate-900
                            "
                        >
                            ₹
                            {formatAmount(
                                totalBookingAmount
                            )}
                        </p>

                    </div>


                    <div
                        className="
                            rounded-2xl
                            bg-slate-50
                            p-6
                        "
                    >

                        <p
                            className="
                                text-sm
                                text-slate-500
                            "
                        >
                            Platform Fee
                        </p>

                        <p
                            className="
                                mt-2
                                text-2xl
                                font-bold
                                text-slate-900
                            "
                        >
                            ₹
                            {formatAmount(
                                totalPlatformFee
                            )}
                        </p>

                    </div>


                    <div
                        className="
                            rounded-2xl
                            bg-emerald-50
                            p-6
                        "
                    >

                        <p
                            className="
                                text-sm
                                text-emerald-700
                            "
                        >
                            Your Earnings
                        </p>

                        <p
                            className="
                                mt-2
                                text-2xl
                                font-bold
                                text-emerald-700
                            "
                        >
                            ₹
                            {formatAmount(
                                totalEarnings
                            )}
                        </p>

                    </div>

                </div>

            </section>


            {/* Recent Earnings */}

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
                        gap-4
                        border-b
                        border-slate-200
                        p-8
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
                            TRANSACTIONS
                        </p>

                        <h2
                            className="
                                mt-2
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Recent Earnings
                        </h2>

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-500
                        "
                    >

                        <CheckCircle2
                            size={17}
                            className="
                                text-emerald-600
                            "
                        />

                        {paidBookings} paid{" "}
                        {paidBookings === 1
                            ? "booking"
                            : "bookings"}

                    </div>

                </div>


                {earnings.length ===
                0 ? (

                    <div
                        className="
                            px-8
                            py-16
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
                                bg-slate-100
                                text-slate-400
                            "
                        >

                            <Wallet
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
                            No earnings yet
                        </h3>

                        <p
                            className="
                                mx-auto
                                mt-2
                                max-w-md
                                text-sm
                                leading-6
                                text-slate-500
                            "
                        >
                            Once tourists make successful
                            payments for your guide
                            bookings, your earnings will
                            appear here.
                        </p>

                    </div>

                ) : (

                    <div
                        className="
                            overflow-x-auto
                        "
                    >

                        <table
                            className="
                                w-full
                                min-w-[900px]
                            "
                        >

                            <thead
                                className="
                                    bg-slate-50
                                "
                            >

                                <tr>

                                    <th
                                        className="
                                            px-8
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-slate-500
                                        "
                                    >
                                        Tourist
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-slate-500
                                        "
                                    >
                                        Booking
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-slate-500
                                        "
                                    >
                                        Service Date
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-slate-500
                                        "
                                    >
                                        Booking Value
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-slate-500
                                        "
                                    >
                                        Commission
                                    </th>

                                    <th
                                        className="
                                            px-8
                                            py-4
                                            text-right
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-slate-500
                                        "
                                    >
                                        Your Earnings
                                    </th>

                                </tr>

                            </thead>


                            <tbody
                                className="
                                    divide-y
                                    divide-slate-100
                                "
                            >

                                {earnings.map(
                                    (
                                        earning
                                    ) => (

                                        <tr
                                            key={
                                                earning.id
                                            }
                                            className="
                                                transition
                                                hover:bg-slate-50
                                            "
                                        >

                                            {/* Tourist */}

                                            <td
                                                className="
                                                    px-8
                                                    py-5
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-4
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            h-11
                                                            w-11
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            bg-blue-50
                                                            font-bold
                                                            text-blue-600
                                                        "
                                                    >

                                                        {earning
                                                            .booking
                                                            .user
                                                            .firstName
                                                            .charAt(
                                                                0
                                                            )
                                                            .toUpperCase()}

                                                    </div>

                                                    <div>

                                                        <p
                                                            className="
                                                                font-semibold
                                                                text-slate-900
                                                            "
                                                        >
                                                            {
                                                                earning
                                                                    .booking
                                                                    .user
                                                                    .firstName
                                                            }{" "}
                                                            {
                                                                earning
                                                                    .booking
                                                                    .user
                                                                    .lastName
                                                            }
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-1
                                                                text-xs
                                                                text-slate-400
                                                            "
                                                        >
                                                            {
                                                                earning
                                                                    .booking
                                                                    .user
                                                                    .email
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Booking */}

                                            <td
                                                className="
                                                    px-6
                                                    py-5
                                                "
                                            >

                                                <p
                                                    className="
                                                        font-medium
                                                        text-slate-900
                                                    "
                                                >
                                                    #
                                                    {
                                                        earning
                                                            .booking
                                                            .bookingNumber
                                                    }
                                                </p>

                                                <span
                                                    className={`
                                                        mt-2
                                                        inline-flex
                                                        rounded-full
                                                        px-3
                                                        py-1
                                                        text-xs
                                                        font-semibold
                                                        ${getPaymentStatusClasses(
                                                            earning.paymentStatus
                                                        )}
                                                    `}
                                                >
                                                    {
                                                        earning
                                                            .paymentStatus
                                                    }
                                                </span>

                                            </td>


                                            {/* Service Date */}

                                            <td
                                                className="
                                                    px-6
                                                    py-5
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                        text-slate-700
                                                    "
                                                >

                                                    <Clock3
                                                        size={15}
                                                        className="
                                                            text-slate-400
                                                        "
                                                    />

                                                    <div>

                                                        <p
                                                            className="
                                                                font-medium
                                                            "
                                                        >
                                                            {formatDate(
                                                                earning.guideStartDate
                                                            )}
                                                        </p>

                                                        {earning
                                                            .guideStartTime && (

                                                            <p
                                                                className="
                                                                    mt-1
                                                                    text-xs
                                                                    text-slate-400
                                                                "
                                                            >
                                                                {formatTime(
                                                                    earning.guideStartTime
                                                                )}

                                                            </p>

                                                        )}

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Booking Value */}

                                            <td
                                                className="
                                                    px-6
                                                    py-5
                                                "
                                            >

                                                <p
                                                    className="
                                                        font-medium
                                                        text-slate-700
                                                    "
                                                >
                                                    ₹
                                                    {formatAmount(
                                                        earning.totalPrice
                                                    )}
                                                </p>

                                            </td>


                                            {/* Commission */}

                                            <td
                                                className="
                                                    px-6
                                                    py-5
                                                "
                                            >

                                                <p
                                                    className="
                                                        font-medium
                                                        text-slate-500
                                                    "
                                                >
                                                    ₹
                                                    {formatAmount(
                                                        earning.platformFee
                                                    )}
                                                </p>

                                            </td>


                                            {/* Guide Earnings */}

                                            <td
                                                className="
                                                    px-8
                                                    py-5
                                                    text-right
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-lg
                                                        font-bold
                                                        text-emerald-600
                                                    "
                                                >
                                                    ₹
                                                    {formatAmount(
                                                        earning.providerAmount
                                                    )}
                                                </p>

                                                <p
                                                    className="
                                                        mt-1
                                                        text-xs
                                                        text-slate-400
                                                    "
                                                >
                                                    Paid{" "}
                                                    {formatDate(
                                                        earning.paidAt
                                                    )}
                                                </p>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>


            {/* Information */}

            <section
                className="
                    rounded-[32px]
                    border
                    border-blue-100
                    bg-blue-50
                    p-8
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
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-white
                            text-blue-600
                            shadow-sm
                        "
                    >

                        <Receipt
                            size={22}
                        />

                    </div>

                    <div>

                        <h3
                            className="
                                text-lg
                                font-bold
                                text-slate-900
                            "
                        >
                            How your earnings are calculated
                        </h3>

                        <p
                            className="
                                mt-2
                                max-w-3xl
                                text-sm
                                leading-7
                                text-slate-600
                            "
                        >
                            Your earnings are based on the
                            provider amount already recorded
                            for each successful guide payment.
                            The platform commission is deducted
                            before your provider amount is
                            recorded.
                        </p>

                    </div>

                </div>

            </section>

        </div>

    );

}


export default EarningsPage;