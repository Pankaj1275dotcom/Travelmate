import { useQuery } from "@tanstack/react-query";

import hotelService from "../services/hotel/hotel.service";

function useHotel() {
    return useQuery({
        queryKey: ["my-hotel"],
        queryFn: hotelService.getMyHotel,
    });
}

export default useHotel;