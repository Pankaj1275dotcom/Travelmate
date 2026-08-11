import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
}

function StatsCard({
    title,
    value,
    icon: Icon,
}: StatsCardProps) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {value}
                    </h2>
                </div>

                <div className="rounded-xl bg-blue-100 p-4">
                    <Icon
                        size={28}
                        className="text-blue-600"
                    />
                </div>
            </div>
        </div>
    );
}

export default StatsCard;