import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/order";

function Order() {
  const {
    data: orderItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return <p className="mt-8 text-center text-[#6b5f52]">Loading orders...</p>;
  }

  if (error) {
    return (
      <p className="mt-8 text-center text-[#b3472a]">
        Error fetching orders: {error.message}
      </p>
    );
  }

  return (
    <div className="mt-24 flex w-full flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-bold tracking-wide text-[#3e2f1c]">
        Your Orders
      </h1>

      {orderItems.length > 0 ? (
        orderItems.map((order, index) => (
          <div
            key={index}
            className="mt-8 w-full max-w-2xl rounded-2xl bg-[#f7f4ef] p-6 shadow-md"
          >
            <div className="flex items-center justify-between border-b border-[#d7ccc0] pb-4">
              <h2 className="text-xl font-semibold text-[#3e2f1c]">
                Order #{order.order_id}
              </h2>
              <p
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  order.status === "pending"
                    ? "bg-[#e8e3dd] text-[#7a6a58]"
                    : "bg-[#dbe7dd] text-[#3b2f22]"
                }`}
              >
                {order.status}
              </p>
            </div>

            {/* Order Details */}
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-left font-medium text-[#4a3721]">
                  Total Price:
                </p>
                <p className="text-left font-semibold text-[#4a3721]">
                  ₱{order.total_price}
                </p>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="text-left text-lg font-semibold text-[#3e2f1c]">
                  Items:
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rounded-lg border border-[#e4ddd5] bg-[#fefcf9] p-4 shadow-sm">
                    <img
                      src={order.image_url}
                      alt={order.product_name}
                      className="h-20 w-20 rounded-md border border-[#d7ccc0] object-cover"
                    />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-[#3e2f1c]">
                        {order.product_name}
                      </p>
                      <p className="text-sm text-[#6b5f52]">
                        Size: {order.size}
                      </p>
                      <p className="text-sm text-[#6b5f52]">
                        Quantity: {order.quantity}
                      </p>
                      <p className="text-sm text-[#6b5f52]">
                        Price: ₱{order.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-8 text-[#6b5f52]">No orders found.</p>
      )}
    </div>
  );
}

export default Order;
