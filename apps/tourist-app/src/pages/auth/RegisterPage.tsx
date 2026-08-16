import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import authService from "../../services/auth/auth.service";
import { ROUTES } from "../../constants/routes";

const registerSchema = z
    .object({
        firstName: z.string().min(2, "First name is required"),

        lastName: z.string().min(2, "Last name is required"),

        email: z
            .string()
            .email("Enter a valid email address"),

        phone: z
            .string()
            .min(10, "Phone number must contain 10 digits"),

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
        confirmPassword: z.string(),

        role: z.literal("TOURIST"),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        }
    );

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),

        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "TOURIST",
        },
    });

    const registerMutation = useMutation({
        mutationFn: (data: RegisterFormData) =>
            authService.register({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: "TOURIST",
            }),

    onSuccess: (response) => {
    toast.success(response.message);

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
                    "Registration failed"
            );
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data);
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
                        Join TravelMate
                    </h1>

                    <p className="mt-6 text-lg text-slate-200">
                        Create your account and start exploring amazing places.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center bg-slate-50 px-6 py-10">
                <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-xl">
                    <h2 className="text-4xl font-black text-slate-900">
                        Register
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Create your TravelMate account.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 space-y-5"
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block font-medium">
                                    First Name
                                </label>

                                <div className="flex items-center rounded-xl border px-4">
                                    <User
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <input
                                        {...register("firstName")}
                                        className="w-full bg-transparent p-4 outline-none"
                                        placeholder="First Name"
                                    />
                                </div>

                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Last Name
                                </label>

                                <div className="flex items-center rounded-xl border px-4">
                                    <User
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <input
                                        {...register("lastName")}
                                        className="w-full bg-transparent p-4 outline-none"
                                        placeholder="Last Name"
                                    />
                                </div>

                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

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
                                    {...register("email")}
                                    className="w-full bg-transparent p-4 outline-none"
                                    placeholder="Email"
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Phone Number
                            </label>

                            <div className="flex items-center rounded-xl border px-4">
                                <Phone
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    {...register("phone")}
                                    className="w-full bg-transparent p-4 outline-none"
                                    placeholder="Phone Number"
                                />
                            </div>

                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone.message}
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
                                    {...register("password")}
                                    className="w-full bg-transparent p-4 outline-none"
                                    placeholder="Password"
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
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Confirm Password
                            </label>

                            <div className="flex items-center rounded-xl border px-4">
                                <Lock
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    {...register("confirmPassword")}
                                    className="w-full bg-transparent p-4 outline-none"
                                    placeholder="Confirm Password"
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
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>

                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {registerMutation.isPending
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-blue-600"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;