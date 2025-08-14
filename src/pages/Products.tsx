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
import { useState } from "react";

const Products = ({ isLoading }: { isLoading: boolean }) => {
  const { products } = useProductStore();
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting by Category
  let filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  // Sorting by Name
  filteredProducts = filteredProducts.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  });

  // Sorting by Price
  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="">
      <div className="flex items-center max-md:flex-col justify-between py-4">
        {/* Search Bar */}
        <div className="flex items-center w-[40%] max-md:w-full gap-2">
          <Input
            placeholder="Search with item name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Button>Search</Button>
        </div>

        {/* Select for sorting and filtering */}
        <div className="flex max-md:mt-4 max-md:w-full items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] max-md:w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Select for category filtering */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] max-md:w-[100%]">
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

      {isLoading && filteredProducts.length === 0 ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <div className="py-6">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Products;
