import Logo from "./Logo";
import { TbMilkshake } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";

function DashBoardNavbar() {
  const [isToggle, setIsToggle] = useState(false);
  const navigate = useNavigate();

  const toggleOpenDashboard = () => setIsToggle(!isToggle);

  const loggingOut = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 z-10 w-full bg-[#f5efe6]/90 shadow-sm backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="text-[#4b3b2b] md:hidden">
          {isToggle ? (
            <FaTimes size={22} onClick={toggleOpenDashboard} />
          ) : (
            <FaBars size={22} onClick={toggleOpenDashboard} />
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-10 md:flex">
          {[
            {
              to: "/dashboard",
              label: "Flavors",
              icon: <TbMilkshake size={24} />,
            },
            {
              to: "/dashboard/cart",
              label: "Cart",
              icon: <AiOutlineShoppingCart size={24} />,
            },
            {
              to: "/dashboard/order",
              label: "Orders",
              icon: <IoBagCheckOutline size={24} />,
            },
          ].map(({ to, label, icon }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-[15px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#6d4c3d]"
                      : "text-[#7a6654] hover:text-[#6d4c3d]"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={loggingOut}
              className="flex items-center gap-2 text-[15px] font-medium text-[#7a6654] transition-colors hover:text-[#6d4c3d]"
            >
              <HiArrowRightOnRectangle size={24} />
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Drawer */}
      {isToggle && (
        <div className="fixed right-0 top-[70px] z-20 h-screen w-2/3 bg-[#4b3b2b]/95 shadow-xl md:hidden">
          <ul className="flex flex-col items-center justify-start gap-8 pt-12 text-lg text-[#f5efe6]">
            {[
              {
                to: "/dashboard",
                label: "Flavors",
                icon: <TbMilkshake size={28} />,
              },
              {
                to: "/dashboard/cart",
                label: "Cart",
                icon: <AiOutlineShoppingCart size={28} />,
              },
              {
                to: "/dashboard/order",
                label: "Orders",
                icon: <IoBagCheckOutline size={28} />,
              },
            ].map(({ to, label, icon }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 ${
                      isActive
                        ? "font-semibold text-[#d7c4a3]"
                        : "hover:text-[#d7c4a3]"
                    }`
                  }
                  onClick={toggleOpenDashboard}
                >
                  {icon}
                  {label}
                </NavLink>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  loggingOut();
                  toggleOpenDashboard();
                }}
                className="flex items-center gap-3 hover:text-[#d7c4a3]"
              >
                <HiArrowRightOnRectangle size={28} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default DashBoardNavbar;
