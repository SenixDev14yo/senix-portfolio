"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { type Locale } from "@/i18n/config";
import { ThemeToggle } from "./theme-toggle";
import { LangSwitcher } from "./lang-switcher";
import { cn } from "@/lib/utils";

type NavDict = Dictionary["nav"];

export function Nav({ dict, locale }: { dict: NavDict; locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const items: Array<{ href: string; label: string }> = [
    { href: `/${locale}/work`, label: dict.work },
    { href: `/${locale}/about`, label: dict.about },
    { href: `/${locale}/journal`, label: dict.journal },
    { href: `/${locale}/contact`, label: dict.contact },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-[60]",
        "grid grid-cols-[1fr_auto_1fr] items-center",
        "px-6 sm:px-8 py-4 text-[13px] font-medium",
        "bg-bg/85 backdrop-blur border-b border-line",
      )}
    >
      <Link href={`/${locale}`} className="flex items-center gap-2.5">
        <span className="inline-block h-2 w-2 rounded-full bg-accent pulse-dot shadow-[0_0_12px_var(--accent)]" />
        <span className="
          font-display font-black tracking-tight text-[18px]
          [html[data-theme='dark']_&]:font-mono
          [html[data-theme='dark']_&]:before:content-['~/'] [html[data-theme='dark']_&]:before:text-accent [html[data-theme='dark']_&]:before:font-normal [html[data-theme='dark']_&]:before:mr-px
        ">
          senix
        </span>
      </Link>

      <ul className="hidden md:flex justify-center gap-7 list-none">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative inline-block py-1 transition-colors",
                  active ? "text-fg" : "text-dim hover:text-fg",
                  "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px]",
                  "after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
                  "hover:after:scale-x-100",
                  active && "after:scale-x-100",
                  "[html[data-theme='dark']_&]:font-mono",
                  "[html[data-theme='dark']_&]:before:content-['./'] [html[data-theme='dark']_&]:before:text-accent [html[data-theme='dark']_&]:before:opacity-0",
                  "[html[data-theme='dark']_&]:hover:before:opacity-100 [html[data-theme='dark']_&]:before:transition-opacity [html[data-theme='dark']_&]:before:mr-px",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-end items-center gap-4">
        <LangSwitcher current={locale} />
        <ThemeToggle />
        <button
          type="button"
          className="md:hidden text-fg p-1.5 border border-line"
          aria-label={dict.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-4 h-px bg-current mb-1" />
          <span className="block w-4 h-px bg-current mb-1" />
          <span className="block w-4 h-px bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden col-span-3 mt-4 border-t border-line pt-4 flex flex-col gap-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-fg text-sm font-mono"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
