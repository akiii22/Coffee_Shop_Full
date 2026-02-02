import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, updateProducts, deleteProduct } from "../api/products";
import EditProductForm from "./EditProductForm";
import { toast } from "react-hot-toast";

function ProductsContainer() {
  const queryClient = useQueryClient();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleEditClick = (product) => setSelectedProduct(product);
  const handleClose = () => setSelectedProduct(null);

  const handleSave = async (updatedProduct) => {
    try {
      await updateProducts(updatedProduct.id, updatedProduct);
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries(["products"]);
      setSelectedProduct(null);
    } catch {
      toast.error("Failed to update product.");
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onMutate: (id) => setDeletingId(id),
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => toast.error("Failed to delete product."),
    onSettled: () => setDeletingId(null),
  });

  const handleDelete = (id) => deleteMutation.mutate(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto my-10 max-w-6xl rounded-xl border border-[#f2e7d5] bg-[#fffaf5] p-6 shadow-md">
      {products.length === 0 ? (
        <h1 className="text-center text-lg font-medium text-gray-600">
          No products available. Add one to get started!
        </h1>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl bg-white p-5 shadow-md transition hover:shadow-lg"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="h-40 w-full rounded-lg object-cover"
              />
              <h2 className="mt-3 text-center text-lg font-semibold text-[#5b4636]">
                {product.name}
              </h2>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleEditClick(product)}
                  className="rounded-md bg-[#d1a054] py-2 font-medium text-white hover:bg-[#c89240]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="rounded-md bg-red-500 py-2 font-medium text-white hover:bg-red-600 disabled:opacity-50"
                >
                  {deletingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <EditProductForm
          product={selectedProduct}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default ProductsContainer;
