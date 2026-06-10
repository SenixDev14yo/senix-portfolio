"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    let handle = 0;
    const raf = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      handle = requestAnimationFrame(raf);
    };
    handle = requestAnimationFrame(raf);
    window.addEventListener("mousemove", onMove);

    const interactiveSelector = 'a,button,[role="button"],input,textarea,select,.cursor-bigger';
    const onEnter = () => el.classList.add("is-big");
    const onLeave = () => el.classList.remove("is-big");
    const nodes = document.querySelectorAll(interactiveSelector);
    nodes.forEach((n) => {
      n.addEventListener("mouseenter", onEnter);
      n.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(handle);
      nodes.forEach((n) => {
        n.removeEventListener("mouseenter", onEnter);
        n.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return <div ref={ref} aria-hidden className="app-cursor" />;
}
