'use client'

import { useEffect, useState } from "react";
import {
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import { motion } from "framer-motion";

const AdminHome = () => {
  const [username, setUsername] = useState("");
  // State to track the visibility of tooltips for each card
  const [tooltipVisible, setTooltipVisible] = useState({
    totalItems: false,
    totalOrders: false,
    dailyPurchases: false,
    totalSuccessfulPurchase: false,
  });

  // Function to toggle the tooltip visibility for each card
  const toggleTooltip = (card) => {
    setTooltipVisible((prevState) => ({
      ...prevState,
      [card]: !prevState[card], // Toggle the visibility of the specific card's tooltip
    }));
  };

  // Handler for mouse hover events on desktop
  const handleMouseEnter = (card) => {
    if (!isTouchDevice()) {
      setTooltipVisible((prevState) => ({
        ...prevState,
        [card]: true, // Show tooltip on hover
      }));
    }
  };

  // Handler for mouse leave events on desktop
  const handleMouseLeave = (card) => {
    if (!isTouchDevice()) {
      setTooltipVisible((prevState) => ({
        ...prevState,
        [card]: false, // Hide tooltip on hover out
      }));
    }
  };

  // Utility function to detect if the device is a touch device (mobile)
  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };


  return (
    <div className="px-4 py-6 bg-[#F9F7F7] min-h-screen">
      {/* Greeting Section */}
      <motion.div
        className="bg-[#1f299416] p-6 rounded-2xl mb-6"
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold font-[play] text-[#1f2894]">
          Hello, {username || "Vendor"}
        </h2>
        <p className="text-sm md:text-[15px] text-[#1f2894] font-[play] mt-1">
          Welcome back — here’s how <strong>DayaMall</strong> is performing
          today.
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Items in Stock */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            delay: 0.5,
          }}
          className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-5 min-h-[160px] relative"
        >
          <div className="bg-[#1f29942a] text-[#1f2894] p-4 rounded-full text-3xl">
            <FiBox />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-[play]">
              Total Published Products
            </p>
            <h3 className="text-xl font-bold text-[#283144] font-[play]">
              {/* {products.length} */} 0
            </h3>
          </div>

          {/* Info Icon and Tooltip */}
          <div
            className="absolute top-3 right-3 group"
            onMouseEnter={() => handleMouseEnter("totalItems")}
            onMouseLeave={() => handleMouseLeave("totalItems")}
          >
            <FiInfo
              className="text-gray-400 hover:text-[#F50057] cursor-pointer"
              onClick={() => toggleTooltip("totalItems")} // Toggle visibility for this card
            />
            {/* Tooltip for Total Items in Stock */}
            <div
              className={`absolute ${
                tooltipVisible.totalItems ? "block" : "hidden"
              } w-44 text-[13px] text-white bg-[#67216D] p-2 rounded shadow-lg z-10 -top-2 right-10`}
            >
              This shows the total number of published products currently in
              your store.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminHome