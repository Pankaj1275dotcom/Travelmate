import { Star, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

import type { Hotel } from "../../types/hotel.types";

interface HotelCardProps {
    hotel: Hotel;

    isWishlisted?: boolean;

    onWishlist?: (hotelId: string) => void;
}

function HotelCard({
    hotel,
    isWishlisted = false,
    onWishlist,
}: HotelCardProps) {
    return (
        <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative h-64 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
                    alt={hotel.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Rating */}
                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 shadow">
                    ⭐ {hotel.rating.toFixed(1)}
                </div>

                {/* Wishlist */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        onWishlist?.(hotel.id);
                    }}
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110"
                >
                    <Heart
                        size={22}
                        className={
                            isWishlisted
                                ? "fill-red-500 text-red-500 transition"
                                : "text-slate-500 transition hover:text-red-500"
                        }
                    />
                </button>
            </div>

            <div className="space-y-3 p-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    {hotel.name}
                </h2>

                <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={18} />

                    <span>
                        {hotel.city}, {hotel.state}
                    </span>
                </div>

                <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                    {hotel.description}
                </p>

                <div className="flex items-center justify-between pt-4">
                    <div>
                        <p className="text-3xl font-bold text-blue-600">
                            ₹
{
    hotel.roomTypes &&
    hotel.roomTypes.length > 0
        ? hotel.roomTypes[0].pricePerNight
        : hotel.pricePerNight
}


                        </p>

                        <span className="text-sm text-slate-500">
                            / night
                        </span>
                    </div>

                    <Link
                        to={`/hotels/${hotel.id}`}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        View Details
                    </Link>
                </div>

                <div className="flex items-center gap-1 text-yellow-500">
                    <Star
                        size={18}
                        fill="currentColor"
                    />

                    <span className="font-medium">
                        {hotel.rating.toFixed(1)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default HotelCard;