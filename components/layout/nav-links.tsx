"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/data/site-content";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function NavLinks({ mobile = false, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {navigation.map((item) => {
        const isActive = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
              mobile
                ? cn(
                    "block rounded-[1.3rem] border px-5 py-4 text-lg font-medium",
                    isActive
                      ? "border-emerald-200/20 bg-emerald-200/12 text-white"
                      : "border-[var(--color-border)] bg-white/6 text-white hover:bg-white/10",
                  )
                : cn(
                    "rounded-full px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-white/7 text-white"
                      : "text-[var(--color-text-secondary)] hover:text-white",
                  ),
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
