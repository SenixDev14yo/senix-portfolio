import { cn } from "@/lib/utils";

export function GlitchText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={cn("glitch", className)} data-text={children}>
      {children}
    </span>
  );
}
