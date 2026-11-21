import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe, ShieldCheck, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { CART_CHECKOUT_COPY } from "../../data/sharedData";

const LUXURY_EASE = [0.22, 1, 0.36, 1];

export default function CheckoutModal() {
  const {
    lang,
    currency,
    cart,
    totals,
    formatAmount,
    isCheckoutOpen,
    setIsCheckoutOpen,
  } = useStore();

  const copy = CART_CHECKOUT_COPY[lang].checkoutModal;
  const bagCopy = CART_CHECKOUT_COPY[lang];
  const [selectedDestIndex, setSelectedDestIndex] = useState(0);

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: LUXURY_EASE }}
            onClick={() => setIsCheckoutOpen(false)}
            className="fixed inset-0 bg-[#141413]/60"
            aria-hidden="true"
          />

          {/* Modal Surface */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            data-lenis-prevent
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
            className="relative z-10 w-full max-w-[560px] max-h-[90vh] overflow-y-auto bg-[#FAF9F6] text-[#141413] border border-[#E4DFD6] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#E4DFD6]">
              <div>
                <p className="text-[10px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal text-[#4A2C2A] mb-1.5">
                  {copy.eyebrow}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-light leading-tight">
                  {copy.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-end text-[#141413] hover:opacity-60 transition-opacity"
                aria-label="Close checkout preview"
              >
                <X className="w-5 h-5 stroke-[1.25]" />
              </button>
            </div>

            {/* Dispatch Selector */}
            <div className="py-5 border-b border-[#E4DFD6]">
              <p className="text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#6E6A63] mb-3 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 stroke-[1.5]" />
                {copy.destinationLabel}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {copy.destinations.map((dest, idx) => {
                  const active = selectedDestIndex === idx;
                  return (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setSelectedDestIndex(idx)}
                      className={`min-h-[44px] px-3.5 py-2 text-start text-[12px] border flex items-center justify-between transition-colors ${
                        active
                          ? "border-[#141413] bg-[#141413] text-[#FAF9F6]"
                          : "border-[#E4DFD6] bg-white text-[#141413] hover:border-[#141413]"
                      }`}
                    >
                      <span>{dest}</span>
                      {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compact Item Recap */}
            <div className="py-5 border-b border-[#E4DFD6] space-y-2.5">
              {cart.map((item) => {
                const unitPrice =
                  item.prices?.[currency] ?? item.prices?.EGP ?? 0;
                return (
                  <div
                    key={item.cartKey}
                    className="flex items-baseline justify-between gap-4 text-[13px]"
                  >
                    <span className="text-[#141413] truncate">
                      {item.quantity}x {item.name[lang]} ({item.size})
                    </span>
                    <span className="shrink-0 text-[#6E6A63]">
                      {formatAmount(unitPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Financial Breakdown */}
            <div className="py-5 border-b border-[#E4DFD6] space-y-2 text-[13px]">
              <div className="flex justify-between text-[#6E6A63]">
                <span>{bagCopy.subtotal}</span>
                <span>{formatAmount(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-[#4A2C2A]">
                  <span>{bagCopy.discount}</span>
                  <span>-{formatAmount(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6E6A63]">
                <span>{copy.shippingLabel}</span>
                <span className="text-[#141413]">
                  {totals.isFreeShippingUnlocked
                    ? copy.complimentary
                    : formatAmount(
                        currency === "USD" ? 18 : currency === "SAR" ? 65 : 250
                      )}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#E4DFD6] text-[15px] font-normal">
                <span className="font-serif text-xl">{bagCopy.total}</span>
                <span>{formatAmount(totals.finalTotal)}</span>
              </div>
              <p className="text-[11px] text-[#6E6A63] pt-1">{copy.dutiesNote}</p>
            </div>

            {/* Investor Architecture Callout */}
            <div className="my-5 p-4 bg-[#F2EFE9] border border-[#E4DFD6] flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#4A2C2A] shrink-0 mt-0.5 stroke-[1.5]" />
              <p className="text-[12px] leading-relaxed text-[#141413]">
                {copy.stackNote}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="w-full min-h-[48px] border border-[#141413] bg-[#141413] text-[#FAF9F6] text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal hover:bg-[#2A2927] transition-colors"
            >
              {copy.closeCta}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}