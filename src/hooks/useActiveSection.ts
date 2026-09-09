import { useEffect } from "react";

export interface ActiveSectionEntry {
  id: string;
  theme: "light" | "dark" | "white";
}

/**
 * Tracks which section currently sits at the vertical center of the viewport
 * and dispatches the same `theme-change` / `section-change` window events
 * Navbar.tsx already listens for. Replaces the scroll-progress bucket math
 * that used to live in the retired CylinderScroll component — same event
 * contract, so Navbar didn't need to change.
 *
 * Uses an IntersectionObserver with a 0-height "line" pinned to the
 * viewport's vertical center (via rootMargin) instead of comparing
 * intersection ratios, so it works correctly no matter how tall a section
 * is — some (the testimonial stack, the mobile services list) are taller
 * than one viewport, which would otherwise skew a ratio-based comparison.
 *
 * `sections` should be a stable (module-level or memoized) array — it's
 * only read once per identity change, not on every render.
 */
export const useActiveSection = (sections: ActiveSectionEntry[]) => {
  useEffect(() => {
    const watched = sections
      .map((section) => {
        const el = document.getElementById(section.id);
        return el ? { el, section } : null;
      })
      .filter((entry): entry is { el: HTMLElement; section: ActiveSectionEntry } => entry !== null);

    if (watched.length === 0) return;

    let lastId: string | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = watched.find((w) => w.el === entry.target);
          if (!match || match.section.id === lastId) continue;
          lastId = match.section.id;
          window.dispatchEvent(new CustomEvent("theme-change", { detail: match.section.theme }));
          window.dispatchEvent(new CustomEvent("section-change", { detail: match.section.id }));
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    watched.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);
};
