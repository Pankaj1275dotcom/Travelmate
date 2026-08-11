import { useQuery } from "@tanstack/react-query";

import roomService from "../services/room/room.service";

function useRooms(roomTypeId?: string) {
    return useQuery({
        queryKey: ["rooms", roomTypeId],
        queryFn: () =>
            roomService.getRoomsByRoomType(
                roomTypeId as string
            ),
        enabled: !!roomTypeId,
    });
}

export default useRooms;