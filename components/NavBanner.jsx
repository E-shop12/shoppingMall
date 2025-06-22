"use client";

import React from "react";
import { FaShippingFast } from "react-icons/fa";

const NavBanner = () => {
  return (
    <div
      className="flex items-center justify-between w-full h-[50px] bg-primary text-white md:px-6 px-4 md:text-sm text-[12px]  rounded-lg  font-medium
    ">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Shipping Icon and Text */}
         <div className=" hidden md:flex items-center gap-2">
          <FaShippingFast className="text-white  size-6" />
          <span>Free Delivery on orders GHC 100+</span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-4 bg-white opacity-50 ml-6 mr-6" />

        {/* Second Text */}
        <span className="whitespace-nowrap">
          DAYAMALL is one of the largest brand.
        </span>
      </div>

      {/* Right Section */}
      <div className=" hidden md:flex text-white whitespace-nowrap">
        {" "}
        <p>Privacy Policy</p>
      </div>
    </div>
  );
};

export default NavBanner;
