import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ProjectsSection } from "@/components/sections/projects-section";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: `${dict.projects.title_a} ${dict.projects.title_b}` };
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="pt-24 pb-16">
      <ProjectsSection dict={dict.projects} locale={locale as Locale} />
    </div>
  );
}
