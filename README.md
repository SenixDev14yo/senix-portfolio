# senix-portfolio

Личный сайт Сеникса. Next.js 16 (App Router) + Tailwind v4 + Supabase + native i18n (RU/EN/UZ).

## Стек

- **Next.js 16** (App Router, Turbopack, RSC, server actions)
- **Tailwind CSS v4** (CSS-based config via `@theme inline`)
- **Supabase** — Postgres + Auth для блога и админ-панели
- **next-themes** — light/dark с двумя характерами (light = brutalist paper + orange, dark = terminal + green/cyan)
- **next-mdx-remote** — рендер постов в журнале
- **Native i18n** — `[locale]` сегмент + dictionaries (`src/i18n/messages/{ru,en,uz}.json`)
- **Proxy** (`src/proxy.ts`) — редирект на нужный язык
- Деплой: **Vercel**

## Установка

```bash
pnpm install
cp .env.example .env.local   # подставь Supabase URL + anon key
pnpm dev
```

## Дизайн-система

Темы переключают **характер**, а не только цвета:

| | Light (brutalist) | Dark (terminal) |
| -- | -- | -- |
| Фон | `#f3efe8` бумага | `#070809` глубокий |
| Акцент | `#ff3d00` оранжевый | `#5fffb0` зелёный + `#7ad7ff` cyan |
| Шрифт hero | `Inter Black 900` + `Instrument Serif` | `Inter Black 900` + `JetBrains Mono` |
| Лид-параграф | serif italic | sans + mono accents |
| Курсор | кастомный + difference blend | системный |
| Эффекты | grain × multiply | grain + scanlines + vignette + glitch |
| Маркетинговые акценты | `*italic*`, `<s>` | `// comments`, `// labels`, `$ commands` |

CSS-переменные в `globals.css` (`:root[data-theme=...]`) переключают всё.

## Admin

URL: `/{locale}/admin/login`

При регистрации с email-ами:
- `palvanovazizbek71@gmail.com`
- `azizbekabobus26@gmail.com`

Профиль автоматически получает роль `admin` (через `handle_new_user` trigger в Supabase).
Любой другой email — обычный `user` без доступа к админке.

Если Supabase требует подтверждение email — отключи в Project Settings → Authentication → Email auth, либо подтверди по письму перед заходом.

## Деплой на Vercel

```bash
# Подключить репо через UI vercel.com — или CLI:
pnpm dlx vercel
```

В Vercel Project Settings → Environment Variables добавь:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (например `https://senix.dev`)

## Supabase

Проект уже создан, схема применена. Таблицы:

- `profiles` (auth users + role)
- `posts` (slug, lang, content, published)
- `messages` (контакт-форма)

RLS:
- посты публично читаются если `published = true`; админ — полный доступ
- сообщения публично пишутся, читаются только админом
