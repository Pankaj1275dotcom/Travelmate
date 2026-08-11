import {
    useEffect,
    useState,
} from "react";

interface CountdownTimerProps {

    expiresAt: string;

    onExpire?: () => void;

}

function CountdownTimer({

    expiresAt,

    onExpire,

}: CountdownTimerProps) {

    const getRemainingTime = () => {

        const diff =
            new Date(
                expiresAt
            ).getTime() -
            Date.now();

        return Math.max(
            diff,
            0
        );

    };

    const [
        remaining,
        setRemaining,
    ] = useState(
        getRemainingTime()
    );

    useEffect(() => {

        const interval =
            setInterval(() => {

                const time =
                    getRemainingTime();

                setRemaining(
                    time
                );

                if (
                    time <= 0
                ) {

                    clearInterval(
                        interval
                    );

                    onExpire?.();

                }

            }, 1000);

        return () =>
            clearInterval(
                interval
            );

    }, [expiresAt]);

    const minutes =
        Math.floor(
            remaining /
            60000
        );

    const seconds =
        Math.floor(
            (remaining %
                60000) /
                1000
        );

    return (

        <div className="flex items-center gap-2">

            <span className="text-sm font-semibold text-orange-600">

                ⏰

                {String(
                    minutes
                ).padStart(
                    2,
                    "0"
                )}

                :

                {String(
                    seconds
                ).padStart(
                    2,
                    "0"
                )}

            </span>

        </div>

    );

}

export default CountdownTimer;