"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiX, FiUploadCloud, FiXCircle, FiArrowLeft } from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useProductStore from "@/stores/useProductStore"; // from Zustand
import useCategoryStore from "@/stores/useCategoryStore"; // from zustand
import Image from "next/image";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const { createProduct, isLoading, error } = useProductStore(); // from zustand
  const {categories,fetchCategories,isLoading: catLoading,} = useCategoryStore(); // from zustand

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previewURLs]);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newFiles = [...files];
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    setImages(newImages);
    setFiles(newFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // grab the form values with the form Data
    const formData = new FormData(event.target);
    setFiles([]);
    setImages([]);

    try {
      await createProduct(formData);
      toast.success("product published");
    } catch (error) {
      toast.error("product not published");
      console.log(error);
    }
  };

  // useEffect to automatically run the fetchCategories
  useEffect(()=>{
    fetchCategories();
  },[]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
      className="p-5 md:p-10 bg-[#F9F7F7] min-h-screen font-[play]"
    >
      <Link href={"/admin/products"}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className=" flex w-full justify-end mb-5"
        >
          <button
            title="Back to all Products Page"
            className="text-[#4A235A] hover:text-[#513E5F] transition-colors duration-200 flex items-center gap-2 cursor-pointer "
          >
            <FiArrowLeft size={24} />
            <span className="hidden md:inline font-[play]">Back</span>
          </button>
        </motion.div>
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <MdPostAdd size={30} className="text-[#FF6C2F]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#67216D] font-[play]">
          Add a New Product
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6"
      >
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Product Title
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Product Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Detailed description of the product and its purpose"
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Additional Product Description
          </label>
          <textarea
            name="desDetail"
            placeholder="Additional description of a product"
            className="w-full border rounded-lg px-4 py-2 h-28 resize-none placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Price Term
          </label>
          <select
            name="categoryName"
            className="w-full border rounded-lg px-4 py-2 text-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
          >
            <option value="">select a price term</option>
            <option value="Healthcare Products">Negotiable</option>
            <option value="Cleaning Agents">Non-negotiable</option>
          </select>
        </div>
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Price
          </label>
          <input
            type="text"
            name="price"
            placeholder="45"
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Category
          </label>
          <select
            name="category"
            required
            disabled={catLoading}
            className="w-full border rounded-lg px-4 py-2 text-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
          >
            <option value="">Select a category</option>
            {categories.map((c)=>(
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* New Quantity Field */}
        {/* <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            placeholder="Enter the available stock quantity"
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div> */}

        <div>
          <label className="block text-[#777186] font-semibold mb-2 font-[play]">
            Upload Product Images
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              title="Add an Image or Images to the product"
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-4 py-2 rounded-lg font-[play]"
            >
              <FiUploadCloud size={18} />
              Upload Images
            </label>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden w-20 h-20"
              >
                <Image
                  src={img || ""}
                  alt="preview"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1"
                >
                  <FiXCircle className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link href={"/admin/products"}>
            <motion.button
              title="Cancel & Back to All Products"
              whileTap={{ scale: 0.95 }}
              type="button"
              className="flex items-center gap-2 bg-red-300 text-[#9d0505] px-7 py-2 rounded-lg font-[play] font-semibold cursor-pointer"
            >
              <FiX size={18} />
              Cancel
            </motion.button>
          </Link>

          <motion.button
            title="Publish A New Product"
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`flex text-sm md:text-[16px] items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-7 py-2 rounded-lg font-[play] font-semibold cursor-pointer ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Publishing......
              </>
            ) : (
              <>
                <AiOutlinePlus size={18} />
                Publish Product
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProduct;
