// ─────────────────────────────────────────────────────────────
// Single source of truth for brand + content.
// Positioning: websites + a lead system for local businesses.
// Two simple plans — Website £99/mo and Growth £249/mo.
// ─────────────────────────────────────────────────────────────

export const BRAND = "HDA Systems";
export const BRAND_TAGLINE = "Websites engineered to win customers";
// GoHighLevel booking widget — used for every "book a call" CTA.
export const CAL_URL =
  "https://api.leadconnectorhq.com/widget/booking/GDQp7qTfhXknyIgF1MrZ";
export const EMAIL = "hello@hdasystems.com";

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Systems", href: "/products" },
  { label: "Pricing", href: "/#pricing" },
];

export const hero = {
  eyebrow: "Websites + leads · for your business",
  headline: ["Websites that", "win customers."],
  sub: "We design, build and run high-performing websites — and the lead engine behind them.",
  primaryCta: { label: "book a call", href: CAL_URL },
  secondaryCta: { label: "products", href: "/products" },
};

// Customer moment → service outcome. Powers the hero RHS block.
export const heroMoments = [
  { slug: "local-seo", trigger: "Google search", outcome: "You show up first" },
  { slug: "website", trigger: "Land on site", outcome: "Enquiry, not bounce" },
  { slug: "lead-followup", trigger: "Send enquiry", outcome: "Reply in seconds" },
  { slug: "missed-call", trigger: "Miss a call", outcome: "Text-back wins it" },
  { slug: "inbox", trigger: "DM on socials", outcome: "One inbox, fast reply" },
  { slug: "reviews", trigger: "Job's done", outcome: "5-star on Google" },
  { slug: "campaigns", trigger: "Past customer", outcome: "Referrals on tap" },
] as const;

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
  { value: 99, prefix: "£", suffix: "", label: "per month to get started" },
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
    title: "Stoneford Pools & Landscapes",
    sector: "Pools · Landscaping · Hertfordshire",
    blurb: "A premium, conversion-led site for luxury pool and garden projects — built to turn browsers into booked consultations.",
    tags: ["Web design", "Lead capture", "Local SEO"],
    accent: "#2ee6c0",
    url: "https://haza1410.github.io/pools-and-gardens/",
  },
  {
    title: "Stoneford Kitchens & Bathrooms",
    sector: "Renovations · Hertfordshire & N. London",
    blurb: "A polished renovation brand with a quote funnel, transformations slider and social proof front and centre.",
    tags: ["Web design", "Quote funnel", "Reviews"],
    accent: "#22d3ee",
    url: "https://haza1410.github.io/kitched-bathroom-demo/",
  },
  {
    title: "Tillet & Saunders",
    sector: "Builders & renovations · London",
    blurb: "A premium, trust-first site with quote capture for a 25-year home-building firm.",
    tags: ["Web design", "Lead capture", "SEO"],
    accent: "#8b7bff",
    url: "https://tillettandsaunders.co.uk/",
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
    name: "Typical template site",
    points: ["Generic & forgettable", "Few ways to capture leads", "Hard to find on Google"],
  },
  after: {
    label: "After",
    name: "Built by HDA Systems",
    points: ["Premium & fast", "Quote funnel built in", "Ranking & converting"],
  },
};

