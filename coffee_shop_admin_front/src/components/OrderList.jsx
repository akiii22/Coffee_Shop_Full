import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/order";
import OrderDetails from "./OrderDetails";

function OrderList() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading)
    return <p className="text-center text-[#7b5b3e]">Brewing orders...</p>;
  if (isError)
    return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-2xl border border-[#dcbf91] bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-[#4b2e05]">
          Active Orders
        </h2>
        <div className="space-y-3">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="cursor-pointer rounded-xl border border-[#e2d2b4] bg-[#fffaf5] p-4 transition hover:bg-[#f1e7d8] hover:shadow-sm"
              >
                <p className="text-lg font-semibold text-[#4b2e05]">
                  ☕ Order #{order.id}
                </p>
                <p className="text-[#7b5b3e]">
                  Status:{" "}
                  <span className="font-medium capitalize">{order.status}</span>
                </p>
                <p className="text-[#7b5b3e]">
                  Total Price: ₱{order.total_price}
                </p>
                <p className="text-sm text-[#a0794a]">
                  Created: {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-[#7b5b3e]">
              No orders yet — the coffee pot is empty ☕
            </p>
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

export default OrderList;
