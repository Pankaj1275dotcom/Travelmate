import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type {
    CreateRoomTypeDto,
    
} from "../../../types/room-type.types";

type RoomTypeFormValues = Omit<
    CreateRoomTypeDto,
    "hotelId"
>;

interface RoomTypeFormProps {
    defaultValues?: Partial<RoomTypeFormValues>;

    loading?: boolean;

    submitText: string;

    onSubmit: (
        data: RoomTypeFormValues
    ) => void;
}

function RoomTypeForm({
    defaultValues,
    loading = false,
    submitText,
    onSubmit,
}: RoomTypeFormProps) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<RoomTypeFormValues>({
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block font-medium">
                        Room Type Name
                    </label>

                    <input
                        {...register("name")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Price Per Night
                    </label>

                    <input
                        type="number"
                        {...register(
                            "pricePerNight",
                            {
                                valueAsNumber: true,
                            }
                        )}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Capacity
                    </label>

                    <input
                        type="number"
                        {...register(
                            "capacity",
                            {
                                valueAsNumber: true,
                            }
                        )}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Total Rooms
                    </label>

                    <input
                        type="number"
                        {...register(
                            "totalRooms",
                            {
                                valueAsNumber: true,
                            }
                        )}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Starting Room Number
                    </label>

                    <input
                        type="number"
                        {...register(
                            "startingRoomNumber",
                            {
                                valueAsNumber: true,
                            }
                        )}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Bed Type
                    </label>

                    <input
                        {...register("bedType")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Room Size
                    </label>

                    <input
                        {...register("roomSize")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    />
                </div>
            </div>

            <div>
                <label className="mb-2 block font-medium">
                    Description
                </label>

                <textarea
                    rows={4}
                    {...register("description")}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Please wait..."
                        : submitText}
                </button>
            </div>
        </form>
    );
}

export default RoomTypeForm;