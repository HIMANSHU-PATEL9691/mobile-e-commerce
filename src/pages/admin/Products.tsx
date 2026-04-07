import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emptyProduct: Omit<Product, "id"> = {
  name: "", brand: "Apple", price: 0, originalPrice: 0, condition: "new",
  description: "", specs: { RAM: "", Storage: "", Battery: "" },
  images: ["/placeholder.svg"], stock: 0, rating: 0, reviewCount: 0, category: "Mid-Range",
};

const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditingId(null); setForm(emptyProduct); setDialogOpen(true); };
  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ name: p.name, brand: p.brand, price: p.price, originalPrice: p.originalPrice || 0, condition: p.condition, description: p.description, specs: p.specs, images: p.images, stock: p.stock, rating: p.rating, reviewCount: p.reviewCount, category: p.category || "Mid-Range" });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) {
      toast({ title: "Error", description: "Name and price are required", variant: "destructive" });
      return;
    }
    if (editingId) {
      updateProduct(editingId, form);
      toast({ title: "Product updated" });
    } else {
      addProduct(form);
      toast({ title: "Product added" });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast({ title: "Product deleted" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Products ({products.length})</h1>
        <Button onClick={openAdd} className="gap-2"><Plus size={18} /> Add Product</Button>
      </div>

      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.brand}</TableCell>
                  <TableCell>₹{p.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell><span className={p.stock < 5 ? "text-destructive font-bold" : ""}>{p.stock}</span></TableCell>
                  <TableCell><span className={`px-2 py-0.5 rounded-full text-xs ${p.condition === "new" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{p.condition}</span></TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 size={16} className="text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No products found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Name *</label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Brand</label>
                <Select value={form.brand} onValueChange={v => setForm({ ...form, brand: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Apple", "Samsung", "OnePlus", "Xiaomi", "Google", "Nothing"].map(b => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Condition</label>
                <Select value={form.condition} onValueChange={v => setForm({ ...form, condition: v as "new" | "used" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Price *</label>
                <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Original Price</label>
                <Input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: Number(e.target.value) })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Stock</label>
                <Input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Flagship">Flagship</SelectItem>
                    <SelectItem value="Mid-Range">Mid-Range</SelectItem>
                    <SelectItem value="Budget">Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">RAM</label>
                <Input value={form.specs.RAM} onChange={e => setForm({ ...form, specs: { ...form.specs, RAM: e.target.value } })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Storage</label>
                <Input value={form.specs.Storage} onChange={e => setForm({ ...form, specs: { ...form.specs, Storage: e.target.value } })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Battery</label>
                <Input value={form.specs.Battery} onChange={e => setForm({ ...form, specs: { ...form.specs, Battery: e.target.value } })} />
              </div>
            </div>
            <Button onClick={handleSave} className="w-full">{editingId ? "Update Product" : "Add Product"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
