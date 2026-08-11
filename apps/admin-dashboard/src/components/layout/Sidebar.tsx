import {
    BookOpen,
    Building2,
    Car,
    CreditCard,
    LayoutDashboard,
    LogOut,
    Settings,
    ShieldCheck,
    Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const menuItems = [
    {
        section: "MAIN",
        items: [
            {
                title: "Dashboard",
                path: "/",
                icon: LayoutDashboard,
            },
            {
                title: "Bookings",
                path: "/bookings",
                icon: BookOpen,
            },
        ],
    },
    {
        section: "MANAGEMENT",
        items: [
            {
                title: "Hotels",
                path: "/hotels",
                icon: Building2,
            },
            {
                title: "Guides",
                path: "/guides",
                icon: ShieldCheck,
            },
            {
                title: "Drivers",
                path: "/drivers",
                icon: Car,
            },
            {
                title: "Users",
                path: "/users",
                icon: Users,
            },
        ],
    },
    {
        section: "BUSINESS",
        items: [
            {
                title: "Payments",
                path: "/payments",
                icon: CreditCard,
            },
        ],
    },
    {
        section: "SYSTEM",
        items: [
            {
                title: "Settings",
                path: "/settings",
                icon: Settings,
            },
        ],
    },
];

function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className="flex h-screen w-72 flex-col border-r bg-white">
            <div className="border-b px-8 py-7">
                <h1 className="text-2xl font-black text-blue-600">
                    TravelMate
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Admin Dashboard
                </p>
            </div>

            <div className="flex-1 overflow-y-auto">
                {menuItems.map((section) => (
                    <div
                        key={section.section}
                        className="px-5 py-4"
                    >
                        <h3 className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                            {section.section}
                        </h3>

                        <div className="space-y-2">
                            {section.items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                                isActive
                                                    ? "bg-blue-600 text-white"
                                                    : "text-slate-600 hover:bg-slate-100"
                                            }`
                                        }
                                    >
                                        <Icon size={20} />

                                        {item.title}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t p-5">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-600 transition hover:bg-red-50"
                >
                    <LogOut size={20} />

                    Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;