import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function EditProductForm({ product, onClose, onSave }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product.name,
      sizes: product.sizes || { small: "", medium: "", large: "" },
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedProduct = {
        id: product.id,
        name: data.name,
        sizes: {
          small: parseFloat(data.sizes.small),
          medium: parseFloat(data.sizes.medium),
          large: parseFloat(data.sizes.large),
        },
      };

      await onSave(updatedProduct);
      toast.success("Product updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-800">Edit Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Product name is required" })}
              className="w-full rounded-md border p-2 focus:ring-2 focus:ring-yellow-400"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Sizes for Prices */}
          <div>
            <label className="block font-medium text-gray-700">
              Price (per size)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["small", "medium", "large"].map((size) => (
                <div key={size}>
                  <label className="block text-sm capitalize text-gray-600">
                    {size}
                  </label>
                  <input
                    type="number"
                    {...register(`sizes.${size}`, {
                      required: `Price for ${size} is required`,
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    className="w-full rounded-md border p-2 focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.sizes?.[size] && (
                    <p className="text-sm text-red-500">
                      {errors.sizes[size].message}
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
              className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`rounded-md px-4 py-2 ${
                loading
                  ? "cursor-not-allowed bg-yellow-300"
                  : "bg-yellow-400 hover:bg-yellow-500"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
