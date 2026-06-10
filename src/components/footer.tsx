import type { Dictionary } from "@/i18n/dictionaries";

type FooterDict = Dictionary["footer"];

export function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer
      className="
        mx-6 sm:mx-8 mt-24 mb-6 max-w-[1320px] xl:mx-auto
        flex flex-col sm:flex-row justify-between gap-3
        border-t border-line pt-5
        text-[11px] uppercase tracking-[2px] text-dim
        font-sans
        [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:tracking-normal [html[data-theme='dark']_&]:normal-case
      "
    >
      <span>{dict.rights} <b className="text-fg">2026</b></span>
      <span><b className="text-accent">{dict.online}</b></span>
      <span>{dict.version} · {dict.made} {dict.stack}</span>
    </footer>
  );
}
