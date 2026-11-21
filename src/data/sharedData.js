export const MARKET_CURRENCIES = {
  EGP: { code: "EGP", label: "EG · EGP", freeShipping: 6000 },
  USD: { code: "USD", label: "INTL · USD", freeShipping: 150 },
  SAR: { code: "SAR", label: "KSA · SAR", freeShipping: 550 },
};

export const MV_LUXURY_PRICES = {
  "mv-01": { EGP: 5400, USD: 120, SAR: 450 },
  "mv-02": { EGP: 4850, USD: 110, SAR: 410 },
  "mv-03": { EGP: 3200, USD: 75, SAR: 280 },
  "mv-04": { EGP: 2850, USD: 65, SAR: 245 },
  "mv-05": { EGP: 2700, USD: 62, SAR: 230 },
  "mv-06": { EGP: 2150, USD: 50, SAR: 185 },
  "mv-07": { EGP: 1850, USD: 45, SAR: 165 },
  "mv-08": { EGP: 2400, USD: 55, SAR: 205 },
};

export function formatLuxuryPrice(pricesObj, currencyCode = "EGP") {
  const amount = pricesObj[currencyCode] ?? pricesObj.EGP;
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);

  if (currencyCode === "USD") return `$${formatted}`;
  return `${currencyCode} ${formatted}`;
}

export const PITCH_HUB_COPY = {
  en: {
    eyebrow: "LUXURY E-COMMERCE CONCEPT ARCHITECTURE",
    title: "Two Commercial Directions for Global Womenswear.",
    subtitle:
      "Built as live interactive concepts demonstrating conversion engineering, international readiness (EN/AR + EGP/USD/SAR), and editorial brand positioning for modern formalwear houses.",
    disclaimer:
      "Concept Portfolio · All brands shown are original architectural prototypes ready for Shopify Headless, Paymob, and Stripe integration.",
    enterDemo: "Launch Live Concept",
    concepts: [
      {
        id: "maison-verre",
        route: "/maison-verre",
        tier: "DIRECTION 01 · REVENUE & CONVERSION ENGINE",
        name: "MAISON VERRE",
        positioning:
          "High-trust architectural minimalism engineered to maximize Average Order Value and minimize sizing returns.",
        levers: [
          "3-Step Suit Bundler with automatic 15% privilege to push multi-item carts",
          "10-Second Centimetre Fit Calculator calibrated to EU 34–48 blocks",
          "Instant swatch switching + full bilingual RTL & multi-currency switching",
        ],
      },
      {
        id: "solene",
        route: "/solene",
        tier: "DIRECTION 02 · GLOBAL FLAGSHIP EXPERIENCE",
        name: "SOLÈNE ATELIER",
        positioning:
          "Paris/Milan-grade editorial storytelling designed to command higher price points and PR authority.",
        levers: [
          "2.5D scroll-linked tailoring chapters running at 60fps on mobile",
          "9 AM to 9 PM live lighting & mood shift across the collection",
          "Interactive shoppable lookbook with direct hotspot acquisition",
        ],
      },
    ],
  },
  ar: {
    eyebrow: "هندسة متاجر الأزياء الفاخرة",
    title: "مساران تجاريان لعلامة أزياء رسمية بمستوى عالمي.",
    subtitle:
      "نماذج تفاعلية حيّة تستعرض هندسة رفع المبيعات، والجاهزية الدولية الكاملة (عربي/إنجليزي مع تعدد العملات)، وبناء الهوية التحريرية الفاخرة لعلامات البدل والأزياء الرسمية.",
    disclaimer:
      "نماذج مفاهيمية للعرض · جميع العلامات المعروضة نماذج معمارية أصلية جاهزة للربط الفوري مع Shopify وPaymob وStripe.",
    enterDemo: "استعراض النموذج الحي",
    concepts: [
      {
        id: "maison-verre",
        route: "/maison-verre",
        tier: "المسار 01 · محرك المبيعات والتحويل",
        name: "MAISON VERRE",
        positioning:
          "بساطة معمارية عالية الثقة مصمّمة لرفع متوسط قيمة الطلب وتقليل نسبة المرتجعات الناتجة عن المقاسات.",
        levers: [
          "أداة تنسيق البدلة من 3 قطع مع خصم تلقائي 15% لرفع قيمة السلة",
          "حاسبة مقاسات بالسنتيمتر في 10 ثوانٍ مطابقة لقوالب EU 34–48",
          "تبديل فوري للألوان مع دعم كامل للغة العربية RTL وتعدد العملات",
        ],
      },
      {
        id: "solene",
        route: "/solene",
        tier: "المسار 02 · المتجر العالمي الرئيسي",
        name: "SOLÈNE ATELIER",
        positioning:
          "تجربة تحريرية بمستوى دور الأزياء في باريس وميلانو لتعزيز القيمة السعرية والمكانة العالمية للعلامة.",
        levers: [
          "فصول سردية بتقنية العمق 2.5D وسلاسة 60 إطاراً على الهواتف",
          "تحوّل حي لإضاءة وأجواء الصفحة بين إطلالة الصباح والمساء (9 AM — 9 PM)",
          "كتالوج تفاعلي يتيح شراء كل قطعة مباشرة بالضغط على الصورة",
        ],
      },
    ],
  },
};

