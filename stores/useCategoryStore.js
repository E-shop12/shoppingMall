import { getCategory } from "@/services/productService";
import { create } from "zustand";

const useCategoryStore = create((set) => ({
  //setting global states
  categories: [],
  isLoading: false,
  error: null,

  // function to fetch products
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categories = await getCategory(); // already an array now
      set({ categories });
    } catch (e) {
      console.error(e);
      set({ error: e });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCategoryStore;
