import {
    Link,
    NavLink,
    useNavigate,
} from "react-router-dom";

import {
    Bell,
    X,
    CheckCheck,
    Trash2,
    User,
    Settings,
    Heart,
    BookOpen,
    LogOut,
    ChevronDown,
    Hotel,
    Users,
    Car,
    ShieldCheck,
    UserRound,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import useAuth from "../../hooks/useAuth";


const roles = [
    {
        name: "Tourist",
        icon: UserRound,
        loginUrl: "/login",
        registerUrl: "/register",
    },
    {
        name: "Hotel Owner",
        icon: Hotel,
        loginUrl: "https://travelmate-hotel-dashboard-lsu1-seven.vercel.app/login",
        registerUrl: "https://travelmate-hotel-dashboard-lsu1-seven.vercel.app/register",
    },
    {
        name: "Guide",
        icon: Users,
        loginUrl: "https://travelmate-guide-dashboard.vercel.app/login",
        registerUrl: "https://travelmate-guide-dashboard.vercel.app/register",
    },
    {
        name: "Driver",
        icon: Car,
        loginUrl: "https://travelmate-driver-dashboard.vercel.app/login",
        registerUrl: "https://travelmate-driver-dashboard.vercel.app/register",
    },
    {
        name: "Admin",
        icon: ShieldCheck,
        loginUrl: "https://travelmate-admin-dashboard-946n.vercel.app/login",
    },
];


interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
}


