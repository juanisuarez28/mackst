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
 *
 * Re-measuring is deliberately paranoid: on a real network (unlike a local
 * dev server with everything cached), the web font can still be swapping in
 * — a subtitle wrapping onto an extra line across nine buttons adds up to a
 * real height change — well after mount, and that reflow was observed to
 * NOT reliably reach either the ResizeObserver or a window "resize" event on
 * its own. So on top of both of those, this also re-measures once
 * `document.fonts.ready` resolves and a few more times over the following
 * couple of seconds, to catch whatever else might shift layout late.
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

    document.fonts?.ready?.then(measure).catch(() => {});
    const timeouts = [150, 500, 1200, 2500].map((delay) => window.setTimeout(measure, delay));

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(contentEl);
    resizeObserver.observe(sectionEl);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [contentRef]);

  return topPx;
};
