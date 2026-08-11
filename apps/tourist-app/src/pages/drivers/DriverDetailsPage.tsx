import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import { useQuery } from "@tanstack/react-query";

import {
    ArrowLeft,
    MapPin,
    Star,
    Briefcase,
    Phone,
    IndianRupee,
    Car,
} from "lucide-react";

import Layout from "../../components/layout/Layout";

import driverService from "../../services/driver/driver.service";

function DriverDetailsPage() {
    const { driverId } = useParams();
    const navigate =
    useNavigate();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["driver", driverId],

        queryFn: () =>
            driverService.getDriverById(
                driverId!
            ),

        enabled: !!driverId,
    });

    const driver = data?.driver;

    if (isLoading) {
        return (
            <Layout>
                <div className="flex h-[70vh] items-center justify-center">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
            </Layout>
        );
    }

    if (isError || !driver) {
        return (
            <Layout>
                <div className="flex h-[70vh] items-center justify-center">
                    <h1 className="text-4xl font-bold">
                        Driver Not Found
                    </h1>
                </div>
            </Layout>
        );
    }

    return (        <Layout>
            <section className="relative h-[500px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=80"
                    alt={driver.fullName}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-12 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">
                    <Link
                        to="/drivers"
                        className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-white backdrop-blur-md"
                    >
                        <ArrowLeft size={18} />
                        Back To Drivers
                    </Link>

                    <div className="flex flex-wrap items-end justify-between gap-8">
                        <div>
                            <h1 className="text-6xl font-black text-white">
                                {driver.fullName}
                            </h1>

                            <div className="mt-6 flex flex-wrap gap-6 text-white">
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} />
                                    {driver.city}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Car size={20} />
                                    {driver.vehicleType}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Briefcase size={20} />
                                    {driver.experience} Years
                                </div>

                                <div className="flex items-center gap-2">
                                    <Star
                                        size={20}
                                        fill="currentColor"
                                    />
                                    {driver.rating.toFixed(1)}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-2xl">
                            <p className="text-sm text-slate-500">
                                Starting From
                            </p>

                            <div className="mt-3 flex items-center text-5xl font-black text-blue-600">
                                <IndianRupee size={42} />
                                {driver.pricePerDay}
                            </div>

                            <p className="text-slate-500">
                                Per Day
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <h2 className="text-4xl font-black">
                        About Driver
                    </h2>

                    <p className="mt-6 text-lg leading-9 text-slate-600">
                        {driver.bio ??
                            "Professional driver with excellent local route knowledge, safe driving experience and customer-friendly service."}
                    </p>

                    <div className="mt-16 grid gap-6 md:grid-cols-2">
                        <div className="rounded-3xl border p-8">
                            <Car
                                className="mb-4 text-blue-600"
                                size={34}
                            />

                            <h3 className="text-xl font-bold">
                                Vehicle
                            </h3>

                            <p className="mt-2 text-slate-600">
                                {driver.vehicleType}
                            </p>
                        </div>

                        <div className="rounded-3xl border p-8">
                            <Phone
                                className="mb-4 text-blue-600"
                                size={34}
                            />

                            <h3 className="text-xl font-bold">
                                Contact
                            </h3>

                            <p className="mt-2 text-slate-600">
                                {driver.phone}
                            </p>
                        </div>

                        <div className="rounded-3xl border p-8">
                            <Briefcase
                                className="mb-4 text-blue-600"
                                size={34}
                            />

                            <h3 className="text-xl font-bold">
                                Experience
                            </h3>

                            <p className="mt-2 text-slate-600">
                                {driver.experience} Years
                            </p>
                        </div>

                        <div className="rounded-3xl border p-8">
                            <Star
                                className="mb-4 text-yellow-500"
                                fill="currentColor"
                                size={34}
                            />

                            <h3 className="text-xl font-bold">
                                Reviews
                            </h3>

                            <p className="mt-2 text-slate-600">
                                {driver.totalReviews} Reviews
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="sticky top-24 rounded-3xl border bg-white p-8 shadow-xl">
                        <h2 className="text-3xl font-bold">
                            Book Driver
                        </h2>

                        <div className="mt-8 space-y-5">
                            <div className="flex justify-between">
                                <span>Per Hour</span>

                                <span className="font-semibold">
                                    ₹{driver.pricePerHour}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Per Day</span>

                                <span className="font-semibold">
                                    ₹{driver.pricePerDay}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Vehicle</span>

                                <span className="font-semibold">
                                    {driver.vehicleType}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Status</span>

                                <span
                                    className={
                                        driver.isAvailable
                                            ? "font-semibold text-green-600"
                                            : "font-semibold text-red-600"
                                    }
                                >
                                    {driver.isAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Rating</span>

                                <span className="font-semibold">
                                    ⭐ {driver.rating.toFixed(1)}
                                </span>
                            </div>
                        </div>

                        <button
    disabled={!driver.isAvailable}
    onClick={() =>
        navigate(
            ROUTES.DRIVER_BOOKING.replace(
                ":driverId",
                driver.id
            )
        )
    }
    className="mt-10 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
>
    Book Driver
</button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default DriverDetailsPage;