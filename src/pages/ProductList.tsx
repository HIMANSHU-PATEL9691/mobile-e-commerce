import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { filterProducts, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const priceRanges = [
  { label: "Under ₹20,000", min: 0, max: 20000 },
  { label: "₹20,000 - ₹50,000", min: 20000, max: 50000 },
  { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
  { label: "Above ₹1,00,000", min: 100000, max: Infinity },
];

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const initialBrand = searchParams.get("brand") || "";
  const initialCondition = searchParams.get("condition") || "";
  const initialSearch = searchParams.get("search") || "";

  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCondition, setSelectedCondition] = useState(initialCondition);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const range = selectedPriceRange !== null ? priceRanges[selectedPriceRange] : null;
    return filterProducts({
      brand: selectedBrand || undefined,
      condition: selectedCondition || undefined,
      minPrice: range?.min,
      maxPrice: range?.max === Infinity ? undefined : range?.max,
      search: initialSearch || undefined,
    });
  }, [selectedBrand, selectedCondition, selectedPriceRange, initialSearch]);

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedCondition("");
    setSelectedPriceRange(null);
  };

  const hasFilters = selectedBrand || selectedCondition || selectedPriceRange !== null;

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-card-foreground">Filters</h3>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-primary hover:underline">Clear all</button>
        )}
      </div>

      {/* Brand */}
      <div>
        <h4 className="text-sm font-semibold text-card-foreground mb-2">Brand</h4>
        <div className="space-y-1">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <input
                type="radio"
                name="brand"
                checked={selectedBrand === brand}
                onChange={() => setSelectedBrand(selectedBrand === brand ? "" : brand)}
                className="accent-primary"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h4 className="text-sm font-semibold text-card-foreground mb-2">Condition</h4>
        <div className="space-y-1">
          {["new", "used"].map(cond => (
            <label key={cond} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground capitalize">
              <input
                type="radio"
                name="condition"
                checked={selectedCondition === cond}
                onChange={() => setSelectedCondition(selectedCondition === cond ? "" : cond)}
                className="accent-primary"
              />
              {cond === "used" ? "Pre-owned" : "Brand New"}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-sm font-semibold text-card-foreground mb-2">Price Range</h4>
        <div className="space-y-1">
          {priceRanges.map((range, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === i}
                onChange={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                className="accent-primary"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {initialSearch ? `Results for "${initialSearch}"` : "All Mobiles"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} products found</p>
        </div>
        <Button variant="outline" size="sm" className="lg:hidden gap-2" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal size={14} /> Filters
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Desktop filters */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="bg-card rounded-lg border border-border p-4 sticky top-28">
            <FilterSection />
          </div>
        </aside>

        {/* Mobile filters overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 h-full w-72 bg-card p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-card-foreground">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X size={20} /></button>
              </div>
              <FilterSection />
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
