import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { stack } from "@/data/projects";
import { StackTags } from "@/components/stack-tags";
import { TerminalBlock } from "@/components/terminal-block";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.about.title };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const { about, side } = dict;

  return (
    <div className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 pt-32 pb-16">
      <p className="
        font-mono text-[11px] uppercase tracking-[2px] text-dim mb-3
        [html[data-theme='dark']_&]:before:content-['//_'] [html[data-theme='dark']_&]:tracking-normal
      ">
        {about.subtitle}
      </p>
      <h1 className="font-display font-black uppercase leading-[0.86] tracking-[-0.05em] text-[clamp(64px,11vw,160px)]">
        {about.title}
      </h1>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
        <div className="space-y-5 text-[18px] leading-[1.65] text-fg font-serif max-w-[640px]
          [html[data-theme='dark']_&]:font-sans [html[data-theme='dark']_&]:text-[16px] [html[data-theme='dark']_&]:text-fg
        ">
          <p>{about.p1}</p>
          <p>{about.p2}</p>
          <p>{about.p3}</p>
        </div>

        <TerminalBlock title="~/about.json">
          <pre className="text-[13px] leading-[1.8] whitespace-pre-wrap">
<span className="text-dim">// metadata</span>{"\n"}<span className="text-accent-2">{"{"}</span>{"\n"}{"  "}<span className="text-accent">&quot;name&quot;</span>: <span className="text-fg">&quot;Senix&quot;</span>,{"\n"}{"  "}<span className="text-accent">&quot;role&quot;</span>: <span className="text-fg">&quot;{side.role_value}&quot;</span>,{"\n"}{"  "}<span className="text-accent">&quot;based&quot;</span>: <span className="text-fg">&quot;{side.based_value}&quot;</span>,{"\n"}{"  "}<span className="text-accent">&quot;status&quot;</span>: <span className="text-fg">&quot;{side.status_value}&quot;</span>{"\n"}<span className="text-accent-2">{"}"}</span>
          </pre>
        </TerminalBlock>
      </div>

      <div className="mt-16">
        <p className="
          font-mono text-[11px] uppercase tracking-[2px] text-dim mb-4
          [html[data-theme='dark']_&]:before:content-['$_stack']
        ">stack</p>
        <StackTags items={stack} />
      </div>
    </div>
  );
}
