// ─────────────────────────────────────────────────────────────
// Single source of truth for brand + content.
// Premium positioning: websites + a lead system for local
// businesses. Flat £299/mo. Built to feel world-class.
// ─────────────────────────────────────────────────────────────

export const BRAND = "HDA Solutions";
export const BRAND_TAGLINE = "Websites engineered to win customers";
// GoHighLevel booking widget — used for every "book a call" CTA.
export const CAL_URL =
  "https://api.leadconnectorhq.com/widget/booking/GDQp7qTfhXknyIgF1MrZ";
export const EMAIL = "hello@hdasolutions.co.uk";

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Pricing", href: "#pricing" },
  { label: "Demo", href: "#demo" },
];

export const hero = {
  eyebrow: "Websites + leads · for your business",
  headline: ["Websites that", "win customers."],
  sub: "We design, build and run high-performing websites — and the lead engine behind them.",
  primaryCta: { label: "book a call", href: CAL_URL },
  secondaryCta: { label: "our services", href: "#capabilities" },
};

type Stat = {
  value?: number;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
};

export const stats: Stat[] = [
  { display: "24/7", label: "lead capture" },
  { value: 7, prefix: "", suffix: " days", label: "from kick-off to live" },
  { value: 299, prefix: "£", suffix: "", label: "per month, everything in" },
  { value: 0, label: "missed leads with automated follow-up" },
];

export const marquee = [
  "PLUMBERS",
  "DENTISTS",
  "SALONS",
  "GYMS",
  "ROOFERS",
  "CAFÉS",
  "BUILDERS",
  "VETS",
  "ELECTRICIANS",
  "GARAGES",
];

type CaseStudy = {
  title: string;
  sector: string;
  blurb: string;
  tags: string[];
  accent: string;
  url: string | null; // live, embeddable site — null = coming soon
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Tillett & Saunders",
    sector: "Builders & renovations · London",
    blurb: "A premium, trust-first site with quote capture for a 25-year home-building firm.",
    tags: ["Web design", "Lead capture", "SEO"],
    accent: "#7f8a6f",
    url: "https://tillettandsaunders.co.uk",
  },
  {
    title: "Stoneford Pools & Landscapes",
    sector: "Pools · Landscaping · Hertfordshire",
    blurb: "A premium, conversion-led site for luxury pool and garden projects — built to turn browsers into booked consultations.",
    tags: ["Web design", "Lead capture", "Local SEO"],
    accent: "#c4623f",
    url: "https://haza1410.github.io/pools-and-gardens/",
  },
  {
    title: "Ashcombe Kitchens & Bathrooms",
    sector: "Renovations · Hertfordshire & N. London",
    blurb: "A polished renovation brand with a quote funnel, transformations slider and social proof front and centre.",
    tags: ["Web design", "Quote funnel", "Reviews"],
    accent: "#c99a5b",
    url: "https://haza1410.github.io/kitched-bathroom-demo/",
  },
];

export const transform = {
  eyebrow: "Before / After",
  heading: "From forgettable to unforgettable.",
  sub: "Drag to see the difference a proper build makes.",
  // The "after" is the real, live kitchens site (rendered non-interactive).
  afterUrl: "https://haza1410.github.io/kitched-bathroom-demo/",
  before: {
    label: "Before",
    name: "Ashcombe — old template site",
    points: ["Generic & forgettable", "Few ways to capture leads", "Hard to find on Google"],
  },
  after: {
    label: "After",
    name: "Ashcombe — built by HDA Solutions",
    points: ["Premium & fast", "Quote funnel built in", "Ranking & converting"],
  },
};

export const capabilities = {
  eyebrow: "What's in the box",
  heading: ["A website is just", "the start."],
  sub: "Your £299/month plan is a complete customer-getting system — the site is one piece of it. Here's everything working for you behind the scenes.",
  items: [
    {
      title: "Custom website",
      desc: "Designed and built for your brand. Fast, accessible, mobile-first.",
      icon: "layout",
    },
    {
      title: "Lead engine",
      desc: "Quote, contact & booking forms with instant email + text follow-up.",
      icon: "magnet",
    },
    {
      title: "Missed-call text-back",
      desc: "Every missed call gets an automatic text, so no job slips away.",
      icon: "phone",
    },
    {
      title: "Review engine",
      desc: "A funnel that turns happy customers into 5-star Google reviews.",
      icon: "star",
    },
    {
      title: "SEO & AI SEO",
      desc: "Found by the right local customers, however they search.",
      icon: "search",
    },
    {
      title: "Managed monthly",
      desc: "Hosting, updates and optimisation — handled, every month.",
      icon: "shield",
    },
  ],
};

export const calculator = {
  eyebrow: "Build your plan",
  heading: "Pay for exactly what you need.",
  base: { label: "Website Growth Plan", price: 299 },
  // type: "mo" monthly, "oneoff" one-time. Set pricing.
  addons: [
    { id: "chatbot", label: "AI FAQ assistant / chatbot", price: 40, type: "mo" },
    { id: "gbp", label: "Google Business Profile optimisation", price: 150, type: "oneoff" },
    { id: "lsa", label: "Google Local Service Ads setup", price: 500, type: "oneoff" },
    { id: "reactivation", label: "Past-customer reactivation campaign", price: 250, type: "oneoff" },
  ],
  note: "Set pricing — £299/month plus any add-ons you choose. 90-day minimum contract, with a 1-week cancellation window from your first payment.",
  cta: { label: "Book a free call", href: CAL_URL },
};

export const chatbot = {
  eyebrow: "Live demo",
  heading: "Meet your 24/7 assistant.",
  sub: "This is the kind of AI assistant we can put on your site. Ask it anything.",
  greeting: "Hi! I'm the HDA Solutions assistant. Ask me about pricing, timelines or what's included.",
  suggestions: [
    {
      q: "How much does it cost?",
      a: "It's a set fee of £299/month — website, hosting, lead system, reviews and SEO all included, billed monthly in advance via Stripe. Optional add-ons available. There's a 90-day minimum contract, with a 1-week cancellation window from your first payment (the first payment isn't refunded).",
    },
    {
      q: "How fast can I go live?",
      a: "Most sites launch within 7 days of our kick-off call, once we've got your content and branding.",
    },
    {
      q: "Do I own my website?",
      a: "Yes — the website is yours. If you ever leave, we hand it straight over. No hostages.",
    },
    {
      q: "What do I get for £299?",
      a: "A custom site, hosting & maintenance, lead-capture forms with auto follow-up, missed-call text-back, a 5-star review engine and ongoing SEO.",
    },
  ],
};

export const cta = {
  eyebrow: "Let's build",
  heading: ["Want a website", "that pulls its", "weight?"],
  sub: "Book a free 30-minute call. No pressure, no jargon.",
  primary: { label: "Book a free call", href: CAL_URL },
};
