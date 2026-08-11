import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "../../hooks/useAuth";

const loginSchema = z.object({
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(1, "Password is required"),
});

type LoginFormData = z.infer<
    typeof loginSchema
>;

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(
            loginSchema
        ),
    });

    const {
        login,
        isLoggingIn,
    } = useAuth();

    const onSubmit = (
        data: LoginFormData
    ) => {
        login(data);
    };

    return (
        <div className="rounded-3xl bg-white p-10 shadow-xl">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-black text-blue-600">
                    Hotel Login
                </h1>

                <p className="mt-2 text-slate-500">
                    Sign in to your TravelMate
                    Hotel account
                </p>
            </div>

            <form
                onSubmit={handleSubmit(
                    onSubmit
                )}
                className="space-y-5"
            >
                <div>
                    <label className="mb-2 block font-medium text-slate-700">
                        Email Address
                    </label>

                    <input
                        type="email"
                        {...register("email")}
                        placeholder="hotel@example.com"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {errors.email?.message}
                    </p>
                </div>

                <div>
                    <label className="mb-2 block font-medium text-slate-700">
                        Password
                    </label>

                    <input
                        type="password"
                        {...register(
                            "password"
                        )}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                    />

                    <p className="mt-1 text-sm text-red-500">
                        {
                            errors.password
                                ?.message
                        }
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoggingIn
                        ? "Signing In..."
                        : "Login"}
                </button>

                <div className="text-center">
                    <p className="text-slate-600">
                        Don't have a Hotel account?
                    </p>

                    <Link
                        to="/register"
                        className="mt-2 inline-block font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Register Here
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;