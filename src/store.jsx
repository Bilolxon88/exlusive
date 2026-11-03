import { createContext, useContext, useEffect, useState } from "react";
import { products } from "./data";
import { useAuth } from "./AuthContext";
const Store = createContext(null);
export function readSaved(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function saveSaved(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
export function StoreProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(() => {
    const c = readSaved("exclusive-cart", []);
    return Array.isArray(c)
      ? c.filter(
          (x) =>
            x &&
            products.some((p) => p.id === x.id) &&
            Number.isInteger(x.qty) &&
            x.qty > 0 &&
            x.qty <= 99,
        )
      : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const w = readSaved("exclusive-wishlist", []);
    return Array.isArray(w)
      ? w.filter((id) => products.some((p) => p.id === id))
      : [];
  });
  const [details, setDetails] = useState(() =>
    readSaved("exclusive-profile", {}),
  );
  useEffect(() => {
    setDetails(
      readSaved(
        user ? `exclusive-profile-${user.uid}` : "exclusive-profile",
        {},
      ),
    );
  }, [user?.uid]);
  const displayName = user?.displayName || "";
  const profile = {
    firstName: details?.firstName || displayName.split(" ")[0] || "",
    lastName: details?.lastName || displayName.split(" ").slice(1).join(" "),
    email: user?.email || details?.email || "",
    address: details?.address || "",
  };
  function setProfile(next) {
    setDetails(next || {});
    saveSaved(
      user ? `exclusive-profile-${user.uid}` : "exclusive-profile",
      next || {},
    );
  }
  useEffect(() => {
    saveSaved("exclusive-cart", cart);
  }, [cart]);
  useEffect(() => {
    saveSaved("exclusive-wishlist", wishlist);
  }, [wishlist]);
  function addToCart(id, qty = 1) {
    if (!Number.isInteger(qty) || qty < 1) return;
    if (!products.some((product) => product.id === id)) return;
    setCart((c) => {
      const existing = c.find((x) => x.id === id);
      return existing
        ? c.map((x) =>
            x.id === id
              ? {
                  ...x,
                  qty: Math.min(99, x.qty + qty),
                }
              : x,
          )
        : [
            ...c,
            {
              id,
              qty: Math.min(99, qty),
            },
          ];
    });
  }
  function toggleWishlist(id) {
    if (!products.some((product) => product.id === id)) return;
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
    );
  }
  function updateQty(id, qty) {
    const current = cart.find((item) => item.id === id);
    if (!current || !Number.isInteger(qty) || current.qty === qty) return;
    setCart((c) =>
      qty < 1
        ? c.filter((x) => x.id !== id)
        : c.map((x) =>
            x.id === id
              ? {
                  ...x,
                  qty: Math.min(99, qty),
                }
              : x,
          ),
    );
  }
  const items = cart.map((item) => ({
    ...products.find((p) => p.id === item.id),
    qty: item.qty,
  }));
  const subtotal = items.reduce((sum, p) => sum + p.price * p.qty, 0);
  return (
    <Store.Provider
      value={{
        cart,
        items,
        subtotal,
        wishlist,
        profile,
        setProfile,
        setCart,
        setWishlist,
        addToCart,
        toggleWishlist,
        updateQty,
      }}
    >
      {children}
    </Store.Provider>
  );
}
export const useStore = () => useContext(Store);
