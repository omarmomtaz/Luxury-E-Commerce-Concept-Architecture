// src/data/soleneData.js

export const SOLENE_COPY = {
  en: {
    brandName: "SOLÈNE ATELIER",
    signatureMark: "Solène",
    announcement: "CAMPAIGN NO. 04 · LIMITED NUMBERED EDITIONS · COMPLIMENTARY GLOBAL COURIER",
    nav: {
      story: "The Craft",
      dayToNight: "9 AM — 9 PM",
      lookbook: "Interactive Lookbook",
      archive: "The Collection",
      bag: "Bag",
    },
    hero: {
      issue: "CAMPAIGN NO. 04 · CAIRO / MILAN",
      headlineLine1: "SILHOUETTE",
      headlineLine2: "WITHOUT NOISE.",
      subcopy:
        "Modern formalwear sculpted for women who command rooms quietly. Engineered in architectural blocks and limited numbered editions.",
      primaryCta: "Explore the Lookbook",
      secondaryCta: "Experience 9 AM — 9 PM",
      scrollPrompt: "Scroll to Enter the Atelier",
    },
    craftIntro: {
      eyebrow: "2.5D TAILORING STUDY",
      heading: "Every Millimetre Is Intentional.",
      subtitle:
        "Three structural principles define the Solène silhouette: internal canvas architecture, high-twist natural fibres, and fluid evening transitions.",
    },
    moodSection: {
      eyebrow: "DUAL-HOUR ARCHITECTURE",
      heading: "One Wardrobe. Two Worlds.",
      instruction:
        "Toggle the hour to experience how the collection shifts from morning authority to evening allure.",
      amLabel: "09:00 AM · Boardroom Daylight",
      pmLabel: "09:00 PM · Evening Salon",
      featuredHeading: "Curated for This Hour",
      inspectCta: "Quick Acquire",
    },
    lookbook: {
      eyebrow: "INTERACTIVE EDITORIAL PLATES",
      heading: "Tap Any Silhouette to Acquire",
      subtitle:
        "Select the numbered markers on each editorial plate to inspect fabric architecture, switch colourways, and add directly to your bag.",
      hotspotHint: "Tap marker to inspect piece",
      selectSize: "Select Size",
      selectColor: "Select Colourway",
      quickAdd: "Add Piece to Bag",
      added: "Added to Bag",
    },
    archiveSection: {
      eyebrow: "COMPLETE EDITION · 08 PIECES",
      heading: "The Monolith Archive",
      filters: {
        all: "All Editions",
        blazers: "Blazers & Waistcoats",
        trousers: "Trousers",
        skirts: "Skirts",
        basics: "Silk Foundations",
        outerwear: "Outerwear",
      },
    },
  },
  ar: {
    brandName: "SOLÈNE ATELIER",
    signatureMark: "Solène",
    announcement: "الحملة الرابعة · إصدارات مرقّمة ومحدودة · شحن دولي سريع مجاني",
    nav: {
      story: "الحِرفة",
      dayToNight: "من الصباح للمساء",
      lookbook: "الكتالوج التفاعلي",
      archive: "المجموعة الكاملة",
      bag: "الحقيبة",
    },
    hero: {
      issue: "الحملة الرابعة · القاهرة / ميلانو",
      headlineLine1: "حضورٌ طاغٍ",
      headlineLine2: "بلا ضجيج.",
      subcopy:
        "أزياء رسمية معاصرة منحوتة للمرأة التي تفرض حضورها بهدوء وثقة. مصمّمة بقوالب معمارية دقيقة وإصدارات مرقّمة محدودة.",
      primaryCta: "استكشفي الكتالوج التفاعلي",
      secondaryCta: "تجربة الصباح والمساء",
      scrollPrompt: "مرّري للدخول إلى الأتيليه",
    },
    craftIntro: {
      eyebrow: "دراسة التفصيل المعماري 2.5D",
      heading: "كل مليمتر مقصود بذاته.",
      subtitle:
        "ثلاث ركائز تشكّل هوية سولين: البناء الداخلي المتماسك، والألياف الطبيعية عالية الكثافة، والانتقال السلس من صرامة النهار إلى أناقة المساء.",
    },
    moodSection: {
      eyebrow: "تصميم يواكب ساعات يومكِ",
      heading: "خزانة واحدة. عالمان مختلفان.",
      instruction:
        "بدّلي توقيت اليوم لتري كيف تنتقل المجموعة بسلاسة من صرامة الاجتماعات الصباحية إلى جاذبية الأمسيات الخاصة.",
      amLabel: "09:00 صباحاً · إضاءة الاجتماعات",
      pmLabel: "09:00 مساءً · أمسية خاصة",
      featuredHeading: "مختارات هذه الساعة",
      inspectCta: "اقتناء سريع",
    },
    lookbook: {
      eyebrow: "اللوحات التحريرية التفاعلية",
      heading: "المسي أي قطعة لاقتنائها",
      subtitle:
        "اضغطي على النقاط المرقّمة فوق كل إطلالة لاستعراض تفاصيل النسيج، وتغيير اللون، وإضافة القطعة مباشرة إلى حقيبتكِ.",
      hotspotHint: "اضغطي على النقطة لمعاينة القطعة",
      selectSize: "اختاري المقاس",
      selectColor: "اختاري اللون",
      quickAdd: "أضيفي القطعة للحقيبة",
      added: "تمت الإضافة للحقيبة",
    },
    archiveSection: {
      eyebrow: "الإصدار الكامل · 08 قطع",
      heading: "أرشيف مونوليث الرسمي",
      filters: {
        all: "جميع الإصدارات",
        blazers: "بليزرات وصديريات",
        trousers: "بناطيل",
        skirts: "تنانير",
        basics: "قطع الحرير الأساسية",
        outerwear: "معاطف وكاب",
      },
    },
  },
};

