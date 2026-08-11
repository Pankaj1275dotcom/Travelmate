import {
    Car,
    Utensils,
    Waves,
    Dumbbell,
    Shirt,
    ConciergeBell,
    Building2,
    Zap,
} from "lucide-react";
import toast from "react-hot-toast";
import {
    useEffect,
    useState,
} from "react";

import useHotel from "../../hooks/useHotel";

import hotelService from "../../services/hotel/hotel.service";



interface AmenityItem {
    key:
        | "hasParking"
        | "hasRestaurant"
        | "hasSwimmingPool"
        | "hasGym"
        | "hasLaundry"
        | "hasRoomService"
        | "hasLift"
        | "hasPowerBackup";

    label: string;

    icon: React.ReactNode;
}



const amenities: AmenityItem[] = [

    {
        key: "hasParking",
        label: "Parking",
        icon: <Car />,
    },

    {
        key: "hasRestaurant",
        label: "Restaurant",
        icon: <Utensils />,
    },

    {
        key: "hasSwimmingPool",
        label: "Swimming Pool",
        icon: <Waves />,
    },

    {
        key: "hasGym",
        label: "Gym",
        icon: <Dumbbell />,
    },

    {
        key: "hasLaundry",
        label: "Laundry",
        icon: <Shirt />,
    },

    {
        key: "hasRoomService",
        label: "Room Service",
        icon: <ConciergeBell />,
    },

    {
        key: "hasLift",
        label: "Lift",
        icon: <Building2 />,
    },

    {
        key: "hasPowerBackup",
        label: "Power Backup",
        icon: <Zap />,
    },

];



function AmenitiesPage() {


    const {
        data,
        isLoading,
    } = useHotel();



    const hotel =
        data?.hotel;



    const [values, setValues] =
        useState<any>({});



    const [saving, setSaving] =
        useState(false);



    useEffect(() => {

        if (hotel) {

            setValues({

                hasParking:
                    hotel.hasParking,

                hasRestaurant:
                    hotel.hasRestaurant,

                hasSwimmingPool:
                    hotel.hasSwimmingPool,

                hasGym:
                    hotel.hasGym,

                hasLaundry:
                    hotel.hasLaundry,

                hasRoomService:
                    hotel.hasRoomService,

                hasLift:
                    hotel.hasLift,

                hasPowerBackup:
                    hotel.hasPowerBackup,

            });

        }

    }, [hotel]);



    function toggleAmenity(
        key: string
    ) {

        setValues(
            (prev:any) => ({
                ...prev,
                [key]:
                    !prev[key],
            })
        );

    }



    async function handleSave() {

    if (!hotel) {
        return;
    }


    try {

        setSaving(true);


        await hotelService.updateHotel(
            hotel.id,
            values
        );


        toast.success(
            "Amenities updated successfully"
        );


    } catch(error) {

        console.error(error);

        toast.error(
            "Failed to update amenities"
        );

    }
    finally {

        setSaving(false);

    }

}



    if(isLoading) {

        return (

            <div className="rounded-3xl border bg-white p-10 text-center">

                Loading amenities...

            </div>

        );

    }



    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">


            <h1 className="text-3xl font-bold">

                Hotel Amenities

            </h1>


            <p className="mt-3 text-slate-500">

                Manage facilities available in your hotel.

            </p>



            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">


                {
                    amenities.map(
                        (item) => (

                            <button

                                key={item.key}

                                onClick={() =>
                                    toggleAmenity(
                                        item.key
                                    )
                                }

                                className={`
                                    rounded-3xl border p-6 text-left transition
                                    ${
                                        values[item.key]
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-slate-200 bg-white"
                                    }
                                `}

                            >

                                <div className="flex items-center justify-between">


                                    <div className="text-blue-600">

                                        {item.icon}

                                    </div>



                                    <div
                                        className={`
                                            h-5 w-5 rounded-full border
                                            ${
                                                values[item.key]
                                                ? "bg-blue-600"
                                                : ""
                                            }
                                        `}
                                    />

                                </div>



                                <h3 className="mt-5 text-lg font-bold">

                                    {item.label}

                                </h3>


                            </button>

                        )
                    )
                }


            </div>




            <div className="mt-10 flex justify-end">


                <button

                    onClick={handleSave}

                    disabled={saving}

                    className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"

                >

                    {
                        saving
                        ? "Saving..."
                        : "Save Amenities"
                    }


                </button>


            </div>



        </div>

    );

}


export default AmenitiesPage;