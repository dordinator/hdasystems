import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fraunces } from "next/font/google";
import { BRAND, BRAND_TAGLINE } from "@/lib/site";
import PaperBackground from "@/components/PaperBackground";
import Preloader from "@/components/Preloader";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND} — ${BRAND_TAGLINE}`,
  description:
    "We design, build and run high-performing websites and the lead engine behind them, for local businesses. Simple plans from £99/month.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <body className="grain relative min-h-screen font-sans antialiased">
        <Preloader />
        <PaperBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
