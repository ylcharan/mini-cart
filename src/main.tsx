import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import Products from "./pages/Products.tsx";
import Header from "./components/Header.tsx";
import Admin from "./pages/Admin.tsx";
import ProductDetails from "./components/ProductDetails.tsx";

createRoot(document.getElementById("root")!).render(
  <main className="w-[90%] max-w-[1440px] mx-auto">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/user" element={<Products />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  </main>
);
