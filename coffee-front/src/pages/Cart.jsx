import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCartItems, removeItemFromCart } from "../api/cart";
import { placeOrder } from "../api/order";
import ConfirmationModal from "../components/ConfirmationModal";
import GCashQRModal from "../components/GCashQRModal";
import toast from "react-hot-toast";

function Cart() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isGCashModalOpen, setIsGCashModalOpen] = useState(false);

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
  });

  const { mutate: removeItem } = useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const { mutate: placeOrderMutation, isLoading: isPlacingOrder } = useMutation(
    {
      mutationFn: placeOrder,
      onSuccess: () => {
        toast.success("Order placed successfully!");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
      onError: (error) => {
        alert(`Error placing order: ${error.message}`);
      },
    },
  );

  const handleRemove = (cart_id) => {
    setItemToRemove(cart_id);
    setIsModalOpen(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeItem(itemToRemove);
      setIsModalOpen(false);
      setItemToRemove(null);
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    placeOrderMutation();
  };

  if (isLoading) return <p>Loading your cart...</p>;
  if (error) return <p>Error fetching cart items: {error.message}</p>;

  return (
    <div className="mt-[10rem] flex items-center justify-center text-center">
      <div className="flex w-[80vh] flex-col rounded-2xl bg-[#f7f4ef] px-4 py-8 shadow-md">
        <h1 className="my-4 text-4xl font-bold text-[#3e2f1c]">
          {cartItems.length === 0 ? "Your cart is empty" : "Your Cart"}
        </h1>

        <div className="flex flex-col gap-4 rounded-md bg-[#ede7e1] px-6 py-4">
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <div
                key={item.cart_id}
                className="flex items-center justify-between rounded-md bg-[#fefcf9] p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="w-[100px] rounded-md border border-[#d7ccc0]"
                  />
                  <div className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold text-[#3e2f1c]">
                      {item.product_name}
                    </h2>
                    <p className="text-[#6b5f52]">Size: {item.size}</p>
                    <p className="text-[#6b5f52]">Qty: {item.quantity}</p>
                    <p className="font-semibold text-[#4a3721]">
                      ₱{item.price}
                    </p>
                  </div>
                </div>
                <button
                  className="text-[#b3472a] hover:text-[#7a2b16]"
                  onClick={() => handleRemove(item.cart_id)}
                >
                  <MdOutlineCancel size={24} />
                </button>
              </div>
            ))}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-6 flex flex-col items-center">
            <p className="mb-4 text-lg font-medium text-[#4a3721]">
              Total: ₱
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0,
              )}
            </p>
            <button
              className="mb-3 w-full rounded-lg bg-[#4a3721] px-6 py-3 font-semibold text-[#fefcf9] shadow-md transition-all hover:bg-[#3b2b17]"
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </button>

            <button
              className="w-full rounded-lg border border-[#4a3721] px-6 py-3 font-semibold text-[#4a3721] transition-all hover:bg-[#4a3721] hover:text-[#fefcf9]"
              onClick={() => setIsGCashModalOpen(true)}
            >
              Pay via GCash
            </button>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmRemove}
        message="Are you sure you want to remove this item from your cart?"
      />

      <GCashQRModal
        isOpen={isGCashModalOpen}
        onClose={() => setIsGCashModalOpen(false)}
        amount={cartItems}
      />
    </div>
  );
}

export default Cart;
