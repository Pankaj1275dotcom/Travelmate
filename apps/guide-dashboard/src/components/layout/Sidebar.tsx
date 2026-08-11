import {
    MapPinned,
    ClipboardList,
    LayoutDashboard,
    LogOut,
    Star,
    User,
    Wallet,
    Clock3,
    Settings,
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
        title: "Booking Requests",
        path: "/bookings",
        icon: ClipboardList,
    },
    {
        title: "Availability",
        path: "/availability",
        icon: Clock3,
    },
    {
        title: "Trips",
        path: "/trips",
        icon: MapPinned,
    },
    {
        title: "Reviews",
        path: "/reviews",
        icon: Star,
    },
    {
        title: "Earnings",
        path: "/earnings",
        icon: Wallet,
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
        <aside
            className="
                fixed
                inset-y-0
                left-0
                z-50
                flex
                h-screen
                w-72
                flex-col
                border-r
                border-slate-200
                bg-white
            "
        >

            {/* Logo */}

            <div
                className="
                    shrink-0
                    border-b
                    border-slate-200
                    bg-white
                    px-8
                    py-7
                "
            >

                <h1
                    className="
                        text-2xl
                        font-black
                        text-blue-600
                    "
                >
                    TravelMate
                </h1>

                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-500
                    "
                >
                    Guide Dashboard
                </p>

            </div>


            {/* Navigation */}

            <nav
                className="
                    min-h-0
                    flex-1
                    overflow-y-auto
                    bg-white
                    p-5
                "
            >

                <div
                    className="
                        space-y-2
                    "
                >

                    {menuItems.map(
                        (item) => {

                            const Icon =
                                item.icon;


                            return (
                                <NavLink
                                    key={
                                        item.path
                                    }
                                    to={
                                        item.path
                                    }
                                    className={({
                                        isActive,
                                    }) =>
                                        `
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-4
                                        py-3
                                        font-medium
                                        transition
                                        ${
                                            isActive
                                                ? `
                                                    bg-blue-600
                                                    text-white
                                                    shadow-sm
                                                `
                                                : `
                                                    text-slate-600
                                                    hover:bg-slate-100
                                                `
                                        }
                                        `
                                    }
                                >

                                    <Icon
                                        size={20}
                                        className="
                                            shrink-0
                                        "
                                    />

                                    <span>
                                        {item.title}
                                    </span>

                                </NavLink>
                            );

                        }
                    )}

                </div>

            </nav>


            {/* Logout */}

            <div
                className="
                    shrink-0
                    border-t
                    border-slate-200
                    bg-white
                    p-5
                "
            >

                <button
                    type="button"
                    onClick={
                        logout
                    }
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        bg-red-50
                        px-4
                        py-3
                        font-medium
                        text-red-600
                        transition
                        hover:bg-red-100
                    "
                >

                    <LogOut
                        size={20}
                    />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );
}


export default Sidebar;