import { Link } from "react-router-dom";
import {
    Wifi,
    Snowflake,
    Users,
    BedDouble,
} from "lucide-react";

import type { Room } from "../../types/room.types";

interface RoomCardProps {
    room: Room;
}

function RoomCard({ room }: RoomCardProps) {
    return (
        <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative h-64 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80"
                    alt={room.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                    {room.roomType}
                </div>
            </div>

            <div className="space-y-4 p-6">
                <div>
                    <h2 className="text-2xl font-bold">
                        {room.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {room.description ??
                            "Comfortable room with premium facilities."}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 text-slate-600">
                    <div className="flex items-center gap-2">
                        <Users size={18} />
                        {room.capacity} Guests
                    </div>

                    <div className="flex items-center gap-2">
                        <BedDouble size={18} />
                        {room.availableRooms}/
                        {room.totalRooms}
                    </div>

                    {room.hasWifi && (
                        <div className="flex items-center gap-2">
                            <Wifi size={18} />
                            WiFi
                        </div>
                    )}

                    {room.hasAC && (
                        <div className="flex items-center gap-2">
                            <Snowflake size={18} />
                            AC
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between border-t pt-5">
                    <div>
                        <h3 className="text-3xl font-bold text-blue-600">
                            ₹{room.pricePerNight}
                        </h3>

                        <span className="text-sm text-slate-500">
                            per night
                        </span>
                    </div>

                    <Link
                        to={`/bookings?room=${room.id}`}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RoomCard;