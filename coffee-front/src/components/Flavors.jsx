import { Link } from "react-router-dom";

import pic1 from "/pic1.jpg";
import pic2 from "/pic2.jpg";
import pic3 from "/pic3.jpg";
import pic4 from "/pic4.jpg";
import pic5 from "/pic5.jpg";
import pic6 from "/pic6.jpg";

function FeaturedProducts() {
  const images = [pic1, pic2, pic3, pic4, pic5, pic6];

  return (
    <section className="my-20 px-6 text-center" id="flavors">
      {/* Heading */}
      <h1 className="mb-12 font-display text-5xl font-bold tracking-wide text-[#4a2c2a]">
        Featured <span className="text-[#c6a664]">Products</span>
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl bg-[#f9f7f3] shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
          >
            <img
              src={img}
              alt={`featured-${i + 1}`}
              className="h-[400px] w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3b2f2f]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-16 flex justify-center">
        <Link
          to="/login"
          className="rounded-full bg-[#6b4b3e] px-8 py-3 text-lg font-medium text-[#f8f5f2] shadow-md transition duration-300 hover:bg-[#8c5e4b] hover:shadow-lg"
        >
          View Full Menu
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
