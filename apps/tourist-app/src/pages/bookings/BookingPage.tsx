import { useState } from "react";

import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import Layout from "../../components/layout/Layout";

import roomTypeService from "../../services/room-types/room-type.service";
import useBooking from "../../hooks/useBooking";

function BookingPage() {
    const navigate =
        useNavigate();

    const [searchParams] =
        useSearchParams();

const roomTypeId =
    searchParams.get("roomType");

    const {
        addHotelToCart,
        isLoading,
    } = useBooking();

    const {
        data,
        isLoading: roomTypeLoading,
    } = useQuery({
        queryKey: [
            "room-type",
            roomTypeId,
        ],

        queryFn: () =>
            roomTypeService.getRoomTypeById(
                roomTypeId!
            ),

        enabled: !!roomTypeId,
    });

    const roomType =
        data?.roomType;

    const [checkIn, setCheckIn] =
        useState("");

    const [checkOut, setCheckOut] =
        useState("");
        const [
    checkInTime,
    setCheckInTime,
] = useState("14:00");

const [
    checkOutTime,
    setCheckOutTime,
] = useState("11:00");

    const [adults, setAdults] =
        useState(1);

    const [children, setChildren] =
        useState(0);

    const [
        specialRequest,
        setSpecialRequest,
    ] = useState("");    if (roomTypeLoading) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                    Loading...
                </div>
            </Layout>
        );
    }

    if (!roomType) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                    Room type not found.
                </div>
            </Layout>
        );
    }

    const handleBooking = () => {
        if (!checkIn || !checkOut) {
            return;
        }

       const checkInDateTime =
    `${checkIn}T${checkInTime}:00`;

const checkOutDateTime =
    `${checkOut}T${checkOutTime}:00`;

addHotelToCart(
    {
        roomTypeId: roomType.id,

        checkIn: checkInDateTime,

        checkOut: checkOutDateTime,

        adults,

        children,

        specialRequest,
    },
            {
                onSuccess: () => {
                    navigate("/cart");
                },
            }
        );
    };

    return (
        <Layout>
            <section className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-10">
                    Complete Your Booking
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 className="text-2xl font-semibold mb-6">
                            Booking Details
                        </h2>

                        <div className="space-y-6">                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Check In
                                </label>

                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) =>
                                        setCheckIn(
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-4 py-3"
                                />
                            </div>
                            <div>

    <label className="block text-sm font-medium mb-2">

        Check In Time

    </label>

    <input
        type="time"
        value={checkInTime}
        onChange={(e) =>
            setCheckInTime(
                e.target.value
            )
        }
        className="w-full border rounded-xl px-4 py-3"
    />

</div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Check Out
                                </label>

                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) =>
                                        setCheckOut(
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-4 py-3"
                                />
                            </div>
                            <div>

    <label className="block text-sm font-medium mb-2">

        Check Out Time

    </label>

    <input
        type="time"
        value={checkOutTime}
        onChange={(e) =>
            setCheckOutTime(
                e.target.value
            )
        }
        className="w-full border rounded-xl px-4 py-3"
    />

</div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Adults
                                    </label>

                                    <input
                                        type="number"
                                        min={1}
                                        value={adults}
                                        onChange={(e) =>
                                            setAdults(
                                                Number(
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="w-full border rounded-xl px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Children
                                    </label>

                                    <input
                                        type="number"
                                        min={0}
                                        value={children}
                                        onChange={(e) =>
                                            setChildren(
                                                Number(
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="w-full border rounded-xl px-4 py-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Special Request
                                </label>

                                <textarea
                                    rows={5}
                                    value={
                                        specialRequest
                                    }
                                    onChange={(e) =>
                                        setSpecialRequest(
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-4 py-3 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-fit">
                        <h2 className="text-2xl font-semibold mb-6">
                            Booking Summary
                        </h2>

                        <div className="space-y-5">
                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Room Type
                                </span>

                                <span className="font-semibold">
                                    {roomType.name}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Capacity
                                </span>

                                <span className="font-semibold">
                                    {roomType.capacity} Guests
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Total Rooms
                                </span>

                                <span className="font-semibold">
                                    {roomType.totalRooms}
                                </span>
                            </div>                            <div className="border-t pt-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">
                                        Price / Night
                                    </span>

                                    <span className="text-3xl font-bold text-blue-600">
                                        ₹{roomType.pricePerNight}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                disabled={isLoading}
                                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-xl font-semibold transition-colors"
                            >
                                {isLoading
                                    ? "Adding..."
                                    : "Add To Cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default BookingPage;