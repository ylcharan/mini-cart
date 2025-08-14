import useProductStore from "@/store/ProductStore";
import { useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === Number(id));

  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        variant={"outline"}
        className="mb-4 cursor-pointer"
      >
        <ArrowLeft width={20} height={20} />
      </Button>
      {product ? (
        <div className="max-w-5xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-contain mb-4"
          />
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-lg font-semibold mb-2">Brand: {product.brand}</p>
          <p className="text-lg font-semibold mb-2">Rating: {product.rating}</p>
          <p className="text-lg font-semibold mb-2">Stock: {product.stock}</p>
          <p className="text-lg font-semibold mb-2">
            Price: ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
        </div>
      ) : (
        <div>
          <div>Product not found.</div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
