import {
  getAllOrders,
  getOrderItemsByOrderId,
  updateOrderStatus,
} from "../model/order.js";

export const fetchOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const fetchOrderItems = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderItems = await getOrderItemsByOrderId(orderId);
    res.status(200).json(orderItems);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const updateOrder = await updateOrderStatus(orderId, status);
    res.status(200).json(updateOrder);
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
