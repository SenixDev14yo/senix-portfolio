import { cn } from "@/lib/utils";

export function StackTags({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item, i) => (
        <span
          key={item}
          style={{ animationDelay: `${400 + i * 50}ms` }}
          className="
            anim-rise
            border border-line px-3.5 py-2 text-[12px] font-mono text-fg
            transition-colors hover:bg-accent hover:text-paper hover:border-accent
            cursor-bigger
          "
        >
          {item}
        </span>
      ))}
    </div>
  );
}
