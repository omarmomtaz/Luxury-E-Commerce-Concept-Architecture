export const CURRENCIES = {
  EGP: { code: "EGP", symbol: "EGP", rate: 1, freeShippingThreshold: 6000 },
  USD: { code: "USD", symbol: "$", rate: 0.02, freeShippingThreshold: 150 },
  SAR: { code: "SAR", symbol: "SAR", rate: 0.075, freeShippingThreshold: 550 },
};

export const MV_COPY = {
  en: {
    brandName: "MAISON VERRE",
    announcement: "Complimentary Express Delivery in Cairo, Riyadh & London · 14-Day Tailored Exchange",
    nav: {
      collection: "Collection",
      bundler: "Build Your Suit",
      fitFinder: "Fit Calculator",
      bag: "Bag",
    },
    hero: {
      eyebrow: "AUTUMN / WINTER 2026",
      title: "Architecture in Tailoring.",
      subtitle:
        "Precision-cut blazers, structured trousers, and breathable silk foundations engineered for the boardroom and beyond.",
      primaryCta: "Explore Collection",
      secondaryCta: "Build a 3-Piece Suit (-15%)",
    },
    catalog: {
      heading: "The Tailored Edit",
      filters: {
        all: "All Pieces",
        blazers: "Blazers",
        trousers: "Trousers",
        basics: "Basics",
        skirts: "Skirts",
      },
      quickAdd: "Quick Add",
      selectSize: "Select Size",
      added: "Added to Bag",
      lowStock: "Limited Run",
    },
    bundler: {
      eyebrow: "COMPLETE THE UNIFORM",
      heading: "Build Your Suit",
      subtitle:
        "Select one blazer, one tailored bottom, and one foundational piece to unlock an automatic 15% wardrobe privilege.",
      steps: ["01. Select Blazer", "02. Select Trouser or Skirt", "03. Select Foundation"],
      summaryTitle: "Your Curated Suit",
      discountLabel: "Suit Privilege (15% Off)",
      ctaComplete: "Add Complete Suit to Bag",
      ctaIncomplete: "Select All 3 Pieces to Unlock 15% Off",
    },
    fitFinder: {
      eyebrow: "FIT IS THE PRODUCT",
      heading: "Your Exact Size in 10 Seconds",
      subtitle:
        "Adjust your waist and hip measurements in centimetres. Matched directly against Maison Verre's tailoring blocks to eliminate guesswork.",
      waistLabel: "Natural Waist",
      hipsLabel: "Full Hips",
      fitPrefLabel: "Preferred Drape",
      fitOptions: {
        tailored: "Architectural / Sharp",
        relaxed: "Fluid / Relaxed",
      },
      resultLabel: "Recommended EU Size",
      betweenSizesNote: "Your proportions sit near a block boundary; we calibrated for clean drape without pulling.",
      shopSizeCta: "Filter Collection by Size",
    },
    trustStrip: [
      { title: "True Centimetre Blocks", desc: "Graded across EU 34–48 for real proportions." },
      { title: "Natural Fibre Standard", desc: "Virgin wool, mulberry silk, and breathable cotton twill." },
      { title: "Global Express Dispatch", desc: "Cairo in 48 hours. GCC & Europe in 3–5 business days." },
      { title: "14-Day Effortless Exchange", desc: "Complimentary courier pickup for size adjustments." },
    ],
  },
  ar: {
    brandName: "MAISON VERRE",
    announcement: "شحن سريع مجاني إلى القاهرة والرياض ولندن · استبدال مجاني للمقاسات خلال 14 يوماً",
    nav: {
      collection: "المجموعة",
      bundler: "صمّمي بدلتكِ",
      fitFinder: "حاسبة المقاس",
      bag: "الحقيبة",
    },
    hero: {
      eyebrow: "مجموعة خريف وشتاء 2026",
      title: "هندسة التفصيل العصري.",
      subtitle:
        "بليزرات بقصّات معمارية دقيقة، وبناطيل متماسكة، وقطع أساسية من الحرير الطبيعي صُممت لتمنحكِ حضوراً واثقاً طوال اليوم.",
      primaryCta: "تصفّحي المجموعة",
      secondaryCta: "نسّقي بدلة من 3 قطع (خصم 15%)",
    },
    catalog: {
      heading: "مختارات التفصيل الرسمي",
      filters: {
        all: "الكل",
        blazers: "بليزرات",
        trousers: "بناطيل",
        basics: "قطع أساسية",
        skirts: "تنانير",
      },
      quickAdd: "إضافة سريعة",
      selectSize: "اختاري المقاس",
      added: "تمت الإضافة للحقيبة",
      lowStock: "إصدار محدود",
    },
    bundler: {
      eyebrow: "إطلالة متكاملة بخطوة واحدة",
      heading: "صمّمي بدلتكِ الكاملة",
      subtitle:
        "اختاري بليزر، وبنطالاً أو تنورة، مع قطعة أساسية لتحصلي تلقائياً على خصم 15% على الإطلالة الكاملة.",
      steps: ["01. اختاري البليزر", "02. اختاري البنطال أو التنورة", "03. اختاري القطعة الأساسية"],
      summaryTitle: "تنسيق بدلتكِ",
      discountLabel: "خصم البدلة الكاملة (15%)",
      ctaComplete: "أضيفي البدلة كاملة للحقيبة",
      ctaIncomplete: "اختاري 3 قطع لتفعيل خصم 15%",
    },
    fitFinder: {
      eyebrow: "دقة المقاس سر الفخامة",
      heading: "مقاسكِ المثالي في 10 ثوانٍ",
      subtitle:
        "حرّكي المؤشر وفق قياسات الخصر والأرداف بالسنتيمتر، لنطابقها مباشرة مع قوالب تفصيل ميزون فير الدقيقة.",
      waistLabel: "محيط الخصر",
      hipsLabel: "محيط الأرداف",
      fitPrefLabel: "انسيابية القصة المفضّلة",
      fitOptions: {
        tailored: "محدّدة وهندسية",
        relaxed: "مريحة وانسيابية",
      },
      resultLabel: "المقاس الأوروبي الأنسب لكِ",
      betweenSizesNote: "قياساتكِ قريبة من الحد الفاصل بين مقاسين؛ اخترنا لكِ الأنسب لانسيابية مثالية دون شد.",
      shopSizeCta: "عرض القطع المتوفرة بمقاسكِ",
    },
    trustStrip: [
      { title: "قوالب قياس حقيقية", desc: "مقاسات دقيقة من EU 34 حتى 48 لمختلف القوامات." },
      { title: "أنسجة طبيعية فاخرة", desc: "صوف بكر نقي، وحرير التوت، وقطن مصري طويل التيلة." },
      { title: "شحن دولي سريع", desc: "خلال 48 ساعة بالقاهرة، و3–5 أيام للخليج وأوروبا." },
      { title: "استبدال سلس خلال 14 يوماً", desc: "استلام مجاني لتبديل المقاسات بكل يسر." },
    ],
  },
};

