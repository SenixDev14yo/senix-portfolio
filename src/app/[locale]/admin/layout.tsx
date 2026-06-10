import Link from "next/link";
import { redirect } from "next/navigation";
import { isLocale, type Locale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export default async function AdminLayout({
  children,
  params,
}: LayoutProps<"/[locale]/admin">) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(safeLocale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page is rendered without sidebar
  // We can't know route here easily, so we render shell and let pages decide.
  // Auth check: if no user, only allow /admin/login.
  // We do this via a per-page check; here we just render the shell when user exists.

  if (!user) {
    return <div className="pt-24 pb-16 min-h-screen">{children}</div>;
  }

  // verify admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect(`/${safeLocale}`);
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-line pb-5">
          <div className="flex items-center gap-6">
            <h1 className="font-display font-black uppercase text-[22px] tracking-tight">
              {dict.admin.dashboard}
            </h1>
            <nav className="flex gap-5 text-[13px] font-mono">
              <Link href={`/${safeLocale}/admin`} className="text-fg hover:text-accent transition-colors">
                {dict.admin.posts} / {dict.admin.messages}
              </Link>
              <Link
                href={`/${safeLocale}/admin/posts/new`}
                className="text-accent hover:underline"
              >
                + {dict.admin.new_post}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-[12px] font-mono text-dim">
            <span>{user.email}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="border border-line px-3 py-1.5 text-fg hover:bg-fg hover:text-bg transition-colors"
              >
                {dict.admin.logout}
              </button>
            </form>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
