import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Moon, Sun } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import {
  SOLENE_COPY,
  SOLENE_MOOD_STATES,
  SOLENE_PRODUCTS,
} from "../../data/soleneData";

const LUXURY_EASE = [0.22, 1, 0.36, 1];

function MoodQuickPiece({ product }) {
  const { lang, formatProductPrice, addToCart } = useStore();
  const [openSizes, setOpenSizes] = useState(false);
  const [added, setAdded] = useState(false);

  const defaultVariant = product.variants[0];

  const handlePick = (size) => {
    addToCart({
      product,
      variant: defaultVariant,
      size,
      brand: "SOLÈNE ATELIER",
    });
    setOpenSizes(false);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="border border-[var(--sol-border)] bg-[var(--sol-bg)] p-3.5 flex gap-3.5 items-center transition-colors duration-700 ease-luxury">
      <div className="w-16 aspect-[3/4] bg-[var(--sol-surface)] border border-[var(--sol-border)] shrink-0 overflow-hidden">
        <img
          src={defaultVariant.image}
          alt={product.name[lang]}
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <h4 className="text-[13px] font-normal text-[var(--sol-ink)] leading-snug line-clamp-1">
            {product.name[lang]}
          </h4>
          <p className="text-[12px] text-[var(--sol-muted)] mt-0.5">
            {formatProductPrice(product)}
          </p>
        </div>

        {!openSizes ? (
          <button
            type="button"
            onClick={() => setOpenSizes(true)}
            className="min-h-[36px] px-3 border border-[var(--sol-border)] text-[10px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[var(--sol-ink)] hover:border-[var(--sol-ink)] transition-colors inline-flex items-center gap-1.5"
          >
            {added ? (
              <>
                <Check className="w-3 h-3" />
                <span>{lang === "en" ? "Added" : "أُضيفت"}</span>
              </>
            ) : (
              <span>{SOLENE_COPY[lang].moodSection.inspectCta}</span>
            )}
          </button>
        ) : (
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handlePick(size)}
                className="min-w-[32px] min-h-[32px] px-1.5 border border-[var(--sol-border)] text-[10px] text-[var(--sol-ink)] hover:bg-[var(--sol-ink)] hover:text-[var(--sol-bg)] transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SoleneMoodSwitcher({ mood, onSelectMood }) {
  const { lang } = useStore();
  const copy = SOLENE_COPY[lang].moodSection;
  const activeState = SOLENE_MOOD_STATES[mood];

  const featuredProducts = activeState.featuredIds
    .map((id) => SOLENE_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section
      id="day-to-night"
      className="scroll-mt-20 py-16 md:py-28 border-b border-[var(--sol-border)] bg-[var(--sol-surface)] transition-colors duration-700 ease-luxury"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header + Prominent Hour Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[var(--sol-border)]">
          <div className="max-w-xl space-y-3">
            <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[var(--sol-muted)]">
              {copy.eyebrow}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] text-[var(--sol-ink)]">
              {copy.heading}
            </h2>
            <p className="text-[14px] leading-[1.7] font-light text-[var(--sol-muted)]">
              {copy.instruction}
            </p>
          </div>

          {/* Dual-Mode Architectural Switch */}
          <div
            role="tablist"
            aria-label="Time of day lighting mode"
            className="grid grid-cols-2 border border-[var(--sol-border)] bg-[var(--sol-bg)] w-full lg:w-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mood === "am"}
              onClick={() => onSelectMood("am")}
              className={`min-h-[52px] px-4 sm:px-6 text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal inline-flex items-center justify-center gap-2 transition-colors ${
                mood === "am"
                  ? "bg-[var(--sol-ink)] text-[var(--sol-bg)]"
                  : "text-[var(--sol-muted)] hover:text-[var(--sol-ink)]"
              }`}
            >
              <Sun className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
              <span>{copy.amLabel}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mood === "pm"}
              onClick={() => onSelectMood("pm")}
              className={`min-h-[52px] px-4 sm:px-6 border-s border-[var(--sol-border)] text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal inline-flex items-center justify-center gap-2 transition-colors ${
                mood === "pm"
                  ? "bg-[var(--sol-ink)] text-[var(--sol-bg)]"
                  : "text-[var(--sol-muted)] hover:text-[var(--sol-ink)]"
              }`}
            >
              <Moon className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
              <span>{copy.pmLabel}</span>
            </button>
          </div>
        </div>

        {/* Live Editorial Mood Stage */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 4:5 Editorial Mood Plate */}
          <div className="lg:col-span-5 border border-[var(--sol-border)] bg-[var(--sol-bg)] overflow-hidden">
            <div className="aspect-[4/5] w-full overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeState.mode}
                  src={activeState.heroImage}
                  alt={activeState.headline[lang]}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: LUXURY_EASE }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Styling Notes + 4 Curated Pieces */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState.mode}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: LUXURY_EASE }}
                className="space-y-4"
              >
                <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[var(--sol-muted)]">
                  {activeState.locationLabel[lang]}
                </p>
                <h3 className="font-serif text-3xl sm:text-5xl font-light leading-[1.08] text-[var(--sol-ink)]">
                  {activeState.headline[lang]}
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.75] font-light text-[var(--sol-muted)] max-w-xl">
                  {activeState.stylingNote[lang]}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-4 pt-6 border-t border-[var(--sol-border)]">
              <p className="text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal text-[var(--sol-muted)]">
                {copy.featuredHeading} · {activeState.timeLabel}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredProducts.map((product) => (
                  <MoodQuickPiece key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}