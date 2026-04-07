import { useAdmin } from "@/context/AdminContext";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const { toast } = useToast();

  const handleStatusChange = (id: string, status: string) => {
    updateOrderStatus(id, status as any);
    toast({ title: `Order ${id} updated to ${status}` });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Orders ({orders.length})</h1>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.items.map(i => (
                      <p key={i.productId} className="text-sm">{i.name} x{i.quantity}</p>
                    ))}
                  </TableCell>
                  <TableCell className="font-medium">₹{order.totalAmount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell className="text-sm">{order.createdAt}</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={v => handleStatusChange(order.id, v)}>
                      <SelectTrigger className="w-32">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[order.status]}`}>{order.status}</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
