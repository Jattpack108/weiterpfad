import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-white">
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-50 -translate-y-20 rounded-full border border-emerald-200/20 bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-white transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-strong)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
      >
        Zum Inhalt springen
      </a>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="site-grid absolute inset-0 opacity-35" />
        <div className="absolute left-[-6rem] top-0 h-[42rem] w-[42rem] rounded-full bg-emerald-400/8 blur-3xl" />
        <div className="absolute right-[-6rem] top-16 h-[30rem] w-[30rem] rounded-full bg-[#d6fae4]/7 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-emerald-200/5 blur-3xl" />
      </div>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
