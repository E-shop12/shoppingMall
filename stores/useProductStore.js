// stores/useProductStore.js
import { create } from "zustand";
import { getAllProducts,editProduct,getSingleProduct,createProduct,deleteProduct } from "@/services/productService";

const useProductStore = create((set, get) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getAllProducts();
      set({ products: data });
    } catch (err) {
      console.error("Fetch all products error:", err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  // Get a single product
  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getSingleProduct(id);
      set({ selectedProduct: data });
    } catch (err) {
      console.error("Fetch single product error:", err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  // Create a new product
  createProduct: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const data = await createProduct(payload);
      // Optionally refetch or update state
      set({ products: [...get().products, data] });
      return data;
    } catch (err) {
      console.error("Create product error:", err);
      set({ error: err });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  // Edit product
  editProduct: async (id, payload) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await editProduct(id, payload);
      const updatedList = get().products.map((p) =>
        p.id === id ? updated : p
      );
      set({ products: updatedList });
      return updated;
    } catch (err) {
      console.error("Edit product error:", err);
      set({ error: err });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteProduct(id);
      const filtered = get().products.filter((p) => p.id !== id);
      set({ products: filtered });
    } catch (err) {
      console.error("Delete product error:", err);
      set({ error: err });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProductStore;
