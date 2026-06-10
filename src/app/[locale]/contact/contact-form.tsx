"use client";

import { useState, useTransition } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { sendMessage } from "./actions";

type ContactDict = Dictionary["contact"];

export function ContactForm({ dict }: { dict: ContactDict }) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      const res = await sendMessage(data);
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    });
  };

  const fieldClass =
    "w-full bg-transparent border border-line px-4 py-3.5 text-fg text-[15px] font-sans focus:outline-none focus:border-accent transition-colors placeholder:text-dim";

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-[640px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
            {dict.name}
          </label>
          <input name="name" required maxLength={120} className={fieldClass} placeholder="..." />
        </div>
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
            {dict.email}
          </label>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            className={fieldClass}
            placeholder="you@..."
          />
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
          {dict.subject}
        </label>
        <input name="subject" maxLength={200} className={fieldClass} placeholder="..." />
      </div>
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-[1.5px] text-dim mb-2">
          {dict.body}
        </label>
        <textarea
          name="body"
          required
          maxLength={5000}
          rows={6}
          className={`${fieldClass} resize-y min-h-[160px] font-mono text-[14px]`}
          placeholder="..."
        />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={pending}
          className="
            inline-flex items-center gap-3 px-7 py-4 cursor-bigger
            text-[13px] font-semibold uppercase tracking-[1.5px]
            bg-fg text-bg border-[1.5px] border-fg
            transition-colors disabled:opacity-50
            hover:bg-accent hover:border-accent hover:text-paper
            [html[data-theme='dark']_&]:bg-transparent [html[data-theme='dark']_&]:text-accent [html[data-theme='dark']_&]:border-accent
            [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:normal-case [html[data-theme='dark']_&]:tracking-normal
            [html[data-theme='dark']_&]:hover:text-black
          "
        >
          {pending ? dict.submitting : dict.submit}
          {!pending && <span>→</span>}
        </button>
        {status === "ok" && (
          <span className="text-[13px] font-mono text-accent">{dict.success}</span>
        )}
        {status === "error" && (
          <span className="text-[13px] font-mono text-warn">{dict.error}</span>
        )}
      </div>
    </form>
  );
}
