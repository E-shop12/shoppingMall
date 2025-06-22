"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SpinnerWithLogo = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-white px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spinning Logo with Ring */}
        <div className="relative w-40 h-40">
          <motion.div
            className="absolute inset-0 border-8 border-[#D1B2D5] border-t-[#67216D] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo2.svg"
              alt="AngeWin Logo"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpinnerWithLogo;
