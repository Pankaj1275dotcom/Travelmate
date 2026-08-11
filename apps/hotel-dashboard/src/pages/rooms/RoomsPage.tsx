import { useEffect, useMemo, useState } from "react";

import RoomDetailsModal from "../../components/common/rooms/RoomDetailsModal";
import RoomGrid from "../../components/common/rooms/RoomGrid";
import RoomLegend from "../../components/common/rooms/RoomLegend";
import CreateRoomTypeModal from "../../components/common/rooms/CreateRoomTypeModal";
import EditRoomTypeModal from "../../components/common/rooms/EditRoomTypeModal";

import type { RoomCardProps } from "../../components/common/rooms/RoomCard";

import useHotel from "../../hooks/useHotel";
import useRoomTypes from "../../hooks/useRoomTypes";
import useRooms from "../../hooks/useRooms";

import useAuthStore from "../../store/auth.store";

import type { Room } from "../../types/room.types";
import type { RoomType } from "../../types/room-type.types";

function RoomsPage() {
    const {
        currentHotel,
        setCurrentHotel,
    } = useAuthStore();

    const {
        data: hotelResponse,
        isLoading: hotelLoading,
        isError: hotelError,
    } = useHotel();

    useEffect(() => {
        if (hotelResponse?.hotel) {
            setCurrentHotel(
                hotelResponse.hotel
            );
        }
    }, [
        hotelResponse,
        setCurrentHotel,
    ]);

    const {
        data: roomTypesResponse,
        isLoading: roomTypesLoading,
        isError: roomTypesError,
    } = useRoomTypes(
        currentHotel?.id
    );

    const roomTypes =
        roomTypesResponse?.roomTypes ?? [];


    const [
        selectedRoomType,
        setSelectedRoomType,
    ] = useState<RoomType | null>(null);


    const [
        editRoomType,
        setEditRoomType,
    ] = useState<RoomType | null>(null);


    useEffect(() => {
        if (
            roomTypes.length > 0 &&
            !selectedRoomType
        ) {
            setSelectedRoomType(
                roomTypes[0]
            );
        }
    }, [
        roomTypes,
        selectedRoomType,
    ]);


    const {
        data: roomsResponse,
        isLoading: roomsLoading,
        isError: roomsError,
    } = useRooms(
        selectedRoomType?.id
    );


    const [
        selectedRoom,
        setSelectedRoom,
    ] = useState<RoomCardProps | null>(
        null
    );


    const [
        createRoomTypeOpen,
        setCreateRoomTypeOpen,
    ] = useState(false);


    const rooms = useMemo<
        RoomCardProps[]
    >(() => {
        if (!roomsResponse?.rooms) {
            return [];
        }

        return roomsResponse.rooms.map(
            (room: Room) => ({
                roomId: room.id,
                roomNumber:
                    room.roomNumber,
                status:
                    room.status,
            })
        );

    }, [roomsResponse]);


    if (
        hotelLoading ||
        roomTypesLoading
    ) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
                Loading rooms...
            </div>
        );
    }


    if (
        hotelError ||
        roomTypesError
    ) {
        return (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-600">
                Failed to load room information.
            </div>
        );
    }


    if (!currentHotel) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
                No hotel found.
            </div>
        );
    }


    return (
        <>
            <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Room Management
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Manage all physical rooms in your hotel.
                        </p>
                    </div>

                    <RoomLegend />

                </div>


                <div>

                    <div className="mb-4 flex items-center justify-between">

                        <h2 className="text-xl font-semibold">
                            Room Types
                        </h2>


                        <button
                            type="button"
                            onClick={() =>
                                setCreateRoomTypeOpen(
                                    true
                                )
                            }
                            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            + Add Room Type
                        </button>

                    </div>


                    {roomTypes.length === 0 ? (

                        <div className="rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
                            No room types available.
                            Create your first room type.
                        </div>

                    ) : (

                        <div className="grid gap-4 md:grid-cols-3">

                            {roomTypes.map(
                                (
                                    roomType: RoomType
                                ) => {

                                    const active =
                                        selectedRoomType?.id ===
                                        roomType.id;


                                    return (

                                        <div
                                            key={
                                                roomType.id
                                            }
                                            className={`rounded-2xl border p-5 transition-all ${
                                                active
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-slate-200 hover:border-blue-400"
                                            }`}
                                        >

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedRoomType(
                                                        roomType
                                                    )
                                                }
                                                className="w-full text-left"
                                            >

                                                <h3 className="text-lg font-bold">
                                                    {
                                                        roomType.name
                                                    }
                                                </h3>


                                                <p className="mt-2 text-sm text-slate-500">
                                                    {
                                                        roomType.totalRooms
                                                    }{" "}
                                                    Rooms
                                                </p>


                                                <p className="mt-3 text-sm text-slate-500">
                                                    ₹
                                                    {
                                                        roomType.pricePerNight
                                                    }{" "}
                                                    / night
                                                </p>

                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setEditRoomType(
                                                        roomType
                                                    )
                                                }
                                                className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                                            >
                                                Edit
                                            </button>

                                        </div>

                                    );
                                }
                            )}

                        </div>

                    )}

                </div>


                {selectedRoomType && (

                    <div>

                        <div className="mb-5">

                            <h2 className="text-2xl font-bold">
                                {
                                    selectedRoomType.name
                                }
                            </h2>

                            <p className="text-slate-500">
                                Select a room to view booking details.
                            </p>

                        </div>


                        {roomsLoading ? (

                            <div className="rounded-2xl border border-slate-200 py-12 text-center">
                                Loading rooms...
                            </div>

                        ) : roomsError ? (

                            <div className="rounded-2xl border border-red-200 bg-red-50 py-12 text-center text-red-600">
                                Failed to load rooms.
                            </div>

                        ) : rooms.length === 0 ? (

                            <div className="rounded-2xl border border-slate-200 py-12 text-center text-slate-500">
                                No rooms found.
                            </div>

                        ) : (

                            <RoomGrid
                                rooms={rooms}
                                onRoomClick={(
                                    room
                                ) =>
                                    setSelectedRoom(
                                        room
                                    )
                                }
                            />

                        )}

                    </div>

                )}

            </div>


            <RoomDetailsModal
                room={selectedRoom}
                onClose={() =>
                    setSelectedRoom(null)
                }
            />


            <CreateRoomTypeModal
                open={
                    createRoomTypeOpen
                }
                onClose={() =>
                    setCreateRoomTypeOpen(
                        false
                    )
                }
            />


            <EditRoomTypeModal
                roomType={
                    editRoomType
                }
                onClose={() =>
                    setEditRoomType(null)
                }
            />

        </>
    );
}

export default RoomsPage;