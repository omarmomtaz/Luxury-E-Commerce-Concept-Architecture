import { Link } from "react-router";
import { ArrowUpRight, Check, Layers, ShieldCheck } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { PITCH_HUB_COPY } from "../data/sharedData";
import UtilityControls from "../components/shared/UtilityControls";

const CONCEPT_MEDIA = {
  "maison-verre": {
    image: "/assets/maison-verre/mv-hero.webp",
    tag: { en: "MINIMALIST EDITORIAL · AOV ENGINE", ar: "بساطة معمارية · محرّك المبيعات" },
    surfaceClass: "bg-[#F2EFE9]",
  },
  solene: {
    image: "/assets/solene/sol-hero.webp",
    tag: { en: "GLOBAL FLAGSHIP · 2.5D MOTION", ar: "المتجر العالمي · سرد بصري 2.5D" },
    surfaceClass: "bg-[#141413]",
  },
};

const CAPABILITY_PILLARS = {
  en: [
    { label: "Bilingual UX", value: "Native EN / العربية RTL" },
    { label: "Global Pricing", value: "EGP · USD · SAR" },
    { label: "Mobile 4G Speed", value: "WebP Assets < 125 KB" },
    { label: "Commerce Stack", value: "Shopify · Paymob · Stripe" },
  ],
  ar: [
    { label: "تجربة ثنائية اللغة", value: "عربي RTL وإنجليزي أصيل" },
    { label: "تسعير دولي", value: "EGP · USD · SAR" },
    { label: "سرعة الهواتف 4G", value: "صور WebP أقل من 125KB" },
    { label: "البنية التجارية", value: "Shopify · Paymob · Stripe" },
  ],
};

