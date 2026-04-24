import Link from "next/link";

import { Trees } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteMeta } from "@/data/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0b1110]/80 backdrop-blur-xl">
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/7">
            <Trees className="h-5 w-5 text-[var(--color-accent)]" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold tracking-[0.14em] text-white uppercase">
              {siteMeta.name}
            </span>
            <span className="block truncate text-xs text-[var(--color-text-subtle)] max-sm:hidden">
              Ruhige Orientierung nach der Schule
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Hauptnavigation">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <Link href="/contact" className={buttonStyles({ variant: "secondary" })}>
              Gespräch anfragen
            </Link>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
