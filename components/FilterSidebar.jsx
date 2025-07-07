"use client";

import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa"; // Close icon
import SidebarContent from "./SidebarContent";
import useCategoryStore from "@/stores/useCategoryStore"; // from zustand store

const FilterSidebar = ({ onApply, onClear }) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [isOpen, setIsOpen] = useState(false); // mobile drawer open state

  const {categories,isLoading,fetchCategories,error} = useCategoryStore(); // from Zustand store

  const handleApply = () => {
    onApply({ category, priceRange, minPrice, maxPrice });
    setIsOpen(false); // close drawer after applying filters on mobile
  };

  const handleClear = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setPriceRange("");
    onClear();
  };

  useEffect(()=>{
    fetchCategories();
  },[fetchCategories])

  if (isLoading)
    return <p className="text-sm text-gray-500 p-4">Loading filters…</p>;
  if (error)
    return (
      <p className="text-sm text-red-500 p-4">Failed to load categories</p>
    );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#3D5779] text-white text-sm px-4 py-2 rounded-md shadow"
        >
          Filter
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 p-4 bg-white shadow-lg rounded-lg max-h-[90vh] overflow-y-auto">
        <SidebarContent
          category={category}
          setCategory={setCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          handleApply={handleApply}
          handleClear={handleClear}
          categories={categories}
        />
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Slide-in Sidebar */}
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-4/5 bg-white z-50 p-4 overflow-y-auto shadow-lg"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <SidebarContent
                category={category}
                setCategory={setCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                handleApply={handleApply}
                handleClear={handleClear}
                categories={categories}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
