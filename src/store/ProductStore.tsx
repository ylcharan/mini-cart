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
  setProducts: (newProducts: Product[]) => void;
  addProduct: (product: Product) => void;
};

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (newProducts) => set({ products: newProducts }),
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
}));

export default useProductStore;
