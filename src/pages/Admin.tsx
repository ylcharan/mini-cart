"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useProductStore, { type Product } from "@/store/ProductStore";
import { Plus } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Admin() {
  const { addProduct, products, recentlyAddedProducts } = useProductStore();
  const [open, setOpen] = useState(false);

  const notify = () =>
    toast.success("Product added successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const [formData, setFormData] = useState<Product>({
    id: products.length + 1,
    title: "",
    description: "",
    brand: "",
    rating: 0,
    stock: 0,
    price: 0,
    category: "",
    thumbnail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "rating" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.price ||
      !formData.category ||
      !formData.thumbnail
    ) {
      toast.error("Some Fields are missing.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    addProduct({ ...formData, id: products.length + 1 });
    setFormData({
      id: products.length + 1,
      title: "",
      description: "",
      brand: "",
      rating: 0,
      stock: 0,
      price: 0,
      category: "",
      thumbnail: "",
    });
    setOpen(false);
    notify();
  };

  return (
    <div className="mt-[50px] w-full flex flex-col gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="cursor-pointer w-[200px]"
          >
            Add Product <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <Input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
            />
            <div className="flex items-center gap-2">
              <p>Rating: </p>{" "}
              <Input
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Rating"
              />
            </div>
            <div className="flex items-center gap-2">
              <p>Stock: </p>{" "}
              <Input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
            </div>
            <div className="flex items-center gap-2">
              <p>Price: </p>{" "}
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>

            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />
            <Input
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Image URL"
            />

            <Button onClick={handleSubmit} className="w-full">
              Save Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {recentlyAddedProducts.length > 0 ? (
        <>
          <h1 className="text-2xl">Recently Added Products...</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
            {recentlyAddedProducts.map((p) => (
              <ProductCard product={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-2xl">No Recently Added Product Found</div>
      )}
      <ToastContainer />
    </div>
  );
}
