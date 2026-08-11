import { useEffect } from "react";

import {
    Camera,
    User,
    Phone,
    MapPin,
    Languages,
    Briefcase,
    Wallet,
    FileText,
} from "lucide-react";

import { useForm } from "react-hook-form";

import useGuide from "../../hooks/useGuide";

import type {
    CreateGuideRequest,
} from "../../types/guide.types";

function ProfilePage() {
const {
    myGuide,
    registeredUser,
    createGuide,
    updateGuide,
    isCreating,
    isUpdating,
} = useGuide();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CreateGuideRequest>({
        defaultValues: {
            fullName: "",
            phone: "",
            bio: "",
            city: "",
            experience: 0,
            languages: "",
            pricePerHour: 0,
        },
    });

useEffect(() => {
    if (myGuide) {
        reset({
            fullName: myGuide.fullName,
            phone: myGuide.phone,
            bio: myGuide.bio ?? "",
            city: myGuide.city,
            experience: myGuide.experience,
            languages: myGuide.languages,
            pricePerHour: myGuide.pricePerHour,
        });

        return;
    }

    if (registeredUser) {
        reset({
            fullName: registeredUser.fullName,
            phone: registeredUser.phone,
            bio: "",
            city: "",
            experience: 0,
            languages: "",
            pricePerHour: 0,
        });
    }
}, [myGuide, registeredUser, reset]);

    const onSubmit = (
        data: CreateGuideRequest
    ) => {
        if (myGuide) {
            updateGuide(data);
        } else {
            createGuide(data);
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* Header */}

            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

                <h1 className="text-4xl font-bold text-slate-900">
                    Guide Profile
                </h1>

                <p className="mt-3 max-w-2xl text-slate-500">
                    Complete your profile so tourists
                    can know more about you before
                    booking your services.
                </p>

            </section>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-8 lg:grid-cols-3"
            >

                {/* Left Card */}

                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

                    <div className="flex flex-col items-center">

                        <div className="relative">

                            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-100">

                                <User
                                    size={80}
                                    className="text-slate-500"
                                />

                            </div>

                            <button
                                type="button"
                                className="absolute bottom-1 right-1 rounded-full bg-blue-600 p-3 text-white shadow-lg transition hover:bg-blue-700"
                            >

                                <Camera size={18} />

                            </button>

                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-slate-900">

                            {myGuide
                                ? myGuide.fullName
                                : "New Guide"}

                        </h2>

                        <p className="mt-2 text-slate-500">
                            TravelMate Guide
                        </p>

                        <div className="mt-8 w-full rounded-2xl bg-slate-50 p-5">

                            <div className="flex justify-between">

                                <span className="text-slate-500">
                                    Status
                                </span>

                                <span
    className={`font-semibold ${
        myGuide?.approvalStatus === "APPROVED"
            ? "text-emerald-600"
            : "text-amber-600"
    }`}
>
    {myGuide?.approvalStatus === "APPROVED"
        ? "Approved"
        : "Pending Approval"}
</span>

                            </div>

                            <div className="mt-4 flex justify-between">

                                <span className="text-slate-500">
                                    Rating
                                </span>

                                <span className="font-semibold">
                                    ⭐ 4.9
                                </span>

                            </div>

                            <div className="mt-4 flex justify-between">

                                <span className="text-slate-500">
                                    Reviews
                                </span>

                                <span className="font-semibold">
                                    128
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Form */}

                <div className="lg:col-span-2 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

                    <h2 className="mb-8 text-2xl font-bold">
                        Personal Information
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">                        {/* Full Name */}

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
    {...register("fullName")}
    placeholder="Enter your full name"
    disabled={!!registeredUser}
    className={`w-full rounded-2xl border py-3 pl-12 pr-4 outline-none transition-all
        ${
            myGuide
                ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
                : "border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        }`}
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
    {...register("phone")}
    placeholder="+91 9876543210"
    disabled={!!registeredUser}
    className={`w-full rounded-2xl border py-3 pl-12 pr-4 outline-none transition-all ${
        myGuide
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
            : "border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
    }`}
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
                                    placeholder="Jaipur"
                                    className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Experience */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Experience
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

                        </div>

                        {/* Languages */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Languages
                            </label>

                            <div className="relative">

                                <Languages
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    {...register("languages")}
                                    placeholder="Hindi, English"
                                    className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Price Per Hour */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Price Per Hour
                            </label>

                            <div className="relative">

                                <Wallet
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="number"
                                    min={0}
                                    {...register("pricePerHour", {
                                        valueAsNumber: true,
                                    })}
                                    placeholder="700"
                                    className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Bio */}

                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                About Yourself
                            </label>

                            <div className="relative">

                                <FileText
                                    size={18}
                                    className="absolute left-4 top-5 text-slate-400"
                                />

                                <textarea
                                    rows={6}
                                    {...register("bio")}
                                    placeholder="Tell tourists about yourself, your experience, your specialties and why they should book you."
                                    className="w-full resize-none rounded-2xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>                    </div>

                    {/* Profile Overview */}

                    <div className="mt-10 grid gap-6 md:grid-cols-3">

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                            <p className="text-sm text-slate-500">
                                Experience
                            </p>

                            <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                {myGuide
                                    ? `${myGuide.experience} Years`
                                    : "--"}
                            </h3>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                            <p className="text-sm text-slate-500">
                                Hourly Rate
                            </p>

                            <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                {myGuide
                                    ? `₹${myGuide.pricePerHour}`
                                    : "--"}
                            </h3>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                            <p className="text-sm text-slate-500">
                                Daily Rate
                            </p>

                            <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                {myGuide
                                    ? `₹${myGuide.pricePerDay}`
                                    : "--"}
                            </h3>

                        </div>

                    </div>

                    {/* Availability */}

                    <div className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">

                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                            <div>

                                <h3 className="text-xl font-bold text-slate-900">
                                    Availability Status
                                </h3>

                                <p className="mt-2 text-slate-500">
                                    This status is shown to tourists while
                                    searching for guides.
                                </p>

                            </div>

                            <div>

                                <span
                                    className={`rounded-full px-5 py-2 text-sm font-semibold ${
                                        myGuide?.isAvailable
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {myGuide?.isAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Action Buttons */}

                    <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
    isCreating ||
    isUpdating ||
    myGuide?.approvalStatus === "PENDING"
}
                            className="rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isCreating || isUpdating
    ? "Saving..."
    : myGuide?.approvalStatus === "PENDING"
    ? "Waiting For Approval"
    : myGuide
    ? "Update Profile"
    : "Create Profile"}
                        </button>

                    </div>

                </div>

            </form>        </div>
    );
}

export default ProfilePage;