import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/store/ProductStore";
import { useNavigate } from "react-router";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  return (
    <Card
      key={product.id}
      className="shadow hover:shadow-lg transition cursor-pointer border-neutral-400"
      onClick={() => navigate(`/user/${product.id}`)}
    >
      <CardHeader>
        <CardTitle className="truncate text-2xl">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />
        <p className="text-gray-500 capitalize mt-2">{product.category}</p>
        <p className="text-lg font-bold mt-1">${product.price}</p>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
