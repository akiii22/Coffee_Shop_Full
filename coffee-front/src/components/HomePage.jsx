function HomePage() {
  return (
    <div id="home" className="min-h-screen w-full bg-[#fdfaf6] py-28 md:px-10">
      <div className="flex flex-col items-center justify-evenly py-10 sm:flex-row md:gap-32">
        {/* Text Section */}
        <div className="rounded-sm px-10 py-12">
          <h1 className="my-4 py-10 font-display text-6xl font-semibold leading-tight tracking-normal text-[#4b3b2a] md:text-7xl">
            Welcome to <span className="text-[#c5a880]">Camp-Cinco!</span>
          </h1>
          <p className="px-6 py-2 text-lg leading-relaxed text-[#6b5b4a]">
            Sip on the rich aroma of our freshly brewed coffee or treat yourself
            to the creamy delight of our mango shakes, made with the finest
            handpicked mangoes. From classic favorites to exciting new twists,
            we’ve got something to satisfy every craving!
          </p>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src="/bg1.jpg"
            alt="milkshake"
            className="h-auto rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.1)] sm:w-[75%] md:w-[100%]"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
