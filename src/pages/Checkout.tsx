import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    if (!user) return;

    setForm(prev => ({
      ...prev,
      name: prev.name || user.name,
      email: prev.email || user.email,
      phone: prev.phone || user.phone,
    }));
  }, [user]);

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Order placed successfully! 🎉");
    clearCart();
    navigate("/");
  };

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Delivery Address</h2>
          <Input placeholder="Full Name" value={form.name} onChange={e => update("name", e.target.value)} />
          <Input placeholder="Email" type="email" value={form.email} onChange={e => update("email", e.target.value)} />
          <Input placeholder="Phone Number" value={form.phone} onChange={e => update("phone", e.target.value)} />
          <Input placeholder="Address" value={form.address} onChange={e => update("address", e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="City" value={form.city} onChange={e => update("city", e.target.value)} />
            <Input placeholder="PIN Code" value={form.pincode} onChange={e => update("pincode", e.target.value)} />
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Payment Method</h3>
            <div className="space-y-2">
              {["COD", "UPI", "Card"].map(method => (
                <label key={method} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="payment" checked={form.paymentMethod === method} onChange={() => update("paymentMethod", method)} className="accent-primary" />
                  {method === "COD" ? "Cash on Delivery" : method === "UPI" ? "UPI Payment" : "Credit/Debit Card"}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 h-fit">
          <h2 className="font-semibold text-card-foreground mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map(item => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                <span className="font-medium text-card-foreground">₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between font-bold text-card-foreground">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <Button type="submit" size="lg" className="w-full mt-6 text-base font-semibold">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
