import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatDate, readingMinutes } from "@/lib/utils";

type BlogDict = Dictionary["blog"];

export async function BlogPreview({
  dict,
  locale,
  limit = 3,
}: {
  dict: BlogDict;
  locale: Locale;
  limit?: number;
}) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, content, published_at, lang, tags")
    .eq("lang", locale)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  const posts = (data ?? []) as Pick<Post, "id" | "slug" | "title" | "excerpt" | "content" | "published_at" | "lang" | "tags">[];

  return (
    <section className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 mt-24">
      <div className="flex items-end justify-between gap-6 mb-9">
        <div>
          <h2 className="font-display font-black uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(40px,6vw,80px)]">
            {dict.title_a}{" "}
            <span className="font-serif italic font-normal normal-case tracking-tight text-accent
              [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:not-italic
              [html[data-theme='dark']_&]:before:content-['/*_'] [html[data-theme='dark']_&]:after:content-['_*/']
            ">
              {dict.title_b}
            </span>
          </h2>
          <p className="mt-2 text-[13px] font-mono text-dim
            [html[data-theme='dark']_&]:before:content-['//_']
          ">
            {dict.subtitle}
          </p>
        </div>
        <Link
          href={`/${locale}/journal`}
          className="hidden sm:inline-flex items-center gap-2 text-accent font-mono text-[13px] border-b border-accent pb-0.5 hover:gap-3 transition-all"
        >
          {dict.all} →
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="border border-dashed border-line p-8 font-mono text-dim text-[13px]
          [html[data-theme='dark']_&]:before:content-['$_']
        ">
          {dict.empty}
        </div>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.id}>
              <Link
                href={`/${locale}/journal/${p.slug}`}
                className="block py-6 group cursor-bigger"
              >
                <div className="flex items-baseline gap-4 text-[11px] font-mono text-dim tracking-[1.5px]">
                  <span>{p.published_at ? formatDate(p.published_at, locale) : ""}</span>
                  <span>·</span>
                  <span>{readingMinutes(p.content)} {dict.minutes}</span>
                </div>
                <h3 className="mt-1.5 font-display font-bold text-[clamp(22px,3vw,32px)] leading-tight text-fg group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="mt-2 max-w-[640px] text-[14px] text-dim leading-relaxed">{p.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