export const CART_CHECKOUT_COPY = {
  en: {
    bagTitle: "Your Bag",
    emptyTitle: "Your bag is currently empty.",
    emptySub: "Explore tailored separates or build a complete 3-piece suit.",
    freeShippingUnlocked: "Complimentary Express Delivery Unlocked",
    freeShippingRemaining: "away from Complimentary Express Delivery",
    bundleBadge: "3-Piece Suit Privilege (-15%)",
    subtotal: "Subtotal",
    discount: "Bundle Savings",
    total: "Estimated Total",
    checkoutCta: "Proceed to Checkout",
    remove: "Remove",
    checkoutModal: {
      eyebrow: "DEMO ENVIRONMENT · PRODUCTION READY",
      title: "Order Summary Preview",
      destinationLabel: "Dispatch Destination",
      destinations: ["Cairo, Egypt (48h Express)", "Riyadh, KSA (3–4 Days)", "Dubai, UAE (3–4 Days)", "London, UK (4–5 Days)"],
      shippingLabel: "Express Courier",
      complimentary: "Complimentary",
      dutiesNote: "Duties & local VAT calculated automatically at live checkout.",
      stackNote: "Production build connects directly to Shopify Headless / Paymob (Egypt & GCC) / Stripe (Global).",
      closeCta: "Return to Storefront",
    },
  },
  ar: {
    bagTitle: "حقيبة التسوق",
    emptyTitle: "حقيبة التسوق فارغة حالياً.",
    emptySub: "استكشفي القطع الرسمية أو نسّقي بدلة كاملة من 3 قطع.",
    freeShippingUnlocked: "تم تفعيل الشحن السريع المجاني",
    freeShippingRemaining: "متبقية للحصول على شحن سريع مجاني",
    bundleBadge: "خصم البدلة الكاملة (-15%)",
    subtotal: "المجموع الفرعي",
    discount: "قيمة التوفير",
    total: "الإجمالي التقديري",
    checkoutCta: "إتمام الطلب",
    remove: "إزالة",
    checkoutModal: {
      eyebrow: "بيئة عرض تجريبية · جاهزة للإطلاق الفعلي",
      title: "معاينة ملخص الطلب",
      destinationLabel: "وجهة الشحن السريع",
      destinations: ["القاهرة، مصر (خلال 48 ساعة)", "الرياض، السعودية (3–4 أيام)", "دبي، الإمارات (3–4 أيام)", "لندن، المملكة المتحدة (4–5 أيام)"],
      shippingLabel: "الشحن السريع",
      complimentary: "مجاني",
      dutiesNote: "تُحتسب الرسوم الجمركية والضريبة المحلية تلقائياً عند الدفع الفعلي.",
      stackNote: "النسخة الإنتاجية تُربط مباشرة مع Shopify Headless وبوابات الدفع Paymob (لمصر والخليج) وStripe (عالمياً).",
      closeCta: "العودة للمتجر",
    },
  },
};