"use client";

import { useEffect, useState } from "react";

function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.className = theme;
}

export default function DarkModeToggle() {
  const [theme, setThemeState] = useState("theme-light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "theme-light";
    setThemeState(storedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setTheme(theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState(theme === "theme-dark" ? "theme-light" : "theme-dark");
  };

  if (!mounted) {
    return null; 
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-gray-500"
      aria-label="Toggle dark mode"
    >
      {theme === "theme-dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
