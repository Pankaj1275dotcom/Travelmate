import type { ReactNode } from "react";

interface ProfileInfoCardProps {
    icon: ReactNode;
    title: string;
    value: ReactNode;
}

function ProfileInfoCard({
    icon,
    title,
    value,
}: ProfileInfoCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {icon}
                </div>

                <div className="flex-1">
                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <div className="mt-1 break-words text-lg font-semibold text-slate-900">
                        {value}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfoCard;