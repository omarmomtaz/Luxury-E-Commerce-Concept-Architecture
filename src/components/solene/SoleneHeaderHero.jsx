import { useRef } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { SOLENE_COPY } from "../../data/soleneData";
import UtilityControls from "../shared/UtilityControls";

const LUXURY_EASE = [0.22, 1, 0.36, 1];

export default function SoleneHeaderHero({ mood, onToggleMood }) {
  const { lang, isRtl } = useStore();
  const copy = SOLENE_COPY[lang];
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const dirMultiplier = isRtl ? -1 : 1;
  const line1X = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -28 * dirMultiplier]
  );
  const line2X = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 28 * dirMultiplier]
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.07]
  );
  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 42]
  );

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isDark = mood === "pm";

  return (
    <>
      {/* Campaign Announcement Strip */}
      <div className="bg-[var(--sol-surface)] text-[var(--sol-muted)] px-4 py-2.5 text-center border-b border-[var(--sol-border)] transition-colors duration-700 ease-luxury">
        <p className="text-[10px] sm:text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal font-light">
          {copy.announcement}
        </p>
      </div>

      {/* Sticky Editorial Header */}
      <header className="sticky top-0 z-40 bg-[var(--sol-bg)]/95 backdrop-blur-sm border-b border-[var(--sol-border)] transition-colors duration-700 ease-luxury">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-3">
          {/* Back to Hub + Signature Wordmark */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="min-h-[44px] inline-flex items-center gap-1.5 text-[10px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[var(--sol-muted)] hover:text-[var(--sol-ink)] transition-colors"
              aria-label="Return to Concept Hub"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.25] rtl:rotate-180" />
              <span className="hidden md:inline">
                {lang === "en" ? "Hub" : "المعرض"}
              </span>
            </Link>

            <span className="hidden md:inline-block h-4 w-[1px] bg-[var(--sol-border)]" />

            <a
              href="#solene-top"
              className="flex items-baseline gap-2 text-[var(--sol-ink)]"
            >
              <span className="font-display text-2xl sm:text-[26px] font-normal tracking-[0.06em] rtl:tracking-normal">
                {copy.brandName}
              </span>
            </a>
          </div>

          {/* Desktop Section Navigation */}
          <nav
            aria-label="Solène sections"
            className="hidden xl:flex items-center gap-7 text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[var(--sol-ink)]"
          >
            <button
              type="button"
              onClick={() => scrollToSection("story")}
              className="min-h-[44px] hover:opacity-60 transition-opacity"
            >
              {copy.nav.story}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("day-to-night")}
              className="min-h-[44px] hover:opacity-60 transition-opacity"
            >
              {copy.nav.dayToNight}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("lookbook")}
              className="min-h-[44px] hover:opacity-60 transition-opacity"
            >
              {copy.nav.lookbook}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("archive")}
              className="min-h-[44px] hover:opacity-60 transition-opacity"
            >
              {copy.nav.archive}
            </button>
          </nav>

          {/* Live 9 AM / 9 PM Switch + Global Utilities */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={onToggleMood}
              aria-label="Toggle 9 AM and 9 PM mood"
              className="min-h-[36px] px-2.5 sm:px-3 border border-[var(--sol-border)] text-[10px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[var(--sol-ink)] hover:border-[var(--sol-ink)] transition-colors inline-flex items-center gap-1.5"
            >
              {isDark ? (
                <>
                  <Moon className="w-3 h-3 stroke-[1.5]" />
                  <span>9 PM</span>
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3 stroke-[1.5]" />
                  <span>9 AM</span>
                </>
              )}
            </button>

            <UtilityControls showBag dark={isDark} />
          </div>
        </div>

        {/* Mobile Quick-Jump Strip */}
        <nav
          aria-label="Mobile sections"
          className="flex xl:hidden items-center justify-between border-t border-[var(--sol-border)] px-2 bg-[var(--sol-surface)]/70"
        >
          {[
            { id: "story", label: copy.nav.story },
            { id: "day-to-night", label: copy.nav.dayToNight },
            { id: "lookbook", label: copy.nav.lookbook },
            { id: "archive", label: copy.nav.archive },
          ].map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`flex-1 min-h-[44px] px-1 text-[10px] uppercase ltr:tracking-[0.1em] rtl:tracking-normal text-[var(--sol-ink)] ${
                idx > 0 ? "border-s border-[var(--sol-border)]" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Kinetic Campaign Hero */}
      <section
        id="solene-top"
        ref={heroRef}
        className="relative border-b border-[var(--sol-border)] bg-[var(--sol-bg)] transition-colors duration-700 ease-luxury overflow-x-clip"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-12 sm:pb-20">
          {/* Top Meta & Kinetic Display Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 sm:pb-14">
            <div className="lg:col-span-8 space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: LUXURY_EASE }}
                className="text-[11px] uppercase ltr:tracking-[0.24em] rtl:tracking-normal text-[var(--sol-muted)]"
              >
                {copy.hero.issue}
              </motion.p>

              <h1 className="font-display text-5xl sm:text-7xl lg:text-[86px] xl:text-[104px] font-normal leading-[0.96] text-[var(--sol-ink)]">
                <motion.span
                  style={{ x: line1X }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.05, ease: LUXURY_EASE }}
                  className="block will-change-transform"
                >
                  {copy.hero.headlineLine1}
                </motion.span>
                <motion.span
                  style={{ x: line2X }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.14, ease: LUXURY_EASE }}
                  className="block font-serif italic font-light text-[var(--sol-muted)] will-change-transform"
                >
                  {copy.hero.headlineLine2}
                </motion.span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: LUXURY_EASE }}
              className="lg:col-span-4 space-y-6 lg:pb-2"
            >
              <p className="text-[14px] leading-[1.7] font-light text-[var(--sol-muted)]">
                {copy.hero.subcopy}
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("lookbook")}
                  className="min-h-[48px] px-6 bg-[var(--sol-ink)] text-[var(--sol-bg)] text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal hover:opacity-85 transition-opacity inline-flex items-center justify-center gap-2.5"
                >
                  <span>{copy.hero.primaryCta}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("day-to-night")}
                  className="min-h-[48px] px-6 border border-[var(--sol-border)] text-[var(--sol-ink)] text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal hover:border-[var(--sol-ink)] transition-colors inline-flex items-center justify-center"
                >
                  {copy.hero.secondaryCta}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Monumental 16:10 Campaign Canvas with GPU Scroll Scale */}
          <div className="relative border border-[var(--sol-border)] bg-[var(--sol-surface)] overflow-hidden">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <motion.img
                src="/assets/solene/sol-hero.webp"
                alt={`${copy.brandName} — ${copy.hero.headlineLine1}`}
                style={{ scale: heroScale, y: heroY }}
                className="w-full h-full object-cover object-top will-change-transform"
              />
            </div>
          </div>

          {/* Editorial Scroll Cue */}
          <div className="pt-6 flex items-center justify-between text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal text-[var(--sol-muted)]">
            <span>{copy.signatureMark} · AW26</span>
            <button
              type="button"
              onClick={() => scrollToSection("story")}
              className="inline-flex items-center gap-2 hover:text-[var(--sol-ink)] transition-colors min-h-[44px]"
            >
              <span>{copy.hero.scrollPrompt}</span>
              <ArrowDown className="w-3.5 h-3.5 stroke-[1.25]" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}