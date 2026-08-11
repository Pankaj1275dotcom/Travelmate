import api from "../api/axios";


interface HotelImage {
    id: string;

    hotelId: string;

    url: string;

    publicId: string;

    createdAt: string;
}


interface HotelImagesResponse {
    success: boolean;

    images: HotelImage[];
}


interface UploadImagesResponse {
    success: boolean;

    message: string;

    images: HotelImage[];
}


interface DeleteImageResponse {
    success: boolean;

    message: string;
}



const BASE_URL = "/hotel-images";


class HotelImageService {


    async getImages(
        hotelId: string
    ): Promise<HotelImagesResponse> {

        const response =
            await api.get<HotelImagesResponse>(
                `${BASE_URL}/hotels/${hotelId}/images`
            );


        return response.data;

    }





    async uploadImages(
        hotelId: string,
        files: File[]
    ): Promise<UploadImagesResponse> {


        const formData =
            new FormData();



        files.forEach(
            (file) => {

                formData.append(
                    "images",
                    file
                );

            }
        );



        const response =
            await api.post<UploadImagesResponse>(
                `${BASE_URL}/hotels/${hotelId}/images`,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );


        return response.data;

    }





  async deleteImage(
    imageId: string
): Promise<DeleteImageResponse> {


    const response =
        await api.delete<DeleteImageResponse>(
            `${BASE_URL}/images/${imageId}`
        );


    return response.data;

}


}


export default new HotelImageService();