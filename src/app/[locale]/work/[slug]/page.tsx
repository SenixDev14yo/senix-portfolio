import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projects } from "@/data/projects";
import { TerminalBlock } from "@/components/terminal-block";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.i18n[locale as Locale].description,
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const dict = await getDictionary(locale as Locale);
  const copy = project.i18n[locale as Locale];

  return (
    <div className="relative z-[2] mx-auto max-w-[1100px] px-6 sm:px-8 pt-32 pb-16">
      <Link
        href={`/${locale}/work`}
        className="inline-flex items-center gap-2 text-dim font-mono text-[13px] hover:text-fg transition-colors mb-8"
      >
        ← {dict.projects.title_a} {dict.projects.title_b}
      </Link>

      <div className="text-dim text-[11px] tracking-[2px] uppercase mb-4 font-mono">
        {project.year} · {project.status}
      </div>

      <h1 className="font-display font-black uppercase leading-[0.86] tracking-[-0.05em] text-[clamp(64px,12vw,180px)]">
        {project.name}
      </h1>

      <p className="mt-8 max-w-[640px] font-serif text-[clamp(20px,2vw,26px)] leading-snug text-fg
        [html[data-theme='dark']_&]:font-sans [html[data-theme='dark']_&]:text-[18px] [html[data-theme='dark']_&]:text-fg
      ">
        {copy.long ?? copy.description}
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="border border-line px-3 py-1 text-[12px] font-mono text-dim uppercase tracking-[1px]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10">
        <TerminalBlock title={project.domain}>
          <pre className="text-[13px] leading-[1.8] whitespace-pre-wrap">
<span className="text-dim"># live preview</span>{"\n"}<span className="text-accent-2">$</span> curl -I <span className="text-fg">{project.url}</span>{"\n"}<span className="text-fg">HTTP/2 200 OK</span>{"\n"}<span className="text-fg">server: vercel</span>{"\n"}<span className="text-fg">content-type: text/html; charset=utf-8</span>{"\n"}<span className="text-accent-2">$</span> open <span className="text-accent">{project.url}</span>
          </pre>
        </TerminalBlock>
      </div>

      <div className="mt-10">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="
            inline-flex items-center gap-3 px-7 py-4
            text-[13px] font-semibold uppercase tracking-[1.5px]
            bg-fg text-bg border-[1.5px] border-fg
            transition-colors hover:bg-accent hover:border-accent
            [html[data-theme='dark']_&]:bg-transparent [html[data-theme='dark']_&]:text-accent [html[data-theme='dark']_&]:border-accent
            [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:normal-case [html[data-theme='dark']_&]:tracking-normal
            [html[data-theme='dark']_&]:hover:bg-accent [html[data-theme='dark']_&]:hover:text-black
          "
        >
          {dict.projects.visit} <span>↗</span>
        </a>
      </div>
    </div>
  );
}
