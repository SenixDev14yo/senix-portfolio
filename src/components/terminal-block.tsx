import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TerminalBlock({
  title,
  children,
  className,
  bare,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  bare?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line bg-paper font-mono",
        "shadow-[var(--shadow)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-line bg-bg-2">
        <span className="inline-block h-[11px] w-[11px] rounded-full bg-warn" />
        <span className="inline-block h-[11px] w-[11px] rounded-full bg-[#ffc857]" />
        <span className="inline-block h-[11px] w-[11px] rounded-full bg-accent" />
        {title && <span className="ml-auto text-[11px] text-dim">{title}</span>}
      </div>
      <div className={cn(bare ? "" : "px-6 py-5")}>{children}</div>
    </div>
  );
}
