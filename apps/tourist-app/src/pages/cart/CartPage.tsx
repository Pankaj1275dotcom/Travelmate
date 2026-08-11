import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import Layout from "../../components/layout/Layout";

import CartItemCard from "../../components/cart/CartItemCard";

import CartSummary from "../../components/cart/CartSummary";

import { ROUTES } from "../../constants/routes";

import useBooking from "../../hooks/useBooking";
import paymentService from "../../services/payment/payment.service";

function CartPage() {

    const {

        cart,

        cartLoading,

        removeCartItem,

        clearCart,

        createBooking,

        isLoading,

    } = useBooking();

    const [

        selectedItems,

        setSelectedItems,

    ] = useState<string[]>([]);

    useEffect(() => {

        if (!cart) {

            return;

        }

        const selectableItems =

    cart.items

        .filter((item) => {

            if (
                item.bookingType === "HOTEL"
            ) {

                return true;

            }

            return (
                item.requestStatus ===
                "ACCEPTED"
            );

        })

        .map(
            (item) =>
                item.id
        );

        setSelectedItems(

            selectableItems

        );

    }, [cart]);


    if (cartLoading) {

        return (

            <Layout>

                <div className="mx-auto max-w-6xl px-4 py-20 text-center">

                    Loading cart...

                </div>

            </Layout>

        );

    }

    if (

        !cart ||

        cart.items.length === 0

    ) {

        return (

            <Layout>

                <section className="mx-auto max-w-5xl px-4 py-20 text-center">

                    <h1 className="text-4xl font-bold">

                        Your Cart

                    </h1>

                    <p className="mt-6 text-slate-500">

                        Your cart is empty.

                    </p>

                    <Link

                        to={

                            ROUTES.HOTELS

                        }

                        className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"

                    >

                        Browse Hotels

                    </Link>

                </section>

            </Layout>

        );
        

    }
    
const canCheckout =

    selectedItems.length > 0 &&

    selectedItems.every(id => {

        const item =
            cart.items.find(
                cartItem =>
                    cartItem.id === id
            );

        if (!item) {

            return false;

        }

        if (
            item.bookingType ===
            "HOTEL"
        ) {

            return true;

        }

        return (
            item.requestStatus ===
            "ACCEPTED"
        );

    });
    
    return (

        <Layout>

            <section className="mx-auto max-w-7xl px-4 py-10">

                <div className="mb-10 flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">

                            My Cart

                        </h1>

                        <p className="mt-2 text-slate-500">

                            Review your bookings before checkout.

                        </p>

                    </div>

                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    <div className="space-y-6 lg:col-span-2">
                                                {

                            cart.items.map(

                                (item) => (

                                    <CartItemCard

                                        key={
                                            item.id
                                        }

                                        item={
                                            item
                                        }

                                        checked={

                                            selectedItems.includes(

                                                item.id

                                            )

                                        }
                                        

                                        loading={
                                            isLoading
                                        }

                                        onRemove={() =>

                                            removeCartItem(

                                                item.id

                                            )

                                        }

                                        onSelect={(

                                            checked

                                        ) => {

                                            if (

                                                checked

                                            ) {

                                                setSelectedItems(

                                                    (

                                                        previous

                                                    ) =>

                                                        [

                                                            ...previous,

                                                            item.id,

                                                        ]

                                                );

                                            } else {

                                                setSelectedItems(

                                                    (

                                                        previous

                                                    ) =>

                                                        previous.filter(

                                                            (

                                                                id

                                                            ) =>

                                                                id !==

                                                                item.id

                                                        )

                                                );

                                            }

                                        }}

                                    />

                                )

                            )

                        }

                    </div>

                    <div>                        <CartSummary
         canCheckout={
        canCheckout
    }

                            items={
                                cart.items
                            }

                            selectedItems={
                                selectedItems
                            }

                            loading={
                                isLoading
                            }

                            onClearCart={() =>

                                clearCart()

                            }

                            onCheckout={() =>

    createBooking({

        onSuccess: async (response) => {

            try {

                const order =
                    await paymentService.createOrder(
                        response.booking.id
                    );

                await paymentService.openCheckout({

                    bookingId:
                        order.bookingId,

                    orderId:
                        order.orderId,

                    amount:
                        order.amount,

                    currency:
                        order.currency,

                    key:
                        order.key,

                    onSuccess: () => {

                        window.location.href =
                            ROUTES.BOOKING_SUCCESS;

                    },

                });

            } catch (error) {

                console.error(error);

            }

        },

    })

}
                        />

                    </div>

                </div>            </section>

        </Layout>

    );

}

export default CartPage;