import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { CART_CHECKOUT_COPY } from "../../data/sharedData";

const LUXURY_EASE = [0.22, 1, 0.36, 1];

export default function CartDrawer() {
  const {
    lang,
    isRtl,
    currency,
    cart,
    totals,
    formatAmount,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    openCheckout,
  } = useStore();

  const copy = CART_CHECKOUT_COPY[lang];

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#141413]/45"
            aria-hidden="true"
          />

          {/* Slide-out Panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={copy.bagTitle}
            data-lenis-prevent
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            className="relative z-10 w-full max-w-[440px] h-full bg-[#FAF9F6] text-[#141413] border-s border-[#E4DFD6] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4DFD6]">
              <div className="flex items-baseline gap-2.5">
                <h2 className="font-serif text-2xl font-light tracking-normal">
                  {copy.bagTitle}
                </h2>
                <span className="text-[11px] text-[#6E6A63]">
                  ({totals.totalItems})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-end text-[#141413] hover:opacity-60 transition-opacity"
                aria-label="Close bag"
              >
                <X className="w-5 h-5 stroke-[1.25]" />
              </button>
            </div>

            {/* Free Express Shipping Progress */}
            <div className="px-6 py-3.5 bg-[#F2EFE9] border-b border-[#E4DFD6]">
              <p className="text-[11px] uppercase ltr:tracking-[0.14em] rtl:tracking-normal text-[#141413] mb-2">
                {totals.isFreeShippingUnlocked ? (
                  copy.freeShippingUnlocked
                ) : (
                  <>
                    {formatAmount(totals.remainingForFreeShipping)}{" "}
                    {copy.freeShippingRemaining}
                  </>
                )}
              </p>
              <div className="w-full h-[2px] bg-[#E4DFD6] overflow-hidden">
                <div
                  className="h-full bg-[#141413] transition-transform duration-500 ease-luxury origin-left rtl:origin-right"
                  style={{
                    transform: `scaleX(${totals.freeShippingProgress / 100})`,
                  }}
                />
              </div>
            </div>

            {/* Items List */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#E4DFD6]"
            >
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <p className="font-serif text-xl font-light mb-2">
                    {copy.emptyTitle}
                  </p>
                  <p className="text-[13px] text-[#6E6A63] max-w-[260px] leading-relaxed">
                    {copy.emptySub}
                  </p>
                </div>
              ) : (
                cart.map((item) => {
                  const unitPrice =
                    item.prices?.[currency] ?? item.prices?.EGP ?? 0;
                  const lineTotal = unitPrice * item.quantity;

                  return (
                    <div
                      key={item.cartKey}
                      className="py-5 first:pt-0 flex gap-4"
                    >
                      <div className="w-20 aspect-[3/4] bg-[#F2EFE9] border border-[#E4DFD6] shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name[lang]}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[10px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#6E6A63]">
                              {item.brand}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.cartKey)}
                              className="text-[11px] text-[#6E6A63] hover:text-[#141413] underline underline-offset-4"
                            >
                              {copy.remove}
                            </button>
                          </div>

                          <h3 className="text-[14px] font-normal text-[#141413] mt-1 leading-snug">
                            {item.name[lang]}
                          </h3>

                          <p className="text-[12px] text-[#6E6A63] mt-1">
                            {item.colorName[lang]} ·{" "}
                            {lang === "en" ? "Size" : "المقاس"} {item.size}
                          </p>

                          {item.isBundle && (
                            <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] uppercase ltr:tracking-[0.12em] rtl:tracking-normal bg-[#4A2C2A] text-[#FAF9F6]">
                              {copy.bundleBadge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center border border-[#E4DFD6]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartKey, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#F2EFE9] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-[12px]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartKey, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#F2EFE9] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <p className="text-[13px] font-normal">
                            {formatAmount(lineTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Totals */}
            {cart.length > 0 && (
              <div className="border-t border-[#E4DFD6] px-6 py-5 bg-[#FAF9F6] space-y-3">
                <div className="flex items-center justify-between text-[13px] text-[#6E6A63]">
                  <span>{copy.subtotal}</span>
                  <span>{formatAmount(totals.subtotal)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex items-center justify-between text-[13px] text-[#4A2C2A]">
                    <span>{copy.discount}</span>
                    <span>-{formatAmount(totals.discount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-[#E4DFD6] text-[15px] text-[#141413]">
                  <span className="font-serif text-lg">{copy.total}</span>
                  <span className="font-normal">
                    {formatAmount(totals.finalTotal)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={openCheckout}
                  className="w-full min-h-[48px] bg-[#141413] text-[#FAF9F6] text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal hover:bg-[#2A2927] transition-colors"
                >
                  {copy.checkoutCta}
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}