import { Fragment } from "react";

export function Marquee({ items }: { items: Array<{ text: string; accent?: boolean }> }) {
  const doubled = [...items, ...items];
  return (
    <div className="my-20 -mx-6 sm:-mx-8 overflow-hidden border-y border-line py-5">
      <div className="marquee-track text-[36px] font-display font-black uppercase tracking-tight text-fg">
        {doubled.map((item, i) => (
          <Fragment key={i}>
            <span
              className={
                item.accent
                  ? "mx-7 font-serif italic font-normal text-accent normal-case [html[data-theme='dark']_&]:font-mono [html[data-theme='dark']_&]:not-italic [html[data-theme='dark']_&]:before:content-['</'] [html[data-theme='dark']_&]:after:content-['>']"
                  : "mx-7"
              }
            >
              {item.text}
            </span>
            <span className="inline-block h-2.5 w-2.5 mx-7 align-middle rounded-full bg-fg [html[data-theme='dark']_&]:bg-accent [html[data-theme='dark']_&]:shadow-[0_0_12px_var(--accent)]" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
