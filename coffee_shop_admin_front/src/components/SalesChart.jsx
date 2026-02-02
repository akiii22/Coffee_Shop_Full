import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchSalesData } from "../api/sales";

function SalesChart() {
  const {
    data: salesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["salesData"],
    queryFn: fetchSalesData,
  });

  if (isLoading)
    return <p className="text-center text-[#7b5b3e]">Loading sales data...</p>;
  if (isError)
    return <p className="text-center text-red-500">{error.message}</p>;

  if (!salesData || salesData.length === 0) {
    return (
      <p className="text-center text-[#7b5b3e]">No sales data available yet.</p>
    );
  }

  return (
    <div className="rounded-xl border border-[#e2d2b4] bg-[#fffaf5] p-5 shadow-md">
      <h2 className="mb-3 text-xl font-semibold text-[#4b2e05]">
        Sales Overview
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <XAxis dataKey="month" stroke="#7b5b3e" />
            <YAxis stroke="#7b5b3e" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fffaf5",
                borderColor: "#e2d2b4",
              }}
            />
            <Bar dataKey="sales" fill="#c49a6c" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
