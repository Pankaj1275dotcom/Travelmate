import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    Compass,
    Hotel,
    Mail,
    Map,
    Phone,
    Plane,
    ShieldCheck,
    Sparkles,
    Star,
    Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

/* ============================================================
   Data
============================================================ */

const benefits = [
    {
        title: "All-in-One Platform",
        description:
            "Explore stays, guides, and transportation together instead of switching between separate apps.",
        icon: Compass,
    },
    {
        title: "Trusted & Secure",
        description:
            "Plan your journey with confidence, backed by a platform built around reliability.",
        icon: ShieldCheck,
    },
    {
        title: "Local Expertise",
        description:
            "Connect with guides who know each destination and can help you experience it better.",
        icon: Users,
    },
    {
        title: "Easier Mobility",
        description:
            "Arrange transportation as a natural part of your travel planning experience.",
        icon: Map,
    },
    {
        title: "Curated Stays",
        description:
            "Find accommodation that fits your destination, budget, and travel plans.",
        icon: Hotel,
    },
    {
        title: "Rated Experiences",
        description:
            "Make decisions with confidence using clear, honest ratings across the platform.",
        icon: Star,
    },
];

const destinations = [
    "Paris",
    "Bali",
    "Tokyo",
    "Santorini",
    "Kyoto",
    "Jaipur",
    "Cape Town",
    "Lisbon",
    "Reykjavik",
    "Marrakech",
    "Queenstown",
    "Udaipur",
];

const stats: {
    value: number;
    suffix: string;
    decimals: number;
    label: string;
}[] = [
    { value: 500, suffix: "+", decimals: 0, label: "Curated Stays" },
    { value: 120, suffix: "+", decimals: 0, label: "Local Guides" },
    { value: 35, suffix: "+", decimals: 0, label: "Cities Connected" },
    { value: 4.8, suffix: "/5", decimals: 1, label: "Traveller Rating" },
];

const steps = [
    {
        num: "01",
        title: "Explore",
        icon: Compass,
        color: "blue",
        copy: "Start by exploring destinations and the travel services available for your journey.",
        cta: "Discover possibilities",
    },
    {
        num: "02",
        title: "Plan",
        icon: Map,
        color: "cyan",
        copy: "Choose the services that fit your travel plans and organize the important parts of your journey.",
        cta: "Organize your journey",
    },
    {
        num: "03",
        title: "Travel",
        icon: Sparkles,
        color: "violet",
        copy: "Once your plans are in place, focus on experiencing your destination and enjoying the journey.",
        cta: "Enjoy the experience",
    },
];

const colorMap: Record<
    string,
    { badge: string; iconBg: string; text: string; shadow: string; border: string }
> = {
    blue: {
        badge: "bg-blue-600",
        iconBg: "bg-blue-50 text-blue-600",
        text: "text-blue-600",
        shadow: "hover:shadow-blue-100",
        border: "hover:border-blue-200",
    },
    cyan: {
        badge: "bg-cyan-600",
        iconBg: "bg-cyan-50 text-cyan-600",
        text: "text-cyan-600",
        shadow: "hover:shadow-cyan-100",
        border: "hover:border-cyan-200",
    },
    violet: {
        badge: "bg-violet-600",
        iconBg: "bg-violet-50 text-violet-600",
        text: "text-violet-600",
        shadow: "hover:shadow-violet-100",
        border: "hover:border-violet-200",
    },
};

/* ============================================================
   Small hooks
============================================================ */

function useInView<T extends HTMLElement>(threshold = 0.2) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, inView] as const;
}

function useCountUp(end: number, inView: boolean, duration = 1500) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start: number | null = null;
        let raf = 0;

        const step = (ts: number) => {
            if (start === null) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setValue(progress * end);
            if (progress < 1) raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [inView, end, duration]);

    return value;
}

/* ============================================================
   Small helper components
============================================================ */

