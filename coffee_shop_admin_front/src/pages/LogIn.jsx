import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { adminLogin } from "../api/auth.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await adminLogin({ username, password });
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#f5efe6]">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-xl bg-[#fffaf5] p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-3xl font-semibold text-[#4b3b2b]">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded-md border border-[#d3c4b3] bg-[#fffdfb] p-3 text-[#4b3b2b] placeholder:text-[#b7a89a] focus:border-[#b59b84] focus:outline-none focus:ring-2 focus:ring-[#b59b84]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-md border border-[#d3c4b3] bg-[#fffdfb] p-3 text-[#4b3b2b] placeholder:text-[#b7a89a] focus:border-[#b59b84] focus:outline-none focus:ring-2 focus:ring-[#b59b84]"
          required
        />

        <button
          type="submit"
          className="w-full rounded-md bg-[#b59b84] p-3 font-medium text-white transition duration-200 hover:bg-[#a08872] focus:outline-none focus:ring-2 focus:ring-[#b59b84]"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
