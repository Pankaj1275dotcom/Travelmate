import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "../../hooks/useAuth";

const registerSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(
                2,
                "First name must be at least 2 characters"
            ),

        lastName: z
            .string()
            .trim()
            .min(
                2,
                "Last name must be at least 2 characters"
            ),

        email: z
            .email("Invalid email address")
            .trim()
            .toLowerCase(),

        phone: z
            .string()
            .regex(
                /^[6-9]\d{9}$/,
                "Invalid mobile number"
            ),

        password: z
            .string()
            .min(
                8,
                "Password must be at least 8 characters"
            )
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                "Password must contain uppercase, lowercase, number and special character"
            ),

        confirmPassword: z.string(),
    })
    .refine(
        (data) =>
            data.password ===
            data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

type RegisterFormData = z.infer<
    typeof registerSchema
>;

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(
            registerSchema
        ),
    });

    const {
        register: registerGuide,
        isRegistering,
    } = useAuth();

    const onSubmit = (
        data: RegisterFormData
    ) => {
        registerGuide({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: data.password,
        });
    };

    return (
        <div className="rounded-3xl bg-white p-10 shadow-xl">            <div className="mb-8 text-center">
                <h1 className="text-4xl font-black text-blue-600">
                    Guide Registration
                </h1>

                <p className="mt-2 text-slate-500">
                    Create your TravelMate Guide
                    account
                </p>
            </div>

            <form
                onSubmit={handleSubmit(
                    onSubmit
                )}
                className="space-y-5"
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium text-slate-700">
                            First Name
                        </label>

                        <input
                            {...register(
                                "firstName"
                            )}
                            placeholder="John"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {
                                errors.firstName
                                    ?.message
                            }
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium text-slate-700">
                            Last Name
                        </label>

                        <input
                            {...register(
                                "lastName"
                            )}
                            placeholder="Doe"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                        />

                        <p className="mt-1 text-sm text-red-500">
                            {
                                errors.lastName
                                    ?.message
                            }
                        </p>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block font-medium text-slate-700">
                        Email Address
                    </label>

                    <input
                        type="email"
                        {...register("email")}
                        placeholder="guide@example.com"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {errors.email?.message}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block font-medium text-slate-700">
                        Mobile Number
                    </label>

                    <input
                        {...register("phone")}
                        placeholder="9876543210"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {errors.phone?.message}
                    </p>
                </div>                <div>
                    <label className="mb-2 block font-medium text-slate-700">
                        Password
                    </label>

                    <input
                        type="password"
                        {...register("password")}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {errors.password?.message}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block font-medium text-slate-700">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        {...register(
                            "confirmPassword"
                        )}
                        placeholder="Confirm your password"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {
                            errors
                                .confirmPassword
                                ?.message
                        }
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isRegistering}
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isRegistering
                        ? "Creating Account..."
                        : "Register as Guide"}
                </button>

                <div className="text-center">
                    <p className="text-slate-600">
                        Already have an account?
                    </p>

                    <Link
                        to="/login"
                        className="mt-2 inline-block font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Login Here
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;