"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LangSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === current || pending) return;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const segments = pathname.split("/");
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    startTransition(() => router.push(segments.join("/") || `/${next}`));
  };

  return (
    <div className="flex items-center gap-1 font-mono text-[12px] text-dim">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => switchTo(l)}
            className={cn(
              "transition-colors",
              l === current ? "text-fg font-bold" : "hover:text-fg",
            )}
          >
            {localeNames[l]}
          </button>
          {i < locales.length - 1 && <span className="opacity-50">·</span>}
        </span>
      ))}
    </div>
  );
}
