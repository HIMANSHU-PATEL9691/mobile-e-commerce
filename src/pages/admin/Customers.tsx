import { useAdmin } from "@/context/AdminContext";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, ShieldOff } from "lucide-react";

const Customers = () => {
  const { customers, toggleCustomerStatus } = useAdmin();
  const { toast } = useToast();

  const handleToggle = (id: string, currentStatus: string) => {
    toggleCustomerStatus(id);
    toast({ title: `Customer ${currentStatus === "active" ? "blocked" : "activated"}` });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Customers ({customers.length})</h1>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-sm">{c.email}</TableCell>
                  <TableCell className="text-sm">{c.phone}</TableCell>
                  <TableCell>{c.totalOrders}</TableCell>
                  <TableCell>₹{c.totalSpent.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-sm">{c.joinedAt}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${c.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {c.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleToggle(c.id, c.status)} className="gap-1">
                      {c.status === "active" ? <><ShieldOff size={14} /> Block</> : <><ShieldCheck size={14} /> Activate</>}
                    </Button>
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

export default Customers;
