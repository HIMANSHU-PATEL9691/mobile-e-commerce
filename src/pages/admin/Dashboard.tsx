import { useAdmin } from "@/context/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, Users, IndianRupee, TrendingUp, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const { products, orders, customers } = useAdmin();

  const totalRevenue = orders.filter(o => o.status !== "cancelled").reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const lowStockProducts = products.filter(p => p.stock < 5).length;

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-blue-600 bg-blue-100" },
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-green-600 bg-green-100" },
    { label: "Total Customers", value: customers.length, icon: Users, color: "text-purple-600 bg-purple-100" },
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-primary bg-primary/10" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><TrendingUp size={20} /> Recent Orders</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm text-foreground">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-foreground">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${order.status === "delivered" ? "bg-green-100 text-green-700" : order.status === "shipped" ? "bg-blue-100 text-blue-700" : order.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><AlertCircle size={20} /> Quick Stats</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Pending Orders</span>
              <span className="font-bold text-primary">{pendingOrders}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Low Stock Products</span>
              <span className="font-bold text-destructive">{lowStockProducts}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Active Customers</span>
              <span className="font-bold text-foreground">{customers.filter(c => c.status === "active").length}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Blocked Customers</span>
              <span className="font-bold text-foreground">{customers.filter(c => c.status === "blocked").length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
