import { useEffect } from "react";
import {
    Car,
    BadgeInfo,
    Palette,
    Users,
    Wind,
} from "lucide-react";
import { useForm } from "react-hook-form";

import useDriver from "../../hooks/useDriver";

import type {
    UpdateVehicleRequest,
} from "../../types/driver.types";

function VehiclePage() {
    const {
        driver,
        updateVehicle,
        isUpdatingVehicle,
    } = useDriver();

    const {
        register,
        handleSubmit,
        reset,
        
    } = useForm<UpdateVehicleRequest>({
        defaultValues: {
            vehicleType: "",
            vehicleBrand: "",
            vehicleModel: "",
            vehicleNumber: "",
            vehicleColor: "",
            seatCapacity: 4,
            airConditioned: true,
        },
    });

    useEffect(() => {
        if (!driver) return;

        reset({
            vehicleType: driver.vehicleType ?? "",
            vehicleBrand: driver.vehicleBrand ?? "",
            vehicleModel: driver.vehicleModel ?? "",
            vehicleNumber: driver.vehicleNumber ?? "",
            vehicleColor: driver.vehicleColor ?? "",
            seatCapacity: driver.seatCapacity ?? 4,
            airConditioned:
                driver.airConditioned ?? true,
        });
    }, [driver, reset]);

    const onSubmit = (
        data: UpdateVehicleRequest
    ) => {
        updateVehicle(data);
    };

   

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* Header */}

            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

                <h1 className="text-4xl font-bold text-slate-900">
                    Vehicle Details
                </h1>

                <p className="mt-3 max-w-3xl leading-7 text-slate-500">
                    Keep your vehicle information up to
                    date so travellers know exactly
                    what vehicle will arrive for their
                    journey.
                </p>

            </section>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-8 lg:grid-cols-3"
            >

                {/* Vehicle Preview */}

                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

                    <div className="flex flex-col items-center">

                        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-blue-50">

                            <Car
                                size={80}
                                className="text-blue-600"
                            />

                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-slate-900 text-center">

                            {driver?.vehicleBrand}{" "}
                            {driver?.vehicleModel}

                        </h2>

                        <p className="mt-2 text-slate-500">
                            {driver?.vehicleType}
                        </p>

                        <div className="mt-8 w-full rounded-2xl bg-slate-50 p-5">

                            <div className="flex justify-between">

                                <span className="text-slate-500">
                                    Vehicle No.
                                </span>

                                <span className="font-semibold">
                                    {driver?.vehicleNumber}
                                </span>

                            </div>

                            <div className="mt-4 flex justify-between">

                                <span className="text-slate-500">
                                    Seats
                                </span>

                                <span className="font-semibold">
                                    {driver?.seatCapacity}
                                </span>

                            </div>

                            <div className="mt-4 flex justify-between">

                                <span className="text-slate-500">
                                    Air Conditioned
                                </span>

                                <span
                                    className={`font-semibold ${
                                        driver?.airConditioned
                                            ? "text-emerald-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {driver?.airConditioned
                                        ? "Yes"
                                        : "No"}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Vehicle Form */}

                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">

                    <h2 className="mb-8 text-2xl font-bold">
                        Vehicle Information
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Vehicle Type */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Vehicle Type
                            </label>

                            <input
                                {...register("vehicleType")}
                                placeholder="SUV"
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            />

                        </div>

                        {/* Brand */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Vehicle Brand
                            </label>

                            <input
                                {...register("vehicleBrand")}
                                placeholder="Toyota"
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            />

                        </div>

                        {/* Vehicle Model */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Vehicle Model
                            </label>

                            <input
                                {...register("vehicleModel")}
                                placeholder="Innova Crysta"
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            />

                        </div>

                       {/* Vehicle Number */}

<div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
        Vehicle Number
    </label>

    <div className="relative">
        <BadgeInfo
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
            value={driver?.vehicleNumber ?? ""}
            disabled
            className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 py-3 pl-12 pr-4 text-slate-500"
        />
    </div>

    <p className="mt-2 text-xs text-slate-500">
        Vehicle Number is locked after
        verification for traveller safety.
        Contact the administrator if it
        needs to be changed.
    </p>
</div>                        {/* Vehicle Color */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Vehicle Color
                            </label>

                            <div className="relative">

                                <Palette
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    {...register("vehicleColor")}
                                    placeholder="White"
                                    className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Seat Capacity */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Seat Capacity
                            </label>

                            <div className="relative">

                                <Users
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="number"
                                    min={1}
                                    {...register("seatCapacity", {
                                        valueAsNumber: true,
                                    })}
                                    placeholder="5"
                                    className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Air Conditioned */}

                        <div className="md:col-span-2">

                            <label className="mb-3 block text-sm font-semibold text-slate-700">
                                Air Conditioned
                            </label>

                            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-300 px-5 py-4">

                                <div className="flex items-center gap-3">

                                    <Wind
                                        size={20}
                                        className="text-blue-600"
                                    />

                                    <div>

                                        <p className="font-semibold text-slate-900">
                                            AC Available
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            Travellers will see this on your profile.
                                        </p>

                                    </div>

                                </div>

                                <input
                                    type="checkbox"
                                    {...register("airConditioned")}
                                    className="h-5 w-5"
                                />

                            </label>

                        </div>

                    </div>

                    {/* Vehicle Overview */}

                    <div className="mt-10">

                        <h3 className="mb-5 text-xl font-bold text-slate-900">
                            Vehicle Overview
                        </h3>

                        <div className="grid gap-5 md:grid-cols-4">

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Vehicle
                                </p>

                                <h4 className="mt-2 text-2xl font-bold text-slate-900">
                                    {driver?.vehicleType || "--"}
                                </h4>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Seats
                                </p>

                                <h4 className="mt-2 text-2xl font-bold text-slate-900">
                                    {driver?.seatCapacity ?? 0}
                                </h4>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    AC
                                </p>

                                <h4 className="mt-2 text-2xl font-bold text-slate-900">
                                    {driver?.airConditioned
                                        ? "Available"
                                        : "Not Available"}
                                </h4>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Registration
                                </p>

                                <p
    className="
        mt-3
        text-lg
        font-bold
        text-slate-900
        break-words
        leading-6
    "
>
    {driver?.vehicleNumber ?? "-"}
</p>

                            </div>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="mt-10 flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => {
                                if (!driver) return;

                                reset({
                                    vehicleType: driver.vehicleType ?? "",
                                    vehicleBrand: driver.vehicleBrand ?? "",
                                    vehicleModel: driver.vehicleModel ?? "",
                                    vehicleNumber: driver.vehicleNumber ?? "",
                                    vehicleColor: driver.vehicleColor ?? "",
                                    seatCapacity: driver.seatCapacity ?? 4,
                                    airConditioned:
                                        driver.airConditioned ?? true,
                                });
                            }}
                            className="rounded-2xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            disabled={isUpdatingVehicle}
                            className="rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isUpdatingVehicle
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </div>

            </form>

        </div>
    );
}

export default VehiclePage;