import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Header({ setIsSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // ✅ Remove token
    toast.success("Logged out successfully!");
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="text-gray-800 md:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <FaBars size={24} />
      </button>

      {/* Dashboard Title */}
      <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

      {/* Admin Info + Logout */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, Admin</span>
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
