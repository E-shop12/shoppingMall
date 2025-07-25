"use client";
import { useState, useEffect } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import ProductSkeletonGrid from "@/components/stateComponents/ProductSkeletonGrid";
import Image from "next/image";
import Link from "next/link";
import useProductStore from "@/stores/useProductStore"; // from zustand store
import useCategoryStore from "@/stores/useCategoryStore"; // from zustand store

const AdminProductDisplay = () => {
  const [view, setView] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState();
  
  const{products,isLoading,error,fetchProducts}=useProductStore(); // from zustand store
  const{categories,fetchCategories} = useCategoryStore(); // from zustand store

  // fetching products from fakeApi store
  // const getProducts = async () => {
  //   try {
  //     const response = await axios.get("https://fakestoreapi.com/products/");
  //     console.log("RESPONSE: ", response);
  //     setProducts(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchProducts();

    const savedView = localStorage.getItem("view");
    if (savedView) {
      setView(savedView);
    }
  }, []);

  useEffect(() => {
    if (view) {
      localStorage.setItem("view", view);
    }
  }, [view]);

  const handleViewToggle = () => {
    setView(view === "grid" ? "list" : "grid");
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  useEffect(()=>{
    fetchCategories()
  },[])

  // const confirmDelete = async (id) => {
  //   const result = await deleteProduct(id);
  //   if (result.success) {
  //     await fetchProducts(true); // ⬅️ re-fetch with force=true
  //     toast.success("Product deleted successfully");
  //   } else {
  //     toast.error(result.message || "Failed to delete product");
  //   }
  //   setShowModal(false);
  // };

  const cancelDelete = () => {
    setShowModal(false);
  };

  // if (isLoading) return <Spinner/>
  // if (error) return <p>Error: {error}</p>;

  useEffect(() => {
    setFilteredProducts(
      filterCategory === "All"
        ? products
        : products.filter(
            (product) =>
              product.category?.name?.toLowerCase().trim() ===
              filterCategory.toLowerCase().trim()
          )
    );
  }, [products, filterCategory]); 

  return (
    // Fetch and display products with edit/delete buttons
    <div className="px-4 py-6 bg-[#F9F7F7]">
      <h1 className="text-2xl md:text-3xl font-bold text-[#67216D] mb-4 font-[play]">
        Your Published Products
      </h1>
      <p className="text-[15px] md:text-[20px] text-gray-700 mb-4 font-[play]">
        You can VIEW, EDIT and DELETE your published Products here
      </p>

      <div className="sticky top-0 z-10 bg-white p-4 shadow-md flex justify-between items-center">
        <div className="w-20 md:w-40 flex gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border w-40 md:w-60 text-[12px] md:text-[16px] border-[#67216D] text-[#67216D] rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF6C2F] font-[play] cursor-pointer"
          >
            <option value="All">All Products</option>
            {categories.length ? (
              categories.map((cat) => (
                <option
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>Loading…</option>
            )}
          </select>
        </div>

        <div
          className="hidden md:flex  items-center justify-center md:w-10 w-7 h-7 md:h-10 rounded-full border-2 border-[#1f2894] text-[#1f2894]"
          title="Total number of Published Products"
        >
          <p className="font-bold">{products?.length}</p>
        </div>
        <motion.button
          title="Change the view of products details"
          whileTap={{ scale: 0.95 }}
          onClick={handleViewToggle}
          className="bg-[#1f2894] hover:bg-[#1f2994e1] text-sm text-white md:text-[16px] px-4 py-2 rounded-lg cursor-pointer font-[play]"
        >
          {view === "grid" ? "List" : "Grid"} View
        </motion.button>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 font-[play]">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center">
              <ProductSkeletonGrid />
            </div>
          ) : (
            filteredProducts?.map((product) => (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
                whileHover={{ scale: 0.9 }}
                key={product.id}
                className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center "
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-contain rounded-md mb-4"
                  loading="lazy"
                  width={300}
                  height={350}
                />
                <div className="flex-grow text-center">
                  <h3 className="text-lg font-bold text-[#283144]">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="ml-8 flex flex-wrap items-center justify-around w-40  mt-2">
                    <p className="text-sm text-[#FF6C2F] ">
                      GH{"\u20B5"} {product.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Link href={`/admin/products/${product._id}`}>
                    <motion.button
                      title="view Published Product"
                      whileTap={{ scale: 0.95 }}
                      className="text-green-500 hover:text-[#67216D] cursor-pointer"
                    >
                      <FiEye size={20} />
                    </motion.button>
                  </Link>
                  <Link href={`/admin/products/${product._id}`}>
                    <motion.button
                      title="Edit Published Product"
                      whileTap={{ scale: 0.95 }}
                      className="text-[#FF6C2F] hover:text-[#67216D] cursor-pointer"
                    >
                      <FiEdit size={20} />
                    </motion.button>
                  </Link>
                  <motion.button
                    title="Delete Published Product"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(product)}
                    className="text-red-500 hover:text-[#67216D] cursor-pointer"
                  >
                    <FiTrash2 size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <motion.div className="mt-6 font-[play] min-h-[200px] relative">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <ProductSkeletonGrid />
            </div>
          ) : (
            <div className="overflow-x-auto lg:overflow-x-visible">
              <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-2xl">
                <thead className="bg-[#1f2894] text-white">
                  <tr>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">Description</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts?.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-[#FFE2D5] transition-all duration-300"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.image}
                            loading="lazy"
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md"
                            width={200}
                            height={200}
                          />
                          <span className="font-semibold">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {product.description}
                      </td>
                      <td className="p-4 text-sm text-[#FF6C2F]">
                        GH{"\u20B5"} {product.price}
                      </td>
                      <td className="p-4 flex gap-3 items-center justify-center mt-5">
                        <Link href={`/admin/products/${product._id}`}>
                          <motion.button
                            title="View Published  Product"
                            whileTap={{ scale: 0.95 }}
                            className="text-green-500 cursor-pointer hover:text-[#67216D]"
                          >
                            <FiEye size={20} />
                          </motion.button>
                        </Link>
                        <Link href={`/admin/products/${product._id}`}>
                          <motion.button
                            title="Edit Published product"
                            whileTap={{ scale: 0.0 }}
                            className="text-[#FF6C2F] cursor-pointer hover:text-[#67216D]"
                          >
                            <FiEdit size={20} />
                          </motion.button>
                        </Link>
                        <motion.button
                          title="Delete Published  Product"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(product)}
                          className="text-red-500 hover:text-[#67216D] cursor-pointer"
                        >
                          <FiTrash2 size={20} />
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}

      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 p-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full"
          >
            <h3 className="text-lg font-bold text-[#283144] mb-4">
              Delete Product?
            </h3>
            <p className="text-sm text-gray-500 mb-4 font-[play]">
              Are you sure you want to delete the product{" "}
              <span className="font-bold text-black">
                {selectedProduct.name}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={cancelDelete}
                className="bg-gray-300 text-[#283144] px-4 py-2 rounded-lg"
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => confirmDelete(selectedProduct._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProductDisplay;
