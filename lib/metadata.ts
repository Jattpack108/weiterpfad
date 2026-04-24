import type { Metadata } from "next";

import { siteMeta } from "@/data/site-content";

export function buildMetadata(title: string, description: string): Metadata {
  const fullTitle = title === siteMeta.name ? siteMeta.name : `${title} | ${siteMeta.name}`;

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
