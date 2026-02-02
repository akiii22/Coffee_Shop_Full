import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <>
      {/* Sidebar - Hidden on mobile, visible on md+ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white shadow-lg transition-transform md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button (only for mobile) */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute right-4 top-4 text-white md:hidden"
        >
          <FaTimes size={24} />
        </button>

        <div className="flex justify-center p-6">
          <img src="/logo1.jpg" alt="logo" className="w-[130px] rounded-lg" />
        </div>

        <nav className="mt-10">
          <ul className="space-y-4 px-4">
            {[
              { to: "/", icon: <FaHome />, label: "Home" },
              { to: "/products", icon: <FaBox />, label: "Products" },
              { to: "/orders", icon: <FaShoppingCart />, label: "Orders" },
              { to: "/users", icon: <FaUsers />, label: "Users" },
            ].map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-md px-5 py-3 transition-all ${
                      isActive
                        ? "bg-yellow-500 text-white"
                        : "hover:bg-yellow-400"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {icon}
                  <span className="text-lg font-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
