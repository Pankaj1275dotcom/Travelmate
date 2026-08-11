import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

interface CartSummaryProps {

    items: any[];

    selectedItems: string[];

    canCheckout: boolean;

    loading: boolean;

    onClearCart: () => void;

    onCheckout: () => void;

}

function CartSummary({

    items,

    selectedItems,

    canCheckout,

    loading,

    onClearCart,

    onCheckout,

}: CartSummaryProps) {

    const payableItems =

        items.filter(

            (item) =>

                selectedItems.includes(item.id) &&

                item.requestStatus !== "REJECTED" &&

                item.requestStatus !== "PAYMENT_EXPIRED"

        );

    const total =

        payableItems.reduce(

            (sum, item) =>

                sum +

                Number(item.totalPrice),

            0

        );

    const totalItems =

        payableItems.length;


    return (

        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold">

                Order Summary

            </h2>

            <p className="mt-2 text-sm text-slate-500">

                Review your selected bookings before payment.

            </p>

            <div className="mt-6 space-y-4">

                {

                    payableItems.length === 0 && (

                        <p className="text-sm text-slate-500">

                            No payable items selected.

                        </p>

                    )

                }

                {

                    payableItems.map((item) => (

                        <div

                            key={item.id}

                            className="flex items-center justify-between border-b border-slate-100 pb-3"

                        >

                            <div>

                                <p className="font-medium">

                                    {

                                        item.bookingType === "HOTEL"

                                            ? item.room?.roomType?.hotel?.name

                                            : item.bookingType === "GUIDE"

                                            ? item.guide?.fullName

                                            : item.driver?.fullName

                                    }

                                </p>

                                <p className="text-sm text-slate-500">

                                    {

                                        item.bookingType === "HOTEL"

                                            ? "Hotel"

                                            : item.bookingType === "GUIDE"

                                            ? "Guide"

                                            : "Driver"

                                    }

                                </p>

                            </div>

                            <p className="font-semibold">

                                ₹

                                {

                                    Number(

                                        item.totalPrice

                                    ).toLocaleString()

                                }

                            </p>

                        </div>

                    ))

                }

            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">

                <div className="flex items-center justify-between">

                    <span className="text-lg font-medium">

                        Total

                    </span>

                    <span className="text-3xl font-bold text-blue-600">

                        ₹

                        {

                            total.toLocaleString()

                        }

                    </span>

                </div>

            </div>

            <div className="mt-8 space-y-3">
                {
    !canCheckout && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            One or more selected Guide/Driver services are still pending,
            rejected, or expired. Payment is available only for accepted
            services.
        </div>
    )
}

                <button

                    onClick={onCheckout}

                    disabled={

                        !canCheckout ||

                        loading

                    }

                    className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"

                >

                    Proceed to Payment

                    {

                        totalItems > 0 &&

                        ` (${totalItems})`

                    }

                </button>

                <button

                    onClick={onClearCart}

                    disabled={loading}

                    className="w-full rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"

                >

                    Clear Cart

                </button>

                <Link

                    to={ROUTES.HOME}

                    className="block text-center text-sm text-slate-500 hover:text-blue-600"

                >

                    Continue Browsing

                </Link>

            </div>

        </div>

    );

}

export default CartSummary;