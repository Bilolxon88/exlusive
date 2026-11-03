import { useLanguage } from "../LanguageContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { products } from "../data";
import { useStore } from "../store";
import Breadcrumb from "../components/Breadcrumb";
import Stars from "../components/Stars";
import ProductGrid from "../components/ProductGrid";
import SectionTitle from "../components/SectionTitle";
import EmptyState from "../components/EmptyState";
import { asset, money } from "../utils";
export default function Product() {
  const { t } = useLanguage();
  const { id } = useParams();
  const p = products.find((p) => p.id === id);
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("silver");
  if (!p)
    return (
      <main className="container page-main">
        <EmptyState
          title={t("Product not found")}
          description="Discover something else from our collection."
        />
      </main>
    );
  return (
    <main className="container page-main">
      <Breadcrumb
        items={[
          {
            label: "Shop",
            path: "/shop",
          },
          {
            label: p.category,
            path: `/shop?category=${encodeURIComponent(p.category)}`,
          },
          p.name,
        ]}
      />
      <div className="product-detail">
        <div className="product-gallery">
          <div className="product-thumbnails">
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="product-thumbnail">
                <img
                  src={asset(p.image)}
                  alt={t("{name}, view {number}", {
                    name: t(p.name),
                    number: n + 1,
                  })}
                />
              </div>
            ))}
          </div>
          <div className="product-main-image">
            <img src={asset(p.image)} alt={t(p.name)} />
          </div>
        </div>
        <div className="product-info">
          <h1>{t(p.name)}</h1>
          <div className="product-stock">
            <Stars rating={p.rating} reviews={p.reviews} />
            <span>|</span>
            <span className="text-green-600">{t("In Stock")}</span>
          </div>
          <div className="detail-price">{money(p.price)}</div>
          <p className="product-description">{t(p.description)}</p>
          <div className="option-row">
            {t("Colours:")}{" "}
            <button
              aria-label={t("Silver colour")}
              aria-pressed={color === "silver"}
              className={`colour-swatch silver ${color === "silver" ? "chosen" : ""}`}
              onClick={() => setColor("silver")}
            />
            <button
              aria-label={t("Red colour")}
              aria-pressed={color === "red"}
              className={`colour-swatch red ${color === "red" ? "chosen" : ""}`}
              onClick={() => setColor("red")}
            />
          </div>
          <div className="option-row">
            {t("Size:")}{" "}
            <div className="sizes">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  aria-pressed={size === s}
                  className={size === s ? "selected" : ""}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="buy-row">
            <div className="quantity-stepper">
              <button
                aria-label={t("Decrease quantity")}
                disabled={qty === 1}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus size={18} />
              </button>
              <span aria-live="polite">{qty}</span>
              <button
                aria-label={t("Increase quantity")}
                disabled={qty === 99}
                onClick={() => setQty((q) => Math.min(99, q + 1))}
              >
                <Plus size={18} />
              </button>
            </div>
            <button className="btn" onClick={() => addToCart(p.id, qty)}>
              {t("Add To Cart")}
            </button>
            <button
              className={`btn-heart ${wishlist.includes(id) ? "selected" : ""}`}
              aria-label={t("Toggle product wishlist")}
              aria-pressed={wishlist.includes(id)}
              onClick={() => toggleWishlist(id)}
            >
              <Heart fill={wishlist.includes(id) ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="delivery-info">
            <div>
              <Truck size={30} />
              <section>
                <h3>{t("Free Delivery")}</h3>
                <p>{t("Free standard delivery on this item.")}</p>
              </section>
            </div>
            <div>
              <RotateCcw size={30} />
              <section>
                <h3>{t("Return Delivery")}</h3>
                <p>{t("Free 30-day returns. Shop with confidence.")}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <section className="related-section">
        <SectionTitle label="Related Items" title={t("You might also like")} />
        <ProductGrid items={products.filter((x) => x.id !== id).slice(0, 4)} />
      </section>
    </main>
  );
}
