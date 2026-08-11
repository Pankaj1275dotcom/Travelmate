import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import {
    Upload,
    Trash2,
    Image as ImageIcon,
} from "lucide-react";


import useHotel from "../../hooks/useHotel";

import hotelImageService from "../../services/hotel-image/hotel-image.service";



interface HotelImage {

    id: string;

    hotelId: string;

    url: string;

    publicId: string;

    createdAt: string;

}



function GalleryPage() {


    const {
        data,
        isLoading,
    } = useHotel();



    const hotel =
        data?.hotel;



    const [images, setImages] =
        useState<HotelImage[]>([]);



    const [selectedFiles, setSelectedFiles] =
        useState<File[]>([]);



    const [previewImages, setPreviewImages] =
        useState<string[]>([]);



    const [loading, setLoading] =
        useState(false);



    async function fetchImages() {

        if (!hotel) {
            return;
        }


        try {

            const response =
                await hotelImageService.getImages(
                    hotel.id
                );


            setImages(
                response.images
            );


        } catch(error) {

            console.error(error);


            toast.error(
                "Failed to load gallery"
            );

        }

    }



    useEffect(() => {

        fetchImages();

    }, [hotel]);



    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {


        const files =
            Array.from(
                event.target.files ?? []
            );


        setSelectedFiles(
            files
        );


        const previews =
            files.map(
                (file) =>
                    URL.createObjectURL(
                        file
                    )
            );


        setPreviewImages(
            previews
        );

    }    async function handleUpload() {


        if (!hotel) {
            return;
        }


        if (
            selectedFiles.length === 0
        ) {

            toast.error(
                "Please select images first"
            );

            return;

        }



        try {

            setLoading(true);



            await hotelImageService.uploadImages(

                hotel.id,

                selectedFiles

            );



            toast.success(
                "Images uploaded successfully"
            );



            setSelectedFiles([]);

            setPreviewImages([]);



            await fetchImages();



        } catch(error) {


            console.error(error);



            toast.error(
                "Failed to upload images"
            );


        } finally {


            setLoading(false);


        }


    }





    async function handleDelete(
        imageId: string
    ) {


        try {


            setLoading(true);



            await hotelImageService.deleteImage(
                imageId
            );



            toast.success(
                "Image deleted successfully"
            );



            await fetchImages();



        } catch(error) {


            console.error(error);



            toast.error(
                "Failed to delete image"
            );


        } finally {


            setLoading(false);


        }


    }





    if (isLoading) {

        return (

            <div className="rounded-3xl border bg-white p-10 text-center">

                Loading gallery...

            </div>

        );

    }



    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">


            <div className="flex items-center justify-between">


                <div>

                    <h1 className="text-3xl font-bold">

                        Hotel Gallery

                    </h1>


                    <p className="mt-3 text-slate-500">

                        Upload and manage your hotel images.

                    </p>

                </div>


            </div>



            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 p-8">


                <div className="flex flex-col gap-5">


                    <label className="inline-flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 transition hover:bg-blue-50">

    <Upload size={20} />

    Select Images


    <input
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
    />

</label>


                    {
                        previewImages.length > 0 && (

                            <div className="grid gap-5 md:grid-cols-3">

                                {
                                    previewImages.map(
                                        (image) => (

                                            <img

                                                key={image}

                                                src={image}

                                                className="h-48 w-full rounded-2xl object-cover"

                                            />

                                        )
                                    )

                                }

                            </div>

                        )
                    }



                    {
                        selectedFiles.length > 0 && (

                            <button

                                onClick={handleUpload}

                                disabled={loading}

                                className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"

                            >

                                {
                                    loading
                                    ? "Uploading..."
                                    : "Upload Images"
                                }

                            </button>

                        )
                    }


                </div>


            </div>





            <div className="mt-12">


                <h2 className="text-2xl font-bold">

                    Uploaded Images

                </h2>



                {
                    images.length === 0 ? (

                        <div className="mt-6 rounded-2xl border p-8 text-center text-slate-500">


                            <ImageIcon
                                className="mx-auto mb-3"
                                size={40}
                            />


                            No images uploaded yet.


                        </div>

                    ) : (


                        <div className="mt-8 grid gap-6 md:grid-cols-3">


                            {
                                images.map(
                                    (image) => (

                                        <div

                                            key={
                                                image.id
                                            }

                                            className="overflow-hidden rounded-3xl border bg-white shadow-sm"

                                        >


                                            <img

                                                src={
                                                    image.url
                                                }

                                                alt="Hotel"

                                                className="h-56 w-full object-cover"

                                            />



                                            <button

                                                onClick={() =>
                                                    handleDelete(
                                                        image.id
                                                    )
                                                }

                                                disabled={loading}

                                                className="flex w-full items-center justify-center gap-2 bg-red-50 px-4 py-3 font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"

                                            >

                                                <Trash2 size={18} />

                                                Delete

                                            </button>


                                        </div>

                                    )

                                )

                            }


                        </div>

                    )

                }


            </div>


        </div>

    );

}


export default GalleryPage;
                    