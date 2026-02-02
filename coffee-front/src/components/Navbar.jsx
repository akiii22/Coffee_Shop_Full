import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import Logo from "../ui/Logo";
function Navbar() {
  const [isToggle, setIsToggle] = useState(false);
  const toggleOpen = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className="fixed right-0 top-0 z-10 h-[14%] w-full bg-grey-100 shadow-lg">
      <nav className="flex items-center justify-between">
        <div className="flex items-center p-4">
          <Logo />
        </div>
        <div className="mx-6 text-grey-700 md:hidden">
          {isToggle ? (
            <FaTimes onClick={toggleOpen} size={20} />
          ) : (
            <FaBars onClick={toggleOpen} size={20} />
          )}
        </div>
        <ul className="mx-4 hidden gap-4 px-10 text-grey-800 md:flex">
          <li>
            <a href="/#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#flavors">Flavors</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      {isToggle && (
        <div className="fixed right-0 top-[130px] flex h-screen w-1/2 items-start justify-center bg-black/10 py-10">
          <ul className="flex flex-col items-center justify-center gap-10 p-4 tracking-widest text-yellow-700 md:hidden">
            <li>
              <a href="/#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#flavors">Flavors</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
