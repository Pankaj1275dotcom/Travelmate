import {
    Search,
    User,
    Mail,
    Phone,
    ShieldCheck,
    ShieldOff,
    CalendarDays,
    Hotel,
    Car,
    MapPin,
} from "lucide-react";

import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import useUsers from "../../hooks/useUsers";

import usersService from "../../services/users/users.service";

import type {
    AdminUser,
    UserSearchParams,
} from "../../types/users.types";

function UsersPage() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [searchParams, setSearchParams] =
        useState<UserSearchParams>({});

    const [selectedUser, setSelectedUser] =
        useState<AdminUser | null>(null);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [actionMessage, setActionMessage] =
        useState("");

    const {
        users,
        isLoading,
        isError,
    } = useUsers(searchParams);


    const handleSearch = () => {

        const params: UserSearchParams = {};

        const nameParts =
            name.trim().split(/\s+/);

        if (nameParts[0]) {

            params.firstName =
                nameParts[0];

        }

        if (nameParts.length > 1) {

            params.lastName =
                nameParts
                    .slice(1)
                    .join(" ");

        }

        if (email.trim()) {

            params.email =
                email.trim();

        }

        if (phone.trim()) {

            params.phone =
                phone.trim();

        }

        setSelectedUser(null);

        setActionMessage("");

        setSearchParams(params);

    };


    const handleClear = () => {

        setName("");

        setEmail("");

        setPhone("");

        setSelectedUser(null);

        setSearchParams({});

        setActionMessage("");

    };


    const handleSuspend = async () => {

        if (!selectedUser) {

            return;

        }

        setActionLoading(true);

        setActionMessage("");

        try {

            const response =
                await usersService.suspendUser(
                    selectedUser.id
                );

            setSelectedUser(
                response.user
            );

            setActionMessage(
                "Account suspended successfully."
            );

        } catch {

            setActionMessage(
                "Unable to suspend this account."
            );

        } finally {

            setActionLoading(false);

        }

    };


    const handleActivate = async () => {

        if (!selectedUser) {

            return;

        }

        setActionLoading(true);

        setActionMessage("");

        try {

            const response =
                await usersService.activateUser(
                    selectedUser.id
                );

            setSelectedUser(
                response.user
            );

            setActionMessage(
                "Account activated successfully."
            );

        } catch {

            setActionMessage(
                "Unable to activate this account."
            );

        } finally {

            setActionLoading(false);

        }

    };


    const getRoleLabel = (
        role: string
    ) => {

        switch (role) {

            case "TOURIST":
                return "Tourist";

            case "GUIDE":
                return "Guide";

            case "DRIVER":
                return "Driver";

            case "ADMIN":
                return "Admin";

            case "HOTEL_OWNER":
                return "Hotel Owner";

            default:
                return role;

        }

    };


    const getRoleClass = (
        role: string
    ) => {

        switch (role) {

            case "ADMIN":
                return "bg-purple-100 text-purple-700";

            case "GUIDE":
                return "bg-green-100 text-green-700";

            case "DRIVER":
                return "bg-orange-100 text-orange-700";

            case "HOTEL_OWNER":
                return "bg-blue-100 text-blue-700";

            default:
                return "bg-slate-100 text-slate-700";

        }

    };


    return (

        <div className="space-y-8">

            <PageHeader
                title="User Management"
                description="Search, view and manage TravelMate user accounts."
            />

            {/* Search */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="mb-6">

                    <h2 className="text-xl font-semibold">

                        Find a User

                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                        Search using any one or multiple details.

                    </p>

                </div>

                <div className="grid gap-5 md:grid-cols-3">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">

                            Name

                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter full name"
                                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">

                            Gmail / Email

                        </label>

                        <div className="relative">

                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter email"
                                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">

                            Mobile Number

                        </label>

                        <div className="relative">

                            <Phone
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={phone}
                                onChange={(event) =>
                                    setPhone(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter mobile number"
                                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                    <button
                        onClick={handleSearch}
                        disabled={
                            !name.trim() &&
                            !email.trim() &&
                            !phone.trim()
                        }
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <Search size={18} />

                        Search User

                    </button>

                    <button
                        onClick={handleClear}
                        className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >

                        Clear

                    </button>

                </div>

            </div>


            {/* Loading */}

            {isLoading && (

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <p className="text-slate-500">

                        Searching users...

                    </p>

                </div>

            )}


            {/* Error */}

            {isError && !isLoading && (

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                    <p className="font-medium text-red-600">

                        Unable to search users.

                    </p>

                </div>

            )}


            {/* Results */}

            {!isLoading &&
                !isError &&
                searchParams &&
                Object.keys(searchParams).length > 0 && (

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <div className="mb-6">

                        <h2 className="text-xl font-semibold">

                            Search Results

                        </h2>

                        <p className="mt-1 text-sm text-slate-500">

                            {users.length} user
                            {users.length !== 1
                                ? "s"
                                : ""} found.

                        </p>

                    </div>

                    {users.length === 0 ? (

                        <div className="rounded-xl border border-dashed p-10 text-center">

                            <User
                                size={40}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-4 text-lg font-semibold">

                                No User Found

                            </h3>

                            <p className="mt-2 text-sm text-slate-500">

                                Try another name, email or mobile number.

                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {users.map((user) => (

                                <button
                                    key={user.id}
                                    onClick={() =>
                                        setSelectedUser(
                                            user
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-200 p-5 text-left transition hover:border-blue-300 hover:bg-blue-50/40"
                                >

                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                        <div className="flex items-center gap-4">

                                            {user.profileImage ? (

                                                <img
                                                    src={user.profileImage}
                                                    alt={`${user.firstName} ${user.lastName}`}
                                                    className="h-14 w-14 rounded-full object-cover"
                                                />

                                            ) : (

                                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

                                                    <User
                                                        size={25}
                                                        className="text-blue-600"
                                                    />

                                                </div>

                                            )}

                                            <div>

                                                <h3 className="font-semibold">

                                                    {user.firstName}{" "}
                                                    {user.lastName}

                                                </h3>

                                                <p className="text-sm text-slate-500">

                                                    {user.email}

                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">

                                                    {user.phone}

                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleClass(
                                                    user.role
                                                )}`}
                                            >

                                                {getRoleLabel(
                                                    user.role
                                                )}

                                            </span>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    user.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >

                                                {user.isActive
                                                    ? "Active"
                                                    : "Suspended"}

                                            </span>

                                        </div>

                                    </div>

                                </button>

                            ))}

                        </div>

                    )}

                </div>

            )}


            {/* Profile */}

            {selectedUser && (

                <div className="rounded-2xl bg-white shadow-sm">

                    <div className="border-b p-6">

                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                            <div className="flex items-center gap-4">

                                {selectedUser.profileImage ? (

                                    <img
                                        src={
                                            selectedUser.profileImage
                                        }
                                        alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                                        className="h-20 w-20 rounded-full object-cover"
                                    />

                                ) : (

                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

                                        <User
                                            size={34}
                                            className="text-blue-600"
                                        />

                                    </div>

                                )}

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        {selectedUser.firstName}{" "}
                                        {selectedUser.lastName}

                                    </h2>

                                    <div className="mt-2 flex flex-wrap gap-2">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleClass(
                                                selectedUser.role
                                            )}`}
                                        >

                                            {getRoleLabel(
                                                selectedUser.role
                                            )}

                                        </span>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                selectedUser.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >

                                            {selectedUser.isActive
                                                ? "Active Account"
                                                : "Suspended Account"}

                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div>

                                {selectedUser.isActive ? (

                                    <button
                                        onClick={
                                            handleSuspend
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                                    >

                                        <ShieldOff
                                            size={18}
                                        />

                                        {actionLoading
                                            ? "Suspending..."
                                            : "Suspend Account"}

                                    </button>

                                ) : (

                                    <button
                                        onClick={
                                            handleActivate
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                                    >

                                        <ShieldCheck
                                            size={18}
                                        />

                                        {actionLoading
                                            ? "Activating..."
                                            : "Activate Account"}

                                    </button>

                                )}

                            </div>

                        </div>

                    </div>


                    {actionMessage && (

                        <div className="border-b px-6 py-4">

                            <p className="text-sm font-medium text-blue-600">

                                {actionMessage}

                            </p>

                        </div>

                    )}


                    <div className="grid gap-6 p-6 md:grid-cols-2">

                        <div className="rounded-xl border p-5">

                            <h3 className="font-semibold">

                                Contact Information

                            </h3>

                            <div className="mt-4 space-y-4">

                                <div className="flex items-center gap-3">

                                    <Mail
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <div>

                                        <p className="text-xs text-slate-500">

                                            Email

                                        </p>

                                        <p className="font-medium">

                                            {selectedUser.email}

                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <Phone
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <div>

                                        <p className="text-xs text-slate-500">

                                            Mobile

                                        </p>

                                        <p className="font-medium">

                                            {selectedUser.phone}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="rounded-xl border p-5">

                            <h3 className="font-semibold">

                                Account Information

                            </h3>

                            <div className="mt-4 space-y-4">

                                <div className="flex items-center gap-3">

                                    <ShieldCheck
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <div>

                                        <p className="text-xs text-slate-500">

                                            Role

                                        </p>

                                        <p className="font-medium">

                                            {getRoleLabel(
                                                selectedUser.role
                                            )}

                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <CalendarDays
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <div>

                                        <p className="text-xs text-slate-500">

                                            Joined

                                        </p>

                                        <p className="font-medium">

                                            {new Date(
                                                selectedUser.createdAt
                                            ).toLocaleDateString()}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {selectedUser.role === "GUIDE" &&
                            selectedUser.guide && (

                            <div className="rounded-xl border p-5">

                                <div className="flex items-center gap-2">

                                    <MapPin
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <h3 className="font-semibold">

                                        Guide Profile

                                    </h3>

                                </div>

                                <p className="mt-4 font-medium">

                                    {selectedUser.guide.fullName ||
                                        "Guide"}

                                </p>

                            </div>

                        )}


                        {selectedUser.role === "DRIVER" &&
                            selectedUser.driver && (

                            <div className="rounded-xl border p-5">

                                <div className="flex items-center gap-2">

                                    <Car
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <h3 className="font-semibold">

                                        Driver Profile

                                    </h3>

                                </div>

                                <p className="mt-4 font-medium">

                                    {selectedUser.driver.fullName ||
                                        "Driver"}

                                </p>

                            </div>

                        )}


                        {selectedUser.role === "HOTEL_OWNER" &&
                            selectedUser.hotels &&
                            selectedUser.hotels.length > 0 && (

                            <div className="rounded-xl border p-5">

                                <div className="flex items-center gap-2">

                                    <Hotel
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <h3 className="font-semibold">

                                        Hotels

                                    </h3>

                                </div>

                                <div className="mt-4 space-y-2">

                                    {selectedUser.hotels.map(
                                        (hotel) => (

                                        <p
                                            key={hotel.id}
                                            className="font-medium"
                                        >

                                            {hotel.name ||
                                                "Hotel"}

                                        </p>

                                    ))}

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>

    );

}

export default UsersPage;