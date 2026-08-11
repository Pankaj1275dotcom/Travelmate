function RoomLegend() {
    return (
        <div className="flex flex-wrap gap-6 rounded-xl border bg-white p-4">
            <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-emerald-500" />
                <span className="text-sm">Available</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-red-500" />
                <span className="text-sm">Occupied</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-orange-500" />
                <span className="text-sm">Maintenance</span>
            </div>
        </div>
    );
}

export default RoomLegend;