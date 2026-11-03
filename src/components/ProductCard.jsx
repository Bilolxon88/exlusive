import { useLanguage } from "../LanguageContext";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye, Trash2 } from "lucide-react";
import { useStore } from "../store";
import Stars from "./Stars";
import { asset, money } from "../utils";
export default function ProductCard({ product: p, removable = false }) {
  const { t } = useLanguage();
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const saved = wishlist.includes(p.id);
  return (
    <article className="product-card">
      <div className="product-image">
        <Link
          to={`/product/${p.id}`}
          aria-label={t("View {name}", {
            name: t(p.name),
          })}
        >
          <img
            src={asset(p.image)}
            alt={t(p.name)}
            width="270"
            height="250"
            decoding="async"
            loading="lazy"
          />
        </Link>
        {p.discount && <span className="sale-tag">-{p.discount}%</span>}
        {p.isNew && !p.discount && (
          <span className="sale-tag new-tag">{t("NEW")}</span>
        )}
        <div className="card-actions">
          <button
            className={saved && !removable ? "saved" : ""}
            onClick={() => toggleWishlist(p.id)}
            aria-label={
              removable || saved
                ? t("Remove {name} from wishlist", {
                    name: t(p.name),
                  })
                : t("Save {name} to wishlist", {
                    name: t(p.name),
                  })
            }
          >
            {removable ? (
              <Trash2 size={18} />
            ) : (
              <Heart size={18} fill={saved ? "currentColor" : "none"} />
            )}
          </button>
          <Link
            to={`/product/${p.id}`}
            aria-label={t("View details for {name}", {
              name: t(p.name),
            })}
          >
            <Eye size={19} />
          </Link>
        </div>
        <button className="add-cart" onClick={() => addToCart(p.id)}>
          <ShoppingCart size={17} />
          {t("Add To Cart")}
        </button>
      </div>
      <Link className="product-name" to={`/product/${p.id}`}>
        {t(p.name)}
      </Link>
      <div className="product-price">
        <span>{money(p.price)}</span>
        {p.old && <del>{money(p.old)}</del>}
      </div>
      <Stars rating={p.rating} reviews={p.reviews} />
    </article>
  );
}
