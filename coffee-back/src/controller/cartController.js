import {
  addCartProducts,
  getCartProducts,
  removeCartItem,
} from "../model/cart.js";

export const addToCart = async (req, res) => {
  try {
    const { product_id, quantity, size, price } = req.body;
    const account_id = req.user.id;
    const cartItem = await addCartProducts({
      account_id,
      product_id,
      quantity,
      size,
      price,
    });
    return res
      .status(201)
      .json({ message: "Item added to cart successfully", cartItem });
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to add item to cart", error: error.message });
  }
};

export const fetchCartItems = async (req, res) => {
  const account_id = req.user.id;
  try {
    const cartItems = await getCartProducts(account_id);
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch cart items", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const removeItem = await removeCartItem(cart_id);
    if (!removeItem)
      return res.status(404).json({ message: "Cart Items cannot find!" });
    return res.status(200).json({
      message: "Cart Item successfully removed from the cart",
      removeItem: removeItem,
    });
  } catch (error) {
    console.error("Error removing item from cart:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to remove item", error: error.message });
  }
};
