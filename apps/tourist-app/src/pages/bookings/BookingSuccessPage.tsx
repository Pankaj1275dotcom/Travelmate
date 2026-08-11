import {
    CheckCircle2,
    Home,
    Receipt,
    Plane,
} from "lucide-react";
import { Link } from "react-router-dom";

import Layout from "../../components/layout/Layout";
function BookingSuccessPage() {
    const bookingId =
        "TM-" + Math.floor(Date.now() / 1000);

    return (
        <Layout>
            <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-6">
                <div className="w-full rounded-3xl bg-white p-12 text-center shadow-xl">
                    <CheckCircle2
                        className="mx-auto text-green-500"
                        size={90}
                    />

                    <h1 className="mt-8 text-5xl font-black text-slate-900">
                        Booking Confirmed
                    </h1>

                    <p className="mt-4 text-lg text-slate-500">
                        Your booking has been created successfully.
                    </p>

                    <div className="mt-10 rounded-2xl bg-slate-100 p-6">
                        <p className="text-sm text-slate-500">
                            Booking ID
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-blue-600">
                            {bookingId}
                        </h2>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 md:flex-row">
                        <Link
                            to="/"
                            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
                        >
                            <Home size={20} />

                            Home
                        </Link>

                        <Link
                            to="/bookings"
                            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border py-4 font-semibold transition hover:bg-slate-100"
                        >
                            <Receipt size={20} />

                            My Bookings
                        </Link>
                        <Link
    to="/trips"
    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border py-4 font-semibold transition hover:bg-slate-100"
>
    <Plane size={20} />

    My Trips
</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default BookingSuccessPage;