import Link from "next/link";

import { Container } from "@/components/ui/container";
import { footerLinks, navigation, siteMeta } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8">
      <Container className="py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <div className="text-sm font-semibold tracking-[0.14em] text-white uppercase">
              {siteMeta.name}
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
              Weiterpfad ist als ruhiger erster Einstieg in die Zeit nach der Schule gedacht: mit
              klarerem Zugang zu Arbeit, Wohnen, Tagesstruktur und Beratung.
            </p>
            <a
              href={`mailto:${siteMeta.contactEmail}`}
              className="mt-4 inline-flex text-sm text-[var(--color-text-secondary)] transition hover:text-white"
            >
              {siteMeta.contactEmail}
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-white">Navigation</div>
              <div className="mt-3 flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-[var(--color-text-muted)] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Rechtliches</div>
              <div className="mt-3 flex flex-col gap-2">
                {footerLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-[var(--color-text-muted)] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
