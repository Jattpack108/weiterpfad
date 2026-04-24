import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { pageDescriptions, siteMeta } from "@/data/site-content";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteMeta.name} | ${siteMeta.tagline}`,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description,
  applicationName: siteMeta.name,
  openGraph: {
    title: siteMeta.name,
    description: pageDescriptions.home,
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.name,
    description: pageDescriptions.home,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${manrope.variable} ${newsreader.variable}`}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
