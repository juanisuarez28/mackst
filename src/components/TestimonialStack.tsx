import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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

const AUTO_ADVANCE_MS = 6000; // más lento que ClientCarousel (2s): acá hay
// una reseña entera para leer, no solo un logo para reconocer de un vistazo.

/**
 * Carrusel de una reseña a la vez, con avance automático — igual mecanismo
 * que ClientCarousel (translateX + setInterval), en vez del stack scroll-
 * driven de antes (220vh de sección, cross-fades atados al scroll y sus
 * propios snap-points internos para que un swipe no lo saltee). Como
 * cualquier otra sección, ocupa una sola pantalla: ya no hace falta
 * scrollear DENTRO de "Experiencias" para ver cada reseña.
 */
const TestimonialStack = ({ testimonials }: TestimonialStackProps) => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next, total]);

  return (
    <section
      id="experiencia-0"
      className="snap-section relative w-full flex flex-col justify-center items-center px-6 md:px-12 py-20"
    >
      <div className="max-w-[1400px] w-full mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-secondary-foreground leading-[0.85] tracking-tight mb-10 md:mb-16 text-center md:text-left"
            style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}
          >
            Experiencias.
          </h2>
        </ScrollReveal>

        <div className="relative flex items-center gap-2 md:gap-6 max-w-xl mx-auto">
          <button
            onClick={prev}
            aria-label="Reseña anterior"
            className="text-primary-foreground/60 hover:text-primary-foreground transition-colors shrink-0"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="overflow-hidden flex-1">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((testimonial, i) => (
                <div key={i} className="shrink-0 w-full px-1">
                  <div className="w-full relative pt-12">
                    {/* Logo superpuesto rectangular */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-48 h-24 bg-white rounded-2xl shadow-sm flex items-center justify-center z-20 overflow-hidden px-4">
                      {testimonial.logo ? (
                        <img src={testimonial.logo} alt={testimonial.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-primary text-xl font-black uppercase text-center leading-tight">
                          {testimonial.name}
                        </span>
                      )}
                    </div>

                    {/* Tarjeta blanca sólida con texto oscuro y estrellas doradas */}
                    <div className="bg-white rounded-[30px] p-6 md:p-10 pt-16 shadow-2xl relative">
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
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={next}
            aria-label="Siguiente reseña"
            className="text-primary-foreground/60 hover:text-primary-foreground transition-colors shrink-0"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {total > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir a la reseña ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-secondary-foreground" : "w-2 bg-secondary-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialStack;
