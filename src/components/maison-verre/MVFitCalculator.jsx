import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Ruler } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { MV_COPY, MV_SIZE_CHART } from "../../data/maisonVerreData";

export default function MVFitCalculator({ onApplySizeFilter }) {
  const { lang } = useStore();
  const copy = MV_COPY[lang].fitFinder;
  const trustStrip = MV_COPY[lang].trustStrip;

  const [waist, setWaist] = useState(73);
  const [hips, setHips] = useState(99);
  const [fitPref, setFitPref] = useState("tailored"); // "tailored" | "relaxed"

  const recommendation = useMemo(() => {
    const findIndexByMetric = (value, maxKey) => {
      const idx = MV_SIZE_CHART.findIndex((row) => value <= row[maxKey]);
      return idx === -1 ? MV_SIZE_CHART.length - 1 : idx;
    };

    const waistIdx = findIndexByMetric(waist, "waistMax");
    const hipsIdx = findIndexByMetric(hips, "hipsMax");
    const baseIdx = Math.max(waistIdx, hipsIdx);
    const baseRow = MV_SIZE_CHART[baseIdx];

    const isNearBoundary =
      waistIdx !== hipsIdx ||
      waist >= baseRow.waistMax - 1 ||
      hips >= baseRow.hipsMax - 1;

    const finalIdx =
      fitPref === "relaxed" && baseIdx < MV_SIZE_CHART.length - 1
        ? baseIdx + 1
        : baseIdx;

    return {
      row: MV_SIZE_CHART[finalIdx],
      isNearBoundary,
    };
  }, [waist, hips, fitPref]);

  const handleShopSize = () => {
    onApplySizeFilter(recommendation.row.eu);
    const el = document.getElementById("collection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* 10-Second Fit & Size Calculator */}
      <section
        id="fit-finder"
        className="scroll-mt-24 py-16 md:py-24 border-b border-[#E4DFD6] bg-[#FAF9F6]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Sliders Panel */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[#4A2C2A] inline-flex items-center gap-2">
                  <Ruler className="w-3.5 h-3.5 stroke-[1.5]" />
                  {copy.eyebrow}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#141413]">
                  {copy.heading}
                </h2>
                <p className="text-[14px] leading-[1.7] font-light text-[#6E6A63] max-w-xl">
                  {copy.subtitle}
                </p>
              </div>

              <div className="space-y-7 pt-2">
                {/* Waist Slider */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="mv-waist-slider"
                      className="text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#141413]"
                    >
                      {copy.waistLabel}
                    </label>
                    <span className="font-serif text-2xl font-light text-[#141413]">
                      {waist} <span className="text-[12px] font-sans text-[#6E6A63]">cm</span>
                    </span>
                  </div>
                  <input
                    id="mv-waist-slider"
                    type="range"
                    min={60}
                    max={108}
                    value={waist}
                    onChange={(e) => setWaist(Number(e.target.value))}
                    className="luxury-range"
                  />
                  <div className="flex justify-between text-[10px] text-[#6E6A63]">
                    <span>60 cm</span>
                    <span>84 cm</span>
                    <span>108 cm</span>
                  </div>
                </div>

                {/* Hips Slider */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="mv-hips-slider"
                      className="text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#141413]"
                    >
                      {copy.hipsLabel}
                    </label>
                    <span className="font-serif text-2xl font-light text-[#141413]">
                      {hips} <span className="text-[12px] font-sans text-[#6E6A63]">cm</span>
                    </span>
                  </div>
                  <input
                    id="mv-hips-slider"
                    type="range"
                    min={86}
                    max={134}
                    value={hips}
                    onChange={(e) => setHips(Number(e.target.value))}
                    className="luxury-range"
                  />
                  <div className="flex justify-between text-[10px] text-[#6E6A63]">
                    <span>86 cm</span>
                    <span>110 cm</span>
                    <span>134 cm</span>
                  </div>
                </div>

                {/* Drape Preference Toggle */}
                <div className="space-y-3 pt-2">
                  <p className="text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#141413]">
                    {copy.fitPrefLabel}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["tailored", "relaxed"].map((pref) => {
                      const active = fitPref === pref;
                      return (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setFitPref(pref)}
                          className={`min-h-[46px] px-4 border text-[11px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal transition-colors ${
                            active
                              ? "border-[#141413] bg-[#141413] text-[#FAF9F6]"
                              : "border-[#E4DFD6] bg-white text-[#141413] hover:border-[#141413]"
                          }`}
                        >
                          {copy.fitOptions[pref]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Live Result Architecture Card */}
            <div className="lg:col-span-5 border border-[#E4DFD6] bg-[#F2EFE9] p-6 sm:p-10 flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <p className="text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal text-[#6E6A63]">
                  {copy.resultLabel}
                </p>

                <div className="flex items-baseline gap-4 pb-6 border-b border-[#D5CEC3]">
                  <span className="font-serif text-7xl sm:text-8xl font-light leading-none text-[#141413]">
                    {recommendation.row.eu}
                  </span>
                  <span className="text-[12px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#4A2C2A]">
                    {recommendation.row.label}
                  </span>
                </div>

                {/* Exact Block Spec Table */}
                <div className="grid grid-cols-2 gap-4 pt-2 text-[12px]">
                  <div className="p-3.5 bg-[#FAF9F6] border border-[#E4DFD6]">
                    <p className="text-[10px] uppercase ltr:tracking-[0.14em] rtl:tracking-normal text-[#6E6A63] mb-1">
                      {copy.waistLabel}
                    </p>
                    <p className="text-[#141413] font-normal">
                      {recommendation.row.waistMin}–{recommendation.row.waistMax} cm
                    </p>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] border border-[#E4DFD6]">
                    <p className="text-[10px] uppercase ltr:tracking-[0.14em] rtl:tracking-normal text-[#6E6A63] mb-1">
                      {copy.hipsLabel}
                    </p>
                    <p className="text-[#141413] font-normal">
                      {recommendation.row.hipsMin}–{recommendation.row.hipsMax} cm
                    </p>
                  </div>
                </div>

                {recommendation.isNearBoundary && (
                  <p className="text-[12px] leading-relaxed text-[#6E6A63] pt-2">
                    {copy.betweenSizesNote}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleShopSize}
                className="w-full min-h-[48px] bg-[#141413] text-[#FAF9F6] text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal hover:bg-[#2A2927] transition-colors inline-flex items-center justify-center gap-2.5"
              >
                <span>
                  {copy.shopSizeCta} (EU {recommendation.row.eu})
                </span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Pillar Trust Strip */}
      <section className="border-b border-[#E4DFD6] bg-[#FAF9F6]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-[#E4DFD6]">
          {trustStrip.map((pillar) => (
            <div key={pillar.title} className="p-6 sm:p-8 space-y-2">
              <h3 className="text-[12px] uppercase ltr:tracking-[0.16em] rtl:tracking-normal text-[#141413] font-normal">
                {pillar.title}
              </h3>
              <p className="text-[13px] font-light text-[#6E6A63] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Footer with Cross-Concept Switcher */}
      <footer className="bg-[#141413] text-[#FAF9F6] py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <p className="font-serif text-2xl font-light tracking-wide">
              MAISON VERRE
            </p>
            <p className="text-[12px] text-[#9E978D] max-w-md leading-relaxed">
              {lang === "en"
                ? "Direction 01 · Conversion & AOV Architecture Prototype. Engineered for Cairo, GCC, and international luxury formalwear."
                : "المسار 01 · نموذج هندسة المبيعات ورفع قيمة الطلب. مصمّم لعلامات الأزياء الرسمية في القاهرة والخليج والأسواق العالمية."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="min-h-[44px] px-5 border border-[#2B2926] text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#FAF9F6] hover:border-[#FAF9F6] transition-colors inline-flex items-center"
            >
              {lang === "en" ? "Back to Pitch Hub" : "العودة لمعرض المسارات"}
            </Link>
            <Link
              to="/solene"
              className="min-h-[44px] px-5 bg-[#FAF9F6] text-[#141413] text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal hover:bg-[#E4DFD6] transition-colors inline-flex items-center gap-2"
            >
              <span>
                {lang === "en" ? "View Direction 02: Solène" : "استعراض المسار 02: سولين"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}