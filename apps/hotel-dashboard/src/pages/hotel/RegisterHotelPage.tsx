import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import hotelService from "../../services/hotel/hotel.service";
import LocationPicker from "../../components/maps/LocationPicker";
const hotelSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Hotel name is required"),

    hotelType: z
        .string()
        .trim()
        .min(1, "Hotel type is required"),

    description: z
        .string()
        .trim()
        .min(10, "Description is required"),

    email: z
        .string()
        .trim()
        .email("Invalid email"),

    phone: z
        .string()
        .regex(
            /^[6-9]\d{9}$/,
            "Invalid mobile number"
        ),

    address: z
        .string()
        .trim()
        .min(5, "Address is required"),

    city: z
        .string()
        .trim()
        .min(2, "City is required"),

    state: z
        .string()
        .trim()
        .min(2, "State is required"),

    country: z
        .string()
        .trim()
        .min(2, "Country is required"),

    zipCode: z
        .string()
        .trim()
        .min(4, "Zip code is required"),

    latitude: z.number(),

    longitude: z.number(),

    mapUrl: z
        .string()
        .optional(),

    coverImage: z
        .string()
        .optional(),

    hasParking: z.boolean(),

    hasRestaurant: z.boolean(),

    hasSwimmingPool: z.boolean(),

    hasGym: z.boolean(),

    hasLaundry: z.boolean(),

    hasRoomService: z.boolean(),

    hasLift: z.boolean(),

    hasPowerBackup: z.boolean(),

    pricePerNight: z
        .number()
        .positive(
            "Price must be greater than zero"
        ),
});

type HotelFormData =
    z.infer<typeof hotelSchema>;

function RegisterHotelPage() {
    const navigate = useNavigate();

const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
} = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),

    defaultValues: {
        name: "",
        hotelType: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        latitude: 0,
        longitude: 0,
        mapUrl: "",
        coverImage: "",
        hasParking: false,
        hasRestaurant: false,
        hasSwimmingPool: false,
        hasGym: false,
        hasLaundry: false,
        hasRoomService: false,
        hasLift: false,
        hasPowerBackup: false,
        pricePerNight: 0,
    },
});

const latitude = watch("latitude");
const longitude = watch("longitude");

    const createHotel =
        useMutation({
            mutationFn:
                hotelService.createHotel,

            onSuccess: (response: any) => {
                toast.success(
                    response.message
                );

                navigate("/");
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data
                        ?.message ??
                        "Hotel registration failed"
                );
            },
        });

    const onSubmit = (
        data: HotelFormData
    ) => {
        createHotel.mutate(data);
    };

    return (
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl">
            <h1 className="mb-8 text-center text-4xl font-black text-blue-600">
                Register Your Hotel
            </h1>

            <form
                onSubmit={handleSubmit(
                    onSubmit
                )}
                className="space-y-8"
            >
                {/* Basic Information */}

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium">
                            Hotel Name
                        </label>

                        <input
                            {...register(
                                "name"
                            )}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {
                                errors.name
                                    ?.message
                            }
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Hotel Type
                        </label>

                        <select
                            {...register(
                                "hotelType"
                            )}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        >
                            <option value="">
                                Select Hotel Type
                            </option>

                            <option value="Hotel">
                                Hotel
                            </option>

                            <option value="Resort">
                                Resort
                            </option>

                            <option value="Villa">
                                Villa
                            </option>

                            <option value="Hostel">
                                Hostel
                            </option>
                        </select>

                        <p className="mt-1 text-sm text-red-500">
                            {
                                errors.hotelType
                                    ?.message
                            }
                        </p>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        {...register(
                            "description"
                        )}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {
                            errors.description
                                ?.message
                        }
                    </p>
                </div>                {/* Contact Information */}

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium">
                            Hotel Email
                        </label>

                        <input
                            type="email"
                            {...register("email")}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Phone Number
                        </label>

                        <input
                            {...register("phone")}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.phone?.message}
                        </p>
                    </div>
                </div>

                {/* Address */}

                <div>
                    <label className="mb-2 block font-medium">
                        Address
                    </label>

                    <input
                        {...register("address")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {errors.address?.message}
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium">
                            City
                        </label>

                        <input
                            {...register("city")}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.city?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            State
                        </label>

                        <input
                            {...register("state")}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.state?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Country
                        </label>

                        <input
                            {...register("country")}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.country?.message}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Zip Code
                        </label>

                        <input
                            {...register("zipCode")}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {errors.zipCode?.message}
                        </p>
                    </div>
                </div>

<div className="space-y-4">
    <label className="block font-medium">
        Hotel Location
    </label>

    <LocationPicker
        latitude={latitude}
        longitude={longitude}
        onLocationChange={(lat, lng) => {
            setValue("latitude", lat);
            setValue("longitude", lng);
            setValue(
                "mapUrl",
                `https://www.google.com/maps?q=${lat},${lng}`
            );
        }}
    />

    <input
        type="hidden"
        {...register("latitude", {
            valueAsNumber: true,
        })}
    />

    <input
        type="hidden"
        {...register("longitude", {
            valueAsNumber: true,
        })}
    />

    <input
        type="hidden"
        {...register("mapUrl")}
    />
</div>

<div>
    <label className="mb-2 block font-medium">
        Cover Image URL
    </label>

    <input
        {...register("coverImage")}
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
    />
</div>               {/* Hotel Facilities */}

                <div>
                    <h2 className="mb-4 text-xl font-bold text-slate-800">
                        Hotel Facilities
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("hasParking")}
                            />
                            Parking
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("hasRestaurant")}
                            />
                            Restaurant
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("hasSwimmingPool")}
                            />
                            Swimming Pool
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("hasGym")}
                            />
                            Gym
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("hasLaundry")}
                            />
                            Laundry
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("hasRoomService")}
                            />
                            Room Service
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("hasLift")}
                            />
                            Lift
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register("hasPowerBackup")}
                            />
                            Power Backup
                        </label>
                    </div>
                </div>

                
                {/* Pricing */}

                <div>
                    <label className="mb-2 block font-medium">
                        Price Per Night (₹)
                    </label>

                    <input
                        type="number"
                        min={0}
                        step="1"
                        {...register("pricePerNight", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {errors.pricePerNight?.message}
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={createHotel.isPending}
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {createHotel.isPending
                        ? "Registering Hotel..."
                        : "Register Hotel"}
                </button>
            </form>
        </div>
    );
}

export default RegisterHotelPage;