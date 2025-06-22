"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaThLarge,
  FaCertificate,
  FaGem,
  FaMobileAlt,
  FaTabletAlt,
  FaTshirt,
  FaPlug,
  FaPaintBrush,
  FaBlender,
  FaGamepad,
  FaUndo,
  FaHeadset,
  FaTruck,
  FaSmile
} from "react-icons/fa";

const CategoryHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { name: "Phones", icon: <FaMobileAlt /> },
    { name: "Tablets", icon: <FaTabletAlt /> },
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Electronics", icon: <FaPlug /> },
    { name: "Beauty", icon: <FaPaintBrush /> },
    { name: "Home Appliances", icon: <FaBlender /> },
    { name: "Gaming", icon: <FaGamepad /> },
  ];

  // Function to handle click events
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Close dropdown on outside click or scroll
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full p-4 h-15 ">
      <div className="flex w-full justify-between items-center gap-4 border-gray-300 pb-2 mb-6">
        {/* Browse Categories */}
        <div ref={dropdownRef} className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className=" w-35  md:w-45   flex items-center gap-2 text-[#3D5779] md:text-xl font-semibold cursor-pointer"
          >
            <FaThLarge size={25} />
            <span className="text-[12px] md:text-[16px]">Browse Categories</span>
          </div>

          {isOpen && (
            <ul className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              {categories.map((cat, index) => (
                <motion.li
                  key={index}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  whileHover={{ scale: 0.95 }}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] ml-2 bg-gray-300 md:ml-12" />

        {/* Right Texts with Icons */}
        <div className="flex w-[60%] md:w-[75%] justify-between items-center text-[#1f2894] text-[12px] md:text-base">
          <div className="flex  items-center font-bold gap-1">
            <FaCertificate className="text-[#3D5779] " size={20} />
            <p>Authentic Products</p>
          </div>

          <div className="hidden md:flex  font-bold items-center gap-1">
            <FaUndo className="text-[#3D5779]" />
            <p>Easy Returns</p>
          </div>
          <div className=" hidden  md:flex  font-bold items-center gap-1">
            <FaHeadset className="text-[#3D5779]" />
            <p>24/7 Customer Support</p>
          </div>
          
          <div className=" hidden md:flex font-bold items-center gap-1">
            <FaSmile className="text-[#3D5779]" />
            <p>Satisfaction Guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
