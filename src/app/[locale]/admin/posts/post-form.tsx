"use client";

import { useState, useTransition } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { locales, localeFullNames, type Locale } from "@/i18n/config";
import { upsertPost } from "../actions";
import { slugify } from "@/lib/utils";

type AdminDict = Dictionary["admin"];

type Initial = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  cover_url?: string;
  tags?: string;
  lang?: Locale;
  published?: boolean;
};

export function PostForm({
  dict,
  defaultLang,
  initial,
}: {
  dict: AdminDict;
  defaultLang: Locale;
  initial?: Initial;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [pending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  const field =
    "w-full bg-transparent border border-line px-4 py-3 text-fg text-[14px] font-mono focus:outline-none focus:border-accent transition-colors placeholder:text-dim";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await upsertPost(fd);
      if (res && "error" in res) setErr(res.error);
    });
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
      <div className="space-y-4">
        {initial?.id && <input type="hidden" name="id" value={initial.id} />}

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
            {dict.fields.title}
          </label>
          <input
            name="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!initial?.id && !slug) setSlug(slugify(e.target.value));
            }}
            className={field}
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
            {dict.fields.slug}
          </label>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={field}
            placeholder="my-post"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
            {dict.fields.excerpt}
          </label>
          <textarea
            name="excerpt"
            defaultValue={initial?.excerpt ?? ""}
            rows={2}
            className={`${field} resize-y min-h-[60px]`}
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
            {dict.fields.content}
          </label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className={`${field} resize-y min-h-[400px] text-[13px] leading-[1.7]`}
            placeholder="# Hello&#10;&#10;Markdown supported."
          />
        </div>
      </div>

      <aside className="space-y-4">
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
            {dict.fields.lang}
          </label>
          <select
            name="lang"
            defaultValue={initial?.lang ?? defaultLang}
            className={field}
          >
            {locales.map((l) => (
              <option key={l} value={l}>{localeFullNames[l]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
            {dict.fields.cover}
          </label>
          <input
            name="cover_url"
            defaultValue={initial?.cover_url ?? ""}
            placeholder="https://..."
            className={field}
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
            {dict.fields.tags}
          </label>
          <input
            name="tags"
            defaultValue={initial?.tags ?? ""}
            placeholder="next, react"
            className={field}
          />
        </div>

        <label className="flex items-center gap-2 text-[13px] font-mono text-fg cursor-bigger">
          <input type="checkbox" name="published" defaultChecked={initial?.published ?? false} />
          {dict.publish}
        </label>

        {err && <p className="text-warn text-[13px] font-mono">{err}</p>}

        <button
          type="submit"
          disabled={pending}
          className="
            w-full px-6 py-3.5 text-[13px] font-mono font-semibold
            bg-fg text-bg border-[1.5px] border-fg
            transition-colors disabled:opacity-50
            hover:bg-accent hover:border-accent hover:text-paper
            [html[data-theme='dark']_&]:bg-transparent [html[data-theme='dark']_&]:text-accent [html[data-theme='dark']_&]:border-accent
            [html[data-theme='dark']_&]:hover:text-black
          "
        >
          {pending ? dict.saving : dict.save}
        </button>
      </aside>
    </form>
  );
}
