"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { BsShieldLockFill, BsTruck, BsCreditCard2Front } from "react-icons/bs";
import { MdEmail, MdPhone } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 px-6 md:px-16 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-700">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">DayaMall</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            DayaMall is your go-to destination for top-quality products and
            unbeatable service. Shop smart, live better.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Support / Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <MdEmail /> support@dayamall.com
            </li>
            <li className="flex items-center gap-2">
              <MdPhone /> +233 123 456 789
            </li>
            <li className="flex items-center gap-2">
              <HiLocationMarker /> Accra, Ghana
            </li>
          </ul>
        </div>

        {/* Socials + Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl mb-5">
            <a href="#" className="hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <FaInstagram />
            </a>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <BsShieldLockFill /> SSL Secured Checkout
            </div>
            <div className="flex items-center gap-2">
              <BsTruck /> Fast Nationwide Delivery
            </div>
            <div className="flex items-center gap-2">
              <BsCreditCard2Front /> Multiple Payment Options
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} DayaMall. All rights reserved.
      </div>
    </footer>
  );
}
