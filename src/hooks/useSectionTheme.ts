import { useEffect, useState } from "react";

export type SectionTheme = "light" | "dark" | "white";

/**
 * Tracks the "theme-change" events dispatched by useActiveSection (one per
 * section, see HomePage.tsx's SECTIONS array) so any UI chrome that floats
 * over the whole page — the Navbar, the scroll-to-top button — can adapt its
 * own colors to stay legible over whichever section is currently in view,
 * without each one wiring up its own listener.
 */
export const useSectionTheme = (initial: SectionTheme = "light") => {
  const [theme, setTheme] = useState<SectionTheme>(initial);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      setTheme((e as CustomEvent).detail as SectionTheme);
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  return theme;
};
