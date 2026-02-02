import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/products";
import toast from "react-hot-toast";

export default function AddProductForm({ onClose }) {
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      prices: { small: "", medium: "", large: "" },
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append(
        "sizes",
        JSON.stringify({
          small: parseFloat(data.prices.small),
          medium: parseFloat(data.prices.medium),
          large: parseFloat(data.prices.large),
        }),
      );
      if (image) formData.append("image", image);

      await addProduct(formData);
      toast.success("Product added successfully!");
      queryClient.invalidateQueries(["products"]);
      onClose();
    } catch {
      toast.error("Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[400px] rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-[#5b4636]">Add Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Product name is required" })}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#d1a054] focus:ring-2 focus:ring-[#d1a054]"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#d1a054] focus:ring-2 focus:ring-[#d1a054]"
            />
          </div>

          {/* Prices */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (per size)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["small", "medium", "large"].map((size) => (
                <div key={size}>
                  <label className="block text-xs capitalize text-gray-500">
                    {size}
                  </label>
                  <input
                    type="number"
                    {...register(`prices.${size}`, {
                      required: `Price for ${size} is required`,
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-[#d1a054] focus:ring-2 focus:ring-[#d1a054]"
                  />
                  {errors.prices?.[size] && (
                    <p className="text-xs text-red-500">
                      {errors.prices[size].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-md px-4 py-2 text-sm font-medium text-white transition ${
                isLoading
                  ? "cursor-not-allowed bg-[#e0c999]"
                  : "bg-[#d1a054] hover:bg-[#c89240]"
              }`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
