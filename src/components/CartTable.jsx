import { useLanguage } from "../LanguageContext";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { asset, money } from "../utils";
export default function CartTable({ items, onQuantityChange }) {
  const { t } = useLanguage();
  return (
    <div className="cart-table-wrap">
      <table className="cart-table">
        <thead>
          <tr>
            <th>{t("Product")}</th>
            <th>{t("Price")}</th>
            <th>{t("Quantity")}</th>
            <th>{t("Subtotal")}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>
                <div className="cart-product">
                  <div className="cart-thumb">
                    <button
                      aria-label={t("Remove {name} from cart", {
                        name: t(p.name),
                      })}
                      onClick={() => onQuantityChange(p.id, 0)}
                    >
                      <X size={12} />
                    </button>
                    <Link to={`/product/${p.id}`}>
                      <img src={asset(p.image)} alt={t(p.name)} />
                    </Link>
                  </div>
                  <Link to={`/product/${p.id}`}>{t(p.name)}</Link>
                </div>
              </td>
              <td>{money(p.price)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={p.qty}
                  aria-label={t("Quantity for {name}", {
                    name: t(p.name),
                  })}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (Number.isInteger(v) && v > 0) onQuantityChange(p.id, v);
                  }}
                />
              </td>
              <td>{money(p.price * p.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
