import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { fetchOrders } from "../api/order.js";

const COLORS = ["#a67b5b", "#c49a6c", "#e2d2b4"];

function OrderPieChart() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading)
    return <p className="text-center text-[#7b5b3e]">Loading order data...</p>;
  if (isError)
    return <p className="text-center text-red-500">{error.message}</p>;

  const orderCounts = orders.reduce(
    (acc, order) => {
      const status = order.status.trim().toLowerCase();
      if (status === "completed") acc.completed += 1;
      else if (status === "pending") acc.pending += 1;
      else if (status === "canceled") acc.canceled += 1;
      return acc;
    },
    { completed: 0, pending: 0, canceled: 0 },
  );

  const orderData = [
    { name: "Completed", value: orderCounts.completed, color: COLORS[0] },
    { name: "Pending", value: orderCounts.pending, color: COLORS[1] },
    { name: "Canceled", value: orderCounts.canceled, color: COLORS[2] },
  ];

  const hasOrders = orderData.some((order) => order.value > 0);

  return (
    <div className="rounded-xl border border-[#e2d2b4] bg-[#fffaf5] p-5 shadow-md">
      <h2 className="mb-3 text-xl font-semibold text-[#4b2e05]">
        Order Distribution
      </h2>
      {!hasOrders ? (
        <p className="text-center text-[#7b5b3e]">No orders yet.</p>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                paddingAngle={4}
              >
                {orderData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fffaf5",
                  borderColor: "#e2d2b4",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default OrderPieChart;
