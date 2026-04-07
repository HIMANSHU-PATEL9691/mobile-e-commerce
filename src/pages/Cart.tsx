import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products"><Button className="gap-2">Continue Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Continue Shopping
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-6">Shopping Cart ({totalItems} items)</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.productId} className="bg-card rounded-lg border border-border p-4 flex gap-4">
              <div className="w-24 h-24 bg-secondary rounded flex items-center justify-center shrink-0">
                <ShoppingBag size={24} className="text-muted-foreground/30" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{item.brand}</p>
                <h3 className="font-semibold text-card-foreground text-sm">{item.name}</h3>
                <p className="text-lg font-bold text-card-foreground mt-1">₹{item.price.toLocaleString()}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-28">
          <h3 className="font-bold text-card-foreground mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span className="text-success font-medium">FREE</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-bold text-card-foreground text-base">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <Link to="/checkout">
            <Button size="lg" className="w-full mt-6 text-base font-semibold">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
