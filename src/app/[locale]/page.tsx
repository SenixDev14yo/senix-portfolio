import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/marquee";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AboutPreview } from "@/components/sections/about-preview";
import { BlogPreview } from "@/components/sections/blog-preview";
import { ContactCta } from "@/components/sections/contact-cta";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero dict={dict.hero} meta={dict.meta} side={dict.side} locale={locale as Locale} />

      <Marquee
        items={[
          { text: dict.marquee.selected },
          { text: dict.marquee.works, accent: true },
          { text: "dar25" },
          { text: "wishpool" },
          { text: dict.marquee.building, accent: true },
          { text: dict.marquee.next },
          { text: "2026" },
        ]}
      />

      <ProjectsSection dict={dict.projects} locale={locale as Locale} limit={2} showAll />
      <AboutPreview dict={dict.about} locale={locale as Locale} />
      <BlogPreview dict={dict.blog} locale={locale as Locale} />
      <ContactCta dict={dict.contact} locale={locale as Locale} />
    </>
  );
}
