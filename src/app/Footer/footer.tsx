import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram, FaWordpress } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#610bc6] text-white px-6 py-12  ">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-10">
        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>
            Phone Number1:{" "}
            <a href="tel:1234567890" className="font-semibold underline hover:text-purple-300">
              123-456-7890
            </a>
          </p>
          <p>
          Phone Number2:{" "}
            <a href="tel:1234567890" className="font-semibold underline hover:text-purple-300">
              123-456-7890
            </a>
          </p>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Social</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-purple-300 transition-transform hover:scale-110"><FaFacebookF /></a>
            <a href="#" className="hover:text-purple-300 transition-transform hover:scale-110"><FaYoutube /></a>
            <a href="#" className="hover:text-purple-300 transition-transform hover:scale-110"><FaTwitter /></a>
            <a href="#" className="hover:text-purple-300 transition-transform hover:scale-110"><FaInstagram /></a>
            <a href="#" className="hover:text-purple-300 transition-transform hover:scale-110"><FaWordpress /></a>
          </div>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="mt-10 pt-6 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Your Organization. All rights reserved.
      </div>
    </footer>
  );
}
