import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useProductStore, { type Product } from "@/store/ProductStore";
import { useEffect, useState } from "react";

const Products = () => {
  const { products, setProducts } = useProductStore();
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Sorting by Category
  let filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  // Sorting by Name
  filteredProducts = filteredProducts.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return p.title.toLowerCase().includes(term);
  });

  // Sorting by Price
  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="">
      <div className="flex items-center justify-between py-4">
        {/* Search Bar */}
        <div className="flex items-center w-[40%] gap-2">
          <Input
            placeholder="Search with item name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Button>Search</Button>
        </div>

        {/* Select for sorting and filtering */}
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Select for category filtering */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Products" />
            </SelectTrigger>
            <SelectContent>
              {[
                "All",
                ...new Set(products.map((p: Product) => p.category)),
              ].map((category: string) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="capitalize"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* If no items were found it return text other wise it returns the items */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="py-6">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
};
export default Products;
