export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  tags: string[] | null;
  lang: "ru" | "en" | "uz";
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string | null;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  body: string;
  read: boolean;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string | null;
  role: "user" | "admin";
  display_name: string | null;
  created_at: string;
};
