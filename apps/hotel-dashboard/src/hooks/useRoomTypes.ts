import { useQuery } from "@tanstack/react-query";

import roomTypeService from "../services/room-type/roomType.service";

function useRoomTypes(hotelId?: string) {
    return useQuery({
        queryKey: ["room-types", hotelId],
        queryFn: () =>
            roomTypeService.getRoomTypesByHotel(
                hotelId as string
            ),
        enabled: !!hotelId,
    });
}

export default useRoomTypes;