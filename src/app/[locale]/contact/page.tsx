import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ContactForm } from "./contact-form";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.contact.title_a };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="relative z-[2] mx-auto max-w-[1100px] px-6 sm:px-8 pt-32 pb-16">
      <p className="
        font-mono text-[11px] uppercase tracking-[2px] text-dim mb-3
        [html[data-theme='dark']_&]:before:content-['//_'] [html[data-theme='dark']_&]:tracking-normal
      ">
        {dict.contact.subtitle}
      </p>
      <h1 className="font-display font-black uppercase leading-[0.86] tracking-[-0.05em] text-[clamp(64px,11vw,140px)]">
        {dict.contact.title_a}
      </h1>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
        <ContactForm dict={dict.contact} />

        <aside className="space-y-3 text-[14px] font-mono text-fg border-t border-line pt-6 lg:border-t-0 lg:pt-0">
          <div className="text-[11px] uppercase tracking-[2px] text-dim mb-3">{dict.contact.or}</div>
          <a className="block hover:text-accent transition-colors cursor-bigger" href="https://t.me/darkedsnkxz" target="_blank" rel="noreferrer">
            <span className="text-dim">tg     :</span> @darkedsnkxz
          </a>
          <a className="block hover:text-accent transition-colors cursor-bigger" href="https://github.com/SenixDev14yo" target="_blank" rel="noreferrer">
            <span className="text-dim">github :</span> SenixDev14yo
          </a>
        </aside>
      </div>
    </div>
  );
}
