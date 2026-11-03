import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { products, categoryMatches, sideCategories } from "../data";
import Breadcrumb from "../components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";
import EmptyState from "../components/EmptyState";
export default function Shop() {
  const { t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);
  const q = params.get("q") || "";
  const category = params.get("category") || "";
  const collection = params.get("collection") || "";
  let filtered = products.filter(
    (p) =>
      categoryMatches(p, category) &&
      [p.name, t(p.name), t(p.category)].some((text) =>
        text.toLowerCase().includes(q.trim().toLowerCase()),
      ) &&
      (collection !== "sale" || p.old) &&
      (collection !== "best" ||
        ["coat", "bag", "cooler", "bookshelf"].includes(p.id)),
  );
  if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  function setCategory(c) {
    const next = new URLSearchParams(params);
    c ? next.set("category", c) : next.delete("category");
    setParams(next);
    setMobileFilters(false);
  }
  return (
    <main className="container page-main">
      <Breadcrumb items={["Shop"]} />
      <div className="shop-heading">
        <div>
          <div className="eyebrow">
            <span />
            {t("The collection")}
          </div>
          <h1>
            {q
              ? t("Results for “{query}”", {
                  query: q,
                })
              : t(category || "All Products")}
          </h1>
          <p>
            {t("{count} products to discover", {
              count: filtered.length,
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="filter-toggle btn-outline"
            onClick={() => setMobileFilters(!mobileFilters)}
          >
            <SlidersHorizontal size={18} />
            {t("Filters")}
          </button>
          <select
            aria-label={t("Sort products")}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">{t("Featured")}</option>
            <option value="price-low">{t("Price: Low to High")}</option>
            <option value="price-high">{t("Price: High to Low")}</option>
            <option value="rating">{t("Top Rated")}</option>
          </select>
        </div>
      </div>
      <div className="shop-layout">
        <aside className={mobileFilters ? "shop-sidebar open" : "shop-sidebar"}>
          <h3>{t("Shop by category")}</h3>
          {[
            "All Products",
            ...new Set([
              ...sideCategories,
              "Phones",
              "Computers",
              "Cameras",
              "Gaming",
              "Headphones",
            ]),
          ].map((c) => (
            <button
              className={
                category === c || (!category && c === "All Products")
                  ? "selected"
                  : ""
              }
              key={c}
              onClick={() => setCategory(c === "All Products" ? "" : c)}
            >
              {t(c)}
            </button>
          ))}
          {(q || collection) && (
            <button className="clear-filter" onClick={() => setParams({})}>
              {t("Clear all filters")}
            </button>
          )}
        </aside>
        <div>
          {filtered.length ? (
            <ProductGrid items={filtered} />
          ) : (
            <EmptyState
              title={t("No products found")}
              description="Try a different search or browse another category."
            />
          )}
        </div>
      </div>
    </main>
  );
}
