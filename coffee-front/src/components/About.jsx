function About() {
  return (
    <section id="about" className="bg-[#fdfaf6] px-4 py-16 text-center">
      {/* Heading */}
      <h1 className="font-display text-5xl font-bold tracking-wide text-[#4b3b2a] sm:mb-10">
        Experience The{" "}
        <span className="text-[#c5a880]">Best Coffee in Town!</span>
      </h1>

      {/* Video Gallery */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <video
          src="/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-full rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        />
        <video
          src="/video2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-full rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        />
        <video
          src="/video3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-full rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        />
      </div>

      {/* Description */}
      <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-[#6b5b4a]">
        From rich espressos to creamy lattes, our coffee is brewed with passion
        and made to brighten your day. Come relax, connect, and savor every sip
        in our cozy shop.
      </p>

      {/* Location */}
      <p className="text-md mt-6 font-semibold text-[#b08968]">
        📍 Find us at Zone 5, Plaridel, Lipa City
      </p>
    </section>
  );
}

export default About;
