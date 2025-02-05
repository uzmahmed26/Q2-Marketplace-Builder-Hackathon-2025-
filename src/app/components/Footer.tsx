import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSkype } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { GrPinterest } from "react-icons/gr";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#2A254B] text-white py-16 px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Categories Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Categories</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/crockery" className="hover:text-gray-300">Crockery</Link>
              </li>
              <li>
                <Link href="/furniture" className="hover:text-gray-300">Furniture</Link>
              </li>
              <li>
                <Link href="/homeware" className="hover:text-gray-300">Homeware</Link>
              </li>
              <li>
                <Link href="/plant-pots" className="hover:text-gray-300">Plant Pots</Link>
              </li>
              <li>
                <Link href="/chairs" className="hover:text-gray-300">Chairs</Link>
              </li>
            </ul>
          </div>

          {/* Menu Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Menu</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/new-arrivals" className="hover:text-gray-300">New Arrivals</Link>
              </li>
              <li>
                <Link href="/best-sellers" className="hover:text-gray-300">Best Sellers</Link>
              </li>
              <li>
                <Link href="/recently-viewed" className="hover:text-gray-300">Recently Viewed</Link>
              </li>
              <li>
                <Link href="/popular-this-week" className="hover:text-gray-300">Popular This Week</Link>
              </li>
              <li>
                <Link href="/all-products" className="hover:text-gray-300">All Products</Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Company</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-gray-300">About Us</Link>
              </li>
              <li>
                <Link href="/vacancies" className="hover:text-gray-300">Vacancies</Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-gray-300">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
              </li>
              <li>
                <Link href="/returns-policy" className="hover:text-gray-300">Returns Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mailing List */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-semibold mb-4">Join Our Mailing List</h3>
            <div className="flex items-center bg-white rounded-md overflow-hidden shadow-md">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-[300px] p-3 border-none focus:outline-none"
              />
              <button className="bg-[#2A254B] text-white px-6 py-3 hover:bg-[#3c2f6b] transition-all duration-300">
                Sign Up
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex space-x-6 text-3xl text-white">
            <FaLinkedin className="hover:text-blue-700 cursor-pointer transition-all duration-300" />
            <FaFacebookSquare className="hover:text-blue-600 cursor-pointer transition-all duration-300" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all duration-300" />
            <FaSkype className="hover:text-[#00aff0] cursor-pointer transition-all duration-300" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer transition-all duration-300" />
            <GrPinterest className="hover:text-red-600 cursor-pointer transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-600 pt-8 text-center">
        <p className="text-sm">&copy; Copyright Uzma Ahmed (GIAIC-2024)</p>
      </div>
    </footer>
  );
};

export default Footer;
