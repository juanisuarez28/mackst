import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  logo?: string;
}

interface TestimonialStackProps {
  testimonials: Testimonial[];
}

const STACK_OFFSET = 12; // px offset between cards
const STACK_SCALE = 0.03; // scale reduction per card sitting behind the front one
const SECTION_HEIGHT_VH = 280; // local scroll distance given to the whole stack

// A single card in the stack. Position/duration are fractions of this
// section's OWN local scroll progress (0..1) — this effect never reads or
// affects anything outside its own section, so it can't bleed into the
// sections before or after it.
const StackedCard = ({
  testimonial,
  index,
  total,
  scrollYProgress,
}: {
  testimonial: Testimonial;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const p = index / total;
  const d = 1 / total;
  const fadeWidth = d * 0.25;
  const isLast = index === total - 1;

  const opacity = useTransform(scrollYProgress, (val) => {
    if (val < p - fadeWidth) return 0;
    if (val < p) return (val - (p - fadeWidth)) / fadeWidth;
    // The last card just stays once it's up — once you scroll past the end
    // of this section it's simply below the fold, like any normal element,
    // so there's nothing left to fade it out against.
    if (isLast) return 1;
    const distance = val - (p + d);
    if (distance <= 0) return 1;
    if (distance > fadeWidth) return 0;
    return 1 - distance / fadeWidth;
  });

  const y = useTransform(scrollYProgress, (val) => {
    if (val < p) {
      const ratio = (p - val) / d;
      return `${Math.min(ratio * 100, 100)}vh`;
    }
    const cardsOnTop = Math.min((val - p) / d, total - index - 1);
    return `${cardsOnTop * STACK_OFFSET}px`;
  });

  const scale = useTransform(scrollYProgress, (val) => {
    if (val < p) return 1;
    const cardsOnTop = (val - p) / d;
    return Math.max(1 - cardsOnTop * STACK_SCALE, 0.7);
  });

  const pointerEvents = useTransform(opacity, (o) => (o > 0.05 ? "auto" : "none"));
  const display = useTransform(opacity, (o) => (o > 0.001 ? "flex" : "none"));

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        y,
        scale,
        zIndex: index,
        display,
        pointerEvents,
      }}
      className="flex flex-col items-center justify-start px-6 md:px-12"
    >
      {/* Ancla arriba (justify-start) con un margen relativo al alto del
          viewport, en vez de centrar y empujar con un margen fijo: así el
          punto donde arranca la tarjeta (y el logo que sobresale -12 por
          encima) no depende de cuánto texto tenga la reseña — la última
          ("Raúl Andrés"), al ser más larga, empujaba la tarjeta hacia arriba
          contra el título en pantallas más bajas (ej. algunas Mac). */}
      <div className="max-w-xl w-full mx-auto relative z-10 mt-[34vh] md:mt-[38vh]">
        {/* Logo superpuesto rectangular */}
        <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-48 h-24 bg-white rounded-2xl shadow-sm flex items-center justify-center z-20 overflow-hidden px-4">
          {testimonial.logo ? (
            <img src={testimonial.logo} alt={testimonial.name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-primary text-xl font-black uppercase text-center leading-tight">
              {testimonial.name}
            </span>
          )}
        </div>

        {/* Tarjeta blanca sólida con texto oscuro y estrellas doradas */}
        <div className="bg-white rounded-[30px] p-6 md:p-10 pt-16 md:pt-16 shadow-2xl relative">
          <h3 className="text-lg md:text-2xl font-black text-primary text-center uppercase tracking-widest mb-3 md:mb-4">
            {testimonial.name}
          </h3>

          <p className="text-[13px] md:text-lg text-primary/90 font-medium leading-snug md:leading-relaxed text-center">
            "{testimonial.text}"
          </p>

          <div className="flex justify-center gap-1 mt-6">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialStack = ({ testimonials }: TestimonialStackProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const total = testimonials.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="experiencia-0" ref={containerRef} className="snap-section relative w-full" style={{ height: `${SECTION_HEIGHT_VH}vh` }}>
      {/* Extra mandatory snap stops, one per card, centered on the point where
          that card is the only one fully visible. Without these, only the
          section's own start/end were snap points, so a scroll gesture could
          let go anywhere in between — landing mid cross-fade with two cards
          dim and overlapping. Zero-size, so they don't add any scroll length
          of their own; they just mark extra places the browser is allowed to
          rest, using the same scroll-snap machinery as every section boundary.

          Placement: scrollYProgress (0..1, used by every card's opacity/y/
          scale above) covers the scroll range from "section top hits
          viewport top" to "section bottom hits viewport bottom" — i.e. only
          (sectionHeight - viewportHeight) px of actual scrolling, NOT the
          full sectionHeight. Since sectionHeight is a fixed multiple (H) of
          the viewport height (SECTION_HEIGHT_VH vh), that maps to a constant
          fraction of the section's own height: a target progress `val`
          lands at `val * (H-1)/H` of the way down the section, regardless of
          the actual viewport size. */}
      {testimonials.map((_, i) => {
        const targetProgress = (i + 0.5) / total;
        const heightMultiple = SECTION_HEIGHT_VH / 100;
        const topPercent = targetProgress * ((heightMultiple - 1) / heightMultiple) * 100;
        return <div key={i} className="snap-point absolute left-0 w-full" style={{ top: `${topPercent}%` }} />;
      })}

      <div className="sticky top-0 w-full pin-viewport overflow-hidden">
        {/* Título: aparece una vez (como el de cualquier otra sección) y se
            queda fijo mientras dure el stack entero, en vez de ir atado a la
            opacidad de la primera tarjeta. */}
        <div className="absolute top-[20%] md:top-[15%] left-0 w-full px-6 md:px-12 pointer-events-none">
          <div className="max-w-[1400px] w-full mx-auto">
            <ScrollReveal>
              <h2
                className="font-bold text-secondary-foreground leading-[0.85] tracking-tight"
                style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}
              >
                Experiencias.
              </h2>
            </ScrollReveal>
          </div>
        </div>

        {testimonials.map((t, i) => (
          <StackedCard key={i} testimonial={t} index={i} total={total} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialStack;
