import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fraunces } from "next/font/google";
import { BRAND, BRAND_TAGLINE } from "@/lib/site";
import Aurora from "@/components/Aurora";
import PageReadyGate from "@/components/PageReadyGate";
import Preloader from "@/components/Preloader";
import ScrollRestoration from "@/components/ScrollRestoration";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND} — ${BRAND_TAGLINE}`,
  description:
    "We design, build and run high-performing websites and the lead engine behind them, for local businesses. One flat fee of £299/month.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if('scrollRestoration'in history)history.scrollRestoration='manual';var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'){if(location.hash)history.replaceState(null,'',location.pathname+location.search);scrollTo(0,0);}else if(!location.hash){scrollTo(0,0);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="grain relative min-h-screen font-sans antialiased">
        <ScrollRestoration />
        <Preloader />
        <Aurora />
        <PageReadyGate>{children}</PageReadyGate>
      </body>
    </html>
  );
}
