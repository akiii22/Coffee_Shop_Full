import { MdAddShoppingCart } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { addToCart } from "../api/cart";
import { useState } from "react";
import SuccessModal from "../components/SuccessModal";

function FlavorsIn() {
  const [quantities, setQuantities] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (id, value) => {
    const newQuantity = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
  };

  const {
    data: flavors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleAddToCart = async (flavor, selectedSize) => {
    const cartItems = {
      product_id: flavor.id,
      name: flavor.name,
      size: selectedSize.size,
      price: selectedSize.price,
      quantity: quantities[flavor.id] || 1,
    };
    try {
      await addToCart(cartItems);
      setSuccessMessage(`${flavor.name} has been added to your cart!`);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center text-[#5c4033]">
        Loading menu...
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-[#5c4033]">
        Error fetching products: {error.message}
      </div>
    );

  return (
    <div className="mt-[8rem] flex w-full flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-10 text-4xl font-semibold tracking-tight text-[#3b2f2f] md:text-5xl">
        Flavors to Satisfy Every Craving
      </h1>

      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {flavors.map((flavor) => (
          <div
            key={flavor.id}
            className="flex flex-col items-center rounded-2xl bg-[#f9f6f1] p-6 shadow-md transition-all duration-300 hover:shadow-xl"
          >
            {/* Product Image */}
            <img
              src={flavor.image_url}
              alt={flavor.name}
              className="mb-4 w-3/4 rounded-md object-cover shadow-sm transition-transform duration-300 hover:scale-105"
            />

            {/* Product Info */}
            <h2 className="mb-3 text-xl font-medium text-[#3b2f2f]">
              {flavor.name}
            </h2>

            <div className="mb-4 flex w-full items-center justify-between gap-4">
              <select
                id={`size-${flavor.id}`}
                className="w-1/2 rounded-md border border-[#b89c7d]/40 bg-[#fffdf8] px-3 py-2 text-[#3b2f2f] outline-none transition focus:border-[#5c4033]"
              >
                {Object.entries(flavor.sizes).map(([size, price]) => (
                  <option key={size} value={JSON.stringify({ size, price })}>
                    {size} - ₱{price}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={quantities[flavor.id] || 1}
                onChange={(e) => handleChange(flavor.id, e.target.value)}
                className="w-1/4 rounded-md border border-[#b89c7d]/40 bg-[#fffdf8] px-2 py-2 text-center text-[#3b2f2f] outline-none focus:border-[#5c4033]"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              className="flex items-center justify-center gap-2 rounded-md bg-[#5c4033] px-6 py-2 text-white shadow-md transition-all duration-300 hover:bg-[#3b2f2f]"
              onClick={() => {
                const selectedSizeElement = document.getElementById(
                  `size-${flavor.id}`,
                );
                const selectedSize = JSON.parse(selectedSizeElement.value);
                handleAddToCart(flavor, selectedSize);
              }}
            >
              <MdAddShoppingCart className="text-lg" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onRequestClose={() => setIsSuccessModalOpen(false)}
        message={successMessage}
      />
    </div>
  );
}

export default FlavorsIn;
