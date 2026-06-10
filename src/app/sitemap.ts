import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { locales } from "@/i18n/config";
import { projects } from "@/data/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const staticPaths = ["", "/about", "/work", "/journal", "/contact"];
  const now = new Date();

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((p) => ({
      url: `${base}/${locale}${p}`,
      lastModified: now,
    })),
  );

  const projectEntries = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${base}/${locale}/work/${p.slug}`,
      lastModified: now,
    })),
  );

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("posts")
      .select("slug, lang, updated_at")
      .eq("published", true);
    postEntries = (data ?? []).map((post) => ({
      url: `${base}/${post.lang}/journal/${post.slug}`,
      lastModified: new Date(post.updated_at as string),
    }));
  } catch {
    postEntries = [];
  }

  return [...staticEntries, ...projectEntries, ...postEntries];
}
