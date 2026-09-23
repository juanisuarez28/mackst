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
 * Carrusel de una reseña a la vez, con avance automático — mismo espíritu
 * que ClientCarousel, salvo que acá se renderiza únicamente la reseña
 * activa (no las tres en una fila de ancho 300%, corrida con translateX).
 * Las reseñas difieren mucho en longitud (la de Raúl Andrés es varias
 * veces más larga que las otras dos), y con todas montadas a la vez en una
 * fila flex, esa por sí sola inflaba la altura de TODO el carrusel — la
 * reseña corta que se veía quedaba flotando arriba de un contenedor
 * mucho más alto de lo que necesitaba, lejos de las flechas (centradas en
 * ese alto de más) y de los puntitos (empujados varios cm más abajo).
 * Con una sola reseña montada por vez, el contenedor mide justo lo que esa
 * reseña necesita.
 */
const TestimonialStack = ({ testimonials }: TestimonialStackProps) => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const testimonial = testimonials[index];

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
      // Sin justify-center acá (a diferencia de las demás secciones): con
      // el título Y el carrusel dentro del mismo bloque centrado, una
      // reseña más alta que otra (la de Raúl Andrés es varias veces más
      // larga) empujaba TODO el bloque hacia arriba al centrarlo, y el
      // título terminaba en una posición distinta según qué reseña
      // estuviera activa en ese momento — hasta pisándose con la tarjeta en
      // mobile. El título ahora fluye fijo desde acá, y solo el carrusel de
      // abajo (flex-1 + su propio justify-center) se centra en el espacio
      // que queda.
      // pt-36 en mobile: a medio camino entre pt-24 (donde quedaba "muy
      // arriba", pegado al navbar) y el borde superior del logo de la
      // reseña más alta (Raúl Andrés) — el punto más bajo al que puede
      // llegar el título sin arriesgarse a acercarse al carrusel según cuál
      // esté activa. md:pt-24 en desktop, sin cambios (ahí sí había lugar
      // de sobra).
      className="snap-section relative w-full flex flex-col items-center px-6 md:px-12 pt-36 md:pt-24 pb-16"
    >
      <div className="max-w-[1400px] w-full mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-secondary-foreground leading-[0.85] tracking-tight mb-14 md:mb-16 text-center md:text-left"
            style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}
          >
            Experiencias.
          </h2>
        </ScrollReveal>
      </div>

      <div className="flex-1 w-full flex flex-col justify-center min-h-0">
        <div className="max-w-[1400px] w-full mx-auto">
        <div className="flex items-center gap-2 md:gap-6 max-w-2xl mx-auto">
          <button
            onClick={prev}
            aria-label="Reseña anterior"
            className="text-primary-foreground/60 hover:text-primary-foreground transition-colors shrink-0"
          >
            <ChevronLeft size={28} />
          </button>

          {/* key={index}: al cambiar de reseña, React desmonta la anterior y
              monta esta de cero, así que animate-fade-in (una animación CSS
              por @keyframes, no atada a un ciclo de JS como whileInView/
              animate de framer-motion) corre de nuevo en cada cambio.
              Sin margin-top propio a propósito: el logo (absolute, así que
              no cuenta para el tamaño de este div) puede asomar -48px hacia
              arriba sin que nada se lo corte, ya que no hay ningún
              overflow:hidden alrededor. Un margin-top acá sesgaría el
              centrado vertical de las flechas (items-center centra la caja
              CON su margen, no el contenido de adentro — un margen asimétrico
              corre la tarjeta hacia abajo del centro real). */}
          <div key={index} className="w-full relative animate-fade-in">
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

            {/* Tarjeta blanca sólida con texto oscuro y estrellas doradas.
                pt-20 en vez de pt-16 (el valor del diseño original): con el
                logo ocupando la mitad superior de su propio alto (h-24)
                montado sobre el borde de la tarjeta, pt-16 dejaba apenas
                16px libres antes del título — de sobra en teoría, pero un
                font-black tan pesado se sentía "tocando" el logo. pt-20 deja
                32px.
                md:pt-20 explícito (repetido, no solo "pt-20" a secas): el
                original ya hacía lo mismo con "pt-16 md:pt-16" — sin el
                md:, en pantallas md+ "md:p-10" (que también define
                padding-top) le termina ganando en cascada a un "pt-20" sin
                prefijo, y el título vuelve a quedar pegado al logo ahí. */}
            <div className="bg-white rounded-[30px] p-6 md:p-10 pt-20 md:pt-20 shadow-2xl relative">
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

          <button
            onClick={next}
            aria-label="Siguiente reseña"
            className="text-primary-foreground/60 hover:text-primary-foreground transition-colors shrink-0"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {total > 1 && (
          <div className="flex justify-center gap-2 mt-6">
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
      </div>
    </section>
  );
};

export default TestimonialStack;
