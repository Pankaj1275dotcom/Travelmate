export interface CreateRoomTypeDto {
  hotelId: string;
  name: string;
  description?: string;

  pricePerNight: number;

  capacity: number;

  totalRooms: number;

  startingRoomNumber: number;

  bedType?: string;

  roomSize?: string;

  images?: string[];

  amenities?: string[];
}

export interface UpdateRoomTypeDto {
    name?: string;

    description?: string;

    pricePerNight?: number;

    capacity?: number;

    totalRooms?: number;

    startingRoomNumber?: number;

    bedType?: string;

    roomSize?: string;

    images?: string[];

    amenities?: string[];
}

export interface RoomTypeFilters {
  hotelId?: string;
}