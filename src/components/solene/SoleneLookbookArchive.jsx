import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, RotateCcw, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import {
  SOLENE_COPY,
  SOLENE_LOOKBOOK_PLATES,
  SOLENE_PRODUCTS,
} from "../../data/soleneData";

const LUXURY_EASE = [0.22, 1, 0.36, 1];

function buildInitialLookColors() {
  const state = {};
  for (const plate of SOLENE_LOOKBOOK_PLATES) {
    state[plate.id] = {};
    for (const hs of plate.hotspots) {
      state[plate.id][hs.id] = hs.defaultColorId;
    }
  }
  return state;
}

function getDefaultSize(product) {
  return product?.sizes.includes("M") ? "M" : product?.sizes[0] || "S";
}

function SoleneArchiveCard({ product }) {
  const { lang, formatProductPrice, addToCart } = useStore();
  const copy = SOLENE_COPY[lang].lookbook;
  const [variantIdx, setVariantIdx] = useState(0);
  const [showSizes, setShowSizes] = useState(false);
  const [added, setAdded] = useState(false);

  const activeVariant = product.variants[variantIdx] || product.variants[0];

  const handleAdd = (size) => {
    addToCart({
      product,
      variant: activeVariant,
      size,
      brand: "SOLÈNE ATELIER",
    });
    setShowSizes(false);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group border border-[var(--sol-border)] bg-[var(--sol-bg)] flex flex-col transition-colors duration-700 ease-luxury">
      <div className="relative aspect-[3/4] bg-[var(--sol-surface)] border-b border-[var(--sol-border)] overflow-hidden">
        <img
          src={activeVariant.image}
          alt={`${product.name[lang]} — ${activeVariant.colorName[lang]}`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute top-3 start-3 bg-[var(--sol-bg)] border border-[var(--sol-border)] px-2.5 py-1 text-[10px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[var(--sol-ink)] font-normal">
            {product.badge[lang]}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[14px] font-normal text-[var(--sol-ink)] leading-snug">
              {product.name[lang]}
            </h3>
            <p className="text-[13px] font-normal text-[var(--sol-ink)] shrink-0 font-sans">
              {formatProductPrice(product)}
            </p>
          </div>
          <p className="text-[12px] font-light text-[var(--sol-muted)] leading-relaxed">
            {product.fabric[lang]}
          </p>

          <div className="pt-1.5 flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              {product.variants.map((variant, idx) => (
                <button
                  key={variant.colorId}
                  type="button"
                  onClick={() => setVariantIdx(idx)}
                  title={variant.colorName[lang]}
                  aria-label={variant.colorName[lang]}
                  className={`w-6 h-6 flex items-center justify-center border ${
                    idx === variantIdx
                      ? "border-[var(--sol-ink)]"
                      : "border-transparent hover:border-[var(--sol-border)]"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-[#8A7F75]/40"
                    style={{ backgroundColor: variant.hex }}
                  />
                </button>
              ))}
            </div>
            <span className="text-[11px] text-[var(--sol-muted)]">
              {activeVariant.colorName[lang]}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--sol-border)]">
          {!showSizes ? (
            <button
              type="button"
              onClick={() => setShowSizes(true)}
              className="w-full min-h-[44px] border border-[var(--sol-ink)] text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[var(--sol-ink)] hover:bg-[var(--sol-ink)] hover:text-[var(--sol-bg)] transition-colors inline-flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{copy.added}</span>
                </>
              ) : (
                <span>{copy.quickAdd}</span>
              )}
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[var(--sol-muted)]">
                  {copy.selectSize}
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizes(false)}
                  className="p-1 text-[var(--sol-muted)] hover:text-[var(--sol-ink)]"
                  aria-label="Close sizes"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleAdd(size)}
                    className="min-h-[38px] border border-[var(--sol-border)] text-[11px] text-[var(--sol-ink)] hover:border-[var(--sol-ink)] hover:bg-[var(--sol-ink)] hover:text-[var(--sol-bg)] transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function SoleneLookbookArchive() {
  const { lang, formatProductPrice, addToCart } = useStore();
  const lbCopy = SOLENE_COPY[lang].lookbook;
  const archCopy = SOLENE_COPY[lang].archiveSection;

  const [activePlateIdx, setActivePlateIdx] = useState(0);
  const activePlate = SOLENE_LOOKBOOK_PLATES[activePlateIdx];

  const [activeHotspotId, setActiveHotspotId] = useState(
    SOLENE_LOOKBOOK_PLATES[0].hotspots[0].id
  );

  // Stores the exact selected color for EVERY piece (01, 02, 03) in EVERY look independently
  const [lookColors, setLookColors] = useState(buildInitialLookColors);
  const [selectedSize, setSelectedSize] = useState("M");
  const [justAdded, setJustAdded] = useState(false);
  const [archiveCategory, setArchiveCategory] = useState("all");

  const activeHotspot =
    activePlate.hotspots.find((h) => h.id === activeHotspotId) ||
    activePlate.hotspots[0];

  const inspectedProduct = useMemo(
    () =>
      SOLENE_PRODUCTS.find((p) => p.id === activeHotspot.productId) ||
      SOLENE_PRODUCTS[0],
    [activeHotspot]
  );

  const activePlateColors = lookColors[activePlate.id] || {};
  const activePieceColorId =
    activePlateColors[activeHotspot.id] || activeHotspot.defaultColorId;

  const activeVariant =
    inspectedProduct.variants.find((v) => v.colorId === activePieceColorId) ||
    inspectedProduct.variants[0];

  // Deterministic 3-piece combination key: e.g. "limestone__champagne__noir"
  const activeComboKey = useMemo(() => {
    return activePlate.hotspots
      .map((hs) => activePlateColors[hs.id] || hs.defaultColorId)
      .join("__");
  }, [activePlate, activePlateColors]);

  const activePlateImage =
    activePlate.combinations?.[activeComboKey] || activePlate.defaultImage;

  // Layered crossfade state (prevents blank blink when swapping a single garment color)
  const [displayedImage, setDisplayedImage] = useState(activePlateImage);
  const [underlayImage, setUnderlayImage] = useState(activePlateImage);

  useEffect(() => {
    if (activePlateImage !== displayedImage) {
      setUnderlayImage(displayedImage);
      setDisplayedImage(activePlateImage);
    }
  }, [activePlateImage, displayedImage]);

  // Preload all 8 combination images for the currently selected look for instant swaps
  useEffect(() => {
    if (!activePlate?.combinations) return;
    Object.values(activePlate.combinations).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [activePlate]);

  const handleSelectPlate = (idx) => {
    const nextPlate = SOLENE_LOOKBOOK_PLATES[idx];
    const firstHs = nextPlate.hotspots[0];
    const firstProd = SOLENE_PRODUCTS.find((p) => p.id === firstHs.productId);
    setActivePlateIdx(idx);
    setActiveHotspotId(firstHs.id);
    setSelectedSize(getDefaultSize(firstProd));
  };

  const handleSelectHotspot = (hs) => {
    const prod = SOLENE_PRODUCTS.find((p) => p.id === hs.productId);
    setActiveHotspotId(hs.id);
    setSelectedSize(getDefaultSize(prod));
  };

  const handleSelectPieceColor = (colorId) => {
    setLookColors((prev) => ({
      ...prev,
      [activePlate.id]: {
        ...prev[activePlate.id],
        [activeHotspot.id]: colorId,
      },
    }));
  };

  const handleResetLook = () => {
    const defaults = {};
    for (const hs of activePlate.hotspots) {
      defaults[hs.id] = hs.defaultColorId;
    }
    setLookColors((prev) => ({
      ...prev,
      [activePlate.id]: defaults,
    }));
  };

  const handleAcquireInspected = () => {
    addToCart({
      product: inspectedProduct,
      variant: activeVariant,
      size: selectedSize,
      brand: "SOLÈNE ATELIER",
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  const filterKeys = ["all", "blazers", "trousers", "skirts", "basics", "outerwear"];
  const filteredArchive =
    archiveCategory === "all"
      ? SOLENE_PRODUCTS
      : SOLENE_PRODUCTS.filter((p) => p.category === archiveCategory);

  return (
    <>
      <section
        id="interactive-lookbook"
        className="scroll-mt-24 py-16 md:py-28 border-b border-[var(--sol-border)] bg-[var(--sol-bg)] transition-colors duration-700 ease-luxury"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Header + Look Switcher Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--sol-border)]">
            <div className="space-y-3 max-w-xl">
              <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[var(--sol-muted)]">
                {lbCopy.eyebrow}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-light leading-[1.06] text-[var(--sol-ink)]">
                {lbCopy.heading}
              </h2>
              <p className="text-[14px] leading-[1.7] font-light text-[var(--sol-muted)]">
                {lbCopy.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-3 border border-[var(--sol-border)] bg-[var(--sol-surface)] w-full lg:w-auto">
              {SOLENE_LOOKBOOK_PLATES.map((plate, idx) => {
                const active = idx === activePlateIdx;
                return (
                  <button
                    key={plate.id}
                    type="button"
                    onClick={() => handleSelectPlate(idx)}
                    className={`min-h-[48px] px-4 sm:px-6 text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal border-e last:border-e-0 border-[var(--sol-border)] transition-colors ${
                      active
                        ? "bg-[var(--sol-ink)] text-[var(--sol-bg)]"
                        : "text-[var(--sol-ink)] hover:bg-[var(--sol-bg)]"
                    }`}
                  >
                    {plate.index}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lookbook Stage */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Interactive Model Stage (Zero-Blink Layered Crossfade) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[3/4] border border-[var(--sol-border)] bg-[var(--sol-surface)] overflow-hidden">
                <img
                  src={underlayImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <motion.img
                  key={displayedImage}
                  src={displayedImage}
                  alt={activePlate.title[lang]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.28, ease: LUXURY_EASE }}
                  className="relative z-10 w-full h-full object-cover object-top"
                />

                {/* Hotspots anchored above fading image */}
                {activePlate.hotspots.map((hs) => {
                  const isActive = hs.id === activeHotspot.id;
                  return (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => handleSelectHotspot(hs)}
                      style={{
                        left: `${hs.xPercent}%`,
                        top: `${hs.yPercent}%`,
                      }}
                      aria-label={`Inspect piece ${hs.number}`}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border flex items-center justify-center text-[11px] font-normal transition-transform duration-300 ease-luxury ${
                        isActive
                          ? "bg-[#FAF9F6] text-[#121110] border-[#121110] scale-110 z-30"
                          : "bg-[#121110]/80 text-[#FAF9F6] border-[#FAF9F6]/70 hover:scale-105 z-20"
                      }`}
                    >
                      {hs.number}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-2xl font-light text-[var(--sol-ink)]">
                    {activePlate.title[lang]}
                  </h3>
                  <p className="text-[12px] text-[var(--sol-muted)] mt-0.5">
                    {activePlate.caption[lang]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetLook}
                  className="min-h-[38px] px-3 border border-[var(--sol-border)] text-[10px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[var(--sol-muted)] hover:text-[var(--sol-ink)] hover:border-[var(--sol-ink)] transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{lang === "en" ? "Reset Palette" : "استعادة الألوان"}</span>
                </button>
              </div>
            </div>

            {/* Right Live Garment Inspector */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 border border-[var(--sol-border)] bg-[var(--sol-surface)] p-6 sm:p-8 space-y-6 transition-colors duration-700 ease-luxury">
              {/* 3-Piece State Strip (Shows live active color dot for each piece) */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[var(--sol-border)]">
                <span className="text-[10px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal text-[var(--sol-muted)]">
                  {lbCopy.hotspotHint}
                </span>
                <div className="flex items-center gap-1.5">
                  {activePlate.hotspots.map((hs) => {
                    const hsProduct = SOLENE_PRODUCTS.find((p) => p.id === hs.productId);
                    const chosenColorId = activePlateColors[hs.id] || hs.defaultColorId;
                    const chosenVariant =
                      hsProduct?.variants.find((v) => v.colorId === chosenColorId) ||
                      hsProduct?.variants[0];
                    const isSelected = hs.id === activeHotspot.id;

                    return (
                      <button
                        key={hs.id}
                        type="button"
                        onClick={() => handleSelectHotspot(hs)}
                        className={`h-9 px-2.5 border text-[11px] inline-flex items-center gap-1.5 transition-colors ${
                          isSelected
                            ? "border-[var(--sol-ink)] bg-[var(--sol-ink)] text-[var(--sol-bg)]"
                            : "border-[var(--sol-border)] text-[var(--sol-ink)] hover:border-[var(--sol-ink)]"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-[#8A7F75]/60"
                          style={{ backgroundColor: chosenVariant?.hex || "#121110" }}
                        />
                        <span>{hs.number}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inspected Garment Preview & Specs */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${inspectedProduct.id}-${activeVariant.colorId}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: LUXURY_EASE }}
                  className="space-y-6"
                >
                  <div className="flex gap-4">
                    <div className="w-24 sm:w-28 aspect-[3/4] border border-[var(--sol-border)] bg-[var(--sol-bg)] shrink-0 overflow-hidden">
                      <img
                        src={activeVariant.image}
                        alt={inspectedProduct.name[lang]}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="text-[10px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[var(--sol-muted)]">
                        {inspectedProduct.sku} ·{" "}
                        {inspectedProduct.badge?.[lang] || "SOLÈNE EDITION"}
                      </p>
                      <h3 className="font-serif text-2xl font-light leading-snug text-[var(--sol-ink)]">
                        {inspectedProduct.name[lang]}
                      </h3>
                      <p className="text-[15px] font-normal text-[var(--sol-ink)] font-sans">
                        {formatProductPrice(inspectedProduct)}
                      </p>
                      <p className="text-[12px] font-light text-[var(--sol-muted)] leading-relaxed pt-1">
                        {inspectedProduct.fabric[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Colourway Selector (Updates ONLY this piece on the model) */}
                  <div className="space-y-2.5 pt-4 border-t border-[var(--sol-border)]">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[var(--sol-muted)]">
                        {lbCopy.selectColor}
                      </span>
                      <span className="text-[var(--sol-ink)] font-normal">
                        {activeVariant.colorName[lang]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {inspectedProduct.variants.map((variant) => {
                        const selected = variant.colorId === activeVariant.colorId;
                        return (
                          <button
                            key={variant.colorId}
                            type="button"
                            onClick={() => handleSelectPieceColor(variant.colorId)}
                            className={`min-h-[40px] px-3 border flex items-center gap-2 text-[11px] transition-colors ${
                              selected
                                ? "border-[var(--sol-ink)] bg-[var(--sol-bg)] text-[var(--sol-ink)] font-medium"
                                : "border-[var(--sol-border)] text-[var(--sol-muted)] hover:border-[var(--sol-ink)]"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-[#8A7F75]/50"
                              style={{ backgroundColor: variant.hex }}
                            />
                            <span>{variant.colorName[lang]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="space-y-2.5">
                    <span className="block text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[var(--sol-muted)]">
                      {lbCopy.selectSize}
                    </span>
                    <div className="grid grid-cols-5 gap-2">
                      {inspectedProduct.sizes.map((size) => {
                        const active = selectedSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`min-h-[44px] border text-[12px] transition-colors ${
                              active
                                ? "border-[var(--sol-ink)] bg-[var(--sol-ink)] text-[var(--sol-bg)] font-medium"
                                : "border-[var(--sol-border)] bg-[var(--sol-bg)] text-[var(--sol-ink)] hover:border-[var(--sol-ink)]"
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Acquire Button */}
                  <button
                    type="button"
                    onClick={handleAcquireInspected}
                    className="w-full min-h-[48px] bg-[var(--sol-ink)] text-[var(--sol-bg)] text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal hover:opacity-85 transition-opacity inline-flex items-center justify-center gap-2"
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{lbCopy.added}</span>
                      </>
                    ) : (
                      <span>
                        {lbCopy.quickAdd} — {formatProductPrice(inspectedProduct)}
                      </span>
                    )}
                  </button>
                </motion.div>
              </AnimatePresence>
            </aside>
          </div>
        </div>
      </section>

      {/* Section 4: Complete 08-Piece Monolith Archive */}
      <section
        id="monolith-archive"
        className="scroll-mt-24 py-16 md:py-28 border-b border-[var(--sol-border)] bg-[var(--sol-surface)] transition-colors duration-700 ease-luxury"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--sol-border)]">
            <div>
              <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[var(--sol-muted)] mb-2">
                {archCopy.eyebrow}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[var(--sol-ink)]">
                {archCopy.heading}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {filterKeys.map((key) => {
                const active = archiveCategory === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setArchiveCategory(key)}
                    className={`min-h-[44px] px-4 border text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal transition-colors ${
                      active
                        ? "border-[var(--sol-ink)] bg-[var(--sol-ink)] text-[var(--sol-bg)]"
                        : "border-[var(--sol-border)] bg-[var(--sol-bg)] text-[var(--sol-ink)] hover:border-[var(--sol-ink)]"
                    }`}
                  >
                    {archCopy.filters[key]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredArchive.map((product) => (
              <SoleneArchiveCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Footer */}
      <footer className="bg-[var(--sol-bg)] text-[var(--sol-ink)] py-14 transition-colors duration-700 ease-luxury">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <p className="font-serif italic text-3xl font-light">
              Solène{" "}
              <span className="not-italic font-sans text-[11px] uppercase ltr:tracking-[0.26em] rtl:tracking-normal text-[var(--sol-muted)] ms-2">
                ATELIER
              </span>
            </p>
            <p className="text-[12px] text-[var(--sol-muted)] max-w-md leading-relaxed">
              {lang === "en"
                ? "Direction 02 · Global Flagship Editorial Prototype. Built to establish international pricing power through 2.5D craft storytelling and shoppable campaigns."
                : "المسار 02 · نموذج المتجر العالمي الرئيسي. مصمّم لترسيخ المكانة السعرية الدولية عبر السرد البصري 2.5D والكتالوج التفاعلي."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="min-h-[44px] px-5 border border-[var(--sol-border)] text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[var(--sol-ink)] hover:border-[var(--sol-ink)] transition-colors inline-flex items-center"
            >
              {lang === "en" ? "Back to Pitch Hub" : "العودة لمعرض المسارات"}
            </Link>
            <Link
              to="/maison-verre"
              className="min-h-[44px] px-5 bg-[var(--sol-ink)] text-[var(--sol-bg)] text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal hover:opacity-85 transition-opacity inline-flex items-center gap-2"
            >
              <span>
                {lang === "en"
                  ? "View Direction 01: Maison Verre"
                  : "استعراض المسار 01: ميزون فير"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}