export const SOLENE_PRODUCTS = [
  {
    id: "sol-01",
    sku: "SOL-ED-01",
    category: "blazers",
    prices: { EGP: 6900, USD: 155, SAR: 580 },
    badge: { en: "Edition 01 / 150", ar: "إصدار 01 / 150" },
    name: {
      en: "The Elongated Monolith Wool Blazer",
      ar: "بليزر مونوليث الطويل من الصوف البكر",
    },
    fabric: {
      en: "100% Super 130s Virgin Wool · Hand-Finished Peak Lapel",
      ar: "100% صوف بكر سوبر 130 · ياقة مدبّبة مشغولة يدوياً",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      {
        colorId: "noir",
        colorName: { en: "Velvet Noir", ar: "أسود مخملي" },
        hex: "#121110",
        image: "/assets/solene/sol-blazer-noir.webp",
      },
      {
        colorId: "limestone",
        colorName: { en: "Warm Limestone", ar: "حجري دافئ" },
        hex: "#DDD5C8",
        image: "/assets/solene/sol-blazer-limestone.webp",
      },
    ],
  },
  {
    id: "sol-02",
    sku: "SOL-ED-02",
    category: "trousers",
    prices: { EGP: 3800, USD: 85, SAR: 320 },
    badge: { en: "Signature Drape", ar: "انسيابية أيقونية" },
    name: {
      en: "The Floor-Grazing Pleated Palazzo Trouser",
      ar: "بنطال بالاتسو واسع بكسرات انسيابية طويلة",
    },
    fabric: {
      en: "Heavy Fluid Triacetate Crepe · Extended Waist Tab",
      ar: "كريب تراي أسيتيت ثقيل وانسيابي · خصر ممتد بحبك مخفي",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      {
        colorId: "noir",
        colorName: { en: "Velvet Noir", ar: "أسود مخملي" },
        hex: "#121110",
        image: "/assets/solene/sol-trouser-noir.webp",
      },
      {
        colorId: "limestone",
        colorName: { en: "Warm Limestone", ar: "حجري دافئ" },
        hex: "#DDD5C8",
        image: "/assets/solene/sol-trouser-limestone.webp",
      },
    ],
  },
  {
    id: "sol-03",
    sku: "SOL-ED-03",
    category: "basics",
    prices: { EGP: 2950, USD: 68, SAR: 255 },
    badge: { en: "22-Momme Silk", ar: "حرير عيار 22 مومي" },
    name: {
      en: "The Draped Asymmetric Silk Shell",
      ar: "توب حريري غير متماثل بثنيات ناعمة",
    },
    fabric: {
      en: "100% 22-Momme Mulberry Silk Satin · Bias Collar",
      ar: "100% ساتان حرير التوت الفاخر عيار 22 مومي · ياقة مائلة",
    },
    sizes: ["XS", "S", "M", "L"],
    variants: [
      {
        colorId: "champagne",
        colorName: { en: "Champagne Chalk", ar: "شامبين ناعم" },
        hex: "#E6DAC8",
        image: "/assets/solene/sol-top-champagne.webp",
      },
      {
        colorId: "noir",
        colorName: { en: "Velvet Noir", ar: "أسود مخملي" },
        hex: "#121110",
        image: "/assets/solene/sol-top-noir.webp",
      },
    ],
  },
  {
    id: "sol-04",
    sku: "SOL-ED-04",
    category: "blazers",
    prices: { EGP: 4600, USD: 105, SAR: 390 },
    badge: { en: "9 PM Icon", ar: "أيقونة المساء" },
    name: {
      en: "The Tailored Halter Waistcoat",
      ar: "صديرية رسمية مفتوحة الظهر بقصّة هندسية",
    },
    fabric: {
      en: "Structured Barathea Wool · Silk Satin Back Strap",
      ar: "صوف باراثيا متماسك · حزام خلفي من الساتان الحريري",
    },
    sizes: ["XS", "S", "M", "L"],
    variants: [
      {
        colorId: "noir",
        colorName: { en: "Velvet Noir", ar: "أسود مخملي" },
        hex: "#121110",
        image: "/assets/solene/sol-waistcoat-noir.webp",
      },
      {
        colorId: "espresso",
        colorName: { en: "Roasted Espresso", ar: "إسبريسو محمّص" },
        hex: "#362520",
        image: "/assets/solene/sol-waistcoat-espresso.webp",
      },
    ],
  },
  {
    id: "sol-05",
    sku: "SOL-ED-05",
    category: "skirts",
    prices: { EGP: 3400, USD: 78, SAR: 290 },
    badge: null,
    name: {
      en: "The Bias-Cut Satin Midi Skirt",
      ar: "تنورة ميدي ساتان بقصّة مائلة انسيابية",
    },
    fabric: {
      en: "Heavyweight Liquid Silk Satin · Invisible Side Zip",
      ar: "ساتان حريري ثقيل · سحّاب جانبي مخفي بالكامل",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      {
        colorId: "noir",
        colorName: { en: "Velvet Noir", ar: "أسود مخملي" },
        hex: "#121110",
        image: "/assets/solene/sol-skirt-noir.webp",
      },
      {
        colorId: "champagne",
        colorName: { en: "Champagne Chalk", ar: "شامبين ناعم" },
        hex: "#E6DAC8",
        image: "/assets/solene/sol-skirt-champagne.webp",
      },
    ],
  },
  {
    id: "sol-06",
    sku: "SOL-ED-06",
    category: "outerwear",
    prices: { EGP: 5200, USD: 118, SAR: 440 },
    badge: { en: "Architectural Cut", ar: "قصّة معمارية" },
    name: {
      en: "The Architectural Trench Cape",
      ar: "كاب ترنش معماري بحزام خصر جلدي",
    },
    fabric: {
      en: "Water-Repellent Cotton Gabardine · Calfskin Buckle",
      ar: "غاباردين قطني مقاوم للماء · إبزيم جلد طبيعي",
    },
    sizes: ["S/M", "M/L"],
    variants: [
      {
        colorId: "stone",
        colorName: { en: "Stone Gabardine", ar: "حجري كلاسيكي" },
        hex: "#C5B9A5",
        image: "/assets/solene/sol-cape-stone.webp",
      },
      {
        colorId: "noir",
        colorName: { en: "Velvet Noir", ar: "أسود مخملي" },
        hex: "#121110",
        image: "/assets/solene/sol-cape-noir.webp",
      },
    ],
  },
  {
    id: "sol-07",
    sku: "SOL-ED-07",
    category: "blazers",
    prices: { EGP: 6200, USD: 140, SAR: 525 },
    badge: { en: "Evening Atelier", ar: "إصدار السهرة" },
    name: {
      en: "The Sculpted Tuxedo Blazer Dress",
      ar: "فستان بليزر توكسيدو بقصّة منحوتة",
    },
    fabric: {
      en: "100% Virgin Wool · Silk Duchesse Satin Shawl Collar",
      ar: "100% صوف بكر فاخر · ياقة شال من ساتان الدوشيس الحريري",
    },
    sizes: ["XS", "S", "M", "L"],
    variants: [
      {
        colorId: "noir",
        colorName: { en: "Velvet Noir", ar: "أسود مخملي" },
        hex: "#121110",
        image: "/assets/solene/sol-dress-noir.webp",
      },
      {
        colorId: "ivory",
        colorName: { en: "Chalk Ivory", ar: "عاجي ناصع" },
        hex: "#EFEAE0",
        image: "/assets/solene/sol-dress-ivory.webp",
      },
    ],
  },
  {
    id: "sol-08",
    sku: "SOL-ED-08",
    category: "basics",
    prices: { EGP: 3100, USD: 72, SAR: 265 },
    badge: { en: "Hand-Finished", ar: "تشطيب يدوي" },
    name: {
      en: "The Crisp Silk-Organza Evening Shirt",
      ar: "قميص سهرة رسمي من الأورجانزا الحريرية",
    },
    fabric: {
      en: "100% Structured Silk Organza · French Cuffs with Mother-of-Pearl Studs",
      ar: "100% أورجانزا حرير طبيعي متماسك · أكمام فرنسية بأزرار صدف طبيعي",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    variants: [
      {
        colorId: "ivory",
        colorName: { en: "Chalk Ivory", ar: "عاجي ناصع" },
        hex: "#EFEAE0",
        image: "/assets/solene/sol-shirt-ivory.webp",
      },
      {
        colorId: "taupe",
        colorName: { en: "Smoked Taupe", ar: "رمادي دافئ مدخّن" },
        hex: "#8A7F75",
        image: "/assets/solene/sol-shirt-taupe.webp",
      },
    ],
  },
];

export const SOLENE_PARALLAX_CHAPTERS = [
  {
    id: "chapter-01",
    index: "01",
    eyebrow: { en: "INTERNAL ARCHITECTURE", ar: "البناء الداخلي" },
    title: { en: "The Floating Canvas Shoulder", ar: "هندسة الأكتاف المعمارية" },
    caption: {
      en: "Hand-basted horsehair canvas builds quiet authority that holds its razor line through 12-hour days without stiffness or weight.",
      ar: "حشوة داخلية مخيطة بدقة تمنح الأكتاف استقامة متماسكة تدوم لاثنتي عشرة ساعة دون أي ثقل أو تصلّب.",
    },
    specLabel: { en: "0.8mm Japanese Horsehair Interlining", ar: "بطانة داخلية دقيقة بسمك 0.8 ملم" },
    bgImage: "/assets/solene/sol-story-01-bg.webp",
    fgImage: "/assets/solene/sol-story-01-fg.webp",
    fgSpeed: -55,
  },
  {
    id: "chapter-02",
    index: "02",
    eyebrow: { en: "KINETIC TENSION", ar: "انسيابية النسيج" },
    title: { en: "Liquid Drape in Motion", ar: "توازن الصرامة والانسيابية" },
    caption: {
      en: "High-twist Super 130s wools paired with 22-momme mulberry silk react to stride—architectural when still, fluid in motion.",
      ar: "مزيج الصوف البكر سوبر 130 مع حرير التوت عيار 22 مومي يتفاعل مع حركتكِ؛ مظهر صارم عند الوقوف وانسيابية ناعمة مع كل خطوة.",
    },
    specLabel: { en: "320 GSM High-Twist Virgin Wool", ar: "صوف بكر عالي الكثافة 320 جرام/م²" },
    bgImage: "/assets/solene/sol-story-02-bg.webp",
    fgImage: "/assets/solene/sol-story-02-fg.webp",
    fgSpeed: -75,
  },
];

export const SOLENE_MOOD_STATES = {
  am: {
    mode: "am",
    timeLabel: "09:00 AM",
    locationLabel: { en: "CAIRO / MILAN · BOARDROOM DAYLIGHT", ar: "القاهرة / ميلانو · إضاءة الاجتماعات الصباحية" },
    headline: {
      en: "Sharp enough to lead the room.",
      ar: "صرامة أنيقة تقودين بها الاجتماع.",
    },
    stylingNote: {
      en: "Pair the Monolith Wool Blazer over the Pleated Palazzo Trouser and Draped Silk Shell in limestone daylight. Clean lines, zero distraction.",
      ar: "نسّقي بليزر مونوليث فوق بنطال بالاتسو الواسع والتوب الحريري في إضاءة الصباح؛ خطوط نظيفة وحضور قيادي خالٍ من التكلّف.",
    },
    heroImage: "/assets/solene/sol-mood-9am.webp",
    featuredIds: ["sol-01", "sol-02", "sol-03", "sol-06"],
  },
  pm: {
    mode: "pm",
    timeLabel: "09:00 PM",
    locationLabel: { en: "CAIRO / MILAN · EVENING SALON", ar: "القاهرة / ميلانو · أجواء الأمسيات الخاصة" },
    headline: {
      en: "Drop the blazer. Keep the command.",
      ar: "اتركي البليزر، واحتفظي بالحضور.",
    },
    stylingNote: {
      en: "Transition into the Tailored Halter Waistcoat, Sculpted Tuxedo Blazer Dress, or Silk-Organza Evening Shirt as architectural shadows fall.",
      ar: "انتقلي إلى الصديرية الهندسية، أو فستان التوكسيدو المنحوت، أو قميص الأورجانزا الحريري لتتألقي بأناقة مسائية هادئة.",
    },
    heroImage: "/assets/solene/sol-mood-9pm.webp",
    featuredIds: ["sol-04", "sol-05", "sol-07", "sol-08"],
  },
};

export const SOLENE_LOOKBOOK_PLATES = [
  {
    id: "plate-01",
    index: "LOOK 01",
    title: {
      en: "Look 01 · The Executive Monolith",
      ar: "إطلالة 01 · البدلة المعمارية الكاملة",
    },
    caption: {
      en: "Full-length Super 130s wool tailoring anchored by fluid silk satin.",
      ar: "تفصيل كامل من صوف سوبر 130 يرتكز على نعومة الساتان الحريري.",
    },
    defaultImage: "/assets/solene/sol-lb1-noir-champagne-noir.webp",
    // Key format: `${hs-1 colorId}__${hs-2 colorId}__${hs-3 colorId}`
    combinations: {
      "noir__champagne__noir": "/assets/solene/sol-lb1-noir-champagne-noir.webp",
      "limestone__champagne__noir": "/assets/solene/sol-lb1-limestone-champagne-noir.webp",
      "noir__noir__noir": "/assets/solene/sol-lb1-noir-noir-noir.webp",
      "noir__champagne__limestone": "/assets/solene/sol-lb1-noir-champagne-limestone.webp",
      "limestone__noir__noir": "/assets/solene/sol-lb1-limestone-noir-noir.webp",
      "limestone__champagne__limestone": "/assets/solene/sol-lb1-limestone-champagne-limestone.webp",
      "noir__noir__limestone": "/assets/solene/sol-lb1-noir-noir-limestone.webp",
      "limestone__noir__limestone": "/assets/solene/sol-lb1-limestone-noir-limestone.webp",
    },
    hotspots: [
      { id: "hs-1", number: "01", productId: "sol-01", defaultColorId: "noir", xPercent: 46, yPercent: 32 },
      { id: "hs-2", number: "02", productId: "sol-03", defaultColorId: "champagne", xPercent: 53, yPercent: 45 },
      { id: "hs-3", number: "03", productId: "sol-02", defaultColorId: "noir", xPercent: 48, yPercent: 73 },
    ],
  },
  {
    id: "plate-02",
    index: "LOOK 02",
    title: {
      en: "Look 02 · Continental Transit",
      ar: "إطلالة 02 · أناقة العبور القاري",
    },
    caption: {
      en: "Layered weather-resistant gabardine over crisp organza and pleated structure.",
      ar: "كاب غاباردين معماري فوق قميص الأورجانزا الحريرية وبنطال بالاتسو.",
    },
    defaultImage: "/assets/solene/sol-lb2-stone-ivory-limestone.webp",
    // Key format: `${hs-4 colorId}__${hs-5 colorId}__${hs-6 colorId}`
    combinations: {
      "stone__ivory__limestone": "/assets/solene/sol-lb2-stone-ivory-limestone.webp",
      "noir__ivory__limestone": "/assets/solene/sol-lb2-noir-ivory-limestone.webp",
      "stone__taupe__limestone": "/assets/solene/sol-lb2-stone-taupe-limestone.webp",
      "stone__ivory__noir": "/assets/solene/sol-lb2-stone-ivory-noir.webp",
      "noir__taupe__limestone": "/assets/solene/sol-lb2-noir-taupe-limestone.webp",
      "noir__ivory__noir": "/assets/solene/sol-lb2-noir-ivory-noir.webp",
      "stone__taupe__noir": "/assets/solene/sol-lb2-stone-taupe-noir.webp",
      "noir__taupe__noir": "/assets/solene/sol-lb2-noir-taupe-noir.webp",
    },
    hotspots: [
      { id: "hs-4", number: "01", productId: "sol-06", defaultColorId: "stone", xPercent: 38, yPercent: 38 },
      { id: "hs-5", number: "02", productId: "sol-08", defaultColorId: "ivory", xPercent: 54, yPercent: 44 },
      { id: "hs-6", number: "03", productId: "sol-02", defaultColorId: "limestone", xPercent: 50, yPercent: 74 },
    ],
  },
  {
    id: "plate-03",
    index: "LOOK 03",
    title: {
      en: "Look 03 · After-Hours Salon",
      ar: "إطلالة 03 · سهرة الأتيليه الخاصة",
    },
    caption: {
      en: "Barathea wool and duchesse satin sculpted for evening command.",
      ar: "صوف الباراثيا وساتان الدوشيس بقصّات مسائية حادة.",
    },
    defaultImage: "/assets/solene/sol-lb3-noir-noir-ivory.webp",
    // Key format: `${hs-7 colorId}__${hs-8 colorId}__${hs-9 colorId}`
    combinations: {
      "noir__noir__ivory": "/assets/solene/sol-lb3-noir-noir-ivory.webp",
      "espresso__noir__ivory": "/assets/solene/sol-lb3-espresso-noir-ivory.webp",
      "noir__champagne__ivory": "/assets/solene/sol-lb3-noir-champagne-ivory.webp",
      "noir__noir__noir": "/assets/solene/sol-lb3-noir-noir-noir.webp",
      "espresso__champagne__ivory": "/assets/solene/sol-lb3-espresso-champagne-ivory.webp",
      "espresso__noir__noir": "/assets/solene/sol-lb3-espresso-noir-noir.webp",
      "noir__champagne__noir": "/assets/solene/sol-lb3-noir-champagne-noir.webp",
      "espresso__champagne__noir": "/assets/solene/sol-lb3-espresso-champagne-noir.webp",
    },
    hotspots: [
      { id: "hs-7", number: "01", productId: "sol-04", defaultColorId: "noir", xPercent: 36, yPercent: 36 },
      { id: "hs-8", number: "02", productId: "sol-05", defaultColorId: "noir", xPercent: 37, yPercent: 68 },
      { id: "hs-9", number: "03", productId: "sol-07", defaultColorId: "ivory", xPercent: 66, yPercent: 48 },
    ],
  },
];