import { useState } from "react";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import RoomTypeForm from "./RoomTypeForm";

import roomTypeService from "../../../services/room-type/roomType.service";

import useAuthStore from "../../../store/auth.store";

import type { CreateRoomTypeDto } from "../../../types/room-type.types";

interface CreateRoomTypeModalProps {
    open: boolean;

    onClose: () => void;
}

function CreateRoomTypeModal({
    open,
    onClose,
}: CreateRoomTypeModalProps) {
    const queryClient = useQueryClient();

    const { currentHotel } = useAuthStore();

    const [loading, setLoading] =
        useState(false);

    if (!open) {
        return null;
    }

    async function handleCreate(
        data: Omit<CreateRoomTypeDto, "hotelId">
    ) {
        if (!currentHotel) {
            return;
        }

        try {
            setLoading(true);

            await roomTypeService.createRoomType({
                ...data,
                hotelId: currentHotel.id,
            });

            await queryClient.invalidateQueries({
                queryKey: ["room-types"],
            });

            onClose();

        } catch (error) {
            console.error(
                "Failed to create room type:",
                error
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b p-6">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Create Room Type
                        </h2>

                        <p className="mt-1 text-slate-500">
                            Create a room type and automatically generate rooms.
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
                        loading={loading}
                        submitText="Create Room Type"
                        onSubmit={handleCreate}
                    />
                </div>

            </div>
        </div>
    );
}

export default CreateRoomTypeModal;