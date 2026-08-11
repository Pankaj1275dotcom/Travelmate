import { User, Pencil, Copy } from "lucide-react";
import toast from "react-hot-toast";

import type { User as UserType } from "../../types/auth.types";
import ProfileStatusBadge from "./ProfileStatusBadge";

interface ProfileHeaderProps {
    user: UserType;
}

function ProfileHeader({ user }: ProfileHeaderProps) {
    const copyUserId = async () => {
        await navigator.clipboard.writeText(user.id);

        toast.success("User ID copied successfully");
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-6">
                    {user.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt={user.firstName}
                            className="h-28 w-28 rounded-full border object-cover"
                        />
                    ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-100">
                            <User
                                size={52}
                                className="text-blue-600"
                            />
                        </div>
                    )}

                    <div>
                        <p className="text-sm font-medium text-blue-600">
                            My Account
                        </p>

                        <h1 className="mt-1 text-4xl font-black text-slate-900">
                            {user.firstName} {user.lastName}
                        </h1>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                                {user.role.replaceAll("_", " ")}
                            </span>

                            <ProfileStatusBadge
                                status={user.approvalStatus}
                            />
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
                                <p className="text-xs text-slate-500">
                                    User ID
                                </p>

                                <p className="font-mono text-sm font-semibold text-slate-700">
                                    {user.id}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={copyUserId}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                <Copy size={16} />
                                Copy ID
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    <Pencil size={18} />
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

export default ProfileHeader;