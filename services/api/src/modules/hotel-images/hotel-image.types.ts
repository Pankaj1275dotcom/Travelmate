export interface UploadHotelImageDto {

    hotelId: string;

    images: Express.Multer.File[];

}


export interface HotelImageResponse {

    id: string;

    hotelId: string;

    url: string;

    publicId: string;

    createdAt: Date;

}