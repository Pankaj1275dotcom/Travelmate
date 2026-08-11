import { Heart } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";
import HotelCard from "../../components/common/HotelCard";

import wishlistService from "../../services/wishlist/wishlist.service";

function WishlistPage() {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["wishlist"],
        queryFn: () => wishlistService.getWishlist(),
    });

    const handleRemove = async (hotelId: string) => {
        try {
            const response =
                await wishlistService.removeFromWishlist(
                    hotelId
                );

            toast.success(response.message);

            await queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                    "Unable to remove hotel"
            );
        }
    };

    const wishlist = data?.wishlist ?? [];

    return (
        <Layout>
            <section className="mx-auto max-w-7xl px-6 py-10">
                <div className="mb-10 flex items-center gap-4">
                    <Heart
                        className="text-red-500"
                        size={34}
                        fill="currentColor"
                    />

                    <div>
                        <h1 className="text-4xl font-black">
                            My Wishlist
                        </h1>

                        <p className="text-slate-500">
                            Your saved hotels
                        </p>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex justify-center py-24">
                        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                    </div>
                )}

                {isError && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
                        <h2 className="text-2xl font-bold text-red-600">
                            Failed to load wishlist
                        </h2>
                    </div>
                )}

                {!isLoading &&
                    !isError &&
                    wishlist.length === 0 && (
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 py-24 text-center">
                            <Heart
                                size={60}
                                className="mx-auto text-red-500"
                            />

                            <h2 className="mt-6 text-3xl font-bold">
                                Your wishlist is empty
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Add hotels from the Hotels page.
                            </p>
                        </div>
                    )}

                {!isLoading &&
                    !isError &&
                    wishlist.length > 0 && (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {wishlist.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative"
                                >
                                    <HotelCard
                                        hotel={item.hotel}
                                        isWishlisted
                                    />

                                    <button
                                        onClick={() =>
                                            handleRemove(
                                                item.hotelId
                                            )
                                        }
                                        className="absolute bottom-5 left-5 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
            </section>
        </Layout>
    );
}

export default WishlistPage;