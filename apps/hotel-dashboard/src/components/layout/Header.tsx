import { Bell, ChevronDown, Menu } from "lucide-react";

import useAuthStore from "../../store/auth.store";

function Header() {
    const { hotel } = useAuthStore();

    const initials =
        hotel?.firstName?.charAt(0).toUpperCase() ??
        "H";

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Dashboard
                    </h2>

                    <p className="text-sm text-slate-500">
                        Welcome back,
                        {" "}
                        Hotel Partner
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-5">
                <button
                    type="button"
                    className="relative rounded-full p-2 transition hover:bg-slate-100"
                >
                    <Bell size={22} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <button
                    type="button"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
                        {initials}
                    </div>

                    <div className="text-left">
                        <p className="font-semibold text-slate-900">
                            {hotel
                                ? `${hotel.firstName} ${hotel.lastName}`
                                : "Hotel Partner"}
                        </p>

                        <p className="text-sm text-slate-500">
                            {hotel?.email ??
                                "hotel@example.com"}
                        </p>
                    </div>

                    <ChevronDown
                        size={18}
                        className="text-slate-500"
                    />
                </button>
            </div>
        </header>
    );
}

export default Header;