import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { resolveProductPrices, useStore } from "../../context/StoreContext";
import { MV_COPY, MV_PRODUCTS } from "../../data/maisonVerreData";

export default function MVSuitBundler({ recommendedSize }) {
  const { lang, currency, formatAmount, formatProductPrice, addBundleToCart } =
    useStore();
  const copy = MV_COPY[lang].bundler;

  const [activeStep, setActiveStep] = useState(0);
  const [selections, setSelections] = useState({
    0: null, // Blazer
    1: null, // Trouser or Skirt
    2: null, // Foundation Basic
  });

  const slotProducts = useMemo(
    () => ({
      0: MV_PRODUCTS.filter((p) => p.bundleSlot === 0),
      1: MV_PRODUCTS.filter((p) => p.bundleSlot === 1),
      2: MV_PRODUCTS.filter((p) => p.bundleSlot === 2),
    }),
    []
  );

  const handleSelectPiece = (slot, product, variantIdx = 0) => {
    const defaultSize =
      recommendedSize && product.sizes.includes(recommendedSize)
        ? recommendedSize
        : product.sizes.includes(38)
          ? 38
          : product.sizes[0];

    setSelections((prev) => ({
      ...prev,
      [slot]: {
        product,
        variant: product.variants[variantIdx] || product.variants[0],
        size: prev[slot]?.product.id === product.id ? prev[slot].size : defaultSize,
      },
    }));

    // Smoothly advance to the next empty slot when picking a new piece
    if (slot < 2 && !selections[slot + 1]) {
      setActiveStep(slot + 1);
    }
  };

  const handleChangeSlotVariant = (slot, variant) => {
    setSelections((prev) =>
      prev[slot] ? { ...prev, [slot]: { ...prev[slot], variant } } : prev
    );
  };

  const handleChangeSlotSize = (slot, size) => {
    setSelections((prev) =>
      prev[slot] ? { ...prev, [slot]: { ...prev[slot], size } } : prev
    );
  };

  const selectedList = [selections[0], selections[1], selections[2]].filter(Boolean);
  const isComplete = selectedList.length === 3;

  const pricing = useMemo(() => {
    const rawTotal = selectedList.reduce((acc, entry) => {
      const prices = resolveProductPrices(entry.product);
      return acc + (prices[currency] ?? prices.EGP);
    }, 0);
    const savings = isComplete ? rawTotal * 0.15 : 0;
    return {
      rawTotal,
      savings,
      finalTotal: rawTotal - savings,
    };
  }, [selectedList, currency, isComplete]);

  const handleAddCompleteSuit = () => {
    if (!isComplete) return;
    addBundleToCart(
      selectedList.map((entry) => ({
        product: entry.product,
        variant: entry.variant,
        size: String(entry.size),
        brand: "MAISON VERRE",
      }))
    );
  };

  return (
    <section
      id="bundler"
      className="scroll-mt-24 py-16 md:py-24 border-b border-[#E4DFD6] bg-[#F2EFE9]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3 mb-10">
          <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[#4A2C2A]">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#141413]">
            {copy.heading}
          </h2>
          <p className="text-[14px] leading-[1.7] font-light text-[#6E6A63]">
            {copy.subtitle}
          </p>
        </div>

        {/* 3-Step Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#E4DFD6] bg-[#FAF9F6] mb-8">
          {copy.steps.map((stepLabel, idx) => {
            const active = activeStep === idx;
            const filled = Boolean(selections[idx]);
            return (
              <button
                key={stepLabel}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`min-h-[54px] px-5 py-3.5 text-start flex items-center justify-between gap-3 border-b sm:border-b-0 sm:border-e last:border-b-0 last:border-e-0 border-[#E4DFD6] transition-colors ${
                  active
                    ? "bg-[#141413] text-[#FAF9F6]"
                    : "bg-[#FAF9F6] text-[#141413] hover:bg-[#F2EFE9]/60"
                }`}
              >
                <span className="text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal">
                  {stepLabel}
                </span>
                {filled && (
                  <span
                    className={`w-5 h-5 flex items-center justify-center border ${
                      active
                        ? "border-[#FAF9F6] text-[#FAF9F6]"
                        : "border-[#4A2C2A] bg-[#4A2C2A] text-[#FAF9F6]"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[2]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Picker (Left 8 cols) + Curated Suit Summary (Right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Options */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {slotProducts[activeStep].map((product) => {
              const currentSelection = selections[activeStep];
              const isPicked = currentSelection?.product.id === product.id;
              const activeVariant = isPicked
                ? currentSelection.variant
                : product.variants[0];

              return (
                <div
                  key={product.id}
                  className={`border bg-[#FAF9F6] flex flex-col transition-colors ${
                    isPicked ? "border-[#141413]" : "border-[#E4DFD6]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectPiece(activeStep, product)}
                    className="relative aspect-[3/4] bg-[#F2EFE9] overflow-hidden border-b border-[#E4DFD6] text-start"
                  >
                    <img
                      src={activeVariant.image}
                      alt={product.name[lang]}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                    {isPicked && (
                      <span className="absolute top-3 end-3 bg-[#141413] text-[#FAF9F6] px-2.5 py-1 text-[10px] uppercase ltr:tracking-[0.14em] rtl:tracking-normal inline-flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {lang === "en" ? "Selected" : "مختار"}
                      </span>
                    )}
                  </button>

                  <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <h3 className="text-[13px] font-normal text-[#141413] leading-snug">
                        {product.name[lang]}
                      </h3>
                      <p className="text-[12px] text-[#6E6A63] mt-1">
                        {formatProductPrice(product)}
                      </p>
                    </div>

                    {/* Swatches inside Bundler Card */}
                    <div className="flex items-center gap-1.5">
                      {product.variants.map((variant, vIdx) => {
                        const selectedSwatch =
                          activeVariant.colorId === variant.colorId;
                        return (
                          <button
                            key={variant.colorId}
                            type="button"
                            onClick={() =>
                              isPicked
                                ? handleChangeSlotVariant(activeStep, variant)
                                : handleSelectPiece(activeStep, product, vIdx)
                            }
                            title={variant.colorName[lang]}
                            className={`w-6 h-6 flex items-center justify-center border ${
                              selectedSwatch
                                ? "border-[#141413]"
                                : "border-transparent"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-[#141413]/20"
                              style={{ backgroundColor: variant.hex }}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectPiece(activeStep, product)}
                      className={`w-full min-h-[40px] border text-[10px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal transition-colors ${
                        isPicked
                          ? "border-[#141413] bg-[#141413] text-[#FAF9F6]"
                          : "border-[#E4DFD6] text-[#141413] hover:border-[#141413]"
                      }`}
                    >
                      {isPicked
                        ? lang === "en"
                          ? "Selected for Suit"
                          : "تم الاختيار"
                        : lang === "en"
                          ? "Select Piece"
                          : "اختاري القطعة"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Curated Suit Summary Panel */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 border border-[#E4DFD6] bg-[#FAF9F6] p-6 space-y-5">
            <div className="flex items-baseline justify-between pb-4 border-b border-[#E4DFD6]">
              <h3 className="font-serif text-2xl font-light text-[#141413]">
                {copy.summaryTitle}
              </h3>
              <span className="text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[#4A2C2A]">
                {selectedList.length} / 3
              </span>
            </div>

            {/* 3 Slots Recap with Per-Piece EU Size Selector */}
            <div className="space-y-4">
              {[0, 1, 2].map((slotIdx) => {
                const entry = selections[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className="pb-4 border-b border-[#E4DFD6] last:border-b-0 last:pb-0"
                  >
                    {!entry ? (
                      <button
                        type="button"
                        onClick={() => setActiveStep(slotIdx)}
                        className="w-full min-h-[56px] border border-dashed border-[#D5CEC3] px-4 flex items-center justify-between text-[11px] uppercase ltr:tracking-[0.14em] rtl:tracking-normal text-[#6E6A63] hover:border-[#141413] hover:text-[#141413] transition-colors"
                      >
                        <span>{copy.steps[slotIdx]}</span>
                        <span>+</span>
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <div className="w-14 aspect-[3/4] bg-[#F2EFE9] border border-[#E4DFD6] shrink-0 overflow-hidden">
                          <img
                            src={entry.variant.image}
                            alt={entry.product.name[lang]}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[12px] text-[#141413] leading-snug line-clamp-2">
                              {entry.product.name[lang]}
                            </p>
                            <span className="text-[12px] text-[#6E6A63] shrink-0">
                              {formatProductPrice(entry.product)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2 pt-0.5">
                            <span className="text-[11px] text-[#6E6A63]">
                              {entry.variant.colorName[lang]}
                            </span>
                            <select
                              aria-label={`Size for ${entry.product.name[lang]}`}
                              value={entry.size}
                              onChange={(e) =>
                                handleChangeSlotSize(slotIdx, Number(e.target.value))
                              }
                              className="border border-[#E4DFD6] bg-white px-2 py-1 text-[11px] text-[#141413] focus:outline-none focus:border-[#141413]"
                            >
                              {entry.product.sizes.map((s) => (
                                <option key={s} value={s}>
                                  EU {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bundle Financial Breakdown */}
            <div className="pt-4 border-t border-[#E4DFD6] space-y-2 text-[13px]">
              <div className="flex justify-between text-[#6E6A63]">
                <span>{lang === "en" ? "Pieces Subtotal" : "مجموع القطع"}</span>
                <span>{formatAmount(pricing.rawTotal)}</span>
              </div>

              <div
                className={`flex justify-between ${
                  isComplete ? "text-[#4A2C2A]" : "text-[#6E6A63]/60"
                }`}
              >
                <span>{copy.discountLabel}</span>
                <span>
                  {isComplete
                    ? `-${formatAmount(pricing.savings)}`
                    : lang === "en"
                      ? "Locked"
                      : "غير مفعّل"}
                </span>
              </div>

              <div className="flex justify-between pt-3 border-t border-[#E4DFD6] text-[15px] text-[#141413]">
                <span className="font-serif text-xl">
                  {lang === "en" ? "Suit Total" : "إجمالي البدلة"}
                </span>
                <span className="font-normal">
                  {formatAmount(pricing.finalTotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={!isComplete}
              onClick={handleAddCompleteSuit}
              className={`w-full min-h-[48px] text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal transition-colors ${
                isComplete
                  ? "bg-[#141413] text-[#FAF9F6] hover:bg-[#2A2927]"
                  : "bg-[#E4DFD6] text-[#6E6A63] cursor-not-allowed"
              }`}
            >
              {isComplete ? copy.ctaComplete : copy.ctaIncomplete}
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}