import { useEffect } from "react";

import authService from "../services/auth/auth.service";
import hotelService from "../services/hotel/hotel.service";

import useAuthStore from "../store/auth.store";

import { getToken } from "../utils/token";

function useInitializeAuth() {
    const {
        setHotel,
        setCurrentHotel,
        clearCurrentHotel,
        clearHotel,
    } = useAuthStore();

    useEffect(() => {
        async function initialize() {
            try {
                const token = getToken();

                if (!token) {
                    clearHotel();
                    return;
                }

                const response = await authService.me();

                setHotel(response.data);

                try {
                    const hotelResponse =
    await hotelService.getMyHotel();

console.log(hotelResponse.hotel);

setCurrentHotel(hotelResponse.hotel);
                } catch {
                    clearCurrentHotel();
                }
            } catch {
                clearHotel();
            }
        }

        initialize();
    }, [
        setHotel,
        setCurrentHotel,
        clearCurrentHotel,
        clearHotel,
    ]);
}

export default useInitializeAuth;