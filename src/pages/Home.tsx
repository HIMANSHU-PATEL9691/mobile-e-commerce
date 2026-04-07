import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones, Smartphone, Star } from "lucide-react";
import { getFeaturedProducts, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "New Phones", icon: Smartphone, link: "/products?condition=new", color: "bg-primary/10 text-primary" },
  { name: "Second Hand", icon: RotateCcw, link: "/products?condition=used", color: "bg-success/10 text-success" },
  { name: "Apple", icon: Star, link: "/products?brand=Apple", color: "bg-foreground/10 text-foreground" },
  { name: "Samsung", icon: Star, link: "/products?brand=Samsung", color: "bg-blue-100 text-blue-600" },
];

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹25,000" },
  { icon: Shield, title: "Warranty", desc: "6-month seller warranty" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help center" },
];

const Home = () => {
  const featured = getFeaturedProducts();
  const latestProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-foreground text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary/20 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">
              🔥 Special Launch Offers
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Find Your Perfect <span className="text-primary">Mobile Phone</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Shop the latest smartphones and certified pre-owned devices at unbeatable prices. New arrivals every week!
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="gap-2 text-base font-semibold">
                  Shop Now <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/products?condition=used">
                <Button size="lg" variant="outline" className="gap-2 text-base font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Pre-Owned Deals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(f => (
              <div key={f.title} className="flex items-center gap-3">
                <f.icon size={20} className="text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link key={cat.name} to={cat.link} className="flex flex-col items-center gap-3 p-6 bg-card rounded-lg border border-border hover:shadow-md transition-all group">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <span className="text-sm font-semibold text-card-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Phones</h2>
          <Link to="/products" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Latest Arrivals</h2>
          <Link to="/products" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {latestProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground/70 mt-10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-primary-foreground font-bold mb-3 flex items-center gap-2"><Smartphone size={20} className="text-primary" /> MobiMart</h3>
              <p className="text-sm">Your trusted destination for new and pre-owned mobile phones.</p>
            </div>
            <div>
              <h4 className="text-primary-foreground font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/products" className="hover:text-primary transition-colors">All Mobiles</Link></li>
                <li><Link to="/products?condition=new" className="hover:text-primary transition-colors">New Phones</Link></li>
                <li><Link to="/products?condition=used" className="hover:text-primary transition-colors">Pre-Owned</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary-foreground font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Return Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary-foreground font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>support@mobimart.com</li>
                <li>+91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm">
            <p>© 2026 MobiMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
