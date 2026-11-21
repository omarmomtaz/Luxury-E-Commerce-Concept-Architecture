import { useState } from "react";
import { Check, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { MV_COPY, MV_PRODUCTS } from "../../data/maisonVerreData";

function MVProductCard({ product, preferredSize }) {
  const { lang, formatProductPrice, addToCart } = useStore();
  const copy = MV_COPY[lang].catalog;

  const [variantIdx, setVariantIdx] = useState(0);
  const [showSizes, setShowSizes] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant = product.variants[variantIdx] || product.variants[0];

  const handleAddSize = (size) => {
    addToCart({
      product,
      variant: activeVariant,
      size: String(size),
      brand: "MAISON VERRE",
    });
    setShowSizes(false);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article className="group flex flex-col border border-[#E4DFD6] bg-[#FAF9F6]">
      {/* 3:4 Editorial Photo Plate */}
      <div className="relative aspect-[3/4] bg-[#F2EFE9] overflow-hidden border-b border-[#E4DFD6]">
        <img
          src={activeVariant.image}
          alt={`${product.name[lang]} — ${activeVariant.colorName[lang]}`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
        />

        {product.badge && (
          <span className="absolute top-3 start-3 bg-[#FAF9F6]/95 border border-[#E4DFD6] px-2.5 py-1 text-[10px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[#141413]">
            {product.badge[lang]}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[14px] font-normal text-[#141413] leading-snug">
              {product.name[lang]}
            </h3>
            <p className="text-[13px] font-normal text-[#141413] shrink-0">
              {formatProductPrice(product)}
            </p>
          </div>

          <p className="text-[12px] font-light text-[#6E6A63] leading-relaxed">
            {product.fabric[lang]}
          </p>

          {/* 14px Swatch Switcher */}
          <div className="pt-1.5 flex items-center gap-2.5">
            <div className="flex items-center gap-2">
              {product.variants.map((variant, idx) => {
                const isSelected = idx === variantIdx;
                return (
                  <button
                    key={variant.colorId}
                    type="button"
                    onClick={() => setVariantIdx(idx)}
                    aria-label={variant.colorName[lang]}
                    title={variant.colorName[lang]}
                    className={`w-6 h-6 flex items-center justify-center border transition-colors ${
                      isSelected ? "border-[#141413]" : "border-transparent hover:border-[#D5CEC3]"
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
            <span className="text-[11px] text-[#6E6A63]">
              {activeVariant.colorName[lang]}
            </span>
          </div>
        </div>

        {/* Inline Quick-Add / EU Size Selector */}
        <div className="pt-2 border-t border-[#E4DFD6]">
          {!showSizes ? (
            <button
              type="button"
              onClick={() => setShowSizes(true)}
              className={`w-full min-h-[44px] border text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal transition-colors inline-flex items-center justify-center gap-2 ${
                justAdded
                  ? "border-[#4A2C2A] bg-[#4A2C2A] text-[#FAF9F6]"
                  : "border-[#141413] bg-transparent text-[#141413] hover:bg-[#141413] hover:text-[#FAF9F6]"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[1.75]" />
                  <span>{copy.added}</span>
                </>
              ) : (
                <span>{copy.quickAdd}</span>
              )}
            </button>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[#6E6A63]">
                  {copy.selectSize} (EU)
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizes(false)}
                  className="text-[#6E6A63] hover:text-[#141413] p-1"
                  aria-label="Close size selector"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {product.sizes.map((size) => {
                  const isRecommended = preferredSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleAddSize(size)}
                      className={`min-h-[38px] text-[11px] border transition-colors ${
                        isRecommended
                          ? "border-[#4A2C2A] bg-[#F2EFE9] text-[#141413] font-medium"
                          : "border-[#E4DFD6] bg-white text-[#141413] hover:border-[#141413] hover:bg-[#141413] hover:text-[#FAF9F6]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function MVCatalog({ sizeFilter, onClearSizeFilter }) {
  const { lang } = useStore();
  const copy = MV_COPY[lang].catalog;
  const [activeCategory, setActiveCategory] = useState("all");

  const filterKeys = ["all", "blazers", "trousers", "skirts", "basics"];

  const visibleProducts = MV_PRODUCTS.filter((item) => {
    const matchesCat =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSize = !sizeFilter || item.sizes.includes(sizeFilter);
    return matchesCat && matchesSize;
  });

  return (
    <section
      id="collection"
      className="scroll-mt-24 py-16 md:py-24 border-b border-[#E4DFD6] bg-[#FAF9F6]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header + Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E4DFD6]">
          <div>
            <p className="text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal text-[#6E6A63] mb-2">
              {lang === "en" ? "08 TAILORED SEPARATES" : "08 قطع رسمية قابلة للتنسيق"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#141413]">
              {copy.heading}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filterKeys.map((key) => {
              const active = activeCategory === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveCategory(key)}
                  className={`min-h-[44px] px-4 text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal border transition-colors ${
                    active
                      ? "border-[#141413] bg-[#141413] text-[#FAF9F6]"
                      : "border-[#E4DFD6] bg-transparent text-[#141413] hover:border-[#141413]"
                  }`}
                >
                  {copy.filters[key]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Fit Calculator Size Filter Pill */}
        {sizeFilter && (
          <div className="mt-6 p-4 bg-[#F2EFE9] border border-[#E4DFD6] flex flex-wrap items-center justify-between gap-3">
            <p className="text-[12px] text-[#141413]">
              {lang === "en"
                ? `Showing pieces available in your Fit Calculator match: EU ${sizeFilter}`
                : `عرض القطع المتوفرة بمقاسكِ المقترح من حاسبة المقاسات: EU ${sizeFilter}`}
            </p>
            <button
              type="button"
              onClick={onClearSizeFilter}
              className="min-h-[36px] px-3 border border-[#141413] text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[#141413] hover:bg-[#141413] hover:text-[#FAF9F6] transition-colors inline-flex items-center gap-1.5"
            >
              <span>{lang === "en" ? "Clear Size Filter" : "إلغاء فلتر المقاس"}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Catalog Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <MVProductCard
              key={product.id}
              product={product}
              preferredSize={sizeFilter}
            />
          ))}
        </div>
      </div>
    </section>
  );
}