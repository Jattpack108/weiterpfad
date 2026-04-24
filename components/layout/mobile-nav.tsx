"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";

import { NavLinks } from "@/components/layout/nav-links";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cardLinkLabel, siteMeta } from "@/data/site-content";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? cardLinkLabel.closeMenu : cardLinkLabel.openMenu}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/6 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={reducedMotion ? undefined : { opacity: 0 }}
            animate={reducedMotion ? undefined : { opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#07100f]/92 backdrop-blur-md md:hidden"
          >
            <Container className="flex min-h-screen flex-col py-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold tracking-[0.14em] text-white uppercase">
                    Weiterpfad
                  </div>
                  <p className="mt-1 max-w-[16rem] text-sm leading-6 text-[var(--color-text-muted)]">
                    Ruhige Orientierung für die Zeit nach der Schule.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/6 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-1 flex-col gap-3" aria-label="Mobile Navigation">
                <NavLinks mobile onNavigate={() => setOpen(false)} />
              </nav>

              <div className="space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={buttonStyles({ variant: "primary", fullWidth: true })}
                >
                  FrÃ¼hen Kontakt anfragen
                </Link>
                <a
                  href={`mailto:${siteMeta.contactEmail}?subject=Weiterpfad%20Kontakt`}
                  className={buttonStyles({ variant: "ghost", fullWidth: true })}
                >
                  <Mail className="h-4 w-4" />
                  {siteMeta.contactEmail}
                </a>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
