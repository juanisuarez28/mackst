import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export interface SectionBackground {
  id: string;
  bgImage: string;
  bgColorClass: string;
}

interface Group {
  bgImage: string;
  bgColorClass: string;
  startPx: number;
  endPx: number;
}

// Groups consecutive sections that share the exact same background so they
// don't uselessly cross-fade into "themselves" (kept for correctness even
// though, today, no two adjacent sections share a background).
const buildGroups = (sections: SectionBackground[]): Group[] => {
  const groups: Group[] = [];

  for (const section of sections) {
    const el = document.getElementById(section.id);
    if (!el) continue;

    const startPx = el.offsetTop;
    const endPx = startPx + el.offsetHeight;
    const last = groups[groups.length - 1];

    if (last && last.bgImage === section.bgImage && last.bgColorClass === section.bgColorClass) {
      last.endPx = endPx;
    } else {
      groups.push({ bgImage: section.bgImage, bgColorClass: section.bgColorClass, startPx, endPx });
    }
  }

  return groups;
};

const BackgroundLayer = ({
  group,
  scrollY,
  fadeWidth,
}: {
  group: Group;
  scrollY: MotionValue<number>;
  fadeWidth: number;
}) => {
  // Crossfade over a slice of the viewport's own height — reads as a soft
  // dissolve at any screen size, but still resolves well within the quick
  // animated hop the scroll-snap does between sections.
  // fadeWidth is computed once by the parent (recalculated only on resize)
  // instead of inside this callback, which runs on every scroll frame for
  // every background group — reading window.innerHeight that often was
  // unnecessary work during the exact moment (scrolling) that needs to stay
  // smooth.
  const opacity = useTransform(scrollY, (y) => {
    if (y >= group.startPx && y <= group.endPx) return 1;

    if (y < group.startPx) {
      const distance = group.startPx - y;
      if (distance > fadeWidth) return 0;
      return 1 - distance / fadeWidth;
    }

    const distance = y - group.endPx;
    if (distance > fadeWidth) return 0;
    return 1 - distance / fadeWidth;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: group.bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={group.bgColorClass}
    />
  );
};

/**
 * Renders every section's background on one shared, viewport-fixed layer
 * behind all content, and cross-fades between them as you scroll — instead
 * of each <section> painting its own background, which produced a hard seam
 * exactly at the boundary between two differently-colored/textured sections.
 *
 * This only ever touches backgrounds. Content keeps its instant, non-
 * overlapping scroll-snap transition; only the color/texture behind it
 * dissolves smoothly, so there's never a moment with two sections' worth of
 * legible content visible at once — just a soft cross-fade of what's behind.
 */
const SectionBackgrounds = ({ sections }: { sections: SectionBackground[] }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [fadeWidth, setFadeWidth] = useState(160);
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      setGroups(buildGroups(sections));
      setFadeWidth(Math.max(80, Math.min(window.innerHeight * 0.25, 220)));
    };

    measure();

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // Re-measure whenever any section's real size changes (content/images/
    // fonts settling, a breakpoint change) — not just on window resize.
    const resizeObserver = new ResizeObserver(measure);
    elements.forEach((el) => resizeObserver.observe(el));
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [sections]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {groups.map((group, i) => (
        <BackgroundLayer key={i} group={group} scrollY={scrollY} fadeWidth={fadeWidth} />
      ))}
    </div>
  );
};

export default SectionBackgrounds;
