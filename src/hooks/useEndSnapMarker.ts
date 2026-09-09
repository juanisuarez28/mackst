import { RefObject, useEffect, useState } from "react";

/**
 * Computes where to place an extra `.snap-point` (scroll-snap-align: start)
 * marker so that scrolling to it shows exactly the LAST viewport's worth of
 * a section's real content, ending flush with the bottom of the screen —
 * instead of leaving room for whatever comes after (the next section, or,
 * for the very last section, empty trailing space) to be visible too.
 *
 * Works purely from measured pixel positions (content's own bottom relative
 * to its enclosing <section>, and the current window.innerHeight), so it
 * doesn't depend on vh/svh/dvh unit quirks or on `scroll-snap-align: end`
 * (a less commonly exercised value, which didn't behave reliably here).
 * Re-measures on any size change (ResizeObserver on the content, and a
 * window resize listener — mobile browsers change window.innerHeight as
 * their own UI chrome shows/hides while scrolling).
 *
 * Returns `null` when the content already fits within one viewport — no
 * marker is needed there, the section's own start boundary already shows
 * all of it.
 */
export const useEndSnapMarker = (contentRef: RefObject<HTMLElement>) => {
  const [topPx, setTopPx] = useState<number | null>(null);

  useEffect(() => {
    const contentEl = contentRef.current;
    const sectionEl = contentEl?.closest("section");
    if (!contentEl || !sectionEl) return;

    const measure = () => {
      const sectionTop = sectionEl.getBoundingClientRect().top;
      const contentBottom = contentEl.getBoundingClientRect().bottom;
      const contentBottomRelative = contentBottom - sectionTop;
      const overflow = contentBottomRelative - window.innerHeight;
      setTopPx(overflow > 0 ? overflow : null);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(contentEl);
    resizeObserver.observe(sectionEl);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [contentRef]);

  return topPx;
};
