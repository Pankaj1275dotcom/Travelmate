type RoomStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";

interface RoomStatusBadgeProps {
    status: RoomStatus;
}

function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
    if (status === "AVAILABLE") {
        return (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Available
            </span>
        );
    }

    if (status === "OCCUPIED") {
        return (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Occupied
            </span>
        );
    }

    return (
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            Maintenance
        </span>
    );
}

export default RoomStatusBadge;