function Reveal({
    children,
    className = "",
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    const [ref, inView] = useInView<HTMLDivElement>();
    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-out ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function StatCounter({
    value,
    suffix,
    decimals,
    label,
    inView,
}: {
    value: number;
    suffix: string;
    decimals: number;
    label: string;
    inView: boolean;
}) {
    const count = useCountUp(value, inView, 1700);
    return (
        <div className="text-center">
            <p className="text-4xl font-black text-white sm:text-5xl">
                {count.toFixed(decimals)}
                <span className="text-blue-400">{suffix}</span>
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/60">
                {label}
            </p>
        </div>
    );
}

/* ============================================================
   Page
============================================================ */

function HomePage() {
    const spotlightRef = useRef<HTMLDivElement | null>(null);
    const [statsRef, statsInView] = useInView<HTMLDivElement>(0.4);
    const [stepsRef, stepsInView] = useInView<HTMLDivElement>(0.3);

    const handleHeroMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        if (spotlightRef.current) {
            spotlightRef.current.style.background = `radial-gradient(650px circle at ${x}% ${y}%, rgba(59,130,246,0.16), transparent 60%)`;
        }
    };

    const handleTiltMove = (e: React.MouseEvent<HTMLElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -7;
        const rotateY = ((x - rect.width / 2) / rect.width) * 7;
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    };

    const handleTiltLeave = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };

    return (
        <div className="min-h-screen overflow-hidden bg-slate-950">
            {/* Global animation styles */}
            <style>{`
                @keyframes tm-fade-up {
                    from { opacity: 0; transform: translateY(26px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes tm-float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(14px, -20px); }
                }
                @keyframes tm-float-rev {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-16px, 18px); }
                }
                @keyframes tm-marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes tm-shimmer {
                    to { background-position: 200% center; }
                }
                @keyframes tm-line-grow {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
                @keyframes tm-plane-fly {
                    0% { left: 0%; opacity: 0; transform: translate(-50%, -50%); }
                    12% { opacity: 1; }
                    88% { opacity: 1; }
                    100% { left: 100%; opacity: 0; transform: translate(-50%, -50%); }
                }
                @keyframes tm-pulse-ring {
                    0% { box-shadow: 0 0 0 0 rgba(96,165,250,0.45); }
                    70% { box-shadow: 0 0 0 16px rgba(96,165,250,0); }
                    100% { box-shadow: 0 0 0 0 rgba(96,165,250,0); }
                }
                .tm-hero-in { animation: tm-fade-up 0.9s cubic-bezier(.22,1,.36,1) both; }
                .tm-blob-a { animation: tm-float 9s ease-in-out infinite; }
                .tm-blob-b { animation: tm-float-rev 11s ease-in-out infinite; }
                .tm-blob-c { animation: tm-float 13s ease-in-out infinite; }
                .tm-marquee-track { animation: tm-marquee 32s linear infinite; }
                .tm-marquee-track:hover { animation-play-state: paused; }
                .tm-shimmer {
                    background: linear-gradient(90deg, #60a5fa, #22d3ee, #a78bfa, #60a5fa);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: tm-shimmer 5s linear infinite;
                }
                .tm-line-grow { transform-origin: left center; animation: tm-line-grow 1.4s ease-out forwards; }
                .tm-plane { animation: tm-plane-fly 2.4s ease-in-out forwards; }
                .tm-pulse { animation: tm-pulse-ring 2.4s ease-out infinite; }
                .tm-tilt { transition: transform 0.2s ease-out; }

                @media (prefers-reduced-motion: reduce) {
                    .tm-hero-in, .tm-blob-a, .tm-blob-b, .tm-blob-c, .tm-marquee-track,
                    .tm-shimmer, .tm-line-grow, .tm-plane, .tm-pulse, .tm-tilt {
                        animation: none !important;
                        transition: none !important;
                    }
                }
            `}</style>

            <Navbar />

            {/* =========================
                HERO SECTION
            ========================== */}
            <section
                onMouseMove={handleHeroMove}
                className="relative isolate min-h-[820px] overflow-hidden bg-slate-950 px-6 pb-24 pt-16 text-white sm:px-10 lg:px-16 lg:pt-24"
            >
                {/* Cursor-reactive spotlight */}
                <div
                    ref={spotlightRef}
                    className="pointer-events-none absolute inset-0 transition-[background] duration-300"
                />

                {/* Floating ambient blobs */}
                <div className="tm-blob-a pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
                <div className="tm-blob-b pointer-events-none absolute -left-32 top-64 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="tm-blob-c pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />

                {/* Decorative grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                    }}
                />

                <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
                    {/* Badge */}
                    <div
                        className="tm-hero-in mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl transition duration-300 hover:border-blue-400/40 hover:bg-white/10"
                        style={{ animationDelay: "0ms" }}
                    >
                        <Sparkles size={16} className="text-blue-400" />
                        <span>Your journey starts in one place</span>
                    </div>

                    {/* Heading */}
                    <h1
                        className="tm-hero-in max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl"
                        style={{ animationDelay: "90ms" }}
                    >
                        Travel smarter.
                        <span className="tm-shimmer mt-2 block">Experience more.</span>
                    </h1>

                    {/* Description */}
                    <p
                        className="tm-hero-in mt-8 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg"
                        style={{ animationDelay: "180ms" }}
                    >
                        TravelMate brings the important parts of your journey together
                        in one simple platform. Discover stays, connect with local
                        guides, and arrange transportation without jumping between
                        multiple services.
                    </p>

                    {/* Buttons */}
                    <div
                        className="tm-hero-in mt-10 flex flex-col items-center gap-4 sm:flex-row"
                        style={{ animationDelay: "270ms" }}
                    >
                        <Link
                            to="/hotels"
                            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20"
                        >
                            Start Exploring
                            <ArrowRight
                                size={19}
                                className="transition duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <a
                            href="#about"
                            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                        >
                            Discover TravelMate
                            <ChevronDown size={19} />
                        </a>
                    </div>

                    {/* Information pills */}
                    <div
                        className="tm-hero-in mt-16 grid w-full max-w-4xl gap-4 md:grid-cols-3"
                        style={{ animationDelay: "360ms" }}
                    >
                        {[
                            {
                                icon: Hotel,
                                iconClass: "bg-blue-500/15 text-blue-400",
                                title: "Comfortable Stays",
                                copy: "Find accommodation that fits your destination and travel plans.",
                            },
                            {
                                icon: Users,
                                iconClass: "bg-cyan-500/15 text-cyan-400",
                                title: "Local Expertise",
                                copy: "Connect with guides who can help you experience a destination better.",
                            },
                            {
                                icon: Map,
                                iconClass: "bg-violet-500/15 text-violet-400",
                                title: "Easier Mobility",
                                copy: "Arrange transportation as part of your travel planning experience.",
                            },
                        ].map((pill) => (
                            <div
                                key={pill.title}
                                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.07]"
                            >
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${pill.iconClass}`}
                                >
                                    <pill.icon size={23} />
                                </div>
                                <h3 className="mt-5 text-lg font-bold">{pill.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    {pill.copy}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Scroll hint */}
                    <div className="mt-16 flex flex-col items-center gap-3 text-slate-500">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                            Explore below
                        </span>
                        <div className="h-12 w-7 rounded-full border border-white/15 p-1">
                            <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" />
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
                DESTINATION MARQUEE
            ========================== */}
            <div className="relative overflow-hidden border-y border-white/5 bg-slate-950 py-5">
                <div className="tm-marquee-track flex w-max gap-10 whitespace-nowrap">
                    {[...destinations, ...destinations].map((city, i) => (
                        <span
                            key={`${city}-${i}`}
                            className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
                        >
                            <Compass size={14} className="text-blue-500" />
                            {city}
                        </span>
                    ))}
                </div>
            </div>

            {/* =========================
                STATS BAR (floating)
            ========================== */}
            <div className="relative bg-slate-950 px-6 pb-24 pt-4 sm:px-10 lg:px-16">
                <div
                    ref={statsRef}
                    className="mx-auto grid max-w-6xl grid-cols-2 gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12 lg:grid-cols-4"
                >
                    {stats.map((s) => (
                        <StatCounter key={s.label} {...s} inView={statsInView} />
                    ))}
                </div>
            </div>

            {/* =========================
                ABOUT SECTION
            ========================== */}
            <section
                id="about"
                className="relative bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
            >
                <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
                    {/* Left content */}
                    <Reveal>
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                            <Compass size={16} />
                            About TravelMate
                        </div>

                        <h2 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                            One platform for a
                            <span className="text-blue-600"> better travel experience.</span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                            Planning a journey should not mean switching between multiple
                            platforms for accommodation, local support, and transportation.
                        </p>
                        <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                            TravelMate is designed to bring these important travel
                            services together in one connected experience, making trip
                            planning simpler and easier to manage.
                        </p>

                        <div className="mt-10 space-y-5">
                            {[
                                {
                                    icon: CheckCircle2,
                                    iconClass: "bg-blue-50 text-blue-600",
                                    title: "Simple travel planning",
                                    copy: "Explore travel services without jumping between different platforms.",
                                },
                                {
                                    icon: ShieldCheck,
                                    iconClass: "bg-cyan-50 text-cyan-600",
                                    title: "A connected experience",
                                    copy: "Manage important parts of your journey from one travel platform.",
                                },
                                {
                                    icon: Sparkles,
                                    iconClass: "bg-violet-50 text-violet-600",
                                    title: "Built around the journey",
                                    copy: "From planning to completing your trip, TravelMate is designed around the traveller experience.",
                                },
                            ].map((point) => (
                                <div key={point.title} className="flex items-start gap-4">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${point.iconClass}`}
                                    >
                                        <point.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            {point.title}
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-500">
                                            {point.copy}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Right visual */}
                    <Reveal delay={150} className="relative min-h-[580px]">
                        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-blue-600 via-blue-700 to-violet-800" />
                        <div className="tm-blob-a pointer-events-none absolute left-8 top-8 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
                        <div className="tm-blob-b pointer-events-none absolute bottom-8 right-8 h-48 w-48 rounded-full bg-violet-300/20 blur-3xl" />

                        <div className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-100">
                                        Your journey
                                    </p>
                                    <h3 className="mt-1 text-2xl font-black text-white">
                                        Plan. Travel. Explore.
                                    </h3>
                                </div>
                                <div className="tm-pulse flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-lg">
                                    <Compass size={26} />
                                </div>
                            </div>

                            <div className="mt-10 space-y-5">
                                {[
                                    {
                                        icon: Map,
                                        iconClass: "bg-blue-400/20 text-blue-100",
                                        title: "Choose your destination",
                                        copy: "Start with where you want to go.",
                                    },
                                    {
                                        icon: Compass,
                                        iconClass: "bg-cyan-400/20 text-cyan-100",
                                        title: "Organize your journey",
                                        copy: "Explore the services available for your trip.",
                                    },
                                    {
                                        icon: Sparkles,
                                        iconClass: "bg-violet-400/20 text-violet-100",
                                        title: "Enjoy the experience",
                                        copy: "Focus more on the journey and less on managing different services.",
                                    },
                                ].map((row) => (
                                    <div
                                        key={row.title}
                                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 transition duration-300 hover:bg-white/15"
                                    >
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${row.iconClass}`}
                                        >
                                            <row.icon size={21} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{row.title}</p>
                                            <p className="mt-1 text-sm text-blue-100/70">
                                                {row.copy}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute -right-3 top-12 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                            <Star size={20} className="fill-amber-400 text-amber-400" />
                        </div>

                        <div className="absolute -bottom-5 left-10 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Everything connected
                                </p>
                                <p className="text-xs text-slate-500">
                                    One journey, one platform
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* =========================
                HOW IT WORKS SECTION
            ========================== */}
            <section className="relative overflow-hidden bg-slate-50 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
                <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-100/60 blur-[120px]" />

                <div className="relative mx-auto max-w-7xl">
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
                            <Sparkles size={16} />
                            How it works
                        </div>
                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                            From an idea
                            <span className="text-blue-600"> to your journey.</span>
                        </h2>
                        <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                            TravelMate helps you move through the important stages of
                            planning your trip in a simple and connected way.
                        </p>
                    </Reveal>

                    {/* Steps + flight path */}
                    <div ref={stepsRef} className="relative mt-20 grid gap-8 lg:grid-cols-3">
                        <div
                            className={`pointer-events-none absolute left-[16%] right-[16%] top-20 hidden h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent lg:block ${
                                stepsInView ? "tm-line-grow" : "scale-x-0"
                            }`}
                        />
                        {stepsInView && (
                            <div
                                className="tm-plane pointer-events-none absolute top-20 hidden h-6 w-6 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg lg:flex"
                                style={{ left: "16%" }}
                            >
                                <Plane size={13} className="rotate-90" />
                            </div>
                        )}

                        {steps.map((step, i) => {
                            const c = colorMap[step.color];
                            return (
                                <Reveal key={step.title} delay={i * 120} className="relative">
                                    <div
                                        onMouseMove={handleTiltMove}
                                        onMouseLeave={handleTiltLeave}
                                        className={`tm-tilt relative h-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm ${c.border} ${c.shadow} hover:shadow-2xl`}
                                    >
                                        <div
                                            className={`absolute -top-4 left-8 flex h-10 min-w-10 items-center justify-center rounded-full border-4 border-slate-50 px-3 text-sm font-black text-white ${c.badge}`}
                                        >
                                            {step.num}
                                        </div>

                                        <div
                                            className={`mt-5 flex h-16 w-16 items-center justify-center rounded-2xl transition duration-500 ${c.iconBg}`}
                                        >
                                            <step.icon size={30} />
                                        </div>

                                        <h3 className="mt-8 text-2xl font-black text-slate-900">
                                            {step.title}
                                        </h3>
                                        <p className="mt-4 leading-7 text-slate-500">
                                            {step.copy}
                                        </p>

                                        <div
                                            className={`mt-8 flex items-center gap-2 text-sm font-bold ${c.text}`}
                                        >
                                            {step.cta}
                                            <ArrowRight size={17} />
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    {/* Bottom message */}
                    <Reveal
                        delay={200}
                        className="mx-auto mt-16 flex max-w-4xl flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white">
                                <CheckCircle2 size={26} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Designed for simpler travel planning
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Explore, organize, and manage your journey from one
                                    platform.
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/hotels"
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-600"
                        >
                            Start exploring
                            <ArrowRight size={17} />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* =========================
                WHY TRAVELMATE
            ========================== */}
            <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white sm:px-10 lg:px-16">
                <div className="tm-blob-a pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="tm-blob-b pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">
                    <Reveal className="max-w-3xl">
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-300">
                            WHY TRAVELMATE
                        </span>
                        <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                            Travel planning should feel exciting,
                            <span className="block text-blue-400">not complicated.</span>
                        </h2>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            TravelMate is designed to make the journey from planning to
                            travelling more organized, simple and convenient.
                        </p>
                    </Reveal>

                    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <Reveal key={benefit.title} delay={index * 80}>
                                    <article
                                        onMouseMove={handleTiltMove}
                                        onMouseLeave={handleTiltLeave}
                                        className="tm-tilt group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-blue-400/40 hover:bg-white/[0.07]"
                                    >
                                        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-blue-500/20" />

                                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 transition duration-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                                            <Icon size={28} strokeWidth={2} />
                                        </div>

                                        <h3 className="relative mt-7 text-xl font-bold text-white">
                                            {benefit.title}
                                        </h3>
                                        <p className="relative mt-3 leading-7 text-slate-400">
                                            {benefit.description}
                                        </p>
                                    </article>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================
                OUR PURPOSE
            ========================== */}
            <section className="px-6 py-24 sm:px-10 lg:px-16">
                <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
                    <Reveal>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                            OUR PURPOSE
                        </span>
                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                            Built around the actual travel experience.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Planning a trip often means moving between multiple
                            platforms, comparing different options and managing several
                            bookings separately.
                        </p>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            TravelMate focuses on bringing important travel services
                            into a more connected experience, helping users plan and
                            manage their journey with greater clarity.
                        </p>
                    </Reveal>

                    <Reveal
                        delay={150}
                        className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-950 p-8 text-white shadow-2xl sm:p-12"
                    >
                        <div className="tm-blob-c pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative">
                            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">
                                THE IDEA
                            </p>
                            <blockquote className="mt-8 text-3xl font-bold leading-tight sm:text-4xl">
                                &ldquo;One place to explore, organize and manage important
                                parts of your travel experience.&rdquo;
                            </blockquote>
                            <div className="mt-12 h-px w-full bg-white/20" />
                            <p className="mt-8 max-w-md leading-7 text-blue-100">
                                TravelMate is being developed with the goal of creating a
                                smoother and more connected digital experience for
                                travellers.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* =========================
                CONTACT US
            ========================== */}
            <section id="contact" className="bg-slate-50 px-6 py-24 sm:px-10 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                            CONTACT US
                        </span>
                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                            Have a question or want to connect?
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            We would love to hear from you. Feel free to contact us for
                            questions, feedback or any information related to
                            TravelMate.
                        </p>
                    </Reveal>

                    <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
                        <Reveal delay={60}>
                            <a
                                href="tel:+918824351656"
                                className="group flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                            >
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                                    <Phone size={26} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Phone
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        +91 88243 51656
                                    </p>
                                </div>
                            </a>
                        </Reveal>

                        <Reveal delay={140}>
                            <a
                                href="mailto:sainipankaj9456@gmail.com"
                                className="group flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                            >
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                                    <Mail size={26} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Email
                                    </p>
                                    <p className="mt-1 break-all text-lg font-bold text-slate-900">
                                        sainipankaj9456@gmail.com
                                    </p>
                                </div>
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =========================
                FINAL CTA
            ========================== */}
            <section className="relative overflow-hidden bg-white px-6 py-24 sm:px-10 lg:px-16">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-3xl" />

                <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 text-center shadow-2xl sm:px-16 sm:py-20">
                    <div className="tm-blob-a pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="tm-blob-b pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

                    <div className="relative">
                        <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                            Ready to explore your next destination?
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            Discover destinations, explore travel options and manage
                            your journey with TravelMate.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                to="/hotels"
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/30 transition duration-300 hover:scale-105 hover:bg-blue-500"
                            >
                                Start Exploring
                                <ArrowRight size={20} />
                            </Link>

                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-4 font-bold text-white transition duration-300 hover:border-white/30 hover:bg-white/10"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}

export default HomePage;