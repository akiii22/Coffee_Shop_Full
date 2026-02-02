import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signup } from "../api/auth.js";

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success("Sign up successful");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f7f3ef]">
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-[#e8e0d9] bg-[#fffdf9] px-12 py-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-semibold text-[#4b3b2a]">Sign Up</h1>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-sm text-[#6b5b4a]">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="rounded-md border border-[#d6cfc7] bg-[#fdfaf6] px-4 py-2 text-[#4b3b2a] placeholder-[#b8a99a] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
              {...register("username", { required: "Username is required" })}
            />
            {errors?.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm text-[#6b5b4a]">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="rounded-md border border-[#d6cfc7] bg-[#fdfaf6] px-4 py-2 text-[#4b3b2a] placeholder-[#b8a99a] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm text-[#6b5b4a]">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="rounded-md border border-[#d6cfc7] bg-[#fdfaf6] px-4 py-2 text-[#4b3b2a] placeholder-[#b8a99a] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-1 text-sm text-[#6b5b4a]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="rounded-md border border-[#d6cfc7] bg-[#fdfaf6] px-4 py-2 text-[#4b3b2a] placeholder-[#b8a99a] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 rounded-md bg-[#6b4f35] px-4 py-2 font-medium text-white transition hover:bg-[#5a3f28]"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-[#7a6b5a]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#c5a880] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
