"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

async function getLocaleFromReferer(): Promise<string> {
  return defaultLocale;
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const locale = String(formData.get("locale") ?? defaultLocale);
  const mode = String(formData.get("mode") ?? "signin");

  const supabase = await createClient();

  if (mode === "signup") {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
  }
  redirect(`/${locale}/admin`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${defaultLocale}/admin/login`);
}

const postSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().default(""),
  cover_url: z.string().url().optional().nullable().or(z.literal("")),
  tags: z.string().optional().nullable(),
  lang: z.enum(["ru", "en", "uz"]),
  published: z.boolean().optional().default(false),
});

export async function upsertPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${defaultLocale}/admin/login`);

  const idRaw = formData.get("id");
  const parsed = postSchema.safeParse({
    id: idRaw && idRaw !== "" ? idRaw : undefined,
    slug: formData.get("slug"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt") || null,
    content: formData.get("content") ?? "",
    cover_url: formData.get("cover_url") || null,
    tags: formData.get("tags") || null,
    lang: formData.get("lang"),
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  const tags = parsed.data.tags
    ? parsed.data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const payload = {
    slug: parsed.data.slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    cover_url: parsed.data.cover_url || null,
    tags,
    lang: parsed.data.lang,
    published: parsed.data.published,
    published_at: parsed.data.published ? new Date().toISOString() : null,
    author_id: user.id,
  };

  if (parsed.data.id) {
    const { error } = await supabase.from("posts").update(payload).eq("id", parsed.data.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("posts").insert(payload);
    if (error) return { error: error.message };
  }

  const locale = isLocale(parsed.data.lang) ? parsed.data.lang : defaultLocale;
  for (const l of locales) {
    revalidatePath(`/${l}/journal`);
  }
  redirect(`/${locale}/admin`);
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const locale = String(formData.get("locale") ?? defaultLocale);
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);
  for (const l of locales) revalidatePath(`/${l}/journal`);
  redirect(`/${locale}/admin`);
}

export async function toggleMessageRead(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const read = formData.get("read") === "1";
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("messages").update({ read: !read }).eq("id", id);
}

export async function deleteMessage(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("messages").delete().eq("id", id);
}
