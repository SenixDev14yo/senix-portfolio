import { redirect, notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../post-form";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: PageProps<"/[locale]/admin/posts/[id]">) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const { data: post } = await supabase.from("posts").select("*").eq("id", id).single();
  if (!post) notFound();

  return (
    <div>
      <h2 className="font-display font-bold uppercase text-[22px] tracking-tight mb-6">
        {dict.admin.edit_post}: {post.title}
      </h2>
      <PostForm
        dict={dict.admin}
        defaultLang={post.lang as Locale}
        initial={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? "",
          content: post.content ?? "",
          cover_url: post.cover_url ?? "",
          tags: (post.tags ?? []).join(", "),
          lang: post.lang,
          published: post.published,
        }}
      />
    </div>
  );
}
