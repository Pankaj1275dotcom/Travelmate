import { AlertTriangle, BedDouble, CheckCircle2, XCircle } from "lucide-react";
import RoomStatusBadge from "./RoomStatusBadge";

export type RoomStatus =
    | "AVAILABLE"
    | "OCCUPIED"
    | "MAINTENANCE";

export interface RoomCardProps {
    roomId: string;
    roomNumber: string;
    status: RoomStatus;
    onClick?: () => void;
}

function RoomCard({
    roomNumber,
    status,
    onClick,
}: RoomCardProps) {
    const isAvailable = status === "AVAILABLE";
    const isOccupied = status === "OCCUPIED";
    const isMaintenance = status === "MAINTENANCE";

    return (
        <button
            onClick={onClick}
            className={`group flex w-full flex-col rounded-2xl border p-5 text-left transition-all duration-200 hover:scale-[1.03]
                ${
                    isAvailable
                        ? "border-emerald-200 bg-emerald-50 hover:border-emerald-400"
                        : ""
                }
                ${
                    isOccupied
                        ? "border-red-200 bg-red-50 opacity-70 hover:opacity-100"
                        : ""
                }
                ${
                    isMaintenance
                        ? "border-orange-200 bg-orange-50"
                        : ""
                }
            `}
        >
            <div className="flex items-center justify-between">
                <BedDouble className="h-7 w-7 text-slate-700" />

                {isAvailable && (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                )}

                {isOccupied && (
                    <XCircle className="h-6 w-6 text-red-600" />
                )}

                {isMaintenance && (
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                )}
            </div>

            <h3 className="mt-5 text-3xl font-bold tracking-wide">
                {roomNumber}
            </h3>

            <div className="mt-4">
                <RoomStatusBadge status={status} />
            </div>
        </button>
    );
}

export default RoomCard;