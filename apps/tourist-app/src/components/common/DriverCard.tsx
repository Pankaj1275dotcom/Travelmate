import { Link } from "react-router-dom";

import {
    Star,
    MapPin,
    Briefcase,
    IndianRupee,
    Car,
} from "lucide-react";

import type { Driver } from "../../types/driver.types";

interface DriverCardProps {
    driver: Driver;
}

function DriverCard({ driver }: DriverCardProps) {
    return (
        <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative h-72 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80"
                    alt={driver.fullName}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                    ⭐ {driver.rating.toFixed(1)}
                </div>

                {!driver.isAvailable && (
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
                        {driver.fullName}
                    </h2>

                    <div className="mt-3 flex items-center gap-2 text-slate-500">
                        <MapPin size={18} />
                        <span>{driver.city}</span>
                    </div>
                </div>

                {driver.bio && (
                    <p className="line-clamp-2 text-sm text-slate-600">
                        {driver.bio}
                    </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <Briefcase size={18} />
                        {driver.experience} Years
                    </div>

                    <div className="flex items-center gap-2">
                        <Car size={18} />
                        {driver.vehicleType}
                    </div>

                    <div className="flex items-center gap-2">
                        <Star
                            size={18}
                            fill="currentColor"
                            className="text-yellow-500"
                        />
                        {driver.totalReviews} Reviews
                    </div>
                </div>

                <div className="flex items-center justify-between border-t pt-5">
                    <div>
                        <div className="flex items-center text-3xl font-bold text-blue-600">
                            <IndianRupee size={28} />
                            {driver.pricePerDay}
                        </div>

                        <p className="text-sm text-slate-500">
                            Per Day
                        </p>
                    </div>

                    <Link
                        to={`/drivers/${driver.id}`}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Book Driver
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DriverCard;