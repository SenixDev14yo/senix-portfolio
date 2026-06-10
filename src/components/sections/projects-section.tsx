import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type ProjectsDict = Dictionary["projects"];

export function ProjectsSection({
  dict,
  locale,
  limit,
  showAll,
}: {
  dict: ProjectsDict;
  locale: Locale;
  limit?: number;
  showAll?: boolean;
}) {
  const list = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 mt-20">
      <h2 className="font-display font-black uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(48px,7vw,96px)] mb-2">
        {dict.title_a}{" "}
        <span className="font-serif italic font-normal normal-case tracking-tight text-accent
          [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:not-italic
          [html[data-theme='dark']_&]:before:content-['/*_'] [html[data-theme='dark']_&]:after:content-['_*/']
        ">
          {dict.title_b}
        </span>
      </h2>
      <p className="
        mb-9 text-[13px] font-mono text-dim
        [html[data-theme='dark']_&]:before:content-['//_']
      ">
        {dict.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            visitLabel={dict.visit}
          />
        ))}
      </div>

      {showAll && (
        <div className="mt-10 text-right">
          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center gap-2 text-accent font-mono text-[13px] border-b border-accent pb-0.5 hover:gap-3 transition-all"
          >
            {dict.see_all} →
          </Link>
        </div>
      )}
    </section>
  );
}
