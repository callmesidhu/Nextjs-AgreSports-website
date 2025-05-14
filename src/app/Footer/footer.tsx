import Image from "next/image";
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaWordpress,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#610bc6] text-white px-6 py-14 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-purple-700 via-transparent to-purple-500 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 items-center justify-items-center">
        {/* Contact Icons */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <a href="tel:1234567890" className="text-xl hover:scale-110 transition-transform duration-300 hover:text-purple-200">
           Phone Number1: <u>123-456-7890</u>
          </a>
          <a href="tel:1234567890" className="text-xl hover:scale-110 transition-transform duration-300 hover:text-purple-200">
            Phone Number1: <u>123-456-7890</u>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl sm:text-3xl justify-center">
          <a href="#" className="hover:text-purple-200 transition-transform hover:scale-125 duration-300"><FaFacebookF /></a>
          <a href="#" className="hover:text-purple-200 transition-transform hover:scale-125 duration-300"><FaYoutube /></a>
          <a href="#" className="hover:text-purple-200 transition-transform hover:scale-125 duration-300"><FaTwitter /></a>
          <a href="#" className="hover:text-purple-200 transition-transform hover:scale-125 duration-300"><FaInstagram /></a>
          <a href="#" className="hover:text-purple-200 transition-transform hover:scale-125 duration-300"><FaWordpress /></a>
        </div>

        {/* Animated Glowing Circle */}
        <div className="relative w-32 h-20">

            <Image
              src="/floor.png"
              alt="Logo"
              width={300}
              height={150}
              className="z-10 relative w-full shadow-lg"
            />

        </div>
      </div>

      <div className="mt-10 pt-6 text-center text-xs text-gray-300 border-t border-purple-300/50">
        &copy; {new Date().getFullYear()} Your Organization
      </div>
    </footer>
  );
}
