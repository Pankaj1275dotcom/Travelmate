import RoomCard, { type RoomCardProps } from "./RoomCard";

interface RoomGridProps {
    rooms: RoomCardProps[];
    onRoomClick: (room: RoomCardProps) => void;
}

function RoomGrid({
    rooms,
    onRoomClick,
}: RoomGridProps) {
    return (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5">
            {rooms.map((room) => (
                <RoomCard
                    key={room.roomId}
                    {...room}
                    onClick={() => onRoomClick(room)}
                />
            ))}
        </div>
    );
}

export default RoomGrid;