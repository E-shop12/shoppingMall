// components/PrefetchProductCard.jsx
"use client";
import { motion } from "framer-motion";
import usePrefetchVisibleRoutes from "@/hooks/usePrefetchVisibleRoutes";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

const PrefetchProductCard = ({ item, isActive, onTouchStart, onTouchEnd,index }) => {
  const prefetchRef = usePrefetchVisibleRoutes(`/products/${item.id}`);

  return (
    <motion.div
      ref={prefetchRef}
      key={item.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: item.id * 0.05 }}
      className="relative bg-white rounded-lg overflow-hidden shadow-lg group cursor-pointer"
    >
      {/* Category Badge */}
      <div className="absolute top-3 left-3 z-10 text-xs px-3 py-1 rounded-full shadow text-[#14245F] bg-white font-semibold">
        <p>{item.category}</p>
      </div>

      {/* Sale Badge */}
      <div className="absolute top-3 right-3 z-10 text-xs px-3 py-2 rounded-lg shadow text-white bg-green-600 font-semibold">
        <p>On Sale</p>
      </div>

      {/* Product Image */}
      <div className="w-full h-50 bg-gray-300">
        <Image
          src={item.image}
          alt={item.title}
          className="w-[70%] h-50 object-contain mix-blend-multiply bg-white p-1 rounded-lg ml-10"
          loading="lazy"
          width={250}
          height={250}
          priority={index}
        />
      </div>

      {/* Overlay */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={`absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold p-4 transition-all duration-300 
          sm:opacity-0 sm:group-hover:opacity-100 
          ${isActive ? "opacity-100" : "opacity-0"}`}
      >
        <Link href={`/products/${item.id}`}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-between py-3 px-5 bg-[#1f2894] cursor-pointer rounded-lg"
          >
            <FaShoppingBag className="mr-3" />
            Get Item
          </motion.button>
        </Link>
      </div>

      {/* Title and Price */}
      <div className="p-4 text-center text-[#14245F] font-[play]">
        <h2 className="text-lg font-bold">{item.title}</h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-lg font-semibold text-green-600">
            GH{"\u20B5"} {item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PrefetchProductCard;
