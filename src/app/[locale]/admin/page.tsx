import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { deletePost, toggleMessageRead, deleteMessage } from "./actions";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin" };

export default async function AdminDashboard({ params }: PageProps<"/[locale]/admin">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/admin/login`);

  const [{ data: posts }, { data: messages }] = await Promise.all([
    supabase.from("posts").select("*").order("updated_at", { ascending: false }),
    supabase.from("messages").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-[22px] font-bold uppercase tracking-tight">
            {dict.admin.posts}
          </h2>
          <Link
            href={`/${locale}/admin/posts/new`}
            className="text-[12px] font-mono text-accent border-b border-accent pb-0.5 hover:gap-3"
          >
            + {dict.admin.new_post}
          </Link>
        </div>

        {(posts ?? []).length === 0 ? (
          <p className="border border-dashed border-line p-6 text-dim font-mono text-[13px]">
            {dict.admin.posts_empty}
          </p>
        ) : (
          <ul className="border border-line divide-y divide-line">
            {(posts ?? []).map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5"
              >
                <div className="flex-1 min-w-[260px]">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-dim mb-1">
                    <span className="uppercase">{p.lang}</span>
                    <span>·</span>
                    <span>{p.slug}</span>
                    <span>·</span>
                    <span className={p.published ? "text-accent" : "text-warn"}>
                      {p.published ? dict.admin.publish : dict.admin.draft}
                    </span>
                  </div>
                  <div className="font-display font-bold text-[16px]">{p.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/admin/posts/${p.id}`}
                    className="text-[12px] font-mono text-fg border border-line px-3 py-1.5 hover:bg-fg hover:text-bg transition-colors"
                  >
                    {dict.admin.edit_post}
                  </Link>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="locale" value={locale} />
                    <button
                      type="submit"
                      className="text-[12px] font-mono text-warn border border-line px-3 py-1.5 hover:bg-warn hover:text-paper transition-colors"
                    >
                      {dict.admin.delete}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-display text-[22px] font-bold uppercase tracking-tight mb-4">
          {dict.admin.messages}
        </h2>

        {(messages ?? []).length === 0 ? (
          <p className="border border-dashed border-line p-6 text-dim font-mono text-[13px]">
            {dict.admin.messages_empty}
          </p>
        ) : (
          <ul className="border border-line divide-y divide-line">
            {(messages ?? []).map((m) => (
              <li
                key={m.id}
                className={`px-4 py-4 ${m.read ? "opacity-60" : ""}`}
              >
                <div className="flex items-baseline gap-2 text-[11px] font-mono text-dim mb-1">
                  <span>{formatDate(m.created_at, locale)}</span>
                  <span>·</span>
                  <span>{m.email}</span>
                </div>
                <div className="font-display font-bold text-[15px]">{m.name}</div>
                {m.subject && (
                  <div className="text-[13px] font-mono text-dim mt-1">{m.subject}</div>
                )}
                <p className="text-[13px] text-fg mt-2 whitespace-pre-wrap leading-snug">
                  {m.body}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <form action={toggleMessageRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="read" value={m.read ? "1" : "0"} />
                    <button
                      type="submit"
                      className="text-[11px] font-mono text-fg border border-line px-2.5 py-1 hover:bg-fg hover:text-bg transition-colors"
                    >
                      {m.read ? dict.admin.mark_unread : dict.admin.mark_read}
                    </button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button
                      type="submit"
                      className="text-[11px] font-mono text-warn border border-line px-2.5 py-1 hover:bg-warn hover:text-paper transition-colors"
                    >
                      {dict.admin.delete}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
