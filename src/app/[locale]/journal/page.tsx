import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";
import { formatDate, readingMinutes } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: `${dict.blog.title_a} ${dict.blog.title_b}` };
}

export default async function JournalPage({ params }: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, content, tags, published_at, lang")
    .eq("lang", locale)
    .eq("published", true)
    .order("published_at", { ascending: false });

  const posts = (data ?? []) as Pick<Post, "id" | "slug" | "title" | "excerpt" | "content" | "tags" | "published_at" | "lang">[];

  return (
    <div className="relative z-[2] mx-auto max-w-[1100px] px-6 sm:px-8 pt-32 pb-16">
      <p className="
        font-mono text-[11px] uppercase tracking-[2px] text-dim mb-3
        [html[data-theme='dark']_&]:before:content-['//_'] [html[data-theme='dark']_&]:tracking-normal
      ">
        {dict.blog.subtitle}
      </p>
      <h1 className="font-display font-black uppercase leading-[0.86] tracking-[-0.05em] text-[clamp(64px,11vw,160px)]">
        {dict.blog.title_a}{" "}
        <span className="font-serif italic font-normal normal-case tracking-tight text-accent
          [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:not-italic
          [html[data-theme='dark']_&]:before:content-['/*_'] [html[data-theme='dark']_&]:after:content-['_*/']
        ">
          {dict.blog.title_b}
        </span>
      </h1>

      <div className="mt-14 border-y border-line divide-y divide-line">
        {posts.length === 0 ? (
          <div className="py-10 font-mono text-dim text-[14px]
            [html[data-theme='dark']_&]:before:content-['$_']
          ">
            {dict.blog.empty}
          </div>
        ) : (
          posts.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/journal/${p.slug}`}
              className="block py-7 group cursor-bigger"
            >
              <div className="flex items-baseline gap-3 text-[11px] font-mono text-dim tracking-[1.5px]">
                <span>{p.published_at ? formatDate(p.published_at, locale) : ""}</span>
                <span>·</span>
                <span>{readingMinutes(p.content)} {dict.blog.minutes}</span>
                {p.tags?.length ? (
                  <>
                    <span>·</span>
                    <span className="text-accent">{p.tags.join(" / ")}</span>
                  </>
                ) : null}
              </div>
              <h2 className="mt-2 font-display font-bold text-[clamp(26px,3.5vw,40px)] leading-tight text-fg group-hover:text-accent transition-colors">
                {p.title}
              </h2>
              {p.excerpt && (
                <p className="mt-2 max-w-[680px] text-[15px] text-dim leading-relaxed">{p.excerpt}</p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
