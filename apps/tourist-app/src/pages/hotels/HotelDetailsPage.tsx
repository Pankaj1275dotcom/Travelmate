import {
    useParams,
    Link,
} from "react-router-dom";


import {
    useQuery,
} from "@tanstack/react-query";


import {
    motion,
} from "framer-motion";


import {
    useState,
} from "react";


import {
    X,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Star,
    Wifi,
    Snowflake,
    Users,
    BedDouble,
    ArrowLeft,
} from "lucide-react";


import Layout from "../../components/layout/Layout";


import hotelService from "../../services/hotel/hotel.service";




function HotelDetailsPage() {


    const [
        selectedImage,
        setSelectedImage,
    ] = useState<number | null>(null);



    const {
        hotelId,
    } = useParams();




    const {
        data: hotelResponse,
        isLoading,
        isError,

    } = useQuery({


        queryKey: [
            "hotel",
            hotelId,
        ],



        queryFn: () =>
            hotelService.getHotelById(
                hotelId!
            ),



        enabled:
            !!hotelId,

    });





    const hotel =
        hotelResponse?.hotel;




    if (isLoading) {


        return (

            <Layout>

                <div className="flex h-[70vh] items-center justify-center">

                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

                </div>

            </Layout>

        );

    }





    if (
        isError ||
        !hotel
    ) {


        return (

            <Layout>


                <div className="flex h-[70vh] flex-col items-center justify-center">


                    <h1 className="text-4xl font-bold">

                        Hotel Not Found

                    </h1>



                    <Link

                        to="/hotels"

                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white"

                    >

                        Back To Hotels


                    </Link>


                </div>


            </Layout>

        );


    }




    const roomTypes =
        hotel.roomTypes ?? [];





    return (


        <Layout>


            <section className="relative h-[520px] overflow-hidden">


                <img


                    src={

                        hotel.images &&
                        hotel.images.length > 0

                            ? hotel.images[0].url

                            : hotel.coverImage ||

                              "https://images.unsplash.com/photo-1566073771259-6a8506099945"

                    }


                    alt={hotel.name}


                    className="h-full w-full object-cover"

                />



                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />




                <motion.div


                    initial={{
                        opacity:0,
                        y:40,
                    }}


                    animate={{
                        opacity:1,
                        y:0,
                    }}


                    className="absolute bottom-12 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6"


                >



                    <Link


                        to="/hotels"


                        className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-white backdrop-blur-md"


                    >


                        <ArrowLeft size={18}/>


                        Back To Hotels


                    </Link>




                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">


                        <div>


                            <h1 className="text-5xl font-black text-white">

                                {hotel.name}

                            </h1>




                            <div className="mt-5 flex flex-wrap items-center gap-5 text-white">


                                <div className="flex items-center gap-2">


                                    <MapPin size={20}/>


                                    {hotel.city},{" "}

                                    {hotel.state},{" "}

                                    {hotel.country}


                                </div>





                                <div className="flex items-center gap-2">


                                    <Star
                                        size={20}
                                        fill="currentColor"
                                    />


                                    {hotel.rating.toFixed(1)}


                                </div>



                            </div>


                        </div>





                        <div className="rounded-3xl bg-white p-8 shadow-xl">


                            <p className="text-sm text-slate-500">

                                Starting From

                            </p>



                            <h2 className="mt-2 text-4xl font-black text-blue-600">


                                ₹
                                {
                                    roomTypes.length > 0

                                        ? roomTypes[0].pricePerNight

                                        : hotel.pricePerNight
                                }


                            </h2>



                            <p className="text-slate-500">

                                Per Night

                            </p>



                        </div>



                    </div>


                </motion.div>


            </section>            <section className="mx-auto max-w-7xl px-6 py-20">


                <div className="max-w-4xl">


                    <h2 className="text-4xl font-black">

                        About Hotel

                    </h2>



                    <p className="mt-6 text-lg leading-9 text-slate-600">

                        {hotel.description}

                    </p>



                </div>





                {/* HOTEL GALLERY */}


                <div className="mt-16">


                    <h2 className="text-4xl font-black">

                        Hotel Gallery

                    </h2>




                    {

                        hotel.images &&
                        hotel.images.length > 0 ? (


                            <div className="mt-8 grid gap-6 md:grid-cols-3">


                                {

                                    hotel.images.map(
                                        (
                                            image,
                                            index
                                        ) => (


                                            <motion.div


                                                key={
                                                    image.id
                                                }


                                                initial={{
                                                    opacity:0,
                                                    y:20,
                                                }}


                                                whileInView={{
                                                    opacity:1,
                                                    y:0,
                                                }}


                                                viewport={{
                                                    once:true,
                                                }}


                                                onClick={() =>
                                                    setSelectedImage(
                                                        index
                                                    )
                                                }


                                                className="cursor-pointer overflow-hidden rounded-3xl"


                                            >



                                                <img


                                                    src={
                                                        image.url
                                                    }


                                                    alt={
                                                        hotel.name
                                                    }


                                                    className="h-64 w-full object-cover transition duration-300 hover:scale-110"


                                                />



                                            </motion.div>



                                        )

                                    )

                                }



                            </div>



                        ) : (



                            <div className="mt-8 rounded-3xl border bg-slate-50 p-8 text-center text-slate-500">


                                No gallery images available.


                            </div>


                        )


                    }



                </div>






                {/* AMENITIES */}



                <div className="mt-20">



                    <h2 className="text-4xl font-black">

                        Amenities

                    </h2>




                    <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">



                        <div className="rounded-2xl border p-6 text-center">


                            <Wifi

                                size={32}

                                className="mx-auto mb-3 text-blue-600"

                            />


                            Free WiFi


                        </div>




                        <div className="rounded-2xl border p-6 text-center">


                            <Snowflake

                                size={32}

                                className="mx-auto mb-3 text-blue-600"

                            />


                            Air Conditioning


                        </div>




                        <div className="rounded-2xl border p-6 text-center">


                            <Users

                                size={32}

                                className="mx-auto mb-3 text-blue-600"

                            />


                            Family Friendly


                        </div>




                        <div className="rounded-2xl border p-6 text-center">


                            <BedDouble

                                size={32}

                                className="mx-auto mb-3 text-blue-600"

                            />


                            Premium Rooms


                        </div>



                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">


    {
        [
            {
                key: "hasParking",
                label: "Parking",
                icon: "🚗",
            },

            {
                key: "hasRestaurant",
                label: "Restaurant",
                icon: "🍽️",
            },

            {
                key: "hasSwimmingPool",
                label: "Swimming Pool",
                icon: "🏊",
            },

            {
                key: "hasGym",
                label: "Gym",
                icon: "💪",
            },

            {
                key: "hasLaundry",
                label: "Laundry",
                icon: "🧺",
            },

            {
                key: "hasRoomService",
                label: "Room Service",
                icon: "🛎️",
            },

            {
                key: "hasLift",
                label: "Lift",
                icon: "🛗",
            },

            {
                key: "hasPowerBackup",
                label: "Power Backup",
                icon: "⚡",
            },

        ]
        .filter(
            (amenity) =>
                hotel[
                    amenity.key as keyof typeof hotel
                ]
        )
        .map(
            (amenity) => (

                <div

                    key={
                        amenity.key
                    }

                    className="rounded-2xl border p-6 text-center"

                >

                    <div className="text-3xl">

                        {amenity.icon}

                    </div>


                    <p className="mt-3 font-semibold">

                        {amenity.label}

                    </p>


                </div>

            )

        )

    }


</div>




                </div>                {/* ROOMS + QUICK INFORMATION */}

                <div className="mt-20 grid gap-10 lg:grid-cols-3">



                    {/* AVAILABLE ROOMS */}


                    <div className="lg:col-span-2">


                        <h2 className="mb-10 text-4xl font-black">

                            Available Rooms

                        </h2>




                        <div className="space-y-8">


                            {
                                roomTypes.map(
                                    (room) => (


                                        <motion.div


                                            key={
                                                room.id
                                            }


                                            initial={{
                                                opacity:0,
                                                y:20,
                                            }}


                                            whileInView={{
                                                opacity:1,
                                                y:0,
                                            }}


                                            viewport={{
                                                once:true,
                                            }}



                                            className="
                                                flex
                                                flex-col
                                                gap-8
                                                rounded-3xl
                                                border
                                                bg-white
                                                p-6
                                                shadow-sm
                                                md:flex-row
                                                md:items-center
                                            "


                                        >



                                            {/* ROOM IMAGE */}


                                            <div className="
                                                h-72
                                                w-full
                                                overflow-hidden
                                                rounded-2xl
                                                md:w-80
                                            ">


                                                <img


                                                    src={

                                                        hotel.coverImage ||

                                                        "https://images.unsplash.com/photo-1611892440504-42a792e24d32"

                                                    }


                                                    alt={
                                                        room.name
                                                    }


                                                    className="
                                                        h-full
                                                        w-full
                                                        object-cover
                                                    "


                                                />


                                            </div>







                                            {/* ROOM DETAILS */}



                                            <div className="flex-1">


                                                <h3 className="
                                                    text-3xl
                                                    font-black
                                                ">


                                                    {room.name}


                                                </h3>




                                                <p className="
                                                    mt-4
                                                    leading-7
                                                    text-slate-600
                                                ">


                                                    {

                                                        room.description ??

                                                        "Comfortable and well furnished room with modern facilities for a relaxing stay."

                                                    }


                                                </p>





                                                <div className="
                                                    mt-8
                                                    flex
                                                    gap-10
                                                ">



                                                    <div>


                                                        <p className="text-sm text-slate-500">

                                                            Guests

                                                        </p>



                                                        <p className="mt-2 font-semibold">

                                                            👥 {room.capacity} Guests

                                                        </p>


                                                    </div>





                                                    <div>


                                                        <p className="text-sm text-slate-500">

                                                            Availability

                                                        </p>



                                                        <p className="mt-2 font-semibold">

                                                            🛏️ {room.availableRooms}/{room.totalRooms} Available

                                                        </p>


                                                    </div>




                                                </div>



                                            </div>







                                            {/* PRICE SECTION */}



                                            <div className="
                                                border-l
                                                pl-8
                                                text-center
                                            ">



                                                <h2 className="
                                                    text-5xl
                                                    font-black
                                                    text-blue-600
                                                ">


                                                    ₹{room.pricePerNight}


                                                </h2>




                                                <p className="text-slate-500">

                                                    Per Night

                                                </p>




                                                <Link
    to={`/bookings?roomType=${room.id}`}
    className="
        mt-10
        inline-block
        rounded-xl
        bg-blue-600
        px-10
        py-4
        font-semibold
        text-white
        hover:bg-blue-700
    "
>
    Book Now
</Link>



                                            </div>




                                        </motion.div>



                                    )

                                )

                            }


                        </div>



                    </div>                    {/* QUICK INFORMATION */}


                    <div>


                        <div className="
                            sticky
                            top-28
                            rounded-3xl
                            border
                            bg-white
                            p-8
                            shadow-sm
                        ">



                            <h2 className="
                                text-3xl
                                font-black
                            ">

                                Quick Information

                            </h2>




                            <div className="
                                mt-8
                                space-y-6
                            ">



                                <div className="flex justify-between border-b pb-4">


                                    <span className="text-slate-500">

                                        City

                                    </span>


                                    <span className="font-bold">

                                        {hotel.city}

                                    </span>


                                </div>





                                <div className="flex justify-between border-b pb-4">


                                    <span className="text-slate-500">

                                        State

                                    </span>


                                    <span className="font-bold">

                                        {hotel.state}

                                    </span>


                                </div>





                                <div className="flex justify-between border-b pb-4">


                                    <span className="text-slate-500">

                                        Country

                                    </span>


                                    <span className="font-bold">

                                        {hotel.country}

                                    </span>


                                </div>





                                <div className="border-b pb-4">


                                    <span className="text-slate-500">

                                        Address

                                    </span>


                                    <p className="mt-2 font-bold leading-7">

                                        {hotel.address}

                                    </p>


                                </div>





                                <div className="flex justify-between border-b pb-4">


                                    <span className="text-slate-500">

                                        Rating

                                    </span>


                                    <span className="font-bold">

                                        ⭐ {hotel.rating.toFixed(1)}

                                    </span>


                                </div>





                                <div className="flex justify-between">


                                    <span className="text-slate-500">

                                        Starting Price

                                    </span>


                                    <span className="font-bold text-blue-600">


                                        ₹
                                        {
                                            roomTypes.length > 0
                                                ? roomTypes[0].pricePerNight
                                                : hotel.pricePerNight
                                        }


                                    </span>


                                </div>



                            </div>





                            <button

                                className="
                                    mt-10
                                    w-full
                                    rounded-xl
                                    bg-blue-600
                                    py-4
                                    font-semibold
                                    text-white
                                    hover:bg-blue-700
                                "

                            >

                                Reserve Hotel


                            </button>



                        </div>


                    </div>



                </div>


            </section>





            {/* IMAGE FULL SCREEN MODAL */}



            {
                selectedImage !== null &&
                hotel.images && (


                    <div className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/90
                        p-6
                    ">



                        <button


                            onClick={() =>
                                setSelectedImage(null)
                            }


                            className="
                                absolute
                                right-8
                                top-8
                                rounded-full
                                bg-white/20
                                p-3
                                text-white
                            "


                        >


                            <X size={28}/>


                        </button>





                        <button


                            onClick={() =>

                                setSelectedImage(
                                    selectedImage === 0
                                        ? hotel.images.length - 1
                                        : selectedImage - 1
                                )

                            }


                            className="
                                absolute
                                left-8
                                rounded-full
                                bg-white/20
                                p-4
                                text-white
                            "


                        >


                            <ChevronLeft size={35}/>


                        </button>





                        <img


                            src={
                                hotel.images[selectedImage].url
                            }


                            alt={hotel.name}


                            className="
                                max-h-[85vh]
                                max-w-[90vw]
                                rounded-3xl
                                object-contain
                            "


                        />





                        <button


                            onClick={() =>

                                setSelectedImage(

                                    selectedImage === hotel.images.length - 1

                                        ? 0

                                        : selectedImage + 1

                                )

                            }


                            className="
                                absolute
                                right-8
                                rounded-full
                                bg-white/20
                                p-4
                                text-white
                            "


                        >


                            <ChevronRight size={35}/>


                        </button>




                    </div>


                )

            }



        </Layout>


    );


}



export default HotelDetailsPage;