import ProductCard from "./ProductCard";
export default function ProductGrid({ items, removable = false }) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} removable={removable} />
      ))}
    </div>
  );
}
