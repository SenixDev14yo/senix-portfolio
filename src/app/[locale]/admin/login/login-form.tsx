"use client";

import { useState, useTransition } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { signIn } from "../actions";

type AdminDict = Dictionary["admin"];

export function LoginForm({ dict, locale }: { dict: AdminDict; locale: Locale }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("mode", mode);
    fd.set("locale", locale);
    startTransition(async () => {
      const res = await signIn(fd);
      if (res && "error" in res) setError(res.error);
    });
  };

  const field =
    "w-full bg-transparent border border-line px-4 py-3.5 text-fg text-[15px] font-mono focus:outline-none focus:border-accent transition-colors placeholder:text-dim";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
          {dict.email}
        </label>
        <input name="email" type="email" required className={field} placeholder="you@..." />
      </div>
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
          {dict.password}
        </label>
        <input name="password" type="password" required minLength={6} className={field} placeholder="••••••" />
      </div>

      {error && <p className="text-warn text-[13px] font-mono">{error}</p>}

      <div className="flex items-center gap-3 flex-wrap pt-2">
        <button
          type="submit"
          disabled={pending}
          className="
            inline-flex items-center gap-3 px-6 py-3.5
            text-[13px] font-mono font-semibold
            bg-fg text-bg border-[1.5px] border-fg
            transition-colors disabled:opacity-50
            hover:bg-accent hover:border-accent hover:text-paper
            [html[data-theme='dark']_&]:bg-transparent [html[data-theme='dark']_&]:text-accent [html[data-theme='dark']_&]:border-accent
            [html[data-theme='dark']_&]:hover:text-black
          "
        >
          {pending ? "..." : mode === "signin" ? dict.enter : "Sign up"}
        </button>
        <button
          type="button"
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="text-[12px] font-mono text-dim hover:text-fg transition-colors"
        >
          {mode === "signin" ? "→ sign up instead" : "→ sign in instead"}
        </button>
      </div>
    </form>
  );
}
