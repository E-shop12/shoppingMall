// stores/useProductStore.js
import { create } from "zustand";
import { getAllProducts,editProduct,getSingleProduct,createProduct,deleteProduct } from "@/services/productService";

const useProductStore = create((set, get) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  // Fetch all products
  fetchProducts: async (force = false) => {
    set((state) => {
      if (!force && state.products.length > 0) return state;
      return { isLoading: true, error: null };
    });
    try {
      const res = await getAllProducts();
      set({ products: res });
    } catch (err) {
      console.error("Fetch all products error:", err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  // Get a single product
  fetchProductById: async (id) => {
    // optional: clear any stale product before loading
    set({ isLoading: true, error: null, selectedProduct: null });

    try {
      // 1️⃣  Make the request (axios response or plain object)
      const res = await getSingleProduct(id);

      /* 2️⃣  Unwrap the payload once.
         ───────────────────────────────
         ‣ If getSingleProduct is an axios call:
             res          → { data: { status:'success', data:{…} } }
             res.data     → { status:'success', data:{…} }
             res.data.data→ { … }   ← product
         ‣ If the service already stripped axios:
             res          → { status:'success', data:{…} }
             res.data     → { … }   ← product
         ‣ If the service returns the product directly:
             res          → { … }   ← product
      */
      const product =
        res?.data?.data ?? // axios wrapper
        res?.data ?? // one‑level wrapper
        res; // already the product

      // 3️⃣  Save just the product
      set({ selectedProduct: product });
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

  //Get product-Category
}));

export default useProductStore;