export const capabilities = {
  eyebrow: "What's in the box",
  heading: ["A website is just", "the start."],
  sub: "Your plan is a complete customer-getting system — the site is one piece of it. Here's everything working for you behind the scenes.",
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

// ─────────────────────────────────────────────────────────────
// Pricing — two simple plans, no upfront fees.
// Website Plan (£99): the site + review engine.
// Growth Plan (£249): the full lead system.
// ─────────────────────────────────────────────────────────────

export type Plan = {
  id: "website" | "growth";
  name: string;
  price: number;
  tagline: string;
  features: string[];
  addonNote?: string;
  highlight: boolean;
  cta: { label: string; href: string };
};

export const plans: Plan[] = [
  {
    id: "website",
    name: "Website Plan",
    price: 99,
    tagline: "A proper website that gets you found and gets you reviews.",
    features: [
      "Custom, mobile-first website",
      "Hosting, updates & maintenance",
      "Lead-capture & contact forms",
      "5-star review engine",
      "Local search setup",
    ],
    highlight: false,
    cta: { label: "Book a free call", href: CAL_URL },
  },
  {
    id: "growth",
    name: "Growth Plan",
    price: 249,
    tagline: "The complete customer-getting system, fully managed.",
    features: [
      "Everything in the Website Plan",
      "Missed-call text-back",
      "Automated lead follow-up",
      "One-click referral & repeat campaigns",
      "All-in-one inbox",
      "Ongoing local SEO",
    ],
    addonNote: "Optional add-on: AI FAQ assistant",
    highlight: true,
    cta: { label: "Book a free call", href: CAL_URL },
  },
];

export function getPlan(id: Plan["id"]) {
  return plans.find((p) => p.id === id)!;
}

export const pricing = {
  eyebrow: "Simple pricing",
  heading: ["Two plans.", "No upfront fees."],
  sub: "Pick the plan that fits. Start with a great website, or go all-in on the full growth system.",
  note: "Simple monthly billing with no upfront fees. We'll walk you through everything on your call.",
};

export const cta = {
  eyebrow: "Let's build",
  heading: ["Want a website", "that pulls its weight?"],
  sub: "Book a free 30-minute call. No pressure, no jargon.",
  primary: { label: "Book a free call", href: CAL_URL },
};

// ─────────────────────────────────────────────────────────────
// Products / systems (their own pages + a demo page each).
// Content resembles a contractor "marketing systems" line-up.
// Each product has a `demoUrl` cutout — null for now, we drop the
// real embed in later.
// ─────────────────────────────────────────────────────────────

export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  menuDesc: string; // short line for the nav dropdown
  icon: string; // key into the Navbar icon set
  tagline: string;
  summary: string;
  accent: string;
  plan: "website" | "growth"; // which plan this system is included in
  features: { title: string; body: string }[];
  stats: { value: string; label: string }[];
  // Live demo to embed in the cutout later. null = placeholder.
  demoUrl: string | null;
  // Local demo video (in /public/demos). Takes priority over demoUrl.
  demoVideo?: string | null;
  // Scrollable PDF demo (in /public/demos). Used when there's no video.
  demoPdf?: string | null;
  demoNote: string;
};

export const productsPage = {
  eyebrow: "The systems",
  heading: ["Simple systems that", "actually work."],
  sub: "No degrees required — just a hard hat. Every system is built to be dead simple to use, so you can win more work without becoming a marketer.",
};

