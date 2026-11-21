import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { MV_COPY } from "../../data/maisonVerreData";
import UtilityControls from "../shared/UtilityControls";

export default function MVHeaderHero() {
  const { lang } = useStore();
  const copy = MV_COPY[lang];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#141413] text-[#FAF9F6] px-4 py-2.5 text-center border-b border-[#2A2927]">
        <p className="text-[10px] sm:text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal font-light">
          {copy.announcement}
        </p>
      </div>

      {/* Sticky Architectural Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#E4DFD6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
          {/* Brand & Back to Hub */}
          <div className="flex items-center gap-4 sm:gap-7">
            <Link
              to="/"
              className="min-h-[44px] inline-flex items-center gap-1.5 text-[10px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#6E6A63] hover:text-[#141413] transition-colors"
              aria-label="Return to Concept Hub"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.25] rtl:rotate-180" />
              <span className="hidden md:inline">
                {lang === "en" ? "Hub" : "المعرض"}
              </span>
            </Link>

            <span className="hidden md:inline-block h-4 w-[1px] bg-[#E4DFD6]" />

            <a
              href="#top"
              className="font-serif text-xl sm:text-2xl font-normal tracking-[0.06em] rtl:tracking-normal text-[#141413]"
            >
              {copy.brandName}
            </a>
          </div>

          {/* Desktop Section Nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-8 text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#141413]"
          >
            <button
              type="button"
              onClick={() => scrollToSection("collection")}
              className="min-h-[44px] hover:opacity-60 transition-opacity"
            >
              {copy.nav.collection}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("bundler")}
              className="min-h-[44px] hover:opacity-60 transition-opacity"
            >
              {copy.nav.bundler}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("fit-finder")}
              className="min-h-[44px] hover:opacity-60 transition-opacity"
            >
              {copy.nav.fitFinder}
            </button>
          </nav>

          {/* Currency, EN/AR & Bag */}
          <UtilityControls showBag dark={false} />
        </div>

        {/* Mobile Quick-Jump Strip (Zero-Click Access on 390px) */}
        <nav
          aria-label="Mobile sections"
          className="flex lg:hidden items-center justify-between border-t border-[#E4DFD6] px-4 bg-[#F2EFE9]/60"
        >
          <button
            type="button"
            onClick={() => scrollToSection("collection")}
            className="flex-1 min-h-[44px] text-[10px] uppercase ltr:tracking-[0.14em] rtl:tracking-normal text-[#141413]"
          >
            {copy.nav.collection}
          </button>
          <span className="h-3.5 w-[1px] bg-[#E4DFD6]" />
          <button
            type="button"
            onClick={() => scrollToSection("bundler")}
            className="flex-1 min-h-[44px] text-[10px] uppercase ltr:tracking-[0.14em] rtl:tracking-normal text-[#4A2C2A] font-medium"
          >
            {copy.nav.bundler}
          </button>
          <span className="h-3.5 w-[1px] bg-[#E4DFD6]" />
          <button
            type="button"
            onClick={() => scrollToSection("fit-finder")}
            className="flex-1 min-h-[44px] text-[10px] uppercase ltr:tracking-[0.14em] rtl:tracking-normal text-[#141413]"
          >
            {copy.nav.fitFinder}
          </button>
        </nav>
      </header>

      {/* Editorial Split Hero */}
      <section
        id="top"
        className="border-b border-[#E4DFD6] bg-[#FAF9F6]"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left Typography Column */}
          <div className="lg:col-span-5 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-e border-[#E4DFD6]">
            <div className="space-y-6">
              <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[#6E6A63]">
                {copy.hero.eyebrow}
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl xl:text-[68px] font-light leading-[1.03] text-[#141413]">
                {copy.hero.title}
              </h1>
              <p className="text-[14px] sm:text-[15px] leading-[1.7] font-light text-[#6E6A63] max-w-[420px]">
                {copy.hero.subtitle}
              </p>
            </div>

            <div className="pt-10 lg:pt-14 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("collection")}
                className="min-h-[48px] px-7 bg-[#141413] text-[#FAF9F6] text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal hover:bg-[#2A2927] transition-colors inline-flex items-center justify-center gap-2.5"
              >
                <span>{copy.hero.primaryCta}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("bundler")}
                className="min-h-[48px] px-7 border border-[#141413] text-[#141413] text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal hover:bg-[#F2EFE9] transition-colors inline-flex items-center justify-center"
              >
                {copy.hero.secondaryCta}
              </button>
            </div>
          </div>

          {/* Right Editorial Campaign Plate */}
          <div className="lg:col-span-7 bg-[#F2EFE9] overflow-hidden">
            <div className="aspect-[16/10] lg:aspect-auto lg:h-full w-full overflow-hidden">
              <img
                src="/assets/maison-verre/mv-hero.webp"
                alt={copy.hero.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}