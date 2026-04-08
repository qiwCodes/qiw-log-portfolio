"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "qiw-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    return (window.localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "light";
  });

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border px-3 py-1.5 text-xs tracking-wide backdrop-blur transition hover:-translate-y-px"
      style={{
        borderColor: "color-mix(in srgb, var(--muted) 35%, transparent)",
        color: "var(--text-soft)",
        background: "color-mix(in srgb, var(--surface) 72%, transparent)",
      }}
      aria-label="Toggle theme"
    >
      Toggle Theme
    </button>
  );
}
