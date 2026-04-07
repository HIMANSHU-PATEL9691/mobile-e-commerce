import React, { createContext, useContext, useState, useCallback } from "react";
import { products as initialProducts, Product } from "@/data/products";

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  address: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "blocked";
  joinedAt: string;
}

interface AdminContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  orders: Order[];
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  customers: Customer[];
  toggleCustomerStatus: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const mockOrders: Order[] = [
  { id: "o1", customerName: "Rahul Sharma", customerEmail: "rahul@gmail.com", items: [{ productId: "1", name: "iPhone 15 Pro Max", price: 134900, quantity: 1 }], totalAmount: 134900, status: "pending", paymentMethod: "COD", address: "123 MG Road, Mumbai", createdAt: "2026-04-01" },
  { id: "o2", customerName: "Priya Patel", customerEmail: "priya@gmail.com", items: [{ productId: "3", name: "OnePlus 12", price: 64999, quantity: 1 }, { productId: "11", name: "Xiaomi Redmi Note 13 Pro", price: 22999, quantity: 1 }], totalAmount: 87998, status: "shipped", paymentMethod: "UPI", address: "456 Park Street, Delhi", createdAt: "2026-03-28" },
  { id: "o3", customerName: "Amit Kumar", customerEmail: "amit@gmail.com", items: [{ productId: "2", name: "Samsung Galaxy S24 Ultra", price: 129999, quantity: 1 }], totalAmount: 129999, status: "delivered", paymentMethod: "Card", address: "789 Lake Road, Bangalore", createdAt: "2026-03-20" },
  { id: "o4", customerName: "Sneha Reddy", customerEmail: "sneha@gmail.com", items: [{ productId: "5", name: "Xiaomi 14", price: 49999, quantity: 2 }], totalAmount: 99998, status: "pending", paymentMethod: "COD", address: "12 Hill View, Hyderabad", createdAt: "2026-04-05" },
  { id: "o5", customerName: "Vikram Singh", customerEmail: "vikram@gmail.com", items: [{ productId: "8", name: "Nothing Phone (2)", price: 39999, quantity: 1 }], totalAmount: 39999, status: "cancelled", paymentMethod: "UPI", address: "34 River Side, Pune", createdAt: "2026-03-15" },
];

const mockCustomers: Customer[] = [
  { id: "u1", name: "Rahul Sharma", email: "rahul@gmail.com", phone: "+91 98765 43210", totalOrders: 3, totalSpent: 234900, status: "active", joinedAt: "2025-11-10" },
  { id: "u2", name: "Priya Patel", email: "priya@gmail.com", phone: "+91 87654 32109", totalOrders: 2, totalSpent: 87998, status: "active", joinedAt: "2025-12-05" },
  { id: "u3", name: "Amit Kumar", email: "amit@gmail.com", phone: "+91 76543 21098", totalOrders: 5, totalSpent: 389995, status: "active", joinedAt: "2025-08-20" },
  { id: "u4", name: "Sneha Reddy", email: "sneha@gmail.com", phone: "+91 65432 10987", totalOrders: 1, totalSpent: 99998, status: "active", joinedAt: "2026-01-15" },
  { id: "u5", name: "Vikram Singh", email: "vikram@gmail.com", phone: "+91 54321 09876", totalOrders: 1, totalSpent: 39999, status: "blocked", joinedAt: "2026-02-28" },
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    const id = Date.now().toString();
    setProducts(prev => [...prev, { ...product, id } as Product]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  const toggleCustomerStatus = useCallback((id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "blocked" : "active" } : c));
  }, []);

  return (
    <AdminContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus, customers, toggleCustomerStatus }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
