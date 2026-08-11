import { useMemo, useState } from "react";

import { Hotel, MapPin } from "lucide-react";

import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";
import HotelCard from "../../components/common/HotelCard";
import HotelFilters from "../../components/hotels/HotelFilters";

import hotelService from "../../services/hotel/hotel.service";
import wishlistService from "../../services/wishlist/wishlist.service";

function HotelListPage() {
    const queryClient = useQueryClient();

    const [filters, setFilters] = useState({
        search: "",
        city: "",
        state: "",
        minPrice: "",
        maxPrice: "",
        rating: "",
        sort: "newest" as
            | "newest"
            | "price_asc"
            | "price_desc"
            | "rating",
    });

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["hotels", filters],

        queryFn: () =>
            hotelService.getAllHotels({
                search:
                    filters.search || undefined,

                city:
                    filters.city || undefined,

                state:
                    filters.state || undefined,

                minPrice:
                    filters.minPrice
                        ? Number(filters.minPrice)
                        : undefined,

                maxPrice:
                    filters.maxPrice
                        ? Number(filters.maxPrice)
                        : undefined,

                rating:
                    filters.rating
                        ? Number(filters.rating)
                        : undefined,

                sort: filters.sort,
            }),
    });

    const {
        data: wishlistData,
    } = useQuery({
        queryKey: ["wishlist"],
        queryFn: () =>
            wishlistService.getWishlist(),
    });

    const wishlistIds = useMemo(() => {
        if (!wishlistData) return [];

        return wishlistData.wishlist.map(
            (item) => item.hotelId
        );
    }, [wishlistData]);

    const handleWishlist = async (
        hotelId: string
    ) => {
        if (wishlistIds.includes(hotelId)) {
            toast("Already in your wishlist");

            return;
        }

        try {
            const response =
                await wishlistService.addToWishlist({
                    hotelId,
                });

            toast.success(response.message);

            await queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                    "Something went wrong"
            );
        }
    };

    return (
        <Layout>
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80"
                        alt="Hotels"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 py-24">
                    <div className="max-w-3xl">
                        <h1 className="text-6xl font-black text-white">
                            Find Your
                            <br />
                            Perfect Stay
                        </h1>

                        <p className="mt-6 text-lg text-blue-100">
                            Discover verified hotels
                            with comfortable rooms,
                            trusted service and the
                            best prices.
                        </p>
                    </div>

                    <HotelFilters
                        filters={filters}
                        onChange={setFilters}
                    />

                    <div className="mt-10 flex flex-wrap gap-8 text-white">
                        <div className="flex items-center gap-2">
                            <Hotel size={22} />

                            <span>
                                {data?.count ?? 0} Hotels
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin size={22} />

                            <span>
                                Across India
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <h2 className="mb-10 text-4xl font-black text-slate-900">
                    Popular Hotels
                </h2>                {isLoading && (
                    <div className="flex items-center justify-center py-24">
                        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                    </div>
                )}

                {isError && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
                        <h2 className="text-2xl font-bold text-red-600">
                            Failed to load hotels
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Please try again in a
                            few moments.
                        </p>
                    </div>
                )}

                {!isLoading &&
                    !isError &&
                    (data?.hotels ?? [])
                        .length === 0 && (
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 py-24 text-center">
                            <h2 className="text-3xl font-bold">
                                No Hotels Found
                            </h2>

                            <p className="mt-3 text-slate-500">
                                Try changing your
                                search or filters.
                            </p>
                        </div>
                    )}

                {!isLoading &&
                    !isError &&
                    (data?.hotels ?? [])
                        .length > 0 && (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {(data?.hotels ?? []).map(
                                (hotel) => (
                                    <HotelCard
                                        key={
                                            hotel.id
                                        }
                                        hotel={
                                            hotel
                                        }
                                        isWishlisted={wishlistIds.includes(
                                            hotel.id
                                        )}
                                        onWishlist={
                                            handleWishlist
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
            </section>        </Layout>
    );
}

export default HotelListPage;