"use client";

import { motion } from "framer-motion";


export default function SubscribeSection() {
  return (
    <div className="w-full bg-white py-10 px-4 md:px-20 md:py-14 shadow-md mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* LEFT: Heading & Description */}
        <div className="text-center md:text-left md:w-1/2 space-y-2">
          <h2 className="text-2xl md:text-4xl font-bold text-blue-800">
            Subscribe to our newsletter
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Subscribe to our newsletter for exclusive updates, promotions, and
            exciting news delivered straight to your inbox!
          </p>
        </div>

        {/* RIGHT: Input and Button */}
        <form
          className="flex flex-col sm:flex-row items-center gap-3 md:w-1/2"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <motion.button
          whileTap={{scale:0.95}}
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition w-full sm:w-auto  cursor-pointer"
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </div>
  );
}
