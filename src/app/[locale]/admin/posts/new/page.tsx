import { redirect, notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../post-form";

export const metadata = { title: "New post" };

export default async function NewPostPage({ params }: PageProps<"/[locale]/admin/posts/new">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  return (
    <div>
      <h2 className="font-display font-bold uppercase text-[22px] tracking-tight mb-6">
        {dict.admin.new_post}
      </h2>
      <PostForm dict={dict.admin} defaultLang={locale as Locale} />
    </div>
  );
}
