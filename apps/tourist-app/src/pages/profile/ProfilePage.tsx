import {
    Mail,
    Phone,
    Calendar,
    Clock,
    KeyRound,
    CheckCircle,  
    Bookmark,
    Heart,
    LogOut,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";

import authService from "../../services/auth/auth.service";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileInfoCard from "../../components/profile/ProfileInfoCard";
import ProfileLoading from "../../components/profile/ProfileLoading";
import ProfileError from "../../components/profile/ProfileError";

function ProfilePage() {
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: () => authService.me(),
    });

    const user = data?.data;

    const formatDate = (date: string | null) => {
        if (!date) {
            return "Not Available";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };
    
   

    return (
        <Layout>
            <section className="mx-auto max-w-7xl px-6 py-10">
                {isLoading && <ProfileLoading />}

                {isError && <ProfileError />}

                {!isLoading && !isError && user && (
                    <>
                        <ProfileHeader user={user} />

                        <div className="mt-10 grid gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold">
                                            Personal Information
                                        </h2>

                                        <p className="mt-2 text-slate-500">
                                            Your account details.
                                        </p>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <ProfileInfoCard
                                            icon={
                                                <Mail size={24} />
                                            }
                                            title="Email"
                                            value={user.email}
                                        />

                                        <ProfileInfoCard
                                            icon={
                                                <Phone size={24} />
                                            }
                                            title="Phone"
                                            value={user.phone}
                                        />

                                        <ProfileInfoCard
                                            icon={
                                                <Calendar
                                                    size={24}
                                                />
                                            }
                                            title="Member Since"
                                            value={formatDate(
                                                user.createdAt
                                            )}
                                        />

                                        <ProfileInfoCard
                                            icon={
                                                <Clock
                                                    size={24}
                                                />
                                            }
                                            title="Last Login"
                                            value={formatDate(
                                                user.lastLoginAt
                                            )}
                                        />

                                        <ProfileInfoCard
                                            icon={
                                                <KeyRound
                                                    size={24}
                                                />
                                            }
                                            title="Password Changed"
                                            value={formatDate(
                                                user.passwordChangedAt
                                            )}
                                        />

                                        <ProfileInfoCard
                                            icon={
                                                <CheckCircle
                                                    size={24}
                                                />
                                            }
                                            title="Account Status"
                                            value={
                                                user.isActive
                                                    ? "Active"
                                                    : "Inactive"
                                            }
                                        />

                                        

                                        <ProfileInfoCard
                                            icon={
                                                <Mail
                                                    size={24}
                                                />
                                            }
                                            title="Email Verified"
                                            value={
                                                user.emailVerified
                                                    ? "Yes"
                                                    : "No"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>                            <div>
                                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                    <h2 className="text-2xl font-bold">
                                        Quick Actions
                                    </h2>

                                    <p className="mt-2 text-slate-500">
                                        Manage your TravelMate account.
                                    </p>

                                    <div className="mt-8 space-y-4">
                                        <button
                                            onClick={() =>
                                                navigate("/bookings")
                                            }
                                            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                                        >
                                            <Bookmark
                                                className="text-blue-600"
                                                size={22}
                                            />

                                            <div className="text-left">
                                                <p className="font-semibold">
                                                    My Bookings
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    View all your bookings
                                                </p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate("/wishlist")
                                            }
                                            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                                        >
                                            <Heart
                                                className="text-red-500"
                                                size={22}
                                            />

                                            <div className="text-left">
                                                <p className="font-semibold">
                                                    Wishlist
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    Hotels, guides and drivers
                                                </p>
                                            </div>
                                        </button>

                                        <button
                                            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                                        >
                                            <KeyRound
                                                className="text-amber-500"
                                                size={22}
                                            />

                                            <div className="text-left">
                                                <p className="font-semibold">
                                                    Change Password
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    Update your account password
                                                </p>
                                            </div>
                                        </button>

                                        <button
                                            className="flex w-full items-center gap-4 rounded-2xl border border-red-200 p-4 transition hover:bg-red-50"
                                        >
                                            <LogOut
                                                className="text-red-600"
                                                size={22}
                                            />

                                            <div className="text-left">
                                                <p className="font-semibold text-red-600">
                                                    
                                                    Logout
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    Sign out from your account
                                                </p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg">
                                    <h3 className="text-2xl font-bold">
                                        TravelMate
                                    </h3>

                                    <p className="mt-3 text-blue-100">
                                        Thank you for choosing TravelMate.
                                        Manage your bookings, wishlist and
                                        profile from one place.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </Layout>
    );
}

export default ProfilePage;