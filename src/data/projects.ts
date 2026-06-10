export type ProjectStatus = "live" | "wip" | "archived";

export type Project = {
  slug: string;
  name: string;
  year: string;
  status: ProjectStatus;
  domain: string;
  url: string;
  repo?: string;
  tags: string[];
  i18n: Record<"ru" | "en" | "uz", { description: string; long?: string }>;
};

export const projects: Project[] = [
  {
    slug: "dar25",
    name: "dar25",
    year: "2025",
    status: "live",
    domain: "dar25.vercel.app",
    url: "https://dar25.vercel.app/",
    tags: ["Next.js", "React", "Tailwind", "Vercel"],
    i18n: {
      ru: {
        description: "Персональный проект на Next.js. Фронт + бэк, деплой на Vercel.",
        long: "Личный продукт, собранный с нуля: маршрутизация App Router, server actions, минималистичный UI.",
      },
      en: {
        description: "Personal Next.js project. Front + back, deployed on Vercel.",
        long: "A personal product built from scratch: App Router routes, server actions, minimal UI.",
      },
      uz: {
        description: "Next.js da shaxsiy loyiha. Front + back, Vercel da deploy.",
        long: "Noldan qurilgan shaxsiy mahsulot: App Router marshrutlash, server actions, minimal UI.",
      },
    },
  },
  {
    slug: "wishpool",
    name: "wishpool",
    year: "2025",
    status: "live",
    domain: "wishpool-two.vercel.app",
    url: "https://wishpool-two.vercel.app/",
    tags: ["Next.js", "React", "TypeScript"],
    i18n: {
      ru: {
        description: "Веб-приложение для пула желаний. Интерактивный UI, состояние, формы.",
        long: "Эксперимент с управлением состоянием и формами в React. Чистый клиентский опыт.",
      },
      en: {
        description: "A wish-pool web app. Interactive UI, state, forms.",
        long: "An experiment with state management and forms in React. Pure client-side experience.",
      },
      uz: {
        description: "Tilaklar pooli uchun veb-ilova. Interaktiv UI, holat, formalar.",
        long: "React da holatni boshqarish va formalar bilan tajriba. Sof klient tomonidagi tajriba.",
      },
    },
  },
];

export const stack: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "Python",
  "Tailwind",
  "Supabase",
  "PostgreSQL",
  "Node.js",
];
