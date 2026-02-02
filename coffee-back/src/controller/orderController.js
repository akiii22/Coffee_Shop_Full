import {
  createOrder,
  addOrderItems,
  clearCart,
  getOrdersByAccountId,
} from "../model/order.js";
import { getCartProducts } from "../model/cart.js";

export const placeOrder = async (req, res) => {
  const account_id = req.user?.id || req.body.account_id;

  if (!account_id) {
    return res.status(400).json({ message: "User not authenticated" });
  }
  try {
    // Fetch cart items for the user
    const cartItems = await getCartProducts(account_id);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total price
    const totalPrice = cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );

    if (!totalPrice || isNaN(totalPrice)) {
      return res.status(400).json({ message: "Invalid total price" });
    }

    // Create the order
    const order = await createOrder({ account_id, total_price: totalPrice });

    // Prepare order items
    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      image_url: item.image_url,
    }));

    // Add order items to the database
    await addOrderItems(orderItems);

    // Clear the cart
    await clearCart(account_id);

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const account_id = req.user?.id || req.body.account_id;
    const orders = await getOrdersByAccountId(account_id);
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};
