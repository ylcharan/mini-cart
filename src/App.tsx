import Header from "./components/Header.tsx";
import Admin from "./pages/Admin.tsx";
import ProductDetails from "./components/ProductDetails.tsx";

import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import useProductStore from "./store/ProductStore.tsx";
import Products from "./pages/Products.tsx";

const App = () => {
  const { setProducts } = useProductStore();
  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [setProducts]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/user" replace />} />
          <Route path="/user" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
