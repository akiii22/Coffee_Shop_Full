import { useQuery } from "@tanstack/react-query";
import { fetchOrderItems } from "../api/order";
import OrderStatusUpdate from "./OrderStatusUpdate";

function OrderDetails({ order, onClose }) {
  const {
    data: orderItems,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orderItems", order.id],
    queryFn: () => fetchOrderItems(order.id),
  });

  if (isLoading)
    return (
      <p className="text-center text-[#7b5b3e]">Loading order details...</p>
    );
  if (isError)
    return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="w-[500px] rounded-2xl border border-[#dcbf91] bg-[#fffaf5] p-6 shadow-2xl">
        <h2 className="mb-4 text-2xl font-semibold text-[#4b2e05]">
          ☕ Order #{order.id}
        </h2>
        <p className="mb-2 text-[#7b5b3e]">
          <span className="font-medium">Status:</span> {order.status}
        </p>

        <div className="my-4 divide-y divide-[#e9dcc5]">
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3">
              <img
                src={item.image_url}
                alt={item.name}
                className="h-16 w-16 rounded-md border border-[#e2d2b4] object-cover"
              />
              <div>
                <p className="font-medium text-[#4b2e05]">{item.name}</p>
                <p className="text-sm text-[#7b5b3e]">Size: {item.size}</p>
                <p className="text-sm text-[#7b5b3e]">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-[#7b5b3e]">₱{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <OrderStatusUpdate orderId={order.id} currentStatus={order.status} />

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-[#c49a6c] px-4 py-2 font-medium text-white transition hover:bg-[#a37f55]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;
