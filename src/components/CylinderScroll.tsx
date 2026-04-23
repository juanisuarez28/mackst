import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";

export interface StickySection {
  id?: string;
  bgImage?: string;
  bgColorClass?: string;
  content: React.ReactNode;
  isStack?: boolean;
  scrollWeight?: number; // New: allows a section to take more or less scroll distance (default 1)
}

interface StickyScrollProps {
  sections: StickySection[];
}

// Helper to get weight-based positions
const getSectionPositions = (sections: StickySection[]) => {
  const weights = sections.map(s => s.scrollWeight || 1);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  
  let currentWeight = 0;
  return sections.map((_, i) => {
    const startP = currentWeight / totalWeight;
    const duration = weights[i] / totalWeight;
    currentWeight += weights[i];
    return { startP, duration, totalWeight };
  });
};

// Helper to group identical contiguous backgrounds
const getBackgroundGroups = (sections: StickySection[], positions: { startP: number; duration: number }[]) => {
  const groups: { bgImage?: string; bgColorClass?: string; startP: number; endP: number; fadeD: number }[] = [];
  
  sections.forEach((sec, i) => {
    const { startP, duration } = positions[i];
    const endP = startP + duration;
    const lastGroup = groups[groups.length - 1];
    
    if (lastGroup && lastGroup.bgImage === sec.bgImage && lastGroup.bgColorClass === sec.bgColorClass) {
      lastGroup.endP = endP;
    } else {
      groups.push({
        bgImage: sec.bgImage,
        bgColorClass: sec.bgColorClass,
        startP,
        endP,
        fadeD: Math.min(duration * 0.5, 0.045) // Cap so large sections don't bleed into neighbors
      });
    }
  });
  
  return groups;
};

// Background Layer: pure crossfade, strictly fixed size
const BackgroundLayer = ({
  group,
  scrollYProgress,
}: {
  group: { bgImage?: string; bgColorClass?: string; startP: number; endP: number; fadeD: number };
  scrollYProgress: MotionValue<number>;
}) => {
  const d = group.fadeD;

  // Crossfade between backgrounds
  const opacity = useTransform(scrollYProgress, (val) => {
    // If within the group's range, opacity is 1
    if (val >= group.startP && val <= group.endP) return 1;
    
    // If outside, fade out over distance 'd'
    if (val < group.startP) {
      const distance = group.startP - val;
      if (distance > d) return 0;
      return 1 - (distance / d);
    } else {
      const distance = val - group.endP;
      if (distance > d) return 0;
      return 1 - (distance / d);
    }
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
        backgroundImage: group.bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={group.bgColorClass}
    />
  );
};

// Content Layer: translates slightly and fades, with STACK support
const ContentLayer = ({
  children,
  p,
  d,
  scrollYProgress,
  isStack,
  nextSectionIsStack,
  stackEndP,
  total,
  index,
}: {
  children: React.ReactNode;
  p: number;
  d: number;
  scrollYProgress: MotionValue<number>;
  isStack?: boolean;
  nextSectionIsStack?: boolean;
  stackEndP?: number;
  total: number;
  index: number;
}) => {
  const fadeWidth = d * 0.15;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Animation values for normal mode
  const normalOpacity = useTransform(scrollYProgress, (val) => {
    const center = p + d / 2;
    const plateauHalf = d * 0.35;
    const transitionWidth = d * 0.15;
    
    if (isFirst && val <= center) return 1;
    if (isLast && val >= center) return 1;

    const distance = Math.abs(val - center);
    
    if (distance <= plateauHalf) return 1;
    if (distance > plateauHalf + transitionWidth) return 0;
    
    return 1 - (distance - plateauHalf) / transitionWidth;
  });

  const normalTranslateY = useTransform(scrollYProgress, (val) => {
    const center = p + d / 2;
    const plateauHalf = d * 0.35;
    const transitionWidth = d * 0.15;

    if (isFirst && val <= center) return "0vh";
    if (isLast && val >= center) return "0vh";

    if (val < center - plateauHalf) {
      // Coming in from below
      const diff = (center - plateauHalf) - val;
      const ratio = Math.min(diff / transitionWidth, 1);
      return `${ratio * 8}vh`;
    }
    if (val > center + plateauHalf) {
      // Going out to top
      const diff = val - (center + plateauHalf);
      const ratio = Math.min(diff / transitionWidth, 1);
      return `${ratio * -8}vh`;
    }
    return "0vh";
  });

  // Animation values for STACK mode
  const STACK_OFFSET = 12; // px offset between cards
  const STACK_SCALE = 0.03; // scale reduction per card on top

  const stackOpacity = useTransform(scrollYProgress, (val) => {
    if (val < p - fadeWidth) return 0;
    if (val < p) return (val - (p - fadeWidth)) / fadeWidth;
    
    // If we have passed the end of the entire stack, fade out the whole mazo
    if (stackEndP !== undefined && val > stackEndP) {
      const distance = val - stackEndP;
      if (distance > fadeWidth) return 0;
      return 1 - (distance / fadeWidth);
    }

    // If this is the last card in the stack, it should fade out as the next section comes in
    if (!nextSectionIsStack) {
      // Unless this is the last section of the whole page
      if (isLast) return 1;

      const distance = val - (p + d);
      if (distance > 0) {
        if (distance > fadeWidth) return 0;
        return 1 - (distance / fadeWidth);
      }
    }

    return 1;
  });

  const stackTranslateY = useTransform(scrollYProgress, (val) => {
    if (val < p) {
      const ratio = (p - val) / d;
      return `${Math.min(ratio * 100, 100)}vh`;
    }
    const cardsOnTop = Math.min((val - p) / d, total - index - 1);
    return `${cardsOnTop * STACK_OFFSET}px`;
  });

  const stackScale = useTransform(scrollYProgress, (val) => {
    if (val < p) return 1;
    const cardsOnTop = (val - p) / d;
    return Math.max(1 - cardsOnTop * STACK_SCALE, 0.7);
  });

  // Determine which values to use
  const opacity = isStack ? stackOpacity : normalOpacity;
  const y = isStack ? stackTranslateY : normalTranslateY;
  const scale = isStack ? stackScale : 1;
  const zIndex = isStack ? index : 1;
  // Disable pointer events when section is nearly invisible to prevent
  // hidden sections from stealing mouse events from visible ones
  const pointerEvents = useTransform(opacity, (o: number) => o > 0.05 ? "auto" : "none");

  // display logic
  const display = useTransform(scrollYProgress, (val: number) => {
    if (isFirst) return val <= p + d * 0.5 + fadeWidth * 1.5 ? "flex" : "none";
    if (isLast) return val >= p + d * 0.5 - fadeWidth * 1.5 ? "flex" : "none";

    if (isStack) {
      if (val < p - d) return "none";
      if (stackEndP !== undefined && val > stackEndP + fadeWidth) return "none";
      if (!nextSectionIsStack && val > p + d + fadeWidth) return "none";
      return "flex";
    }
    const distance = Math.abs(val - (p + d / 2));
    if (distance > d * 1.5) return "none";
    return "flex";
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
        y,
        scale,
        zIndex,
        display,
        transformOrigin: "top center",
        pointerEvents,
      }}
      className="will-change-transform items-center justify-center overflow-hidden"
    >
      <div className="w-full h-full relative flex flex-col justify-center">
        {children}
      </div>
    </motion.div>
  );
};

