
import { motion } from "framer-motion";

const SidebarContent = ({
  category,
  setCategory,
  priceRange,
  setPriceRange,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  handleApply,
  handleClear,
}) => (
  <div className="space-y-6">
    {/* ...use the updated styled filter UI from earlier here... */}
    {/* Category Filter */}
    <div>
      <label className="block font-medium mb-2 text-gray-700">Category</label>
      <select
        className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3D5779]"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="Phones">Phones</option>
        <option value="Tablets">Tablets</option>
        <option value="Fashion">Fashion</option>
        <option value="Electronics">Electronics</option>
        <option value="Beauty">Beauty</option>
        <option value="Home Appliances">Home Appliances</option>
        <option value="Gaming">Gaming</option>
      </select>
    </div>

    {/* Price Range Radios */}
    <div>
      <label className="block font-medium mb-2 text-gray-700">
        Price Range
      </label>
      <div className="space-y-2 text-sm text-gray-600">
        {["0-100", "100-300", "300-500", "500-1000"].map((range) => (
          <label key={range} className="flex items-center gap-2">
            <input
              type="radio"
              name="price"
              value={range}
              checked={priceRange === range}
              onChange={() => setPriceRange(range)}
              className="accent-[#3D5779]"
            />
            <span>{`GHC${range.replace("-", " - GHC")}`}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Manual Price Inputs */}
    <div>
      <label className="block font-medium mb-2 text-gray-700">
        Set Your Own Price
      </label>
      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm "
        />
        <span className="text-gray-500">-</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm "
        />
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleApply}
        className="flex-1 bg-[#3D5779] hover:bg-[#1f2894] text-white text-sm py-2.5 rounded-md shadow"
      >
        Apply Filters
      </motion.button>
      <button
        onClick={handleClear}
        className="text-sm text-[#3D5779] hover:text-[#2e445c] underline"
      >
        Clear All
      </button>
    </div>
  </div>
);

export default SidebarContent;
