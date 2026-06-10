import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type ContactDict = Dictionary["contact"];

export function ContactCta({ dict, locale }: { dict: ContactDict; locale: Locale }) {
  return (
    <section className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 mt-24">
      <div className="border border-line bg-paper p-8 sm:p-12 lg:p-16 shadow-[var(--shadow)] rounded-lg">
        <h2 className="font-display font-black uppercase leading-[0.95] tracking-[-0.04em] text-[clamp(40px,6vw,80px)]">
          {dict.title_a}
        </h2>
        <p className="
          mt-4 font-serif text-[clamp(18px,1.8vw,22px)] text-fg max-w-[560px]
          [html[data-theme='dark']_&]:font-sans [html[data-theme='dark']_&]:text-[16px] [html[data-theme='dark']_&]:text-dim
        ">
          {dict.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-3.5">
          <Link
            href={`/${locale}/contact`}
            className="
              inline-flex items-center gap-3 px-6 py-4
              text-[13px] font-semibold uppercase tracking-[1.5px]
              bg-accent text-paper border-[1.5px] border-accent
              transition-colors hover:bg-fg hover:border-fg hover:text-bg
              [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:normal-case [html[data-theme='dark']_&]:tracking-normal [html[data-theme='dark']_&]:text-bg
            "
          >
            <span>{dict.submit}</span> <span>→</span>
          </Link>
          <a
            href="https://t.me/darkedsnkxz"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-3 px-6 py-4
              text-[13px] font-semibold uppercase tracking-[1.5px]
              bg-transparent text-fg border-[1.5px] border-line
              hover:bg-fg hover:text-bg transition-colors
              [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:normal-case [html[data-theme='dark']_&]:tracking-normal
            "
          >
            <span>{dict.tg}</span> <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
