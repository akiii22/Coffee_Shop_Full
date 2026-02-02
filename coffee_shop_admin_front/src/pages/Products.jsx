import { useState } from "react";
import ProductsContainer from "../components/ProductsContainer";
import AddProductForm from "../components/AddProducts";

function Products() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="min-h-screen bg-[#fdf8f3] p-6">
      <h1 className="text-center font-serif text-4xl font-bold text-[#5b4636]">
        Our Products
      </h1>

      <div className="my-6 flex justify-center">
        <button
          onClick={() => setIsAdding(true)}
          className="rounded-lg bg-[#d1a054] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#c89240]"
        >
          + Add Product
        </button>
      </div>

      {isAdding && <AddProductForm onClose={() => setIsAdding(false)} />}

      <ProductsContainer />
    </div>
  );
}

export default Products;
