// stores/useCategoryStore.js
import { create } from "zustand";
import {
  getCategory, // fetch all categories
  getSingleCategoryID, // fetch one category by id
} from "@/services/productService"; // adjust path as needed

const useCategoryStore = create((set, get) => ({
  /* ------------------------------------------------------------- */
  /* state                                                         */
  /* ------------------------------------------------------------- */
  categories: [], // cached array of category objects
  isLoading: false,
  error: null,

  /* ------------------------------------------------------------- */
  /* actions                                                       */
  /* ------------------------------------------------------------- */

  /* fetch ALL categories and cache them */
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categories = await getCategory(); // returns an array
      set({ categories });
    } catch (err) {
      console.error(err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  /* fetch ONE category by id, with in‑memory caching */
  getCategoryById: async (id) => {
    // 1️⃣  Return from cache if we already have it
    const cached = get().categories.find((c) => c._id === id);
    if (cached) return cached;

    // 2️⃣  Otherwise, load from API and add to cache
    set({ isLoading: true, error: null });
    try {
      const cat = await getSingleCategoryID(id); // your service
      set((state) => ({ categories: [...state.categories, cat] }));
      return cat;
    } catch (err) {
      console.error(err);
      set({ error: err });
      throw err; // let caller handle it
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCategoryStore;
