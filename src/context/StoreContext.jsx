import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MARKET_CURRENCIES, MV_LUXURY_PRICES } from "../data/sharedData";

const StoreContext = createContext(null);
const STORAGE_KEY = "luxury_portfolio_cart_v1";

export function resolveProductPrices(product) {
  if (product?.prices) return product.prices;
  if (product?.id && MV_LUXURY_PRICES[product.id]) {
    return MV_LUXURY_PRICES[product.id];
  }
  const egp = product?.priceEGP ?? 0;
  return {
    EGP: egp,
    USD: Math.round(egp * 0.022),
    SAR: Math.round(egp * 0.083),
  };
}

export function StoreProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [currency, setCurrency] = useState("EGP");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors in restricted WebViews
    }
  }, [cart]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));

  const formatAmount = (amount, currCode = currency) => {
    const formatted = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
    if (currCode === "USD") return `$${formatted}`;
    return `${currCode} ${formatted}`;
  };

  const formatProductPrice = (product) => {
    const prices = resolveProductPrices(product);
    return formatAmount(prices[currency] ?? prices.EGP, currency);
  };

  const addToCart = ({
    product,
    variant,
    size,
    brand = "MAISON VERRE",
    quantity = 1,
    isBundle = false,
  }) => {
    const activeVariant = variant || product.variants?.[0];
    const prices = resolveProductPrices(product);
    const cartKey = `${product.id}__${activeVariant?.colorId || "default"}__${size}__${isBundle ? "bundle" : "single"}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          id: product.id,
          sku: product.sku,
          brand,
          name: product.name,
          colorName: activeVariant?.colorName || { en: "Signature", ar: "أيقوني" },
          image: activeVariant?.image || "",
          size,
          prices,
          quantity,
          isBundle,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const addBundleToCart = (bundleEntries) => {
    bundleEntries.forEach((entry) => {
      addToCart({
        product: entry.product,
        variant: entry.variant,
        size: entry.size,
        brand: entry.brand || "MAISON VERRE",
        quantity: 1,
        isBundle: true,
      });
    });
  };

  const updateQuantity = (cartKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const clearCart = () => setCart([]);

  const totals = useMemo(() => {
    let subtotal = 0;
    let discount = 0;
    let totalItems = 0;

    for (const item of cart) {
      const unitPrice = item.prices?.[currency] ?? item.prices?.EGP ?? 0;
      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;
      if (item.isBundle) {
        discount += lineTotal * 0.15;
      }
      totalItems += item.quantity;
    }

    const finalTotal = Math.max(0, subtotal - discount);
    const freeShippingThreshold =
      MARKET_CURRENCIES[currency]?.freeShipping ?? 6000;
    const remainingForFreeShipping = Math.max(
      0,
      freeShippingThreshold - finalTotal
    );
    const freeShippingProgress = Math.min(
      100,
      (finalTotal / freeShippingThreshold) * 100
    );

    return {
      subtotal,
      discount,
      finalTotal,
      totalItems,
      freeShippingThreshold,
      remainingForFreeShipping,
      freeShippingProgress,
      isFreeShippingUnlocked: finalTotal >= freeShippingThreshold && totalItems > 0,
    };
  }, [cart, currency]);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const value = {
    lang,
    setLang,
    toggleLang,
    isRtl,
    currency,
    setCurrency,
    cart,
    addToCart,
    addBundleToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totals,
    formatAmount,
    formatProductPrice,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    openCheckout,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}