export const products: Product[] = [
  {
    slug: "website",
    name: "Functional Website",
    eyebrow: "The website",
    menuDesc: "A lead-generating website in days",
    icon: "layout",
    tagline: "A website that turns clicks into conversations.",
    summary:
      "Get a site that instantly turns visitors into text conversations sent straight to your phone.",
    accent: "#E86A4A",
    plan: "website",
    features: [
      {
        title: "Actually get found online",
        body: "If a customer Googles you and can't find you, that's awkward. We won't let that happen.",
      },
      {
        title: "Showcase your best reviews",
        body: "We all have one or two bad ones. That doesn't mean your customers need to see them.",
      },
      {
        title: "Mobile-first, always",
        body: "87% of people browse on their phone. We make sure your business looks sharp on every screen.",
      },
      {
        title: "Built for local search",
        body: "It should go without saying — we make sure the right local customers find you first.",
      },
    ],
    stats: [
      { value: "88%", label: "of people judge a business on its website design." },
      { value: "7 days", label: "from kick-off to a live, converting site." },
      { value: "75%", label: "never scroll past the first page of Google." },
    ],
    demoUrl: null,
    demoVideo: "/demos/website.mp4",
    demoNote: "Interactive website demo",
  },
  {
    slug: "missed-call",
    name: "Missed-Call Text-Back",
    eyebrow: "Never miss a lead",
    menuDesc: "Automatically text back missed calls",
    icon: "phone",
    tagline: "Never lose a lead to a missed call again.",
    summary:
      "Everyone misses calls, but not everyone texts back. Be the one who does and outshine your competition.",
    accent: "#E9A23B",
    plan: "growth",
    features: [
      {
        title: "Stand out from the pack",
        body: "Miss a call and we fire off a text before your competitor even picks up.",
      },
      {
        title: "No more lost leads",
        body: "On a job site and can't answer? No problem — we start the conversation for you.",
      },
      {
        title: "Show customers you care",
        body: "A quick text tells customers they matter, even when you're flat out.",
      },
      {
        title: "Available 24/7",
        body: "Missed a call after hours? We've got it — everyone feels looked after.",
      },
    ],
    stats: [
      { value: "85%", label: "of customers appreciate getting a text back after a missed call." },
      { value: "72%", label: "more customers respond to texts than to voicemails." },
      { value: "69%", label: "of businesses gain more customers with missed-call text-back." },
    ],
    demoUrl: null,
    demoNote: "Missed-call automation demo",
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    eyebrow: "Get found",
    menuDesc: "Actually get found on Google",
    icon: "search",
    tagline: "Own the local search results.",
    summary:
      "“Rank number one on Google in a week!” Just kidding — real SEO takes time. We do it properly.",
    accent: "#C15F3C",
    plan: "growth",
    features: [
      {
        title: "Qualified leads",
        body: "Sounds better than paying £50 for a lead that doesn't even pick up the phone, right?",
      },
      {
        title: "Stop paying for tyre-kickers",
        body: "Like mum always said — quality over quantity.",
      },
      {
        title: "Organic acquisition system",
        body: "Create your own qualified leads instead of renting them.",
      },
      {
        title: "Built to compound",
        body: "Rankings that grow month after month, not just this week.",
      },
    ],
    stats: [
      { value: "46%", label: "of all Google searches are looking for local information." },
      { value: "88%", label: "of local mobile searches call or visit within 24 hours." },
      { value: "78%", label: "of local searches lead to an offline purchase." },
    ],
    demoUrl: null,
    demoPdf: "/demos/roadmap-v4.pdf",
    demoNote: "Local SEO growth roadmap",
  },
  {
    slug: "reviews",
    name: "5-Star Review Funnel",
    eyebrow: "Reputation",
    menuDesc: "Get more 5-star reviews, prevent bad ones",
    icon: "star",
    tagline: "Turn happy customers into 5-star reviews.",
    summary:
      "“Sure, I'll leave a review” — but people forget. We gently remind them for a few weeks until they do.",
    accent: "#E9B949",
    plan: "website",
    features: [
      {
        title: "5-star reviews only",
        body: "You can't make everyone happy, but our funnel guides the happy ones to Google — every time.",
      },
      {
        title: "Automatic follow-ups",
        body: "People forget. We nudge them for a few weeks until that review finally lands.",
      },
      {
        title: "Ask in one click",
        body: "Request a review with a single tap. If it's any harder, we're fired.",
      },
      {
        title: "Stop worrying about bad reviews",
        body: "We take the guesswork out and steer the moment toward a 5-star result.",
      },
    ],
    stats: [
      { value: "88%", label: "trust online reviews as much as a personal recommendation." },
      { value: "10x", label: "more likely to be chosen with strong, recent reviews." },
      { value: "3.3★", label: "is the minimum rating most customers will even consider." },
    ],
    demoUrl: null,
    demoVideo: "/demos/reviews.mp4",
    demoNote: "Review funnel demo",
  },
  {
    slug: "campaigns",
    name: "One-Click Campaigns",
    eyebrow: "Repeat & referral",
    menuDesc: "Keep your customers thinking about you",
    icon: "megaphone",
    tagline: "Referrals and repeat work, on tap.",
    summary:
      "You know it and we know it — referrals and repeat customers are the best. Let's get you both.",
    accent: "#F4A261",
    plan: "growth",
    features: [
      {
        title: "Done for you",
        body: "Activate our pre-built marketing campaigns with a single click. Simple, as promised.",
      },
      {
        title: "Referral campaigns",
        body: "You do good work and your customers love you. We remind them to tell their friends.",
      },
      {
        title: "Return-customer campaigns",
        body: "Loyal customers are gold. We keep them cared for with the right offer at the right time.",
      },
      {
        title: "Marketing at your fingertips",
        body: "Press a button, we take care of the rest. No need to hire a marketing team.",
      },
    ],
    stats: [
      { value: "5x", label: "cheaper to keep a customer than to win a brand-new one." },
      { value: "65%", label: "of a typical business comes from existing customers." },
      { value: "4x", label: "more likely to buy when referred by a friend." },
    ],
    demoUrl: null,
    demoVideo: "/demos/marketing.mp4",
    demoNote: "Campaign builder demo",
  },
  {
    slug: "lead-followup",
    name: "Automated Lead Follow-Up",
    eyebrow: "Speed to lead",
    menuDesc: "Automatically follow up with leads via text",
    icon: "clock",
    tagline: "Follow up in seconds, not days.",
    summary:
      "The first to reply usually wins the job. We follow up with every lead instantly, so you never have to remember.",
    accent: "#D97757",
    plan: "growth",
    features: [
      {
        title: "Reply in seconds",
        body: "New enquiry? We fire off an instant text and email while you're still on the tools.",
      },
      {
        title: "Never drop a lead",
        body: "Automated sequences keep nudging until they book or reply. Nothing slips through.",
      },
      {
        title: "Win the speed race",
        body: "Beat competitors who take hours (or days) to get back. Speed closes jobs.",
      },
      {
        title: "Totally hands-off",
        body: "It runs quietly in the background — you just get booked calls and replies.",
      },
    ],
    stats: [
      { value: "391%", label: "more conversions when you follow up within the first minute." },
      { value: "78%", label: "of customers buy from the business that responds first." },
      { value: "50%", label: "of leads go to whoever replies first — full stop." },
    ],
    demoUrl: null,
    demoVideo: "/demos/follow-up.mp4",
    demoNote: "Lead follow-up automation demo",
  },
  {
    slug: "inbox",
    name: "All-In-One Inbox",
    eyebrow: "One place",
    menuDesc: "Every message in a single inbox",
    icon: "inbox",
    tagline: "Calls, texts, email and socials — one inbox.",
    summary:
      "Stop juggling five apps. Every conversation lands in one place, so nothing gets missed.",
    accent: "#B5654A",
    plan: "growth",
    features: [
      {
        title: "Everything in one place",
        body: "Calls, texts, email, Facebook and Instagram messages — all in a single inbox.",
      },
      {
        title: "Reply from anywhere",
        body: "Answer from your phone or laptop. Your customers just see a fast, tidy reply.",
      },
      {
        title: "Never miss a message",
        body: "No more forgotten DMs or buried emails. If someone reaches out, you'll see it.",
      },
      {
        title: "Faster response times",
        body: "One tidy inbox means quicker replies — and quicker replies mean more booked work.",
      },
    ],
    stats: [
      { value: "90%", label: "of customers expect a response within 10 minutes." },
      { value: "1 inbox", label: "for calls, texts, email and every social channel." },
      { value: "3x", label: "faster replies with everything in a single place." },
    ],
    demoUrl: null,
    demoVideo: "/demos/inbox.mp4",
    demoNote: "Unified inbox demo",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

// Whether a product has any embeddable demo (video, live site or PDF).
export function hasDemo(p: Product) {
  return Boolean(p.demoVideo || p.demoUrl || p.demoPdf);
}

export const process = {
  eyebrow: "The process",
  heading: "What working with us looks like.",
  steps: [
    {
      k: "01",
      title: "Demo call — 20 mins",
      body: "It's actually a sales call, we just didn't want to scare you. We answer your questions, show you any features, and walk through live client accounts and results.",
    },
    {
      k: "02",
      title: "We build your system — within 7 working days",
      body: "Fill out a short onboarding form with your business details. Once we've got what we need, we build your new website and marketing system.",
    },
    {
      k: "03",
      title: "Launch call — 25 mins",
      body: "We walk you through everything and show you exactly how it works. And by everything, we really just mean pressing two buttons.",
    },
  ],
};

// About dropdown (nav) + the pages behind it.
export const aboutNav = [
  {
    label: "About Us",
    href: "/about",
    desc: "Get to know HDA Systems",
    icon: "users",
  },
  {
    label: "Our Process",
    href: "/process",
    desc: "Discover how we work",
    icon: "activity",
  },
  {
    label: "Trades We Serve",
    href: "/trades",
    desc: "Who we work with",
    icon: "tools",
  },
  {
    label: "Careers",
    href: "/careers",
    desc: "Join the team",
    icon: "book",
  },
];

export const about = {
  eyebrow: "About us",
  heading: ["Straight-talking systems", "for people who build things."],
  sub: "HDA Systems builds websites and marketing systems for tradespeople and local businesses — the practical tools to win more work, without the agency fluff.",
  story: [
    "Marketing isn't rocket science. No agency has a magic button that fixes everything overnight — and anyone who tells you otherwise is selling you something.",
    "What we do is simple: we give you a proper website and the systems behind it — lead capture, reviews, missed-call text-back and follow-up — then we make them dead easy to use. You commit to using them; we handle the tech.",
  ],
  stats: [
    { value: "£99", label: "per month to get started" },
    { value: "7 days", label: "from kick-off to live" },
    { value: "2 plans", label: "simple monthly pricing" },
  ],
  values: [
    {
      title: "Simple to use",
      body: "Everything is built around being genuinely easy. If it needs a manual, we've failed.",
    },
    {
      title: "Affordable",
      body: "Priced to keep you for ten years, not ten weeks. We're in it for the long haul.",
    },
    {
      title: "No upfront fees",
      body: "Simple monthly pricing with nothing to pay up front. We earn your business every month.",
    },
    {
      title: "No fluff",
      body: "We tell you exactly what we're going to do, then we do it. No jargon, no smoke.",
    },
    {
      title: "Proof, not promises",
      body: "Real, live client sites and results — not stock mockups and vague claims.",
    },
    {
      title: "Always improving",
      body: "We keep upgrading the systems, so you keep getting more for the same flat fee.",
    },
  ],
};

export const careers = {
  eyebrow: "Careers",
  heading: ["Join the", "team."],
  sub: "We're a small, fast-moving team building tools that genuinely help local businesses grow. If that sounds like your kind of thing, get in touch.",
  perks: [
    {
      title: "Remote-first",
      body: "Work from wherever you do your best work. We care about output, not hours at a desk.",
    },
    {
      title: "Real impact",
      body: "Your work ships fast and directly helps real tradespeople win more jobs.",
    },
    {
      title: "Grow with us",
      body: "We're scaling. Get in early and grow your role as the company grows.",
    },
    {
      title: "No corporate nonsense",
      body: "Flat structure, straight talk, and the freedom to actually get things done.",
    },
  ],
  roles: [
    { title: "Web Designer / Developer", type: "Full-time", location: "Remote" },
    {
      title: "Marketing Systems Specialist",
      type: "Full-time",
      location: "Remote",
    },
    { title: "Customer Success", type: "Full-time", location: "Remote" },
  ],
  note: "Don't see your role? We're always keen to meet good people — drop us a line.",
};

export const trades = [
  "Architects",
  "Automotive services",
  "Carpenters",
  "Clinicians",
  "Dentists",
  "Fillouts",
  "Fireplace installers",
  "Fitness instructors",
  "Floor installers",
  "Gyms",
  "Interior Designers",
  "Kitchens & Bathrooms",
  "Landscapers",
  "Pool installers",
  "Renovators",
  "Restaurants",
  "Restoration",
  "Smart Home Builders",
  "Venue & Events Teams",
];
