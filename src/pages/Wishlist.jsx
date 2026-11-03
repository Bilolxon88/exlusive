import { useLanguage } from "../LanguageContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { products } from "../data";
import { useStore } from "../store";
import Breadcrumb from "../components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";
import SectionTitle from "../components/SectionTitle";
import EmptyState from "../components/EmptyState";
export default function Wishlist() {
  const { t } = useLanguage();
  const { wishlist, setWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <main className="container page-main">
      <Breadcrumb items={["Wishlist"]} />
      <div className="page-heading">
        <h1 className="small-heading">
          {t("Wishlist (")}
          {items.length})
        </h1>
        {items.length > 0 && (
          <button
            className="btn-outline"
            onClick={() => {
              items.forEach((p) => addToCart(p.id));
              setWishlist([]);
            }}
          >
            {t("Move All To Bag")}
          </button>
        )}
      </div>
      {items.length ? (
        <ProductGrid items={items} removable />
      ) : (
        <EmptyState
          icon={Heart}
          title={t("Keep your favorites close")}
          description="Tap the heart on a product to save it for later."
        />
      )}
      <section className="related-section">
        <SectionTitle
          label="Just For You"
          title={t("A few things you’ll love")}
        >
          <Link to="/shop" className="btn-outline ml-auto">
            {t("See All")}
          </Link>
        </SectionTitle>
        <ProductGrid
          items={products.filter((p) => !wishlist.includes(p.id)).slice(0, 4)}
        />
      </section>
    </main>
  );
}
