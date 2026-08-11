import cloudinary from "../../config/cloudinary.js";

import hotelImageRepository from "./hotel-image.repository.js";


class HotelImageService {


    async uploadImages(
        userId: string,
        hotelId: string,
        files: Express.Multer.File[]
    ) {


        const hotel =
            await hotelImageRepository.findHotelOwner(
                hotelId
            );


        if (!hotel) {

            throw new Error(
                "Hotel not found"
            );

        }



        if (
            hotel.ownerId !== userId
        ) {

            throw new Error(
                "You are not allowed to upload images for this hotel"
            );

        }



        if (
            !files ||
            files.length === 0
        ) {

            throw new Error(
                "No images uploaded"
            );

        }



        const uploadedImages = [];



        for (const file of files) {


            const result =
                await new Promise<any>(
                    (
                        resolve,
                        reject
                    ) => {


                        const uploadStream =
                            cloudinary.uploader.upload_stream(

                                {
                                    folder:
                                        "travelmate/hotels",
                                },

                                (
                                    error,
                                    result
                                ) => {


                                    if (error) {

                                        reject(error);

                                    } else {

                                        resolve(result);

                                    }

                                }

                            );



                        uploadStream.end(
                            file.buffer
                        );


                    }
                );



            uploadedImages.push({

                hotelId,

                url:
                    result.secure_url,

                publicId:
                    result.public_id,

            });


        }



        await hotelImageRepository.createImages(
            uploadedImages
        );



        return {

            message:
                "Images uploaded successfully",

            images:
                uploadedImages,

        };

    }





    async getHotelImages(
        hotelId: string
    ) {

        return hotelImageRepository.getImagesByHotel(
            hotelId
        );

    }






    async deleteImage(
        userId: string,
        imageId: string
    ) {


        const image =
            await hotelImageRepository.findImageById(
                imageId
            );


        if (!image) {

            throw new Error(
                "Image not found"
            );

        }



        const hotel =
            await hotelImageRepository.findHotelOwner(
                image.hotelId
            );



        if (
            !hotel ||
            hotel.ownerId !== userId
        ) {

            throw new Error(
                "You are not allowed to delete this image"
            );

        }




        await cloudinary.uploader.destroy(
            image.publicId
        );



        await hotelImageRepository.deleteImage(
            imageId
        );



        return {

            message:
                "Image deleted successfully",

        };

    }


}


export default new HotelImageService();