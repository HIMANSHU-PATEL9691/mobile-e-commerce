import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, TrendingUp, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { label: "Customers", path: "/admin/customers", icon: Users },
  { label: "Sales", path: "/admin/sales", icon: TrendingUp },
];

const AdminLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className={cn("bg-card border-r transition-all duration-300 flex flex-col", collapsed ? "w-16" : "w-60")}>
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && <h2 className="font-bold text-lg text-foreground">Admin Panel</h2>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground p-1">
            <ArrowLeft size={18} className={cn("transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
            const exactActive = item.path === "/admin" ? location.pathname === "/admin" : isActive;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  exactActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            {!collapsed && <span>Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-background overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
