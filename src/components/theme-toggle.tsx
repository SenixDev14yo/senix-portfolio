"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = mounted ? (theme === "system" ? resolvedTheme : theme) : "dark";

  const toggle = () => setTheme(active === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${active === "dark" ? "light" : "dark"} theme`}
      className="
        relative h-7 w-[54px] rounded-full border border-line bg-bg-2
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-accent
      "
    >
      <span
        className="
          absolute top-[2px] left-[2px] h-[22px] w-[22px] rounded-full
          bg-accent shadow-[0_2px_8px_rgba(0,0,0,.25)]
          transition-transform duration-300 ease-[cubic-bezier(.7,0,.2,1)]
        "
        style={{ transform: active === "light" ? "translateX(26px)" : "translateX(0)" }}
      />
    </button>
  );
}
