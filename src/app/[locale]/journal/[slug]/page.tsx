import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";
import { formatDate, readingMinutes } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("lang", locale)
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (!data) return {};
  return { title: data.title, description: data.excerpt ?? undefined };
}

export default async function JournalPost({ params }: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("lang", locale)
    .eq("slug", slug)
    .eq("published", true)
    .single();

  const post = data as Post | null;
  if (!post) notFound();

  return (
    <article className="relative z-[2] mx-auto max-w-[760px] px-6 sm:px-8 pt-32 pb-20">
      <Link
        href={`/${locale}/journal`}
        className="inline-flex items-center gap-2 text-dim font-mono text-[13px] hover:text-fg transition-colors mb-8"
      >
        {dict.blog.back}
      </Link>

      <div className="flex items-baseline gap-3 text-[11px] font-mono text-dim tracking-[1.5px] mb-4">
        <span>{post.published_at ? formatDate(post.published_at, locale) : ""}</span>
        <span>·</span>
        <span>{readingMinutes(post.content)} {dict.blog.minutes}</span>
      </div>

      <h1 className="font-display font-black tracking-[-0.03em] leading-[1.05] text-[clamp(36px,5vw,64px)]">
        {post.title}
      </h1>

      {post.excerpt && (
        <p className="mt-5 font-serif text-[clamp(18px,2vw,22px)] leading-snug text-dim
          [html[data-theme='dark']_&]:font-sans
        ">
          {post.excerpt}
        </p>
      )}

      <div className="prose prose-neutral max-w-none mt-10
        prose-headings:font-display prose-headings:tracking-tight
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-strong:text-fg
        prose-code:font-mono prose-code:text-accent
        prose-pre:bg-bg-2 prose-pre:border prose-pre:border-line
        text-fg
        [&_p]:text-[16px] [&_p]:leading-[1.75]
        [&_h2]:text-[28px] [&_h2]:mt-12 [&_h2]:mb-4
        [&_h3]:text-[20px] [&_h3]:mt-8 [&_h3]:mb-3
        [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
        [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-dim
        [&_hr]:border-line
      ">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
