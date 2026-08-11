import { Search } from "lucide-react";

interface HotelFiltersState {
    search: string;
    city: string;
    state: string;
    minPrice: string;
    maxPrice: string;
    rating: string;
    sort:
        | "newest"
        | "price_asc"
        | "price_desc"
        | "rating";
}

interface HotelFiltersProps {
    filters: HotelFiltersState;

    onChange: (
        filters: HotelFiltersState
    ) => void;
}

function HotelFilters({
    filters,
    onChange,
}: HotelFiltersProps) {
    return (
        <div className="mt-12 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div className="relative xl:col-span-2">
                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        value={filters.search}
                        onChange={(e) =>
                            onChange({
                                ...filters,
                                search: e.target.value,
                            })
                        }
                        placeholder="Search hotels, city or state..."
                        className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500"
                    />
                </div>

                <input
                    value={filters.city}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            city: e.target.value,
                        })
                    }
                    placeholder="City"
                    className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <input
                    value={filters.state}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            state: e.target.value,
                        })
                    }
                    placeholder="State"
                    className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            minPrice: e.target.value,
                        })
                    }
                    placeholder="Min Price"
                    className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            maxPrice: e.target.value,
                        })
                    }
                    placeholder="Max Price"
                    className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <select
                    value={filters.rating}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            rating: e.target.value,
                        })
                    }
                    className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                >
                    <option value="">
                        All Ratings
                    </option>

                    <option value="4">
                        4★ & above
                    </option>

                    <option value="3">
                        3★ & above
                    </option>

                    <option value="2">
                        2★ & above
                    </option>

                    <option value="1">
                        1★ & above
                    </option>
                </select>

                <select
                    value={filters.sort}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            sort: e.target.value as
                                | "newest"
                                | "price_asc"
                                | "price_desc"
                                | "rating",
                        })
                    }
                    className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                >
                    <option value="newest">
                        Newest
                    </option>

                    <option value="price_asc">
                        Price: Low to High
                    </option>

                    <option value="price_desc">
                        Price: High to Low
                    </option>

                    <option value="rating">
                        Highest Rated
                    </option>
                </select>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={() =>
                        onChange({
                            search: "",
                            city: "",
                            state: "",
                            minPrice: "",
                            maxPrice: "",
                            rating: "",
                            sort: "newest",
                        })
                    }
                    className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
}

export default HotelFilters;