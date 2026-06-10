import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type AboutDict = Dictionary["about"];

export function AboutPreview({
  dict,
  locale,
}: {
  dict: AboutDict;
  locale: Locale;
}) {
  return (
    <section className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
        <div>
          <p className="
            font-mono text-[11px] uppercase tracking-[2px] text-dim mb-3
            [html[data-theme='dark']_&]:before:content-['//_'] [html[data-theme='dark']_&]:tracking-normal
          ">
            {dict.subtitle}
          </p>
          <h2 className="font-display font-black uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(48px,7vw,88px)]">
            {dict.title}
          </h2>
        </div>
        <div className="space-y-4 text-[16px] leading-[1.7] text-fg font-serif
          [html[data-theme='dark']_&]:font-sans [html[data-theme='dark']_&]:text-[15px] [html[data-theme='dark']_&]:text-dim
        ">
          <p>{dict.p1}</p>
          <p>{dict.p2}</p>
          <p>{dict.p3}</p>
          <Link
            href={`/${locale}/about`}
            className="inline-flex mt-2 items-center gap-2 text-accent font-mono text-[13px] border-b border-accent pb-0.5 hover:gap-3 transition-all"
          >
            more →
          </Link>
        </div>
      </div>
    </section>
  );
}