export const MV_SIZE_CHART = [
  { eu: 34, label: "XS / 34", waistMin: 60, waistMax: 65, hipsMin: 86, hipsMax: 91 },
  { eu: 36, label: "S / 36", waistMin: 66, waistMax: 70, hipsMin: 92, hipsMax: 96 },
  { eu: 38, label: "M / 38", waistMin: 71, waistMax: 75, hipsMin: 97, hipsMax: 101 },
  { eu: 40, label: "M-L / 40", waistMin: 76, waistMax: 80, hipsMin: 102, hipsMax: 106 },
  { eu: 42, label: "L / 42", waistMin: 81, waistMax: 86, hipsMin: 107, hipsMax: 112 },
  { eu: 44, label: "XL / 44", waistMin: 87, waistMax: 92, hipsMin: 113, hipsMax: 118 },
  { eu: 46, label: "2XL / 46", waistMin: 93, waistMax: 99, hipsMin: 119, hipsMax: 125 },
  { eu: 48, label: "3XL / 48", waistMin: 100, waistMax: 108, hipsMin: 126, hipsMax: 134 },
];

export const MV_PRODUCTS = [
  {
    id: "mv-01",
    sku: "MV-BLZ-01",
    category: "blazers",
    bundleSlot: 0,
    priceEGP: 5400,
    badge: { en: "Signature Cut", ar: "القصّة الأيقونية" },
    name: {
      en: "The Architectural Double-Breasted Blazer",
      ar: "بليزر معماري بصفّين من الأزرار",
    },
    fabric: {
      en: "96% Italian Virgin Wool, 4% Elastane · Full Cupro Lining",
      ar: "96% صوف بكر إيطالي، 4% إيلاستان · بطانة كوبرو كاملة",
    },
    sizes: [34, 36, 38, 40, 42, 44, 46],
    variants: [
      {
        colorId: "obsidian",
        colorName: { en: "Obsidian Black", ar: "أسود أوبسيديان" },
        hex: "#171716",
        image: "/assets/maison-verre/mv-blazer-obsidian.webp",
      },
      {
        colorId: "sandstone",
        colorName: { en: "Warm Sandstone", ar: "رملي دافئ" },
        hex: "#C7B8A1",
        image: "/assets/maison-verre/mv-blazer-sandstone.webp",
      },
      {
        colorId: "espresso",
        colorName: { en: "Deep Espresso", ar: "إسبريسو داكن" },
        hex: "#3E2924",
        image: "/assets/maison-verre/mv-blazer-espresso.webp",
      },
    ],
  },
  {
    id: "mv-02",
    sku: "MV-BLZ-02",
    category: "blazers",
    bundleSlot: 0,
    priceEGP: 4850,
    badge: { en: "New Season", ar: "إصدار جديد" },
    name: {
      en: "The Cinched-Waist Sculpted Blazer",
      ar: "بليزر محدّد الخصر بقصّة منحوتة",
    },
    fabric: {
      en: "100% Heavyweight Wool Crepe · Matte Horn Buttons",
      ar: "100% كريب صوف فاخر ثقيل · أزرار طبيعية مطفية",
    },
    sizes: [34, 36, 38, 40, 42, 44],
    variants: [
      {
        colorId: "ivory",
        colorName: { en: "Chalk Ivory", ar: "عاجي ناصع" },
        hex: "#EAE4D7",
        image: "/assets/maison-verre/mv-sculpted-ivory.webp",
      },
      {
        colorId: "charcoal",
        colorName: { en: "Slate Charcoal", ar: "رمادي فحمي" },
        hex: "#3A3B3C",
        image: "/assets/maison-verre/mv-sculpted-charcoal.webp",
      },
    ],
  },
  {
    id: "mv-03",
    sku: "MV-TRS-01",
    category: "trousers",
    bundleSlot: 1,
    priceEGP: 3200,
    badge: { en: "Bestseller", ar: "الأكثر طلباً" },
    name: {
      en: "The Inner-Support Tailored Wide Trouser",
      ar: "بنطال واسع بقصة عالية ودعامة خصر مدمجة",
    },
    fabric: {
      en: "Fluid Wool-Blend Outer · 100% Breathable Cotton Waist Structure",
      ar: "نسيج صوفي انسيابي · بطانة خصر قطنية 100% لتماسك مريح",
    },
    sizes: [34, 36, 38, 40, 42, 44, 46, 48],
    variants: [
      {
        colorId: "obsidian",
        colorName: { en: "Obsidian Black", ar: "أسود أوبسيديان" },
        hex: "#171716",
        image: "/assets/maison-verre/mv-trouser-obsidian.webp",
      },
      {
        colorId: "sandstone",
        colorName: { en: "Warm Sandstone", ar: "رملي دافئ" },
        hex: "#C7B8A1",
        image: "/assets/maison-verre/mv-trouser-sandstone.webp",
      },
    ],
  },
  {
    id: "mv-04",
    sku: "MV-TRS-02",
    category: "trousers",
    bundleSlot: 1,
    priceEGP: 2850,
    badge: null,
    name: {
      en: "The Sharp-Crease Cigarette Trouser",
      ar: "بنطال رسمي مستقيم بكسرة أمامية حادة",
    },
    fabric: {
      en: "High-Twist Gabardine · Concealed Hook Closure",
      ar: "قماش غاباردين فاخر مقاوم للتجعد · إغلاق مخفي",
    },
    sizes: [34, 36, 38, 40, 42, 44, 46],
    variants: [
      {
        colorId: "charcoal",
        colorName: { en: "Slate Charcoal", ar: "رمادي فحمي" },
        hex: "#3A3B3C",
        image: "/assets/maison-verre/mv-cigarette-charcoal.webp",
      },
      {
        colorId: "espresso",
        colorName: { en: "Deep Espresso", ar: "إسبريسو داكن" },
        hex: "#3E2924",
        image: "/assets/maison-verre/mv-cigarette-espresso.webp",
      },
    ],
  },
  {
    id: "mv-05",
    sku: "MV-SKT-01",
    category: "skirts",
    bundleSlot: 1,
    priceEGP: 2700,
    badge: { en: "Limited Run", ar: "إصدار محدود" },
    name: {
      en: "The Column Midi Tailored Skirt",
      ar: "تنورة ميدي مستقيمة بفتحة خلفية أنيقة",
    },
    fabric: {
      en: "Structured Suiting Wool · Back Walking Vent",
      ar: "صوف تفصيل متماسك · فتحة خلفية لسهولة الحركة",
    },
    sizes: [34, 36, 38, 40, 42, 44],
    variants: [
      {
        colorId: "obsidian",
        colorName: { en: "Obsidian Black", ar: "أسود أوبسيديان" },
        hex: "#171716",
        image: "/assets/maison-verre/mv-skirt-obsidian.webp",
      },
      {
        colorId: "ivory",
        colorName: { en: "Chalk Ivory", ar: "عاجي ناصع" },
        hex: "#EAE4D7",
        image: "/assets/maison-verre/mv-skirt-ivory.webp",
      },
    ],
  },
  {
    id: "mv-06",
    sku: "MV-BSC-01",
    category: "basics",
    bundleSlot: 2,
    priceEGP: 2150,
    badge: { en: "Wardrobe Core", ar: "أساس الخزانة" },
    name: {
      en: "The Crisp Egyptian Cotton Poplin Shirt",
      ar: "قميص بوبلين من القطن المصري الفاخر",
    },
    fabric: {
      en: "100% Extra-Long Staple Giza Cotton · Concealed Placket",
      ar: "100% قطن جيزة طويل التيلة · أزرار مخفية",
    },
    sizes: [34, 36, 38, 40, 42, 44, 46, 48],
    variants: [
      {
        colorId: "optic-white",
        colorName: { en: "Optic White", ar: "أبيض نقي" },
        hex: "#F7F6F2",
        image: "/assets/maison-verre/mv-shirt-white.webp",
      },
      {
        colorId: "ice-blue",
        colorName: { en: "Glacier Blue", ar: "أزرق جليدي هادئ" },
        hex: "#CBD7E3",
        image: "/assets/maison-verre/mv-shirt-blue.webp",
      },
    ],
  },
  {
    id: "mv-07",
    sku: "MV-BSC-02",
    category: "basics",
    bundleSlot: 2,
    priceEGP: 1850,
    badge: null,
    name: {
      en: "The Liquid Silk-Blend Square Neck Top",
      ar: "توب حريري انسيابي بياقة مربعة",
    },
    fabric: {
      en: "70% Mulberry Silk, 30% Viscose · Double-Layered Front",
      ar: "70% حرير التوت الطبيعي، 30% فيسكوز · طبقة أمامية مزدوجة",
    },
    sizes: [34, 36, 38, 40, 42, 44],
    variants: [
      {
        colorId: "champagne",
        colorName: { en: "Champagne Silk", ar: "شامبين حريري" },
        hex: "#DFD3C3",
        image: "/assets/maison-verre/mv-top-champagne.webp",
      },
      {
        colorId: "obsidian",
        colorName: { en: "Obsidian Black", ar: "أسود أوبسيديان" },
        hex: "#171716",
        image: "/assets/maison-verre/mv-top-obsidian.webp",
      },
    ],
  },
  {
    id: "mv-08",
    sku: "MV-BSC-03",
    category: "basics",
    bundleSlot: 2,
    priceEGP: 2400,
    badge: { en: "Layering Essential", ar: "مثالي للتنسيق" },
    name: {
      en: "The Fine-Gauge Merino Mockneck Knit",
      ar: "كنزة صوف ميرينو ناعم بياقة مرتفعة",
    },
    fabric: {
      en: "100% Extra-Fine Merino Wool · Zero-Bulk Blazer Layer",
      ar: "100% صوف ميرينو فائق النعومة · مصمّمة للارتداء تحت البليزر",
    },
    sizes: [34, 36, 38, 40, 42, 44],
    variants: [
      {
        colorId: "espresso",
        colorName: { en: "Deep Espresso", ar: "إسبريسو داكن" },
        hex: "#3E2924",
        image: "/assets/maison-verre/mv-knit-espresso.webp",
      },
      {
        colorId: "oat",
        colorName: { en: "Raw Oat", ar: "شوفان طبيعي" },
        hex: "#D7CFC2",
        image: "/assets/maison-verre/mv-knit-oat.webp",
      },
    ],
  },
];