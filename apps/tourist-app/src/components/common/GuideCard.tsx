import { Link } from "react-router-dom";

import {
    Star,
    MapPin,
    Languages,
    Briefcase,
    IndianRupee,
} from "lucide-react";

import type { Guide } from "../../types/guide.types";

interface GuideCardProps {
    guide: Guide;
}

function GuideCard({ guide }: GuideCardProps) {
    return (
        <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative h-72 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80"
                    alt={guide.fullName}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                    ⭐ {guide.rating.toFixed(1)}
                </div>

                {!guide.isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white">
                            Not Available
                        </span>
                    </div>
                )}
            </div>

            <div className="space-y-4 p-6">
                <div>
                    <h2 className="text-2xl font-bold">
                        {guide.fullName}
                    </h2>

                    <div className="mt-3 flex items-center gap-2 text-slate-500">
                        <MapPin size={18} />

                        <span>{guide.city}</span>
                    </div>
                </div>

                {guide.bio && (
                    <p className="line-clamp-2 text-sm text-slate-600">
                        {guide.bio}
                    </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <Briefcase size={18} />
                        {guide.experience} Years
                    </div>

                    <div className="flex items-center gap-2">
                        <Languages size={18} />
                        {guide.languages}
                    </div>

                    <div className="flex items-center gap-2">
                        <Star
                            size={18}
                            fill="currentColor"
                            className="text-yellow-500"
                        />
                        {guide.totalReviews} Reviews
                    </div>
                </div>

                <div className="flex items-center justify-between border-t pt-5">
                    <div>
                        <div className="flex items-center text-3xl font-bold text-blue-600">
                            <IndianRupee size={28} />
                            {guide.pricePerDay}
                        </div>

                        <p className="text-sm text-slate-500">
                            Per Day
                        </p>
                    </div>

                    <Link
                        to={`/guides/${guide.id}`}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Hire Guide
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GuideCard;