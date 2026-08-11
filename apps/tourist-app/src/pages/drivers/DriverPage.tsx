import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Search, MapPin } from "lucide-react";

import Layout from "../../components/layout/Layout";
import DriverCard from "../../components/common/DriverCard";

import driverService from "../../services/driver/driver.service";

function DriverPage() {
    const [searchCity, setSearchCity] =
        useState("");

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["drivers"],

        queryFn: () =>
            driverService.getAllDrivers(),
    });

    const drivers = data?.drivers ?? [];

    const filteredDrivers = useMemo(() => {
        if (!searchCity.trim()) {
            return drivers;
        }

        return drivers.filter((driver) =>
            driver.city
                .toLowerCase()
                .includes(searchCity.toLowerCase())
        );
    }, [drivers, searchCity]);

    if (isLoading) {
        return (
            <Layout>
                <div className="flex h-[70vh] items-center justify-center">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
            </Layout>
        );
    }

    if (isError) {
        return (
            <Layout>
                <div className="flex h-[70vh] items-center justify-center">
                    <h1 className="text-4xl font-bold">
                        Unable to load drivers.
                    </h1>
                </div>
            </Layout>
        );
    }

    return (        <Layout>
            <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 py-20 text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <h1 className="text-5xl font-black">
                        Book Professional Drivers
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg text-blue-100">
                        Hire verified and experienced drivers for city tours,
                        airport transfers, long-distance travel and customized
                        trips.
                    </p>

                    <div className="mt-10 flex max-w-xl items-center rounded-2xl bg-white px-5 py-4 shadow-xl">
                        <Search
                            size={22}
                            className="text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search by city..."
                            value={searchCity}
                            onChange={(e) =>
                                setSearchCity(e.target.value)
                            }
                            className="ml-3 w-full bg-transparent text-slate-800 outline-none"
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-black">
                            Available Drivers
                        </h2>

                        <p className="mt-3 text-slate-500">
                            {filteredDrivers.length} Drivers Found
                        </p>
                    </div>

                    <div className="hidden items-center gap-2 rounded-xl border bg-white px-5 py-3 md:flex">
                        <MapPin
                            size={20}
                            className="text-blue-600"
                        />

                        <span className="font-medium">
                            {searchCity || "All Cities"}
                        </span>
                    </div>
                </div>

                {filteredDrivers.length === 0 ? (
                    <div className="rounded-3xl border bg-slate-50 py-24 text-center">
                        <h2 className="text-3xl font-bold">
                            No Drivers Found
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Try searching with another city.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {filteredDrivers.map((driver) => (
                            <DriverCard
                                key={driver.id}
                                driver={driver}
                            />
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    );
}

export default DriverPage;