import { FaFacebook } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { IoCall } from "react-icons/io5";

function Contacts() {
  return (
    <div
      id="contact"
      className="my-24 flex min-h-[70vh] w-full flex-col items-center justify-center gap-14 px-6"
    >
      {/* Title */}
      <h1 className="font-display text-[3.2rem] font-bold tracking-wide text-[#3b2f2f]">
        Reach <span className="text-[#a67848]">Out</span>
      </h1>

      {/* Main Contact Card */}
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-16 rounded-2xl bg-[#f4ede5] p-10 shadow-[0_4px_15px_rgba(0,0,0,0.08)] sm:flex-row">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="/barista.svg"
            alt="Waving barista"
            className="w-[220px] animate-bounce drop-shadow-md"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-2xl font-semibold text-[#3b2f2f]">
            Want to reach us or send feedback?
          </h2>

          <ul className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Facebook */}
            <li>
              <a
                href="https://facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#3b5998] px-6 py-3 text-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebook size={22} />
                <span className="hidden font-medium sm:inline">Facebook</span>
              </a>
            </li>

            {/* Email */}
            <li>
              <a
                href="mailto:youremail@example.com"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#a67848] px-6 py-3 text-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                aria-label="Email"
              >
                <HiMail size={22} />
                <span className="hidden font-medium sm:inline">Email</span>
              </a>
            </li>

            {/* Phone */}
            <li>
              <a
                href="tel:+1234567890"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#c89b6d] px-6 py-3 text-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                aria-label="Phone"
              >
                <IoCall size={22} />
                <span className="hidden font-medium sm:inline">Phone</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
