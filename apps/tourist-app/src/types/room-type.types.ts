export interface RoomType {
    id: string;

    hotelId: string;

    name: string;

    description: string | null;

    pricePerNight: number;

    capacity: number;

    totalRooms: number;

    startingRoomNumber: number;

    bedType: string;

    roomSize: string;

    images: string[];

    amenities: string[];

    createdAt: string;

    updatedAt: string;
}