export const CylinderScroll: React.FC<StickyScrollProps> = ({ sections }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSections = sections.length;
  const weights = sections.map(s => s.scrollWeight || 1);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const positions = getSectionPositions(sections);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Find the currently active section index based on weighted positions
    const activeIndex = positions.findIndex(pos => latest >= pos.startP && latest < pos.startP + pos.duration);
    const finalIndex = activeIndex === -1 ? (latest >= 0.5 ? totalSections - 1 : 0) : activeIndex;
    
    const activeSection = sections[finalIndex];
    if (activeSection) {
      const isDark = activeSection.bgColorClass?.includes("bg-primary") || activeSection.bgColorClass?.includes("bg-secondary");
      const theme = isDark ? "dark" : "light";
      window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
    }
  });

  const bgGroups = getBackgroundGroups(sections, positions);

  return (
    <div
      ref={containerRef}
      style={{ height: `${totalWeight * 150}vh`, position: "relative" }}
      className="bg-black"
    >
      {/* Invisible anchor divs */}
      {sections.map((section, index) => {
        if (!section.id) return null;
        const p = positions[index].startP;
        const d = positions[index].duration;
        // Scroll to the center of the section, where content is fully visible.
        // Exception: "inicio" always scrolls to the very top (p = 0).
        const target = section.id === "inicio" ? 0 : p + d * 0.5;
        return (
          <div
            key={`anchor-${section.id}`}
            id={section.id}
            style={{
              position: "absolute",
              top: `calc(${target * 100}% - ${target * 100}vh)`,
              height: "1px",
              width: "100%",
              pointerEvents: "none"
            }}
          />
        );
      })}

      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Layer 1: Backgrounds */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {bgGroups.map((group, index) => (
            <BackgroundLayer
              key={`bg-group-${index}`}
              group={group}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Layer 2: Content */}
        <div className="absolute inset-0 w-full h-full">
          {sections.map((section, index) => {
            const { startP: p, duration: d } = positions[index];
            let stackEndP: number | undefined;
            
            if (section.isStack) {
              let lastInStack = index;
              for (let i = index + 1; i < totalSections; i++) {
                if (sections[i].isStack) lastInStack = i;
                else break;
              }
              stackEndP = positions[lastInStack].startP + positions[lastInStack].duration;
            }

            return (
              <ContentLayer
                key={`content-${index}`}
                p={p}
                d={d}
                index={index}
                total={totalSections}
                scrollYProgress={scrollYProgress}
                isStack={section.isStack}
                nextSectionIsStack={sections[index + 1]?.isStack}
                stackEndP={stackEndP}
              >
                {section.content}
              </ContentLayer>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CylinderScroll;
