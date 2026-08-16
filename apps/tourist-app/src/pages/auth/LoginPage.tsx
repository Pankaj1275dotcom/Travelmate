import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import authService from "../../services/auth/auth.service";
import useAuth from "../../hooks/useAuth";

import type { LoginRequest } from "../../types/auth.types";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useMutation({
        mutationFn: (data: LoginRequest) =>
            authService.login(data),

        onSuccess: (response) => {
            login(
                response.data.user,
                response.data.token
            );

            toast.success(response.message);

            navigate("/");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                    "Login failed"
            );
        },
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return (        <div className="grid min-h-screen lg:grid-cols-2">
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
                        Welcome Back To TravelMate
                    </h1>

                    <p className="mt-6 text-lg text-slate-200">
                        Book hotels, guides and drivers from one platform.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center bg-slate-50 px-6 py-10">
                <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
                    <h2 className="text-4xl font-black text-slate-900">
                        Login
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Welcome back! Please login.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-10 space-y-6"
                    >
                        <div>
                            <label className="mb-2 block font-medium">
                                Email
                            </label>

                            <div className="flex items-center rounded-xl border px-4">
                                <Mail
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="w-full bg-transparent p-4 outline-none"
                                    {...register("email")}
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Password
                            </label>

                            <div className="flex items-center rounded-xl border px-4">
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
                                    placeholder="Enter password"
                                    className="w-full bg-transparent p-4 outline-none"
                                    {...register("password")}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {loginMutation.isPending
                                ? "Logging in..."
                                : "Login"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-500">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-blue-600"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;