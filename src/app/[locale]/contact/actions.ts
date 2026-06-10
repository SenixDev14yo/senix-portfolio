"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional().nullable(),
  body: z.string().min(1).max(5000),
});

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

export async function sendMessage(formData: FormData): Promise<ContactResult> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") ?? null,
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { ok: false, error: "validation" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert(parsed.data);
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
