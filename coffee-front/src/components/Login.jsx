import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../api/auth";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await logIn(data);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid username or password";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f7f3ef]">
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-[#e8e0d9] bg-[#fffdf9] px-12 py-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-semibold text-[#4b3b2a]">Login</h1>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username Field */}
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-sm text-[#6b5b4a]">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="rounded-md border border-[#d6cfc7] bg-[#fdfaf6] px-4 py-2 text-[#4b3b2a] placeholder-[#b8a99a] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
              {...register("username", { required: "Username is required" })}
            />
            {errors?.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm text-[#6b5b4a]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
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
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-4 rounded-md bg-[#6b4f35] px-4 py-2 font-medium text-white transition hover:bg-[#5a3f28]"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-[#7a6b5a]">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#c5a880] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
