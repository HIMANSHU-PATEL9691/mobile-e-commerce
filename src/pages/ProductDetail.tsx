import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Truck, Shield, Check } from "lucide-react";
import { getProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProduct(id || "");
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">Product not found.</p>
        <Link to="/products"><Button variant="outline" className="mt-4">Back to Products</Button></Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      brand: product.brand,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="bg-card rounded-lg border border-border aspect-square overflow-hidden">
            <img
              src={product.images[selectedImage] ?? product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((image, i) => (
              <button
                key={`${product.id}-${i}`}
                type="button"
                className={`w-20 h-20 overflow-hidden rounded border bg-card transition-colors ${
                  selectedImage === i ? "border-primary" : "border-border hover:border-primary"
                }`}
                onClick={() => setSelectedImage(i)}
              >
                <img src={image} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-1">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 bg-success text-success-foreground text-sm font-semibold px-2 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star size={12} fill="currentColor" />
            </div>
            <span className="text-sm text-muted-foreground">{product.reviewCount.toLocaleString()} ratings</span>
            {product.condition === "used" && (
              <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded">Pre-owned</span>
            )}
          </div>

          <div className="mt-6 border-b border-border pb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-semibold text-success">{discount}% off</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Specs */}
          <div className="mt-6">
            <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="bg-secondary rounded-md p-3">
                  <p className="text-xs text-muted-foreground">{key}</p>
                  <p className="text-sm font-semibold text-secondary-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stock & delivery */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check size={16} className="text-success" />
              <span className={product.stock > 0 ? "text-success font-medium" : "text-destructive font-medium"}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck size={16} /> Free delivery on this product
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield size={16} /> 6-month warranty included
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <Button size="lg" className="flex-1 gap-2 text-base font-semibold" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingCart size={18} /> Add to Cart
            </Button>
            <Link to="/cart" className="flex-1">
              <Button size="lg" variant="outline" className="w-full text-base font-semibold" onClick={handleAddToCart} disabled={product.stock === 0}>
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
