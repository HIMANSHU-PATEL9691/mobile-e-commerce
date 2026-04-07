export interface ProductSpec {
  RAM: string;
  Storage: string;
  Battery: string;
  Display?: string;
  Processor?: string;
  Camera?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  condition: "new" | "used";
  description: string;
  specs: ProductSpec;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  category?: string;
}

export const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Google", "Nothing"];

const productImages = {
  iphone: ["/products/iphone-premium.svg", "/products/iphone-premium.svg"],
  samsung: ["/products/samsung-ultra.svg", "/products/samsung-ultra.svg"],
  oneplus: ["/products/oneplus-red.svg", "/products/oneplus-red.svg"],
  xiaomi: ["/products/xiaomi-green.svg", "/products/xiaomi-green.svg"],
  pixel: ["/products/pixel-blue.svg", "/products/pixel-blue.svg"],
  nothing: ["/products/nothing-dark.svg", "/products/nothing-dark.svg"],
};

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 134900,
    originalPrice: 159900,
    condition: "new",
    description: "The most powerful iPhone ever. Featuring a titanium design, A17 Pro chip, and a customizable Action button.",
    specs: { RAM: "8GB", Storage: "256GB", Battery: "4422mAh", Display: "6.7\" Super Retina XDR", Processor: "A17 Pro", Camera: "48MP + 12MP + 12MP" },
    images: productImages.iphone,
    stock: 15,
    rating: 4.8,
    reviewCount: 2340,
    featured: true,
    category: "Flagship"
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 129999,
    originalPrice: 139999,
    condition: "new",
    description: "Galaxy AI is here. Search like never before, Icons like a pro, get an instant translation during a call.",
    specs: { RAM: "12GB", Storage: "256GB", Battery: "5000mAh", Display: "6.8\" Dynamic AMOLED 2X", Processor: "Snapdragon 8 Gen 3", Camera: "200MP + 50MP + 12MP + 10MP" },
    images: productImages.samsung,
    stock: 20,
    rating: 4.7,
    reviewCount: 1890,
    featured: true,
    category: "Flagship"
  },
  {
    id: "3",
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 64999,
    originalPrice: 69999,
    condition: "new",
    description: "The all-new OnePlus 12 with Snapdragon 8 Gen 3, 50MP Hasselblad camera, and 100W SUPERVOOC charging.",
    specs: { RAM: "12GB", Storage: "256GB", Battery: "5400mAh", Display: "6.82\" 2K LTPO AMOLED", Processor: "Snapdragon 8 Gen 3", Camera: "50MP + 48MP + 64MP" },
    images: productImages.oneplus,
    stock: 30,
    rating: 4.5,
    reviewCount: 1200,
    featured: true,
    category: "Flagship"
  },
  {
    id: "4",
    name: "iPhone 13 (Refurbished)",
    brand: "Apple",
    price: 36999,
    originalPrice: 49900,
    condition: "used",
    description: "Certified refurbished iPhone 13 in excellent condition. Battery health 92%. Comes with 6-month warranty.",
    specs: { RAM: "4GB", Storage: "128GB", Battery: "92% Health", Display: "6.1\" Super Retina XDR", Processor: "A15 Bionic", Camera: "12MP + 12MP" },
    images: productImages.iphone,
    stock: 8,
    rating: 4.3,
    reviewCount: 456,
    category: "Budget"
  },
  {
    id: "5",
    name: "Xiaomi 14",
    brand: "Xiaomi",
    price: 49999,
    originalPrice: 54999,
    condition: "new",
    description: "Leica optics, Snapdragon 8 Gen 3 performance, and a compact design that fits perfectly in your hand.",
    specs: { RAM: "12GB", Storage: "256GB", Battery: "4610mAh", Display: "6.36\" LTPO AMOLED", Processor: "Snapdragon 8 Gen 3", Camera: "50MP Leica + 50MP + 50MP" },
    images: productImages.xiaomi,
    stock: 25,
    rating: 4.4,
    reviewCount: 890,
    featured: true,
    category: "Mid-Range"
  },
  {
    id: "6",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 89999,
    originalPrice: 106999,
    condition: "new",
    description: "The best of Google AI, the best Pixel camera ever, and seven years of security updates.",
    specs: { RAM: "12GB", Storage: "128GB", Battery: "5050mAh", Display: "6.7\" LTPO OLED", Processor: "Tensor G3", Camera: "50MP + 48MP + 48MP" },
    images: productImages.pixel,
    stock: 12,
    rating: 4.6,
    reviewCount: 1100,
    category: "Flagship"
  },
  {
    id: "7",
    name: "Samsung Galaxy A54 (Used)",
    brand: "Samsung",
    price: 18999,
    originalPrice: 32999,
    condition: "used",
    description: "Well-maintained Galaxy A54 with minor scratches. All features working perfectly. Battery health 88%.",
    specs: { RAM: "8GB", Storage: "128GB", Battery: "88% Health", Display: "6.4\" Super AMOLED", Processor: "Exynos 1380", Camera: "50MP + 12MP + 5MP" },
    images: productImages.samsung,
    stock: 5,
    rating: 4.1,
    reviewCount: 234,
    category: "Budget"
  },
  {
    id: "8",
    name: "Nothing Phone (2)",
    brand: "Nothing",
    price: 39999,
    originalPrice: 44999,
    condition: "new",
    description: "Unique Glyph Interface, clean software, and flagship-level performance at a competitive price.",
    specs: { RAM: "12GB", Storage: "256GB", Battery: "4700mAh", Display: "6.7\" LTPO OLED", Processor: "Snapdragon 8+ Gen 1", Camera: "50MP + 50MP" },
    images: productImages.nothing,
    stock: 18,
    rating: 4.3,
    reviewCount: 670,
    featured: true,
    category: "Mid-Range"
  },
  {
    id: "9",
    name: "OnePlus Nord 3 (Used)",
    brand: "OnePlus",
    price: 15999,
    originalPrice: 29999,
    condition: "used",
    description: "Lightly used OnePlus Nord 3. Perfect working condition. Comes with original charger and box.",
    specs: { RAM: "8GB", Storage: "128GB", Battery: "90% Health", Display: "6.74\" Super AMOLED", Processor: "Dimensity 9000", Camera: "50MP + 8MP + 2MP" },
    images: productImages.oneplus,
    stock: 3,
    rating: 4.0,
    reviewCount: 189,
    category: "Budget"
  },
  {
    id: "10",
    name: "iPhone 14",
    brand: "Apple",
    price: 59900,
    originalPrice: 69900,
    condition: "new",
    description: "iPhone 14 features a 6.1-inch display, A15 Bionic chip, improved cameras, and Emergency SOS via satellite.",
    specs: { RAM: "6GB", Storage: "128GB", Battery: "3279mAh", Display: "6.1\" Super Retina XDR", Processor: "A15 Bionic", Camera: "12MP + 12MP" },
    images: productImages.iphone,
    stock: 22,
    rating: 4.5,
    reviewCount: 1560,
    category: "Mid-Range"
  },
  {
    id: "11",
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    price: 22999,
    originalPrice: 25999,
    condition: "new",
    description: "200MP camera, 120Hz AMOLED display, and 67W turbo charging in a sleek design.",
    specs: { RAM: "8GB", Storage: "256GB", Battery: "5100mAh", Display: "6.67\" AMOLED 120Hz", Processor: "Snapdragon 7s Gen 2", Camera: "200MP + 8MP + 2MP" },
    images: productImages.xiaomi,
    stock: 40,
    rating: 4.2,
    reviewCount: 780,
    category: "Budget"
  },
  {
    id: "12",
    name: "Google Pixel 7a (Used)",
    brand: "Google",
    price: 21999,
    originalPrice: 43999,
    condition: "used",
    description: "Google Pixel 7a in great condition. Amazing camera quality. Battery health 85%.",
    specs: { RAM: "8GB", Storage: "128GB", Battery: "85% Health", Display: "6.1\" OLED 90Hz", Processor: "Tensor G2", Camera: "64MP + 13MP" },
    images: productImages.pixel,
    stock: 4,
    rating: 4.2,
    reviewCount: 345,
    category: "Budget"
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function filterProducts(filters: {
  brand?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Product[] {
  return products.filter(p => {
    if (filters.brand && p.brand !== filters.brand) return false;
    if (filters.condition && p.condition !== filters.condition) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase()) && !p.brand.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
}