export default function PitchHubPage() {
  const { lang } = useStore();
  const copy = PITCH_HUB_COPY[lang];
  const pillars = CAPABILITY_PILLARS[lang];

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#111110] flex flex-col">
      {/* Top Executive Header */}
      <header className="sticky top-0 z-40 bg-[#F8F7F4]/95 backdrop-blur-sm border-b border-[#E5E2DC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.06em] rtl:tracking-normal text-[#111110]">
              OMAR MOMTAZ
            </span>
            <span className="hidden sm:inline text-[10px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[#6B6963]">
              {lang === "en" ? "E-COMMERCE ARCHITECTURE" : "هندسة المتاجر الفاخرة"}
            </span>
          </div>

          <UtilityControls showBag dark={false} />
        </div>
      </header>

      <main className="flex-1">
        {/* Commercial Framing Hero */}
        <section className="border-b border-[#E5E2DC] bg-[#F8F7F4]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
            <div className="max-w-3xl space-y-5">
              <p className="text-[11px] uppercase ltr:tracking-[0.22em] rtl:tracking-normal text-[#4A2C2A]">
                {copy.eyebrow}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.06] text-[#111110]">
                {copy.title}
              </h1>
              <p className="text-[14px] sm:text-[15px] leading-[1.75] font-light text-[#6B6963] max-w-2xl">
                {copy.subtitle}
              </p>
            </div>

            {/* 4-Metric Technical Readiness Strip */}
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border border-[#E5E2DC] bg-[#FFFFFF] divide-y lg:divide-y-0 lg:divide-x rtl:lg:divide-x-reverse divide-[#E5E2DC]">
              {pillars.map((item) => (
                <div key={item.label} className="p-4 sm:p-5 space-y-1">
                  <p className="text-[10px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#6B6963]">
                    {item.label}
                  </p>
                  <p className="text-[13px] sm:text-[14px] font-normal text-[#111110]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Concept Showcase (Side-by-Side Comparison) */}
        <section className="py-12 sm:py-16 lg:py-20 border-b border-[#E5E2DC]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {copy.concepts.map((concept) => {
                const media = CONCEPT_MEDIA[concept.id];
                const isSolene = concept.id === "solene";

                return (
                  <article
                    key={concept.id}
                    className="group border border-[#E5E2DC] bg-[#FFFFFF] flex flex-col justify-between"
                  >
                    <div>
                      {/* Clickable Campaign Preview */}
                      <Link
                        to={concept.route}
                        className={`block relative aspect-[16/10] border-b border-[#E5E2DC] overflow-hidden ${media.surfaceClass}`}
                      >
                        <img
                          src={media.image}
                          alt={concept.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                        />
                        <span className="absolute top-4 start-4 bg-[#F8F7F4]/95 border border-[#E5E2DC] px-3 py-1.5 text-[10px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#111110]">
                          {media.tag[lang]}
                        </span>
                      </Link>

                      {/* Commercial Breakdown */}
                      <div className="p-6 sm:p-8 space-y-5">
                        <div className="space-y-2 pb-5 border-b border-[#E5E2DC]">
                          <p className="text-[10px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal text-[#4A2C2A]">
                            {concept.tier}
                          </p>
                          <h2
                            className={`text-3xl sm:text-4xl font-light text-[#111110] ${
                              isSolene ? "font-serif italic" : "font-serif"
                            }`}
                          >
                            {concept.name}
                          </h2>
                          <p className="text-[14px] leading-[1.7] font-light text-[#6B6963]">
                            {concept.positioning}
                          </p>
                        </div>

                        {/* Business Levers List */}
                        <ul className="space-y-3">
                          {concept.levers.map((lever) => (
                            <li
                              key={lever}
                              className="flex items-start gap-3 text-[13px] leading-[1.6] text-[#111110]"
                            >
                              <span className="mt-1 w-4 h-4 border border-[#E5E2DC] bg-[#F8F7F4] flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 text-[#111110] stroke-[2]" />
                              </span>
                              <span>{lever}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                      <Link
                        to={concept.route}
                        className="w-full min-h-[50px] bg-[#111110] text-[#F8F7F4] text-[11px] uppercase ltr:tracking-[0.2em] rtl:tracking-normal hover:bg-[#2A2927] transition-colors inline-flex items-center justify-center gap-2.5"
                      >
                        <span>{copy.enterDemo}</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Hybrid Architecture Note for Investors */}
            <div className="mt-10 border border-[#E5E2DC] bg-[#FFFFFF] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-6 flex items-start gap-3.5">
                <Layers className="w-4 h-4 text-[#4A2C2A] shrink-0 mt-1 stroke-[1.5]" />
                <div className="space-y-1.5">
                  <p className="text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#111110]">
                    {lang === "en"
                      ? "Modular Production Delivery"
                      : "إمكانية الدمج المرن للإطلاق الفعلي"}
                  </p>
                  <p className="text-[13px] font-light leading-relaxed text-[#6B6963]">
                    {lang === "en"
                      ? "Both architectures share one unified commerce core. Conversion modules from Maison Verre (Suit Bundler, Fit Calculator) can be combined directly with Solène's editorial motion and shoppable lookbooks for your brand's final launch."
                      : "يعمل المساران على محرك تجاري موحّد؛ يمكن دمج أدوات رفع المبيعات من ميزون فير (تنسيق البدلة وحاسبة المقاس) مع السرد البصري والكتالوج التفاعلي من سولين في متجر واحد مخصّص لعلامتكم."}
                  </p>
                </div>
              </div>

              <div className="md:col-span-6 flex items-start gap-3.5 md:border-s md:border-[#E5E2DC] md:ps-6">
                <ShieldCheck className="w-4 h-4 text-[#4A2C2A] shrink-0 mt-1 stroke-[1.5]" />
                <div className="space-y-1.5">
                  <p className="text-[11px] uppercase ltr:tracking-[0.18em] rtl:tracking-normal text-[#111110]">
                    {lang === "en" ? "Prototype Transparency" : "شفافية العرض المفاهيمي"}
                  </p>
                  <p className="text-[13px] font-light leading-relaxed text-[#6B6963]">
                    {copy.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Portfolio Footer */}
      <footer className="bg-[#F8F7F4] py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#6B6963]">
          <p className="uppercase ltr:tracking-[0.18em] rtl:tracking-normal">
            © 2026 OMAR MOMTAZ ·{" "}
            {lang === "en"
              ? "LUXURY E-COMMERCE CONCEPT LAB"
              : "مختبر هندسة متاجر الأزياء الفاخرة"}
          </p>
          <div className="flex items-center gap-6 uppercase ltr:tracking-[0.18em] rtl:tracking-normal">
            <Link to="/maison-verre" className="hover:text-[#111110] transition-colors">
              Maison Verre
            </Link>
            <Link to="/solene" className="hover:text-[#111110] transition-colors">
              Solène Atelier
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}