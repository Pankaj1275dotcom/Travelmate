import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    Eye,
    EyeOff,
    KeyRound,
    Lock,
    Mail,
    ShieldCheck,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import authService from "../../services/auth/auth.service";
import { ROUTES } from "../../constants/routes";

const resetPasswordSchema = z
    .object({
        otp: z
            .string()
            .regex(
                /^\d{6}$/,
                "OTP must be 6 digits"
            ),

        password: z
            .string()
            .min(
                8,
                "Password must be at least 8 characters"
            )
            .max(
                100,
                "Password cannot exceed 100 characters"
            )
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                "Password must contain uppercase, lowercase, number and special character"
            ),

        confirmPassword: z
            .string()
            .min(
                1,
                "Please confirm your password"
            ),
    })
    .refine(
        (data) =>
            data.password ===
            data.confirmPassword,
        {
            message:
                "Passwords do not match",
            path: [
                "confirmPassword",
            ],
        }
    );

type ResetPasswordFormData =
    z.infer<typeof resetPasswordSchema>;

function ResetPasswordPage() {
    const navigate = useNavigate();

    const location = useLocation();

    const email =
        location.state?.email ?? "";

    const [
        showPassword,
        setShowPassword,
    ] = useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(
            resetPasswordSchema
        ),
        defaultValues: {
            otp: "",
            password: "",
            confirmPassword: "",
        },
    });

    const resetPasswordMutation =
        useMutation({
            mutationFn: (
                data: ResetPasswordFormData
            ) =>
                authService.resetPassword({
                    email,
                    otp: data.otp,
                    password: data.password,
                }),

            onSuccess: (
                response
            ) => {
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
                        "Failed to reset password"
                );
            },
        });

    const onSubmit = (
        data: ResetPasswordFormData
    ) => {
        if (!email) {
            toast.error(
                "Email not found. Please start the password reset process again."
            );

            navigate(
                ROUTES.FORGOT_PASSWORD
            );

            return;
        }

        resetPasswordMutation.mutate(
            data
        );
    };

    const handleOtpChange = (
        value: string
    ) => {
        const numericValue =
            value.replace(/\D/g, "");

        if (
            numericValue.length <= 6
        ) {
            setValue(
                "otp",
                numericValue,
                {
                    shouldValidate: true,
                }
            );
        }
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
                        Please enter your registered
                        email first to reset your
                        password.
                    </p>

                    <Link
                        to={
                            ROUTES.FORGOT_PASSWORD
                        }
                        className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Forgot Password
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
                        Create A New Password
                    </h1>

                    <p className="mt-6 text-lg text-slate-200">
                        Use the verification code sent
                        to your email and choose a
                        strong new password.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center bg-slate-50 px-6 py-10">
                <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                        <KeyRound
                            size={32}
                            className="text-blue-600"
                        />
                    </div>

                    <h1 className="mt-6 text-4xl font-black text-slate-900">
                        Reset Password
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Enter the verification code
                        sent to:
                    </p>

                    <p className="mt-1 break-all font-semibold text-slate-800">
                        {email}
                    </p>

                    <form
                        onSubmit={handleSubmit(
                            onSubmit
                        )}
                        className="mt-8 space-y-6"
                    >
                        <div>
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
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full bg-transparent p-4 text-center text-xl font-bold tracking-[0.5em] outline-none"
                                    {...register(
                                        "otp"
                                    )}
                                    onChange={(
                                        event
                                    ) =>
                                        handleOtpChange(
                                            event.target
                                                .value
                                        )
                                    }
                                />
                            </div>

                            {errors.otp && (
                                <p className="mt-2 text-sm text-red-500">
                                    {
                                        errors.otp
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                New Password
                            </label>

                            <div className="flex items-center rounded-xl border px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                <Lock
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter new password"
                                    className="w-full bg-transparent p-4 outline-none"
                                    {...register(
                                        "password"
                                    )}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            size={20}
                                        />
                                    ) : (
                                        <Eye
                                            size={20}
                                        />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-500">
                                    {
                                        errors.password
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Confirm New Password
                            </label>

                            <div className="flex items-center rounded-xl border px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                <ShieldCheck
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm new password"
                                    className="w-full bg-transparent p-4 outline-none"
                                    {...register(
                                        "confirmPassword"
                                    )}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff
                                            size={20}
                                        />
                                    ) : (
                                        <Eye
                                            size={20}
                                        />
                                    )}
                                </button>
                            </div>

                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-500">
                                    {
                                        errors
                                            .confirmPassword
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={
                                resetPasswordMutation.isPending
                            }
                            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {resetPasswordMutation.isPending
                                ? "Resetting Password..."
                                : "Reset Password"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-500">
                        Remember your password?{" "}

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

export default ResetPasswordPage;