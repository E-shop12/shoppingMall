"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiX, FiUploadCloud, FiXCircle, FiArrowLeft } from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

import useProductStore from "@/stores/useProductStore"; // products
import useCategoryStore from "@/stores/useCategoryStore"; // categories  ← NEW

const EditProduct = () => {
  /* ------------------------------------------------------------------ */
  /* hooks & stores                                                     */
  /* ------------------------------------------------------------------ */
  const { id } = useParams(); // product ID from route
  const router = useRouter();

  const { products, editProduct, isLoading } = useProductStore();
  const {
    categories, // cached list
    fetchCategories, // action to load all
    getCategoryById, // fetch one by id (cached)
  } = useCategoryStore(); // ← NEW

  /* ------------------------------------------------------------------ */
  /* local state                                                        */
  /* ------------------------------------------------------------------ */
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "", // store the **ID** not the name  ← CHANGED
  });

  const [images, setImages] = useState([]); // preview URLs
  const [files, setFiles] = useState([]); // File objects

  /* ------------------------------------------------------------------ */
  /* 1️⃣  Load product and pre‑fill form                                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const product = products.find((p) => p._id === id);
    if (!product) return;

    /* --------------------------------------------------------------
     * Resolve categoryId – covers every backend variant
     * -------------------------------------------------------------- */
    let catId = "";

    // 1. Direct id fields  (categoryId / category_id / catId)
    if (product.categoryId || product.category_id || product.catId) {
      catId = String(
        product.categoryId || product.category_id || product.catId
      );
    }

    // 2. Embedded SINGLE object  (category: { _id, name })
    else if (
      product.category &&
      !Array.isArray(product.category) &&
      product.category._id
    ) {
      catId = String(product.category._id);
    }

    // 3. Embedded ARRAY of objects  (category: [{ _id, name }, …])
    else if (
      Array.isArray(product.category) &&
      product.category.length &&
      product.category[0]._id
    ) {
      catId = String(product.category[0]._id); // 👈 your case
    }

    // 4. Only a name – resolve to an ID once categories are loaded
    else if (
      product.category &&
      typeof product.category === "string" &&
      categories.length
    ) {
      const match = categories.find(
        (c) => c.name.toLowerCase() === product.category.toLowerCase()
      );
      if (match) catId = String(match._id);
    }

    console.log("Resolved catId:", catId); // should now log the _id string

    setFormData({
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      categoryId: catId, // ID string or ""
    });
    setImages(product.images || []);
  }, [id, products, categories]); // include categories dependency

  /* ------------------------------------------------------------------ */
  /* 2️⃣  Ensure categories are loaded (once)                           */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories(); // load all categories
    }
  }, [categories.length, fetchCategories]);

  /* ------------------------------------------------------------------ */
  /* 3️⃣  If form already has categoryId but that single category       */
  /*     isn’t in the list yet, fetch it and cache it                   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!formData.categoryId) return;

    const inCache = categories.some((c) => c._id === formData.categoryId);
    if (!inCache) {
      getCategoryById(formData.categoryId).catch(() => {
        /* handled in store */
      });
    }
  }, [formData.categoryId, categories, getCategoryById]);

  /* ------------------------------------------------------------------ */
  /* image handlers                                                     */
  /* ------------------------------------------------------------------ */
  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    const previews = selected.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...previews]);
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  /* ------------------------------------------------------------------ */
  /* submit                                                             */
  /* ------------------------------------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, images };
      await editProduct(id, payload);
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  /* ------------------------------------------------------------------ */
  /* render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
        className="p-5 md:p-10 bg-[#F9F7F7] min-h-screen font-[play]"
      >
        {/* back link */}
        <Link href="/admin/products">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex w-full justify-end mb-5"
          >
            <button
              title="Back to all Products Page"
              className="text-[#4A235A] hover:text-[#513E5F] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
            >
              <FiArrowLeft size={24} />
              <span className="hidden md:inline font-[play]">Back</span>
            </button>
          </motion.div>
        </Link>

        {/* heading */}
        <div className="flex items-center gap-3 mb-8">
          <MdPostAdd size={30} className="text-[#FF6C2F]" />
          <h1 className="text-2xl md:text-3xl font-bold text-[#67216D] font-[play]">
            Edit Published Product
          </h1>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-6"
        >
          {/* title */}
          <div>
            <label className="block text-[#777186] font-semibold mb-1 font-[play]">
              Product Title
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter product name"
              className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
              required
            />
          </div>

          {/* description */}
          <div>
            <label className="block text-[#777186] font-semibold mb-1 font-[play]">
              Product Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed description of the product and its purpose"
              className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
              required
            />
          </div>

          {/* price */}
          <div>
            <label className="block text-[#777186] font-semibold mb-1 font-[play]">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="45"
              className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
              required
            />
          </div>

          {/* category */}
          <div>
            <label className="block text-[#777186] font-semibold mb-1 font-[play]">
              Category
            </label>

            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 text-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
              required
            >
              <option value="">Select a category</option>

              {/* dynamic options from store */}
              {categories.map((cat) => (
                <option key={cat._id} value={String(cat._id)}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* image upload */}
          <div>
            <label className="block text-[#777186] font-semibold mb-2 font-[play]">
              Upload Product Images
            </label>

            <div className="flex items-center gap-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                title="Add an Image or Images to the product"
                className="cursor-pointer inline-flex items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-4 py-2 rounded-lg font-[play]"
              >
                <FiUploadCloud size={18} />
                Upload Images
              </label>
            </div>

            {/* previews */}
            <div className="flex flex-wrap gap-3 mt-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative border rounded-lg overflow-hidden w-20 h-20"
                >
                  <Image
                    src={img}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1"
                  >
                    <FiXCircle className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="flex justify-end gap-4 mt-6">
            <Link href="/admin/products">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                title="Cancel & Back to All Products"
                className="flex items-center gap-2 bg-red-300 text-[#9d0505] px-7 py-2 rounded-lg font-[play] font-semibold cursor-pointer"
              >
                <FiX size={18} />
                Cancel
              </motion.button>
            </Link>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              title="Update Product"
              className={`flex text-sm md:text-[16px] items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-7 py-2 rounded-lg font-[play] font-semibold cursor-pointer ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Updating…
                </>
              ) : (
                <>
                  <AiOutlinePlus size={18} />
                  Update Product
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProduct;
