import {
    AlertTriangle,
    CheckCircle,
    Clock,
    CreditCard,
    XCircle,
} from "lucide-react";

interface CartStatusBadgeProps {

    requestStatus?: string | null;

    rejectionReason?: string | null;

}

function CartStatusBadge({

    requestStatus,

    rejectionReason,

}: CartStatusBadgeProps) {

    if (requestStatus === "PENDING") {

        return (

            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

                <Clock size={16} />

                Request Sent

            </span>

        );

    }

    if (requestStatus === "ACCEPTED") {

        return (

            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                <CheckCircle size={16} />

                Accepted

            </span>

        );

    }

    if (

        requestStatus === "REJECTED" &&

        rejectionReason === "Request expired"

    ) {

        return (

            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

                <AlertTriangle size={16} />

                Request Expired

            </span>

        );

    }

    if (

        requestStatus === "PAYMENT_EXPIRED"

    ) {

        return (

            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">

                <CreditCard size={16} />

                Payment Expired

            </span>

        );

    }

    if (requestStatus === "REJECTED") {

        return (

            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

                <XCircle size={16} />

                Rejected

            </span>

        );

    }

    if (requestStatus === "CONFIRMED") {

        return (

            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                <CheckCircle size={16} />

                Booking Confirmed

            </span>

        );

    }

    return null;

}

export default CartStatusBadge;