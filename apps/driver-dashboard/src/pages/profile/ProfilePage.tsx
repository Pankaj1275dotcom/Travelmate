import { useEffect } from "react";
import {
    ShieldCheck,
    User,
    Phone,
    MapPin,
    Briefcase,
} from "lucide-react";
import { useForm } from "react-hook-form";

import useDriver from "../../hooks/useDriver";

import type {
    UpdateDriverRequest,
} from "../../types/driver.types";

function ProfilePage() {
    const {
        driver,
        updateProfile,
        isUpdating,
    } = useDriver();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<UpdateDriverRequest>({
        defaultValues: {
            city: "",
            experience: 0,
            bio: "",
            pricePerHour: 0,
        },
    });

    useEffect(() => {
        if (!driver) return;

        reset({
            city: driver.city ?? "",
            experience: driver.experience ?? 0,
            bio: driver.bio ?? "",
            pricePerHour: Number(
                driver.pricePerHour ?? 0
            ),
        });
    }, [driver, reset]);

    const onSubmit = (
        data: UpdateDriverRequest
    ) => {
        updateProfile(data);
    };

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* Header */}

            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

                <h1 className="text-4xl font-bold text-slate-900">
                    Driver Profile
                </h1>

                <p className="mt-3 max-w-3xl leading-7 text-slate-500">
                    Your identity has already been verified by
                    TravelMate. Identity information cannot be
                    changed after verification to ensure the
                    safety of travellers.
                </p>

            </section>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-8 lg:grid-cols-3"
            >

                {/* Left Card */}

                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

                    <div className="flex flex-col items-center">

                        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-100">

                            <User
                                size={80}
                                className="text-slate-400"
                            />

                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-slate-900">

                            {driver?.fullName ??
                                "Driver"}

                        </h2>

                        <p className="mt-2 text-slate-500">
                            TravelMate Driver
                        </p>

                        <div className="mt-6 flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">

                            <ShieldCheck
                                size={18}
                                className="text-emerald-600"
                            />

                            <span className="font-semibold text-emerald-700">
                                Verified Identity
                            </span>

                        </div>

                        <div className="mt-8 w-full rounded-2xl bg-slate-50 p-5">

                            <div className="flex justify-between">

                                <span className="text-slate-500">
                                    Status
                                </span>

                                <span className="font-semibold text-emerald-600">
                                    {driver?.approvalStatus ??
                                        "PENDING"}
                                </span>

                            </div>

                            <div className="mt-4 flex justify-between">

                                <span className="text-slate-500">
                                    Rating
                                </span>

                                <span className="font-semibold">
                                    ⭐ {driver?.rating ?? 0}
                                </span>

                            </div>

                            <div className="mt-4 flex justify-between">

                                <span className="text-slate-500">
                                    Reviews
                                </span>

                                <span className="font-semibold">
                                    {driver?.totalReviews ??
                                        0}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Card */}

                <div className="lg:col-span-2 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

                    <h2 className="mb-8 text-2xl font-bold">
                        Personal Information
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Full Name */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Full Name
                            </label>

                            <div className="relative">

                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    value={driver?.fullName ?? ""}
                                    disabled
                                    className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 py-3 pl-12 pr-4 text-slate-500"
                                />

                            </div>

                        </div>

                        {/* Phone */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Phone Number
                            </label>

                            <div className="relative">

                                <Phone
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    value={driver?.phone ?? ""}
                                    disabled
                                    className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 py-3 pl-12 pr-4 text-slate-500"
                                />

                            </div>

                        </div>

                        {/* City */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                City
                            </label>

                            <div className="relative">

                                <MapPin
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    {...register("city")}
                                    placeholder="Enter your city"
                                    className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Experience */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Driving Experience
                            </label>

                            <div className="relative">

                                <Briefcase
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="number"
                                    min={0}
                                    {...register("experience", {
                                        valueAsNumber: true,
                                    })}
                                    placeholder="5"
                                    className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>                        {/* Price Per Hour */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Price Per Hour (₹)
                            </label>

                            <input
                                type="number"
                                min={0}
                                {...register("pricePerHour", {
                                    valueAsNumber: true,
                                })}
                                placeholder="500"
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            />

                        </div>

                        {/* Bio */}

                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                About Yourself
                            </label>

                            <textarea
                                rows={6}
                                {...register("bio")}
                                placeholder="Tell travellers about yourself, your driving experience, local knowledge and anything that helps build trust."
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            />

                        </div>

                    </div>

                    {/* Driver Overview */}

                    <div className="mt-10">

                        <h3 className="mb-5 text-xl font-bold text-slate-900">
                            Driver Overview
                        </h3>

                        <div className="grid gap-5 md:grid-cols-4">

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Experience
                                </p>

                                <h4 className="mt-2 text-3xl font-bold text-slate-900">
                                    {driver?.experience ?? 0}
                                </h4>

                                <p className="mt-1 text-sm text-slate-500">
                                    Years
                                </p>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Price / Hour
                                </p>

                                <h4 className="mt-2 text-3xl font-bold text-slate-900">
                                    ₹ {driver?.pricePerHour ?? 0}
                                </h4>

                                <p className="mt-1 text-sm text-slate-500">
                                    Current Price
                                </p>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Rating
                                </p>

                                <h4 className="mt-2 text-3xl font-bold text-slate-900">
                                    ⭐ {driver?.rating ?? 0}
                                </h4>

                                <p className="mt-1 text-sm text-slate-500">
                                    Traveller Rating
                                </p>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="text-sm text-slate-500">
                                    Reviews
                                </p>

                                <h4 className="mt-2 text-3xl font-bold text-slate-900">
                                    {driver?.totalReviews ?? 0}
                                </h4>

                                <p className="mt-1 text-sm text-slate-500">
                                    Total Reviews
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Security Notice */}

                    <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">

                        <div className="flex items-start gap-3">

                            <ShieldCheck
                                size={22}
                                className="mt-0.5 text-amber-600"
                            />

                            <div>

                                <h4 className="font-semibold text-amber-800">
                                    Identity Protection
                                </h4>

                                <p className="mt-2 leading-7 text-amber-700">
                                    Your Full Name and Phone Number are locked
                                    after verification to protect travellers and
                                    maintain trust on the TravelMate platform.
                                    If you need to update these details, please
                                    contact the administrator.
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
                                    city: driver.city ?? "",
                                    experience: driver.experience ?? 0,
                                    bio: driver.bio ?? "",
                                    pricePerHour: Number(
                                        driver.pricePerHour ?? 0
                                    ),
                                });
                            }}
                            className="rounded-2xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isUpdating
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </div>

            </form>

        </div>
    );
}

export default ProfilePage;