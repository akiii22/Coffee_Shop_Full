import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../api/order";
import { toast } from "react-hot-toast";

function OrderStatusUpdate({ orderId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStatus) => updateOrderStatus(orderId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order status updated!");
    },
    onError: () => toast.error("Failed to update order status."),
  });

  const handleUpdate = () => {
    setLoading(true);
    mutation.mutate(status, {
      onSettled: () => setLoading(false),
    });
  };

  return (
    <div className="mt-4">
      <label className="mb-1 block font-medium text-[#4b2e05]">
        Update Status
      </label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full rounded-md border border-[#e2d2b4] bg-white p-2 text-[#4b2e05] focus:border-[#c49a6c] focus:ring-2 focus:ring-[#c49a6c]"
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className={`mt-3 w-full rounded-md px-4 py-2 font-medium transition ${
          loading
            ? "cursor-not-allowed bg-gray-300 text-gray-700"
            : "bg-[#c49a6c] text-white hover:bg-[#a37f55]"
        }`}
      >
        {loading ? "Updating..." : "Update Status"}
      </button>
    </div>
  );
}

export default OrderStatusUpdate;
