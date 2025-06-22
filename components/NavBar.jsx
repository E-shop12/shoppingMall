"use client";
import Link from "next/link";
import NavBanner from "./NavBanner";
import {
  FaShoppingBag,
  FaSearch,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const NavBar = ({onSearch}) => {
  return (
    <div className="w-full bg-white border-b border-gray-200">
        <NavBanner />
      <div className="w-full px-6 py-1 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Branding */}
        <Link href={`/`}>
        <div className="flex items-center gap-2  text-[#1f2894]">
          <FaShoppingBag className="w-6 h-6" />
          <span className="text-3xl font-bold">DayaMall</span>
        </div>
        </Link>

        {/* Contact and Search Section */}
        <div className="w-full md:w-[75%] flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-4">
          {/* Contact Info */}
          <div className="flex h-19 flex-col md:flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2 text-gray-700 font-bold">
              <FaPhoneAlt className="w-4 h-4 text-red-300" />
              <span>HotLine: (123) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-bold">
              <FaEnvelope className="w-4 h-4 text-red-300" />
              <span>Email: support@dayamall.com</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-[60%] flex">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-grow px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none text-base"
              onChange={(e)=>onSearch(e.target.value)}
            />
            <button className="bg-[#1f2894] text-white px-10 py-3 rounded-r-md hover:bg-[#17207a] transition-colors duration-200">
              <FaSearch className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
