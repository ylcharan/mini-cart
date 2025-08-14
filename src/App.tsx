import Header from "./components/Header.tsx";
import Admin from "./pages/Admin.tsx";
import ProductDetails from "./components/ProductDetails.tsx";

import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import useProductStore from "./store/ProductStore.tsx";
import Products from "./pages/Products.tsx";

const App = () => {
  const { setProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
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
          <Route path="/user" element={<Products isLoading={isLoading} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
