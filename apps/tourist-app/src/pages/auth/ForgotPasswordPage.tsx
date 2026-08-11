import { Link, useNavigate } from "react-router-dom";

import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import authService from "../../services/auth/auth.service";
import { ROUTES } from "../../constants/routes";

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
});

type ForgotPasswordFormData =
    z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordPage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(
            forgotPasswordSchema
        ),
        defaultValues: {
            email: "",
        },
    });

    const forgotPasswordMutation =
        useMutation({
            mutationFn: (
                data: ForgotPasswordFormData
            ) =>
                authService.forgotPassword({
                    email: data.email,
                }),

            onSuccess: (
                response,
                data
            ) => {
                toast.success(
                    response.message
                );

                navigate(
                    ROUTES.RESET_PASSWORD,
                    {
                        state: {
                            email: data.email,
                        },
                    }
                );
            },

            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message ??
                        "Failed to send reset code"
                );
            },
        });

    const onSubmit = (
        data: ForgotPasswordFormData
    ) => {
        forgotPasswordMutation.mutate(
            data
        );
    };

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
                        Get Back To Your Journey
                    </h1>

                    <p className="mt-6 text-lg text-slate-200">
                        We'll send a secure verification
                        code to reset your password.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center bg-slate-50 px-6 py-10">
                <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
                    <Link
                        to={ROUTES.LOGIN}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft size={18} />

                        Back To Login
                    </Link>

                    <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                        <ShieldCheck
                            size={32}
                            className="text-blue-600"
                        />
                    </div>

                    <h1 className="mt-6 text-4xl font-black text-slate-900">
                        Forgot Password?
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Enter your registered email
                        address and we'll send you a
                        verification code.
                    </p>

                    <form
                        onSubmit={handleSubmit(
                            onSubmit
                        )}
                        className="mt-8 space-y-6"
                    >
                        <div>
                            <label className="mb-2 block font-medium">
                                Email Address
                            </label>

                            <div className="flex items-center rounded-xl border px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                <Mail
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="email"
                                    placeholder="Enter your registered email"
                                    className="w-full bg-transparent p-4 outline-none"
                                    {...register("email")}
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {
                                        errors.email
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={
                                forgotPasswordMutation.isPending
                            }
                            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {forgotPasswordMutation.isPending
                                ? "Sending Code..."
                                : "Send Reset Code"}
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

export default ForgotPasswordPage;