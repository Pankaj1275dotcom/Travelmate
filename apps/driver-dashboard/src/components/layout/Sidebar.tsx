import {
Car,
ClipboardList,
Clock3,
LayoutDashboard,
LogOut,
MapPinned,
Star,
User,
Wallet,
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
title: "Vehicle",
path: "/vehicle",
icon: Car,
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

const { logout } =
    useAuth();


return (

    <aside
        className="
            fixed
            left-0
            top-0
            flex
            h-screen
            w-72
            flex-col
            border-r
            bg-white
        "
    >

        <div
            className="
                border-b
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
                Driver Dashboard
            </p>

        </div>


        <nav
            className="
                flex-1
                space-y-2
                overflow-y-auto
                p-5
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
                                `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-600 hover:bg-slate-100"
                                }`
                            }
                        >

                            <Icon
                                size={20}
                            />

                            {item.title}

                        </NavLink>

                    );

                }
            )}

        </nav>


        <div
            className="
                border-t
                bg-white
                p-5
            "
        >

            <button
                onClick={
                    logout
                }
                className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    font-medium
                    text-red-600
                    transition
                    hover:bg-red-50
                "
            >

                <LogOut
                    size={20}
                />

                Logout

            </button>

        </div>

    </aside>

);


}

export default Sidebar;