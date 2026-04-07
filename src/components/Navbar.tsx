import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, Smartphone, Settings, LogOut, UserRound } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    toast.success("You have been logged out");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-foreground">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center gap-4 py-3">
          <button className="lg:hidden text-primary-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Smartphone className="text-primary" size={28} />
            <span className="text-xl font-bold text-primary-foreground hidden sm:inline">MobiMart</span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex">
              <input
                type="text"
                placeholder="Search mobiles, brands..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-l-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r-md transition-colors">
                <Search size={18} className="text-primary-foreground" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-primary-foreground/80 hover:text-primary transition-colors" title="Admin Panel">
              <Settings size={22} />
            </Link>

            {isAuthenticated && user ? (
              <div className="hidden items-center gap-2 md:flex">
                <div className="rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-2 text-xs text-primary-foreground">
                  <span className="block font-semibold leading-none">{user.name}</span>
                  <span className="text-primary-foreground/60">{user.email}</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Link to="/login">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button type="button" size="sm" className="font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative text-primary-foreground hover:text-primary transition-colors">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Nav links */}
        <nav className={`${mobileMenuOpen ? "block" : "hidden"} lg:block border-t border-muted-foreground/20 py-2`}>
          <ul className="flex flex-col lg:flex-row gap-1 lg:gap-6 text-sm">
            <li><Link to="/" className="block py-1 text-primary-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products" className="block py-1 text-primary-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>All Mobiles</Link></li>
            <li><Link to="/products?condition=new" className="block py-1 text-primary-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>New Phones</Link></li>
            <li><Link to="/products?condition=used" className="block py-1 text-primary-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Second Hand</Link></li>
            {isAuthenticated && user ? (
              <>
                <li className="flex items-center gap-2 py-2 text-primary-foreground/80">
                  <UserRound size={16} />
                  <span>{user.name}</span>
                </li>
                <li>
                  <button
                    type="button"
                    className="block py-1 text-primary-foreground/80 hover:text-primary transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="block py-1 text-primary-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
                <li><Link to="/register" className="block py-1 text-primary-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
