"use client";
import { useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaShoppingBag, FaBoxOpen } from "react-icons/fa";
import ProductSkeletonGrid from "@/components/stateComponents/ProductSkeletonGrid";
import PrefetchProductCard from "@/components/PrefetchProductCard";

const ProductDisplaySection = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCardId, setActiveCardId] = useState(null); // for touch overlay

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products/");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search
  const filter = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Overlay render logic
  const renderOverlay = (itemId) => {
    const isActive = activeCardId === itemId;
    return (
      <div
        onTouchStart={() => setActiveCardId(itemId)}
        onTouchEnd={() => setTimeout(() => setActiveCardId(null), 1500)}
        className={`absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold p-4 transition-all duration-300 
          sm:opacity-0 sm:group-hover:opacity-100 
          ${isActive ? "opacity-100" : "opacity-0"}`}
      >
        <Link href={`products/${itemId}`}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-between py-3 px-5 bg-[#1f2894] cursor-pointer rounded-lg"
          >
            <FaShoppingBag className="mr-3" />
            Get Item
          </motion.button>
        </Link>
      </div>
    );
  };

  return (
    <div className="px-6 bg-[#F4F2EE] py-5 ">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar />
        <div className="flex-1">
          {loading ? (
            <ProductSkeletonGrid />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {filter.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-full flex flex-col items-center justify-center text-center py-20"
                >
                  <FaBoxOpen className="text-6xl text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-600">
                    No products found
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Try adjusting your search or clear filters.
                  </p>
                </motion.div>
              ) : (
                filter.map((item,index) => (
                  <PrefetchProductCard
                    key={item.id}
                    item={item}
                    isActive={activeCardId === item.id}
                    onTouchStart={() => setActiveCardId(item.id)}
                    onTouchEnd={() =>
                      setTimeout(() => setActiveCardId(null), 1500)
                    }
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplaySection;
