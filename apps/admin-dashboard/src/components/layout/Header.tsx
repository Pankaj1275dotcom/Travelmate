import { Bell, ChevronDown, Menu } from "lucide-react";

import useAuthStore from "../../store/auth.store";

function Header() {
    const { admin } = useAuthStore();

    return (
        <header className="flex h-20 items-center justify-between border-b bg-white px-8">
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
                        Welcome back, Admin
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button
                    type="button"
                    className="relative rounded-full p-2 transition hover:bg-slate-100"
                >
                    <Bell size={22} />

                    <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                </button>

                <button
                    type="button"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-50"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                        A
                    </div>

                    <div className="text-left">
                        <p className="font-semibold text-slate-900">
                            {admin
    ? `${admin.firstName} ${admin.lastName}`
    : "Admin"}
                        </p>

                        <p className="text-sm text-slate-500">
                            {admin?.email ?? "admin@travelmate.com"}
                        </p>
                    </div>

                    <ChevronDown size={18} />
                </button>
            </div>
        </header>
    );
}

export default Header;