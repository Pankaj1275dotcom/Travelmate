function ProfileLoading() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-10 animate-pulse">
            <div className="overflow-hidden rounded-3xl bg-white shadow">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-cyan-500" />

                <div className="-mt-16 flex flex-col items-center px-8 pb-10">
                    <div className="h-32 w-32 rounded-full border-8 border-white bg-slate-200" />

                    <div className="mt-6 h-8 w-64 rounded bg-slate-200" />

                    <div className="mt-4 h-6 w-28 rounded-full bg-slate-200" />
                </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-white p-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-slate-200" />

                            <div className="flex-1">
                                <div className="h-4 w-24 rounded bg-slate-200" />

                                <div className="mt-3 h-6 w-40 rounded bg-slate-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProfileLoading;