import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { RoomCardProps } from "./RoomCard";

import roomService from "../../../services/room/room.service";

interface RoomDetailsModalProps {
    room: RoomCardProps | null;
    onClose: () => void;
}

function RoomDetailsModal({
    room,
    onClose,
}: RoomDetailsModalProps) {
    const queryClient = useQueryClient();

    const [loading, setLoading] =
        useState(false);

    if (!room) {
        return null;
    }


async function updateStatus(
    status: "AVAILABLE" | "MAINTENANCE"
) {
    if (!room) {
        return;
    }

    try {
        setLoading(true);

        await roomService.updateRoomStatus(
            room.roomId,
            status
        );

        await queryClient.invalidateQueries({
            queryKey: ["rooms"],
        });

        onClose();

    } catch (error) {
        console.error(
            "Failed to update room status:",
            error
        );

    } finally {
        setLoading(false);
    }
}


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold">
                        Room {room.roomNumber}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg bg-slate-100 px-4 py-2"
                    >
                        Close
                    </button>

                </div>


                <div className="mt-8 space-y-5">

                    <p>
                        <strong>Status:</strong>{" "}
                        {room.status}
                    </p>


                    {room.status === "AVAILABLE" && (
                        <p>
                            This room is available for booking.
                        </p>
                    )}


                    {room.status === "OCCUPIED" && (
                        <>
                            <p>
                                Guest Name: —
                            </p>

                            <p>
                                Booking ID: —
                            </p>

                            <p>
                                Check In: —
                            </p>

                            <p>
                                Check Out: —
                            </p>

                            <p>
                                Payment: —
                            </p>
                        </>
                    )}


                    {room.status === "MAINTENANCE" && (
                        <>
                            <p>
                                Reason: —
                            </p>

                            <p>
                                Expected Completion: —
                            </p>
                        </>
                    )}


                    <div className="border-t pt-5">

                        <h3 className="mb-3 font-semibold">
                            Change Status
                        </h3>


                        <div className="flex gap-3">

                            <button
                                disabled={loading}
                                onClick={() =>
                                    updateStatus(
                                        "AVAILABLE"
                                    )
                                }
                                className="rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                Available
                            </button>


                            <button
                                disabled={loading}
                                onClick={() =>
                                    updateStatus(
                                        "MAINTENANCE"
                                    )
                                }
                                className="rounded-xl bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                            >
                                Maintenance
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default RoomDetailsModal;