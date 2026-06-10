import Link from "next/link";
import { headers } from "next/headers";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function NotFound() {
  const h = await headers();
  const path = h.get("x-invoke-path") ?? h.get("referer") ?? "";
  const seg = path.split("/")[1] ?? "";
  const locale = isLocale(seg) ? seg : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <div className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 pt-40 pb-28 min-h-[70vh] flex flex-col items-start justify-center">
      <h1 className="font-display font-black tracking-[-0.05em] leading-none text-[clamp(96px,18vw,220px)] text-accent">
        {dict.errors.not_found_title}
      </h1>
      <p className="mt-4 text-[clamp(18px,2vw,24px)] text-fg font-serif
        [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:before:content-['//_']
      ">
        {dict.errors.not_found_desc}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center gap-2 text-accent font-mono text-[13px] border-b border-accent pb-0.5 hover:gap-3 transition-all"
      >
        {dict.errors.back_home}
      </Link>
    </div>
  );
}
