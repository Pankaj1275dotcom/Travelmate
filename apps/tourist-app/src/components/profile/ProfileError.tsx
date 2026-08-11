import { AlertTriangle } from "lucide-react";

interface ProfileErrorProps {
    message?: string;
}

function ProfileError({
    message = "Failed to load your profile. Please try again.",
}: ProfileErrorProps) {
    return (
        <section className="mx-auto max-w-5xl px-6 py-16">
            <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center shadow-sm">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle
                        size={40}
                        className="text-red-600"
                    />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-red-600">
                    Unable to load profile
                </h2>

                <p className="mt-3 text-slate-600">
                    {message}
                </p>
            </div>
        </section>
    );
}

export default ProfileError;