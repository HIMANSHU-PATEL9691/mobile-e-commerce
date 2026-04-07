import { useAdmin } from "@/context/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Sales = () => {
  const { orders } = useAdmin();

  const salesByDate = orders
    .filter(o => o.status !== "cancelled")
    .reduce((acc, o) => {
      const date = o.createdAt;
      if (!acc[date]) acc[date] = { date, totalSales: 0, orders: 0 };
      acc[date].totalSales += o.totalAmount;
      acc[date].orders += 1;
      return acc;
    }, {} as Record<string, { date: string; totalSales: number; orders: number }>);

  const salesData = Object.values(salesByDate).sort((a, b) => a.date.localeCompare(b.date));
  const totalRevenue = salesData.reduce((s, d) => s + d.totalSales, 0);
  const totalOrders = salesData.reduce((s, d) => s + d.orders, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Sales Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold text-primary">₹{totalRevenue.toLocaleString("en-IN")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
            <p className="text-2xl font-bold text-foreground">₹{totalOrders ? Math.round(totalRevenue / totalOrders).toLocaleString("en-IN") : 0}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Revenue Chart</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} />
                <Bar dataKey="totalSales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Sales History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map(d => (
                <TableRow key={d.date}>
                  <TableCell>{d.date}</TableCell>
                  <TableCell>{d.orders}</TableCell>
                  <TableCell className="font-medium">₹{d.totalSales.toLocaleString("en-IN")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
