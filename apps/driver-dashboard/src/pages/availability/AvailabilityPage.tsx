import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    CalendarClock,
    CheckCircle2,
    Clock3,
    Plane,
    RotateCcw,
    Save,
} from "lucide-react";

import useDriver from "../../hooks/useDriver";

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function AvailabilityPage() {
    const {
        availability,
        updateAvailability,
        refetchAvailability,
        isAvailabilityLoading,
        isUpdatingAvailability,
    } = useDriver();

    const [isAvailable, setIsAvailable] =
        useState(false);

    const [vacationMode, setVacationMode] =
        useState(false);

    const [workingDays, setWorkingDays] =
        useState<string[]>([]);

    const [startTime, setStartTime] =
        useState("");

    const [endTime, setEndTime] =
        useState("");

    useEffect(() => {
        if (!availability) {
            return;
        }

        setIsAvailable(
            availability.isAvailable
        );

        setVacationMode(
            availability.vacationMode
        );

        setWorkingDays(
            availability.workingDays
                ? availability.workingDays
                      .split(",")
                      .map((day) => day.trim())
                      .filter(Boolean)
                : []
        );

        setStartTime(
            availability.workingStartTime
        );

        setEndTime(
            availability.workingEndTime
        );
    }, [availability]);

    function toggleDay(day: string) {
        setWorkingDays((previous) =>
            previous.includes(day)
                ? previous.filter(
                      (item) => item !== day
                  )
                : [...previous, day]
        );
    }

    function resetAvailability() {
        refetchAvailability();
    }

    function saveAvailability() {
        updateAvailability({
            isAvailable,
            vacationMode,
            workingDays:
                workingDays.join(","),
            workingStartTime:
                startTime,
            workingEndTime:
                endTime,
        });
    }

    const totalWorkingDays = useMemo(
        () => workingDays.length,
        [workingDays]
    );

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            {/* Header */}

            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">
                            Availability
                        </h1>

                        <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                            Manage your working
                            schedule,
                            availability and
                            vacation mode.
                            Travelers can only
                            book you during your
                            available days and
                            working hours.
                        </p>
                    </div>

                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50">
                        <CalendarClock
                            size={36}
                            className="text-blue-600"
                        />
                    </div>
                </div>
            </section>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    {/* Driver Status */}

                    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Driver Status
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    Turn yourself
                                    online or
                                    offline for
                                    bookings.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={
                                    isAvailable
                                }
                                onChange={(
                                    e
                                ) =>
                                    setIsAvailable(
                                        e
                                            .target
                                            .checked
                                    )
                                }
                                className="h-6 w-6"
                            />
                        </div>

                        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500">
                                    Current
                                    Status
                                </span>

                                <span
                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                        isAvailable
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {isAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Vacation */}

                    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Vacation
                                    Mode
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    Hide yourself
                                    from new
                                    bookings while
                                    you are away.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={
                                    vacationMode
                                }
                                onChange={(
                                    e
                                ) =>
                                    setVacationMode(
                                        e
                                            .target
                                            .checked
                                    )
                                }
                                className="h-6 w-6"
                            />
                        </div>

                        {vacationMode && (
                            <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5">
                                <div className="flex items-center gap-3">
                                    <Plane className="text-orange-600" />

                                    <p className="font-medium text-orange-700">
                                        Vacation
                                        Mode is
                                        enabled.
                                        New
                                        travelers
                                        will not
                                        be able to
                                        book you.
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Working Days */}

                    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Working Days
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Select the days
                            when you usually
                            accept bookings.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {DAYS.map(
                                (day) => {
                                    const selected =
                                        workingDays.includes(
                                            day
                                        );

                                    return (
                                        <button
                                            key={
                                                day
                                            }
                                            type="button"
                                            onClick={() =>
                                                toggleDay(
                                                    day
                                                )
                                            }
                                            className={`flex items-center justify-between rounded-2xl border p-5 transition-all ${
                                                selected
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-slate-200 hover:border-blue-300"
                                            }`}
                                        >
                                            <span className="font-medium text-slate-800">
                                                {
                                                    day
                                                }
                                            </span>

                                            {selected && (
                                                <CheckCircle2 className="text-blue-600" />
                                            )}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </section>                    {/* Working Hours */}

                    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Working Hours
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Travelers can book you
                            only during these hours.
                        </p>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Start Time
                                </label>

                                <div className="relative">
                                    <Clock3
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    End Time
                                </label>

                                <div className="relative">
                                    <Clock3
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) =>
                                            setEndTime(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Summary */}

                <div className="space-y-8">
                    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Availability Summary
                        </h2>

                        <div className="mt-8 space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500">
                                    Status
                                </span>

                                <span
                                    className={`font-semibold ${
                                        isAvailable
                                            ? "text-emerald-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {isAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-slate-500">
                                    Vacation
                                </span>

                                <span
                                    className={`font-semibold ${
                                        vacationMode
                                            ? "text-orange-600"
                                            : "text-emerald-600"
                                    }`}
                                >
                                    {vacationMode
                                        ? "Enabled"
                                        : "Disabled"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-slate-500">
                                    Working Days
                                </span>

                                <span className="font-semibold text-slate-900">
                                    {totalWorkingDays} / 7
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-slate-500">
                                    Working Hours
                                </span>

                                <span className="font-semibold text-slate-900">
                                    {startTime} - {endTime}
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[32px] border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-8">
                        <h3 className="text-xl font-bold text-slate-900">
                            Tips
                        </h3>

                        <ul className="mt-6 space-y-4 text-slate-600">
                            <li>
                                • Keep your
                                availability
                                updated regularly.
                            </li>

                            <li>
                                • Turn Vacation
                                Mode on whenever
                                you are away.
                            </li>

                            <li>
                                • More available
                                days generally
                                increase booking
                                opportunities.
                            </li>

                            <li>
                                • Maintain
                                consistent working
                                hours for better
                                visibility.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>

            {/* Actions */}

            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={resetAvailability}
                        disabled={
                            isAvailabilityLoading
                        }
                        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>

                    <button
                        type="button"
                        onClick={saveAvailability}
                        disabled={
                            isUpdatingAvailability
                        }
                        className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save size={18} />

                        {isUpdatingAvailability
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default AvailabilityPage;