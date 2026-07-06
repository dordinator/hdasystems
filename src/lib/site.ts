// ─────────────────────────────────────────────────────────────
// Single source of truth for brand + content.
// Premium positioning: websites + a lead system for local
// businesses. Flat £299/mo. Built to feel world-class.
// ─────────────────────────────────────────────────────────────

export const BRAND = "HDAsystems";
export const BRAND_TAGLINE = "Websites engineered to win customers";
// GoHighLevel booking widget — used for every "book a call" CTA.
export const CAL_URL =
  "https://api.leadconnectorhq.com/widget/booking/GDQp7qTfhXknyIgF1MrZ";
export const EMAIL = "hello@hdasystems.co.uk";
export const SEE_IT_IN_ACTION_PATH = "/see-it-in-action";

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Demo", href: "/#demo" },
  { label: "See it in action", href: SEE_IT_IN_ACTION_PATH },
];

export const hero = {
  eyebrow: "Websites + leads · for your business",
  eyebrowMobile: "Websites for your business",
  headline: ["Websites that", "win customers."],
  sub: "We design, build and run high-performing websites — and the lead engine behind them.",
  primaryCta: { label: "book a call", href: CAL_URL },
  secondaryCta: { label: "see it in action", href: SEE_IT_IN_ACTION_PATH },
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
  screenshot: string;
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Tillett & Saunders",
    sector: "Builders & renovations · London",
    blurb: "A premium, trust-first site with quote capture for a 25-year home-building firm.",
    tags: ["Web design", "Lead capture", "SEO"],
    accent: "#7f8a6f",
    url: "https://tillettandsaunders.co.uk",
    screenshot: "/work/tillett-saunders.jpg",
  },
  {
    title: "Stoneford Pools & Landscapes",
    sector: "Pools · Landscaping · Hertfordshire",
    blurb: "A premium, conversion-led site for luxury pool and garden projects — built to turn browsers into booked consultations.",
    tags: ["Web design", "Lead capture", "Local SEO"],
    accent: "#c4623f",
    url: "https://haza1410.github.io/pools-and-gardens/",
    screenshot: "/work/stoneford-pools.jpg",
  },
  {
    title: "Ashcombe Kitchens & Bathrooms",
    sector: "Renovations · Hertfordshire & N. London",
    blurb: "A polished renovation brand with a quote funnel, transformations slider and social proof front and centre.",
    tags: ["Web design", "Quote funnel", "Reviews"],
    accent: "#c99a5b",
    url: "https://haza1410.github.io/kitched-bathroom-demo/",
    screenshot: "/work/ashcombe-kitchens.jpg",
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
    name: `Ashcombe — built by ${BRAND}`,
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
      title: "Website chatbot",
      desc: "Engage visitors in real time, answer their questions, and make leaving their details effortless.",
      icon: "chat",
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
  greeting: `Hi! I'm the ${BRAND} assistant. Ask me about pricing, timelines or what's included.`,
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
      a: "A custom site, hosting & maintenance, lead-capture forms with auto follow-up, a website chatbot, a 5-star review engine and ongoing SEO.",
    },
  ],
};

export const cta = {
  eyebrow: "Let's build",
  heading: ["Want a website", "that pulls its", "weight?"],
  sub: "Book a free 30-minute call. No pressure, no jargon.",
  primary: { label: "Book a free call", href: CAL_URL },
};

type DemoStat = {
  value: string;
  label: string;
};

type DemoSection = {
  id: string;
  title: string;
  stats: DemoStat[];
  /** Self-hosted MP4 in /public/videos/ */
  videoSrc?: string;
  /** First-frame poster in /public/videos/posters/ */
  poster?: string;
};

export const seeItInAction = {
  eyebrow: "See it in action",
  heading: ["Watch how", "it all works."],
  sub: "Short walkthroughs of every part of your £299/month system — from the website to automated follow-up.",
  cta: { label: "Book a free call", href: CAL_URL },
  sections: [
    {
      id: "website",
      title: "Functional Bespoke Website",
      stats: [
        {
          value: "75%",
          label: "of people judge a company's credibility based on their website",
        },
        {
          value: "78%",
          label: "of small business owners say a website has boosted their growth",
        },
        {
          value: "67%",
          label: "of users trust websites with a seamless experience, boosting sales",
        },
      ],
      videoSrc: "/videos/website.mp4",
      poster: "/videos/posters/website.png",
    },
    {
      id: "inbox",
      title: "All in one inbox",
      stats: [
        {
          value: "70%",
          label: "of contractors respond faster to customers with one inbox",
        },
        {
          value: "61%",
          label: "of contractors are less overwhelmed when using only one inbox",
        },
        {
          value: "83%",
          label: "of contractors become more organized when using just one inbox",
        },
      ],
      videoSrc: "/videos/inbox.mp4",
      poster: "/videos/posters/inbox.png",
    },
    {
      id: "reviews",
      title: "5-Star Magic Review Funnel",
      stats: [
        {
          value: "97%",
          label: "of people read a review before they choose a business",
        },
        {
          value: "72%",
          label: "of people use Google reviews to find a business",
        },
        {
          value: "2.7×",
          label: "more people buy a service from a business with a lot of reviews",
        },
      ],
      videoSrc: "/videos/reviews.mp4",
      poster: "/videos/posters/reviews.png",
    },
    {
      id: "marketing",
      title: "One-Click Marketing Campaigns",
      stats: [
        {
          value: "98%",
          label: "of text messages are read within 3 minutes",
        },
        {
          value: "30%",
          label: "of SMS marketing campaigns result in immediate sales",
        },
        {
          value: "62%",
          label: "of consumers say they are likely to engage with SMS promotions",
        },
      ],
      videoSrc: "/videos/marketing.mp4",
      poster: "/videos/posters/marketing.png",
    },
    {
      id: "follow-up",
      title: "Automated lead follow up",
      stats: [
        {
          value: "70%",
          label: "of people reply within 24 hours to SMS follow-ups",
        },
        {
          value: "72%",
          label: "of contractors boost sales with automated follow-ups",
        },
        {
          value: "97%",
          label: "of people read SMS messages within 24 hours",
        },
      ],
      videoSrc: "/videos/follow-up.mp4",
      poster: "/videos/posters/follow-up.png",
    },
  ] as DemoSection[],
};
