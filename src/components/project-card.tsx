import Link from "next/link";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function ProjectCard({
  project,
  locale,
  visitLabel,
}: {
  project: Project;
  locale: Locale;
  visitLabel: Dictionary["projects"]["visit"];
}) {
  const copy = project.i18n[locale];
  return (
    <article className="
      group overflow-hidden rounded-lg border border-line bg-paper
      shadow-[var(--shadow)] font-mono
      transition-transform duration-500 ease-[cubic-bezier(.2,.7,.3,1)]
      hover:-translate-y-1.5
      cursor-bigger
    ">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-line bg-bg-2">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-warn" />
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ffc857]" />
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="ml-auto text-[11px] text-dim">{project.domain}</span>
      </div>

      <div className="px-6 py-6">
        <div className="text-dim text-[11px] tracking-[2px] uppercase mb-4">
          {project.year} · {project.status}
        </div>

        <div className="
          font-display font-black uppercase leading-[0.95] tracking-tight text-[36px] mb-1.5 text-fg
        ">
          {project.name}
        </div>

        <p className="mt-4 max-w-[42ch] text-[13px] leading-[1.7] text-fg
          [html[data-theme='dark']_&]:text-[#b8c2bd]
        ">
          <span className="text-dim">// </span>{copy.description}
        </p>

        <div className="mt-5 mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-line px-2 py-0.5 text-[10.5px] text-dim uppercase tracking-[1px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}/work/${project.slug}`}
            className="
              inline-flex items-center gap-2 text-[13px] font-semibold
              text-accent border-b border-accent pb-0.5
              transition-all
              hover:gap-3
            "
          >
            {visitLabel} →
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-dim hover:text-fg transition-colors"
          >
            ↗ {project.domain}
          </a>
        </div>
      </div>
    </article>
  );
}
