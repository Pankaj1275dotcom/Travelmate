import {
    BedDouble,
    Images,
    LayoutDashboard,
    LogOut,
    Settings,
    Star,
    User,
    Building2,
    Plane,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const menuItems = [
    {
        title: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Trips",
        path: "/trips",
        icon: Plane,
    },
    {
        title: "Rooms",
        path: "/rooms",
        icon: BedDouble,
    },
    {
        title: "Amenities",
        path: "/amenities",
        icon: Building2,
    },
    {
        title: "Gallery",
        path: "/gallery",
        icon: Images,
    },
    {
        title: "Reviews",
        path: "/reviews",
        icon: Star,
    },
    {
        title: "Profile",
        path: "/profile",
        icon: User,
    },
    {
        title: "Settings",
        path: "/settings",
        icon: Settings,
    },
];

function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-8 py-7">
                <h1 className="text-2xl font-black text-blue-600">
                    TravelMate
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Hotel Dashboard
                </p>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto p-5">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span>{item.title}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="border-t border-slate-200 p-5">
                <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;