function Navbar() {
    const navigate = useNavigate();

    const {
        isAuthenticated,
        user,
        logout,
    } = useAuth();

    const [
        showRoleMenu,
        setShowRoleMenu,
    ] = useState(false);

    const [
        selectedAction,
        setSelectedAction,
    ] = useState<
        "login" | "register"
    >("login");

    const roleMenuRef =
        useRef<HTMLDivElement>(null);

    const [notifications, setNotifications] = useState<
        Notification[]
    >([
        {
            id: 1,
            title: "Hotel Booking",
            message: "Your booking has been confirmed.",
            time: "2 min ago",
            read: false,
        },
        {
            id: 2,
            title: "Guide Assigned",
            message: "A guide has accepted your request.",
            time: "15 min ago",
            read: false,
        },
        {
            id: 3,
            title: "Welcome",
            message: "Welcome to TravelMate.",
            time: "1 day ago",
            read: true,
        },
    ]);

    const unreadCount = notifications.filter(
        (notification) =>
            !notification.read
    ).length;

    const [
        showNotificationMenu,
        setShowNotificationMenu,
    ] = useState(false);

    const [
        showProfileMenu,
        setShowProfileMenu,
    ] = useState(false);

    const notificationRef =
        useRef<HTMLDivElement>(null);

    const profileRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(
            event: MouseEvent
        ) {
            const target =
                event.target as Node;

            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    target
                )
            ) {
                setShowNotificationMenu(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(
                    target
                )
            ) {
                setShowProfileMenu(false);
            }

            if (
                roleMenuRef.current &&
                !roleMenuRef.current.contains(
                    target
                )
            ) {
                setShowRoleMenu(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const handleLogout = () => {
        logout();

        navigate("/login");
    };

    const removeNotification = (
        id: number
    ) => {
        setNotifications((previous) =>
            previous.filter(
                (notification) =>
                    notification.id !== id
            )
        );
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const markAllAsRead = () => {
        setNotifications((previous) =>
            previous.map(
                (notification) => ({
                    ...notification,
                    read: true,
                })
            )
        );
    };    return (
        <motion.header
            initial={{
                y: -80,
            }}
            animate={{
                y: 0,
            }}
            transition={{
                duration: 0.4,
            }}
            className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl"
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                  <div className="flex h-16 w-16 items-center justify-center   overflow-hidden">
    <img
        src="/travelmate.png"
        alt="TravelMate logo"
         className="h-full w-full object-contain"
    />
</div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">
                                  TravelMate
                        </h1>

                        <p className="text-xs text-slate-500">
                            .          Travel Smart
                        </p>
                    </div>
                </Link>


                <nav className="hidden items-center gap-8 md:flex">
                    <NavLink
                        to="/"
                        className="font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/hotels"
                        className="font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Hotels
                    </NavLink>

                    <NavLink
                        to="/guides"
                        className="font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Guides
                    </NavLink>

                    <NavLink
                        to="/drivers"
                        className="font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Drivers
                    </NavLink>

                    <NavLink
                        to="/trips"
                        className="font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        My Trips
                    </NavLink>

                    <NavLink
                        to="/wishlist"
                        className="font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Wishlist
                    </NavLink>
                </nav>


                <div className="flex items-center gap-4">

                    {!isAuthenticated ? (
                        <div
                            ref={roleMenuRef}
                            className="relative flex items-center gap-3"
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedAction(
                                        "register"
                                    );

                                    setShowRoleMenu(
                                        !showRoleMenu
                                    );
                                }}
                                className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium transition hover:border-blue-600 hover:text-blue-600"
                            >
                                Register
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedAction(
                                        "login"
                                    );

                                    setShowRoleMenu(
                                        !showRoleMenu
                                    );
                                }}
                                className="rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Login
                            </button>

                            <AnimatePresence>
                                {showRoleMenu && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.98,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.98,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                        className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl"
                                    >
                                        <div className="border-b border-slate-100 px-4 py-3">
                                            <p className="text-sm font-bold text-slate-900">
                                                {selectedAction ===
                                                "login"
                                                    ? "Login as"
                                                    : "Register as"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Choose your role
                                                to continue.
                                            </p>
                                        </div>

                                        <div className="space-y-1 p-2">
                                            {roles
                                                .filter(
                                                    (role) =>
                                                        selectedAction ===
                                                        "login"
                                                            ? true
                                                            : !!role.registerUrl
                                                )
                                                .map((role) => {
                                                    const Icon =
                                                        role.icon;

                                                    return (
                                                        <button
                                                            key={
                                                                role.name
                                                            }
                                                            type="button"
                                                            onClick={() => {
                                                                const url =
                                                                    selectedAction ===
                                                                    "login"
                                                                        ? role.loginUrl
                                                                        : role.registerUrl;

                                                                if (!url) {
                                                                    return;
                                                                }

                                                                if (
                                                                    url.startsWith(
                                                                        "http"
                                                                    )
                                                                ) {
                                                                    window.location.href =
                                                                        url;
                                                                } else {
                                                                    navigate(
                                                                        url
                                                                    );
                                                                }

                                                                setShowRoleMenu(
                                                                    false
                                                                );
                                                            }}
                                                            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-blue-50"
                                                        >
                                                            <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700 transition group-hover:bg-blue-100">
                                                                <Icon
                                                                    size={
                                                                        20
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <p className="font-semibold text-slate-800">
                                                                    {
                                                                        role.name
                                                                    }
                                                                </p>

                                                                <p className="text-xs text-slate-500">
                                                                    Continue
                                                                    as{" "}
                                                                    {
                                                                        role.name
                                                                    }
                                                                </p>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                                               <>
                            <div
                                ref={notificationRef}
                                className="relative"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNotificationMenu(
                                            !showNotificationMenu
                                        )
                                    }
                                    className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
                                >
                                    <Bell size={21} />

                                    {unreadCount > 0 && (
                                        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {showNotificationMenu && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.98,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.98,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                            className="absolute right-0 top-full mt-3 w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                                        >
                                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                                                <div>
                                                    <h3 className="font-bold text-slate-900">
                                                        Notifications
                                                    </h3>

                                                    <p className="mt-0.5 text-xs text-slate-500">
                                                        {unreadCount} unread
                                                    </p>
                                                </div>

                                                {notifications.length > 0 && (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                markAllAsRead
                                                            }
                                                            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                                                            title="Mark all as read"
                                                        >
                                                            <CheckCheck
                                                                size={18}
                                                            />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={
                                                                clearNotifications
                                                            }
                                                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                                            title="Clear all"
                                                        >
                                                            <Trash2
                                                                size={18}
                                                            />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="px-6 py-12 text-center">
                                                        <Bell
                                                            size={32}
                                                            className="mx-auto text-slate-300"
                                                        />

                                                        <p className="mt-3 font-medium text-slate-500">
                                                            No notifications
                                                        </p>
                                                    </div>
                                                ) : (
                                                    notifications.map(
                                                        (
                                                            notification
                                                        ) => (
                                                            <div
                                                                key={
                                                                    notification.id
                                                                }
                                                                className={`group flex gap-3 border-b border-slate-100 px-5 py-4 transition last:border-b-0 hover:bg-slate-50 ${
                                                                    notification.read
                                                                        ? ""
                                                                        : "bg-blue-50/50"
                                                                }`}
                                                            >
                                                                <div
                                                                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                                                                        notification.read
                                                                            ? "bg-transparent"
                                                                            : "bg-blue-600"
                                                                    }`}
                                                                />

                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-start justify-between gap-3">
                                                                        <p className="font-semibold text-slate-800">
                                                                            {
                                                                                notification.title
                                                                            }
                                                                        </p>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeNotification(
                                                                                    notification.id
                                                                                )
                                                                            }
                                                                            className="opacity-0 transition group-hover:opacity-100"
                                                                        >
                                                                            <X
                                                                                size={
                                                                                    16
                                                                                }
                                                                                className="text-slate-400 hover:text-red-500"
                                                                            />
                                                                        </button>
                                                                    </div>

                                                                    <p className="mt-1 text-sm text-slate-500">
                                                                        {
                                                                            notification.message
                                                                        }
                                                                    </p>

                                                                    <p className="mt-2 text-xs text-slate-400">
                                                                        {
                                                                            notification.time
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>                            <div
                                ref={profileRef}
                                className="relative"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowProfileMenu(
                                            !showProfileMenu
                                        )
                                    }
                                    className="flex items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-slate-100"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                        {user?.firstName
                                            ?.charAt(0)
                                            .toUpperCase() ?? "U"}
                                    </div>

                                    <div className="hidden text-left lg:block">
                                        <p className="max-w-32 truncate text-sm font-semibold text-slate-800">
                                            {user?.firstName ?? "User"}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Tourist
                                        </p>
                                    </div>

                                    <ChevronDown
                                        size={16}
                                        className={`hidden text-slate-500 transition lg:block ${
                                            showProfileMenu
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.98,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.98,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                            className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                                        >
                                            <div className="border-b border-slate-100 px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                                        {user?.firstName
                                                            ?.charAt(0)
                                                            .toUpperCase() ??
                                                            "U"}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate font-semibold text-slate-900">
                                                            {user?.firstName}{" "}
                                                            {user?.lastName}
                                                        </p>

                                                        <p className="truncate text-xs text-slate-500">
                                                            {user?.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2">
                                                <Link
                                                    to="/profile"
                                                    onClick={() =>
                                                        setShowProfileMenu(
                                                            false
                                                        )
                                                    }
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    <User size={18} />

                                                    Profile
                                                </Link>

                                                <Link
                                                    to="/trips"
                                                    onClick={() =>
                                                        setShowProfileMenu(
                                                            false
                                                        )
                                                    }
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    <BookOpen
                                                        size={18}
                                                    />

                                                    My Trips
                                                </Link>

                                                <Link
                                                    to="/wishlist"
                                                    onClick={() =>
                                                        setShowProfileMenu(
                                                            false
                                                        )
                                                    }
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    <Heart size={18} />

                                                    Wishlist
                                                </Link>

                                                <Link
                                                    to="/profile"
                                                    onClick={() =>
                                                        setShowProfileMenu(
                                                            false
                                                        )
                                                    }
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    <Settings
                                                        size={18}
                                                    />

                                                    Settings
                                                </Link>
                                            </div>

                                            <div className="border-t border-slate-100 p-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowProfileMenu(
                                                            false
                                                        );

                                                        handleLogout();
                                                    }}
                                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                                >
                                                    <LogOut size={18} />

                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </motion.header>
    );
}

export default Navbar;