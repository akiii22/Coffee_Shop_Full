import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/order.js";

function RecentOrders() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recentOrders"],
    queryFn: fetchOrders,
  });

  if (isLoading)
    return (
      <p className="text-center text-[#7b5b3e]">Loading recent orders...</p>
    );
  if (isError)
    return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="rounded-xl border border-[#e2d2b4] bg-[#fffaf5] p-5 shadow-md">
      <h2 className="mb-3 text-xl font-semibold text-[#4b2e05]">
        Recent Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-[#7b5b3e]">
          No recent orders available.
        </p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f1e7d8] text-left text-[#4b2e05]">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-[#e2d2b4] transition hover:bg-[#f9f4ec]"
              >
                <td className="p-2 text-[#4b2e05]">#{order.id}</td>
                <td className="p-2 text-[#7b5b3e]">{order.customer_name}</td>
                <td className="p-2 text-[#7b5b3e]">
                  ₱{Number(order.total_price)}
                </td>
                <td
                  className={`p-2 font-medium ${
                    order.status.trim().toLowerCase() === "completed"
                      ? "text-[#4b7b4f]"
                      : order.status.trim().toLowerCase() === "pending"
                        ? "text-[#c49a6c]"
                        : "text-[#b85c5c]"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentOrders;
