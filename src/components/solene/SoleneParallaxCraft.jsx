import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useStore } from "../../context/StoreContext";
import { SOLENE_COPY, SOLENE_PARALLAX_CHAPTERS } from "../../data/soleneData";

const LUXURY_EASE = [0.22, 1, 0.36, 1];

function ParallaxChapter({ chapter, index, isMobile }) {
  const { lang } = useStore();
  const prefersReducedMotion = useReducedMotion();
  const chapterRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ["start end", "end start"],
  });

  // Reduce travel distance by 60% on mobile touch viewports per DESIGN_SYSTEM.md
  const travelFactor = prefersReducedMotion ? 0 : isMobile ? 0.4 : 1;
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    [-20 * travelFactor, 20 * travelFactor]
  );
  const fgY = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.abs(chapter.fgSpeed) * travelFactor, chapter.fgSpeed * travelFactor]
  );

  const isReversed = index % 2 === 1;

  return (
    <article
      ref={chapterRef}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 lg:py-20 border-t border-[var(--sol-border)]"
    >
      {/* 2.5D Layered Image Stage */}
      <div
        className={`lg:col-span-7 relative pb-12 sm:pb-16 ${
          isReversed ? "lg:order-2" : "lg:order-1"
        }`}
      >
        {/* Background Architectural Plate (16:10) */}
        <div className="w-[88%] sm:w-[82%] aspect-[16/10] border border-[var(--sol-border)] bg-[var(--sol-surface)] overflow-hidden">
          <motion.img
            src={chapter.bgImage}
            alt={chapter.title[lang]}
            loading="lazy"
            style={{ y: bgY }}
            className="w-full h-[112%] -mt-[6%] object-cover will-change-transform"
          />
        </div>

        {/* Foreground Macro Craft Plate (3:4) Gliding Faster */}
        <motion.div
          style={{ y: fgY }}
          className="w-[52%] sm:w-[44%] aspect-[3/4] border border-[var(--sol-border)] bg-[var(--sol-bg)] p-1.5 sm:p-2 -mt-20 sm:-mt-32 ms-auto relative z-10 will-change-transform"
        >
          <div className="w-full h-full overflow-hidden bg-[var(--sol-surface)]">
            <img
              src={chapter.fgImage}
              alt={chapter.specLabel[lang]}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>

      {/* Editorial Copy & Technical Tailoring Spec */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: LUXURY_EASE }}
        className={`lg:col-span-5 space-y-6 ${
          isReversed ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="font-display text-4xl text-[var(--sol-muted)]">
            {chapter.index}
          </span>
          <span className="h-[1px] w-10 bg-[var(--sol-border)]" />
          <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[var(--sol-muted)]">
            {chapter.eyebrow[lang]}
          </p>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-light leading-[1.1] text-[var(--sol-ink)]">
          {chapter.title[lang]}
        </h3>

        <p className="text-[14px] sm:text-[15px] leading-[1.75] font-light text-[var(--sol-muted)] max-w-md">
          {chapter.caption[lang]}
        </p>

        <div className="pt-4 border-t border-[var(--sol-border)] inline-block">
          <p className="text-[10px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal text-[var(--sol-muted)] mb-1">
            {lang === "en" ? "ATELIER SPECIFICATION" : "المواصفة الفنية"}
          </p>
          <p className="text-[13px] font-normal text-[var(--sol-ink)]">
            {chapter.specLabel[lang]}
          </p>
        </div>
      </motion.div>
    </article>
  );
}

export default function SoleneParallaxCraft() {
  const { lang } = useStore();
  const copy = SOLENE_COPY[lang].craftIntro;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="story"
      className="scroll-mt-20 py-16 md:py-28 border-b border-[var(--sol-border)] bg-[var(--sol-bg)] transition-colors duration-700 ease-luxury"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Intro */}
        <div className="max-w-2xl space-y-4 pb-12">
          <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[var(--sol-muted)]">
            {copy.eyebrow}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] text-[var(--sol-ink)]">
            {copy.heading}
          </h2>
          <p className="text-[14px] leading-[1.7] font-light text-[var(--sol-muted)]">
            {copy.subtitle}
          </p>
        </div>

        {/* 2.5D Chapters */}
        <div>
          {SOLENE_PARALLAX_CHAPTERS.map((chapter, idx) => (
            <ParallaxChapter
              key={chapter.id}
              chapter={chapter}
              index={idx}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}