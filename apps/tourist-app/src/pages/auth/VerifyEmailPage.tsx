import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    Mail,
    RefreshCw,
    ShieldCheck,
} from "lucide-react";

import {
    useMutation,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import authService from "../../services/auth/auth.service";
import { ROUTES } from "../../constants/routes";

function VerifyEmailPage() {
    const navigate = useNavigate();

    const location = useLocation();

    const [otp, setOtp] =
        useState("");

    const email =
        location.state?.email ?? "";

    const verifyMutation =
        useMutation({
            mutationFn: () =>
                authService.verifyEmail({
                    email,
                    otp,
                }),

            onSuccess: (response) => {
                toast.success(
                    response.message
                );

                navigate(
                    ROUTES.LOGIN,
                    {
                        replace: true,
                    }
                );
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message ??
                        "Email verification failed"
                );
            },
        });

    const resendMutation =
        useMutation({
            mutationFn: () =>
                authService.resendVerification({
                    email,
                }),

            onSuccess: (response) => {
                toast.success(
                    response.message
                );
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message ??
                        "Failed to resend OTP"
                );
            },
        });

    const handleOtpChange = (
        value: string
    ) => {
        const numericValue =
            value.replace(/\D/g, "");

        if (
            numericValue.length <= 6
        ) {
            setOtp(
                numericValue
            );
        }
    };

    const handleVerify = (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        if (!email) {
            toast.error(
                "Email not found. Please register again."
            );

            navigate(
                ROUTES.REGISTER
            );

            return;
        }

        if (otp.length !== 6) {
            toast.error(
                "Please enter the 6-digit OTP"
            );

            return;
        }

        verifyMutation.mutate();
    };

    const handleResend = () => {
        if (!email) {
            toast.error(
                "Email not found. Please register again."
            );

            navigate(
                ROUTES.REGISTER
            );

            return;
        }

        resendMutation.mutate();
    };

    if (!email) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
                    <Mail
                        size={48}
                        className="mx-auto text-blue-600"
                    />

                    <h1 className="mt-6 text-2xl font-black text-slate-900">
                        Email Required
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Please register first to
                        verify your email address.
                    </p>

                    <Link
                        to={ROUTES.REGISTER}
                        className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Go To Register
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div
                className="relative hidden bg-cover bg-center lg:flex lg:items-center lg:justify-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 max-w-lg px-10 text-white">
                    <h1 className="text-5xl font-black leading-tight">
                        Secure Your TravelMate Account
                    </h1>

                    <p className="mt-6 text-lg text-slate-200">
                        Verify your email to continue
                        your journey with TravelMate.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center bg-slate-50 px-6 py-10">
                <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                        <ShieldCheck
                            size={32}
                            className="text-blue-600"
                        />
                    </div>

                    <h1 className="mt-6 text-4xl font-black text-slate-900">
                        Verify Email
                    </h1>

                    <p className="mt-3 text-slate-500">
                        We sent a 6-digit verification
                        code to
                    </p>

                    <p className="mt-1 break-all font-semibold text-slate-800">
                        {email}
                    </p>

                    <form
                        onSubmit={handleVerify}
                        className="mt-8"
                    >
                        <label className="mb-2 block font-medium">
                            Verification Code
                        </label>

                        <div className="flex items-center rounded-xl border px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <Mail
                                size={18}
                                className="text-slate-400"
                            />

                            <input
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                value={otp}
                                onChange={(event) =>
                                    handleOtpChange(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter 6-digit OTP"
                                className="w-full bg-transparent p-4 text-center text-xl font-bold tracking-[0.5em] outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={
                                verifyMutation.isPending
                            }
                            className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {verifyMutation.isPending
                                ? "Verifying..."
                                : "Verify Email"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-500">
                            Didn't receive the code?
                        </p>

                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={
                                resendMutation.isPending
                            }
                            className="mt-2 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-blue-400"
                        >
                            <RefreshCw
                                size={16}
                                className={
                                    resendMutation.isPending
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            {resendMutation.isPending
                                ? "Sending..."
                                : "Resend OTP"}
                        </button>
                    </div>

                    <p className="mt-8 text-center text-slate-500">
                        Already verified?{" "}

                        <Link
                            to={ROUTES.LOGIN}
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmailPage;