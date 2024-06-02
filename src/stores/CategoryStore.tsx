import { create } from "zustand";
import { CategoryProps } from "src/types";

interface Category {
    categories: CategoryProps[];
    setCategories: (categories: CategoryProps[]) => void;
}

export const useCategory = create<Category>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories: categories }),
}));
