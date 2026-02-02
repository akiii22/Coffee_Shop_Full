import { useQuery } from "@tanstack/react-query";
import { FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { fetchDashboardStats } from "../api/dashBoard.js";

function DashboardCard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  if (isLoading)
    return <p className="text-center text-[#7b5b3e]">Loading dashboard...</p>;
  if (isError)
    return <p className="text-center text-red-500">{error.message}</p>;

  const stats = [
    {
      title: "Total Sales",
      value: `₱${data.totalSales.toLocaleString()}`,
      icon: <FaDollarSign />,
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: <FaShoppingCart />,
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      icon: <FaBox />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 rounded-xl border border-[#e2d2b4] bg-[#fffaf5] p-5 shadow-md transition hover:shadow-lg"
        >
          <div className="text-3xl text-[#c49a6c]">{stat.icon}</div>
          <div>
            <h2 className="text-lg font-semibold text-[#4b2e05]">
              {stat.title}
            </h2>
            <p className="text-xl font-bold text-[#7b5b3e]">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCard;
