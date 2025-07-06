"use client";
import { useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaShoppingBag, FaBoxOpen } from "react-icons/fa";
import ProductSkeletonGrid from "@/components/stateComponents/ProductSkeletonGrid";
import PrefetchProductCard from "@/components/PrefetchProductCard";
import useProductStore from "@/stores/useProductStore";

const ProductDisplaySection = ({ searchQuery }) => {

  const [activeCardId, setActiveCardId] = useState(null); // for touch overlay
  const {products,fetchProducts,isLoading} = useProductStore();

  // Fetch products
  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, []);

  // Filter products based on search
  const filter = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.[0]?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="px-6 bg-[#F4F2EE] py-5 ">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar />
        <div className="flex-1">
          {isLoading ? (
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
                filter.map((item) => (
                  <PrefetchProductCard
                    key={item._id}
                    item={item}
                    isActive={activeCardId === item._id}
                    onTouchStart={() => setActiveCardId(item._id)}
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
