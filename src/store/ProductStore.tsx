import { create } from "zustand";

export type Product = {
  id: number;
  title: string;
  description: string;
  brand: string;
  rating: number;
  stock: number;
  price: number;
  category: string;
  thumbnail: string;
};

type ProductStore = {
  products: Product[];
  recentlyAddedProducts: Product[];
  setProducts: (newProducts: Product[]) => void;
  addProduct: (product: Product) => void;
};

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  recentlyAddedProducts: [],
  setProducts: (newProducts) => set({ products: newProducts }),
  addProduct: (product) =>
    set((state) => ({
      products: [product, ...state.products],
      recentlyAddedProducts: [product, ...state.recentlyAddedProducts],
    })),
}));

export default useProductStore;
