import CountdownTimer from "../common/CountdownTimer";
import { useQueryClient } from "@tanstack/react-query";

import bookingService from "../../services/booking/booking.service";
interface CartPaymentTimerProps {

    requestId: string;

    requestStatus?: string | null;

    paymentExpiresAt?: string | Date | null;

}

function CartPaymentTimer({

    requestId,

    requestStatus,

    paymentExpiresAt,

}: CartPaymentTimerProps) {
    const queryClient =
    useQueryClient();

    if (

        requestStatus !== "ACCEPTED" ||

        !paymentExpiresAt

    ) {

        return null;

    }

    return (

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="font-semibold text-blue-800">

                        Payment Required

                    </h3>

                    <p className="mt-1 text-sm text-blue-600">

                        Please complete your payment within
                        30 minutes to confirm this booking.

                    </p>

                </div>

               <CountdownTimer
    expiresAt={
        typeof paymentExpiresAt === "string"
            ? paymentExpiresAt
            : paymentExpiresAt.toISOString()
    }
    onExpire={async () => {

        try {

            await bookingService.expireBookingRequest(
                requestId
            );

            await queryClient.invalidateQueries({

                queryKey: ["cart"],

            });

        } catch (error) {

            console.error(error);

        }

    }}
/>

            </div>

        </div>

    );

}

export default CartPaymentTimer;