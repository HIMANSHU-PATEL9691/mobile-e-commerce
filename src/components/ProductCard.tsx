import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border flex flex-col">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-secondary p-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
        {product.condition === "used" && (
          <span className="absolute top-2 right-2 bg-foreground/80 text-primary-foreground text-xs font-medium px-2 py-1 rounded">
            Pre-owned
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-card-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-0.5 bg-success text-success-foreground text-xs font-semibold px-1.5 py-0.5 rounded">
            <span>{product.rating}</span>
            <Star size={10} fill="currentColor" />
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-card-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <div className="mt-auto pt-3">
          <Button
            size="sm"
            className="w-full gap-2"
            onClick={(e) => {
              e.preventDefault();
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                brand: product.brand,
              });
            }}
          >
            <ShoppingCart size={14} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
