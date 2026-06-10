import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { GlitchText } from "@/components/glitch-text";
import { TerminalBlock } from "@/components/terminal-block";
import { StackTags } from "@/components/stack-tags";
import { stack } from "@/data/projects";

type HeroDict = Dictionary["hero"];
type MetaDict = Dictionary["meta"];
type SideDict = Dictionary["side"];

export function Hero({
  dict,
  meta,
  side,
  locale,
}: {
  dict: HeroDict;
  meta: MetaDict;
  side: SideDict;
  locale: Locale;
}) {
  return (
    <div className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 pt-32 pb-10">
      {/* meta strip */}
      <div className="
        flex flex-wrap justify-between gap-3 mb-9 pb-3.5
        border-b border-dashed border-line text-[11px] uppercase tracking-[2px] text-dim
        font-sans
        [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:normal-case [html[data-theme='dark']_&]:tracking-normal [html[data-theme='dark']_&]:text-[12px]
        [html[data-theme='dark']_&]:before:content-['//_'] [html[data-theme='dark']_&]:before:text-dim
      ">
        <span>{meta.volume}</span>
        <span>{meta.from}</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] pulse-dot" />
          <b className="text-fg">{meta.available}</b> · {meta.quarter}
        </span>
      </div>

      {/* hero grid */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
        <div>
          <h1 className="font-display font-black uppercase leading-[0.86] tracking-[-0.05em] text-[clamp(64px,12vw,168px)]">
            <span className="anim-rise">
              <GlitchText>{dict.name}</GlitchText>
            </span>
            <br />
            <span className="anim-rise d1 font-serif italic font-normal normal-case tracking-tight text-accent
              [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:not-italic
            ">
              {dict.makes}
            </span>{" "}
            <span className="anim-rise d2 [-webkit-text-stroke:2px_var(--fg)] text-transparent">
              {dict.soft}
            </span>
            <br />
            <span className="anim-rise d3">{dict.ware}</span>
            <span className="anim-rise d3 text-accent">.</span>
          </h1>

          <p className="
            mt-8 max-w-[560px] text-[clamp(20px,2.2vw,28px)] leading-snug font-serif text-fg
            [html[data-theme='dark']_&]:font-sans [html[data-theme='dark']_&]:text-[clamp(15px,1.4vw,17px)] [html[data-theme='dark']_&]:text-dim [html[data-theme='dark']_&]:leading-[1.7]
            anim-rise d3
          ">
            {dict.lede_a}{" "}
            <em className="italic text-accent
              [html[data-theme='dark']_&]:not-italic [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:text-[0.92em]
            ">
              {dict.lede_age}
            </em>
            {dict.lede_b}{" "}
            <s className="no-underline bg-ink text-paper px-1.5
              [html[data-theme='dark']_&]:bg-transparent [html[data-theme='dark']_&]:text-accent-2 [html[data-theme='dark']_&]:line-through
            ">
              {dict.lede_strike}
            </s>{" "}
            <span className="[html[data-theme='dark']_&]:text-fg">
              {dict.lede_c}
            </span>
          </p>
        </div>

        <TerminalBlock title={`~/${locale === "ru" ? "senix" : "senix"} — zsh — 80×24`} className="anim-rise d2">
          <pre className="whitespace-pre-wrap text-[13.5px] leading-[1.75]">
{/* prettier-ignore */}<span className="text-dim"># booting portfolio...</span>
{`
`}<span className="text-accent-2">$</span> whoami
{`
`}<span className="text-fg">senix</span>  <span className="text-dim">// 16 y/o</span>
{`
`}<span className="text-accent-2">$</span> uname -r
{`
`}<span className="text-fg">student.fullstack.flutter</span>
{`
`}<span className="text-accent-2">$</span> ls projects/
{`
`}<span className="text-accent">dar25/</span>          <span className="text-dim"># live</span>
{`
`}<span className="text-accent">wishpool/</span>       <span className="text-dim"># live</span>
{`
`}<span className="text-accent">…coming/</span>        <span className="text-dim"># wip</span>
{`
`}<span className="text-accent-2">$</span> cat about.txt
{`
`}<span className="text-fg">«пишу код. ломаю.</span>
{`
`}<span className="text-fg">чиню. повторяю.»</span>
{`
`}<span className="text-accent-2">$</span> ./contact --me
{`
`}<span className="text-fg">tg     : </span><span className="text-accent">@darkedsnkxz</span>
{`
`}<span className="text-fg">github : </span><span className="text-accent">SenixDev14yo</span>
{`
`}<span className="text-accent-2">$</span> <span className="caret" />
          </pre>
        </TerminalBlock>
      </section>

      {/* secondary: stack + side info */}
      <section className="mt-14 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
        <div>
          <div className="
            mb-3.5 font-mono text-[11px] uppercase tracking-[2px] text-dim
            [html[data-theme='dark']_&]:before:content-['$_']
          ">
            {dict.stack_label}
          </div>
          <StackTags items={stack} />

          <div className="mt-9 flex flex-wrap gap-3.5">
            <Link
              href={`/${locale}/work`}
              className="
                inline-flex items-center gap-3 px-6 py-4
                text-[13px] font-semibold uppercase tracking-[1.5px]
                bg-fg text-bg border-[1.5px] border-fg
                relative overflow-hidden group
                transition-colors
                [html[data-theme='dark']_&]:bg-transparent [html[data-theme='dark']_&]:text-accent [html[data-theme='dark']_&]:border-accent
                [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:normal-case [html[data-theme='dark']_&]:tracking-normal
                hover:text-white
                [html[data-theme='dark']_&]:hover:text-black
              "
            >
              <span className="
                absolute inset-0 -translate-x-full bg-accent
                transition-transform duration-300 ease-[cubic-bezier(.7,0,.2,1)]
                group-hover:translate-x-0
              " />
              <span className="relative z-10">{dict.cta_view}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">→</span>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="
                inline-flex items-center gap-3 px-6 py-4
                text-[13px] font-semibold uppercase tracking-[1.5px]
                bg-transparent text-fg border-[1.5px] border-line
                relative overflow-hidden group
                transition-colors
                [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:normal-case [html[data-theme='dark']_&]:tracking-normal
                hover:text-white
                [html[data-theme='dark']_&]:hover:text-bg
              "
            >
              <span className="
                absolute inset-0 -translate-x-full bg-fg
                transition-transform duration-300 ease-[cubic-bezier(.7,0,.2,1)]
                group-hover:translate-x-0
              " />
              <span className="relative z-10">{dict.cta_contact}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </Link>
          </div>
        </div>

        <div className="border-y border-line py-3.5">
          {[
            [side.role, side.role_value],
            [side.stack, side.stack_value],
            [side.status, <b key="s" className="bg-accent text-bg px-2 py-px font-mono text-[11px]">{side.status_value}</b>],
            [side.based, side.based_value],
            [side.since, "2026 →"],
          ].map(([k, v], i) => (
            <div
              key={i}
              className="
                flex justify-between py-3 text-[13px]
                border-t border-dashed border-line first:border-t-0
              "
            >
              <span className="text-dim text-[11px] uppercase tracking-[1.5px] font-mono">{k}</span>
              <span className="text-fg font-medium">{v}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
