import { Link, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
    ArrowLeft,
    MapPin,
    Star,
    Languages,
    Briefcase,
    Phone,
    IndianRupee,
} from "lucide-react";

import Layout from "../../components/layout/Layout";

import guideService from "../../services/guide/guide.service";

function GuideDetailsPage() {
    const { guideId } = useParams();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["guide", guideId],

        queryFn: () =>
            guideService.getGuideById(
                guideId!
            ),

        enabled: !!guideId,
    });

    const guide = data?.guide;

    if (isLoading) {
        return (
            <Layout>
                <div className="flex h-[70vh] items-center justify-center">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
            </Layout>
        );
    }

    if (isError || !guide) {
        return (
            <Layout>
                <div className="flex h-[70vh] items-center justify-center">
                    <h1 className="text-4xl font-bold">
                        Guide Not Found
                    </h1>
                </div>
            </Layout>
        );
    }

    return (        <Layout>
            <section className="relative h-[500px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1800&q=80"
                    alt={guide.fullName}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-12 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">
                    <Link
                        to="/guides"
                        className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-white backdrop-blur-md"
                    >
                        <ArrowLeft size={18} />
                        Back To Guides
                    </Link>

                    <div className="flex flex-wrap items-end justify-between gap-8">
                        <div>
                            <h1 className="text-6xl font-black text-white">
                                {guide.fullName}
                            </h1>

                            <div className="mt-6 flex flex-wrap gap-6 text-white">
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} />
                                    {guide.city}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Star
                                        size={20}
                                        fill="currentColor"
                                    />
                                    {guide.rating.toFixed(1)}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Briefcase size={20} />
                                    {guide.experience} Years
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-2xl">
                            <p className="text-sm text-slate-500">
                                Starting From
                            </p>

                            <div className="mt-3 flex items-center text-5xl font-black text-blue-600">
                                <IndianRupee size={42} />
                                {guide.pricePerDay}
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
                        About Guide
                    </h2>

                    <p className="mt-6 text-lg leading-9 text-slate-600">
                        {guide.bio ??
                            "Experienced local guide with extensive knowledge of tourist attractions, local culture and history."}
                    </p>

                    <div className="mt-16 grid gap-6 md:grid-cols-2">
                        <div className="rounded-3xl border p-8">
                            <Languages
                                className="mb-4 text-blue-600"
                                size={34}
                            />

                            <h3 className="text-xl font-bold">
                                Languages
                            </h3>

                            <p className="mt-2 text-slate-600">
                                {guide.languages}
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
                                {guide.phone}
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
                                {guide.experience} Years
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
                                {guide.totalReviews} Reviews
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="sticky top-24 rounded-3xl border bg-white p-8 shadow-xl">
                        <h2 className="text-3xl font-bold">
                            Hire Guide
                        </h2>

                        <div className="mt-8 space-y-5">
                            <div className="flex justify-between">
                                <span>Per Hour</span>

                                <span className="font-semibold">
                                    ₹{guide.pricePerHour}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Per Day</span>

                                <span className="font-semibold">
                                    ₹{guide.pricePerDay}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Status</span>

                                <span
                                    className={
                                        guide.isAvailable
                                            ? "font-semibold text-green-600"
                                            : "font-semibold text-red-600"
                                    }
                                >
                                    {guide.isAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Rating</span>

                                <span className="font-semibold">
                                    ⭐ {guide.rating.toFixed(1)}
                                </span>
                            </div>
                        </div>

                        <Link
    to={`/guides/${guide.id}/book`}
    className={`mt-10 flex w-full items-center justify-center rounded-2xl py-4 text-lg font-semibold transition ${
        guide.isAvailable
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "cursor-not-allowed bg-slate-400 text-white pointer-events-none"
    }`}
>

    Hire Guide

</Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default GuideDetailsPage;