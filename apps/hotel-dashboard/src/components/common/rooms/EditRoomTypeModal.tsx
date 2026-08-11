import { useState } from "react";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import RoomTypeForm from "./RoomTypeForm";

import roomTypeService from "../../../services/room-type/roomType.service";

import type {
    RoomType,
    UpdateRoomTypeDto,
} from "../../../types/room-type.types";

interface EditRoomTypeModalProps {
    roomType: RoomType | null;

    onClose: () => void;
}

function EditRoomTypeModal({
    roomType,
    onClose,
}: EditRoomTypeModalProps) {
    const queryClient = useQueryClient();

    const [loading, setLoading] =
        useState(false);

    if (!roomType) {
        return null;
    }


async function handleUpdate(
    data: UpdateRoomTypeDto
) {
    if (!roomType) {
        return;
    }

    try {
        setLoading(true);

        await roomTypeService.updateRoomType(
            roomType.id,
            data
        );

        await queryClient.invalidateQueries({
            queryKey: [
                "room-types",
            ],
        });

        onClose();

    } catch (error) {
        console.error(
            "Failed to update room type:",
            error
        );

    } finally {
        setLoading(false);
    }
}


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-4xl rounded-3xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b p-6">

                    <div>
                        <h2 className="text-2xl font-bold">
                            Edit Room Type
                        </h2>

                        <p className="mt-1 text-slate-500">
                            Update room type details.
                        </p>
                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl p-2 hover:bg-slate-100"
                    >
                        <X size={22} />
                    </button>

                </div>


                <div className="p-6">

                    <RoomTypeForm
    defaultValues={{
        name: roomType.name,

        description:
            roomType.description ?? "",

        pricePerNight:
            roomType.pricePerNight,

        capacity:
            roomType.capacity,

        totalRooms:
            roomType.totalRooms,

        startingRoomNumber:
            roomType.startingRoomNumber,

        bedType:
            roomType.bedType ?? "",

        roomSize:
            roomType.roomSize ?? "",
    }}
    loading={loading}
    submitText="Update Room Type"
    onSubmit={handleUpdate}
/>

                </div>

            </div>

        </div>
    );
}

export default EditRoomTypeModal;