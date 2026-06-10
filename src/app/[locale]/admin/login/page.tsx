import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export const metadata = { title: "Admin" };

export default async function AdminLoginPage({ params }: PageProps<"/[locale]/admin/login">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect(`/${locale}/admin`);

  return (
    <div className="mx-auto max-w-[460px] px-6 pt-32 pb-16">
      <h1 className="font-display font-black uppercase tracking-tight text-[clamp(48px,6vw,80px)] mb-8 leading-none">
        {dict.admin.login}
      </h1>
      <LoginForm dict={dict.admin} locale={locale as Locale} />
    </div>
  );
}
