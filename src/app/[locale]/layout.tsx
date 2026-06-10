import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/cursor";
import { Grain } from "@/components/grain";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jb-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Senix — fullstack & flutter, Tashkent",
    template: "%s · Senix",
  },
  description: "Personal portfolio of Senix. 16-year-old fullstack & mobile developer.",
  openGraph: {
    title: "Senix — fullstack & flutter, Tashkent",
    siteName: "senix.dev",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${jbMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <ThemeProvider>
          <Grain />
          <Cursor />
          <Nav dict={dict.nav} locale={locale as Locale} />
          <main>{children}</main>
          <Footer dict={dict.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
