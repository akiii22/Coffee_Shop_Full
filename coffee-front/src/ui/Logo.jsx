function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <img
        src="/logo1.jpg"
        alt="Camp-Cinco-Cafe Logo"
        className="w-14 rounded-full border border-[#d9c8b5] shadow-sm"
      />
      <p className="font-sans text-2xl font-semibold tracking-tight text-[#4b3b2b]">
        Camp-
        <span className="text-[#b59b84]">Cinco-Cafe</span>
      </p>
    </div>
  );
}

export default Logo;
