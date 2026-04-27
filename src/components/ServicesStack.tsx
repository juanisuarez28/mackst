import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Service {
  code: string;
  name: string;
  description: string;
  bullets?: string[];
}

const services: Service[] = [
  {
    code: "01.",
    name: "MACK Strategy",
    description: "Planificación estratégica integral de comunicación y marketing, adaptada a cada marca. Creamos campañas digitales efectivas, gestionamos envíos masivos y construimos planes que conectan con el público objetivo.",
    bullets: ["Campañas digitales", "Comunicación estratégica", "Marketing & Branding", "Envíos masivos"],
  },
  {
    code: "02.",
    name: "MACK Social",
    description: "Gestión, asesoramiento y optimización de redes sociales. Diseñamos campañas creativas, generamos contenido relevante y realizamos análisis de métricas mensuales para potenciar resultados.",
    bullets: ["Gestión de redes", "Diseño de campañas", "Generación de contenido", "Análisis mensual de métricas"],
  },
  {
    code: "03.",
    name: "MACK Design",
    description: "Creamos y fortalecemos tu identidad visual: logotipo, branding, papelería, catálogos, folletería, revistas, packaging, cartelería, gráfica vehicular y mailing.",
    bullets: ["Logotipo & Branding", "Papelería & Catálogos", "Packaging & Cartelería", "Gráfica vehicular"],
  },
  {
    code: "04.",
    name: "MACK Web",
    description: "Diseño y desarrollo de sitios web responsivos, pensados para generar experiencias fluidas y profesionales. Optimizamos tu presencia con posicionamiento en Google y análisis de tráfico web.",
    bullets: ["Sitios web responsivos", "UX/UI profesional", "SEO & Posicionamiento", "Análisis de tráfico"],
  },
  {
    code: "05.",
    name: "MACK Media",
    description: "Producción de contenido visual de alto impacto: cobertura de fotos, videos institucionales, testimoniales, campañas y producciones audiovisuales que cuentan historias y transmiten emociones.",
    bullets: ["Fotografía profesional", "Videos institucionales", "Producciones audiovisuales", "Testimoniales"],
  },
  {
    code: "06.",
    name: "MACK Events",
    description: "Planificamos y organizamos tu evento corporativo de principio a fin. Desde la comunicación previa hasta la cobertura en vivo, logramos que tu marca brille en cada detalle.",
    bullets: ["Planificación de eventos", "Comunicación previa", "Cobertura en vivo", "Branding de evento"],
  },
  {
    code: "07.",
    name: "MACK Academy",
    description: "Cursos y capacitaciones diseñadas para potenciar habilidades en comunicación, marketing y gestión. Además, capacitaciones a medida para equipos empresariales.",
    bullets: ["Curso Community Manager", "Curso de Fotografía", "Curso de Marketing", "Comunicación Científica"],
  },
  {
    code: "08.",
    name: "MACK Consulting",
    description: "Acompañamos a tu empresa en la definición de estrategias, posicionamiento de marca y toma de decisiones, brindando una mirada profesional, externa y orientada a resultados.",
    bullets: ["Estrategia empresarial", "Posicionamiento de marca", "Toma de decisiones", "Mirada externa"],
  },
  {
    code: "09.",
    name: "MACK Merch",
    description: "Diseñamos y producimos merchandising corporativo que conecta tu marca con las personas: indumentaria, gorras, tazas, agendas, bolígrafos, bolsas, stands, materiales POP y más.",
    bullets: ["Indumentaria & Gorras", "Agendas & Bolígrafos", "Stands & POP", "Packaging de marca"],
  },
];

// Card accent colors cycling through brand palette
const cardAccents = [
  "#8f9d67", // mack green
  "#5a6b41",
  "#b5c48a",
  "#6b7c4e",
  "#8f9d67",
  "#4a5a35",
  "#a0b077",
  "#5a6b41",
  "#8f9d67",
];

const ServicesStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const n = services.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      id="servicios"
      style={{ height: `${n * 100}vh`, position: "relative" }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundImage: "url('/fondo_claro_mack.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-background flex items-center"
      >
        <div className="w-full h-full relative flex flex-col md:flex-row items-center px-6 md:px-12 max-w-[1400px] mx-auto">
          {/* Title - Fixed at top on mobile, static on desktop */}
          <div className="absolute top-0 left-0 w-full pt-28 px-6 pb-6 md:static md:w-[38%] md:pt-0 md:px-0 md:pb-0 flex flex-col justify-center items-start md:pl-8 select-none z-[100] bg-gradient-to-b from-background/80 to-transparent md:bg-none">
            <p className="text-[14px] md:text-[25px] tracking-[0.3em] text-mack-olive/60 uppercase mb-1 md:mb-4 font-bold">Nuestros</p>
            <h2
              className="font-black text-gray-900 leading-[0.82] tracking-tighter"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
            >
              Nuestros servicios.
            </h2>
            {/* Scroll indicator - only on desktop */}
            <div className="hidden md:flex mt-10 flex-col gap-2">
              {services.map((_, i) => (
                <ProgressDot
                  key={i}
                  index={i}
                  total={n}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Card Stack */}
          <div className="flex-1 w-full relative flex items-center justify-center h-full pt-20 md:pt-0">
            {services.map((service, i) => (
              <ServiceCard
                key={i}
                service={service}
                index={i}
                total={n}
                scrollYProgress={scrollYProgress}
                accent={cardAccents[i]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressDot: React.FC<{
  index: number;
  total: number;
  scrollYProgress: any;
}> = ({ index, total, scrollYProgress }) => {
  const step = 1 / (total - 1);
  const p = index * step;

  const opacity = useTransform(scrollYProgress, (val: number) => {
    const diff = Math.abs(val - p);
    if (diff < step * 0.5) return 1;
    return 0.25;
  });

  const width = useTransform(scrollYProgress, (val: number) => {
    const diff = Math.abs(val - p);
    if (diff < step * 0.5) return "2rem";
    return "0.5rem";
  });

  return (
    <motion.div
      style={{
        height: "3px",
        borderRadius: "9999px",
        backgroundColor: "#8f9d67",
        opacity,
        width,
      }}
      className="transition-all duration-300"
    />
  );
};

const ServiceCard: React.FC<{
  service: Service;
  index: number;
  total: number;
  scrollYProgress: any;
  accent: string;
}> = ({ service, index, total, scrollYProgress, accent }) => {
  const step = 1 / (total - 1);
  const p = index * step; // when this card is fully active

  // Each card:
  // - Before its step: hidden below (translateY 100vh)
  // - At its step: centered (translateY 0, scale 1, rotation 0)
  // - After its step (stacked below next): stays with slight offset/scale down
  const STACK_OFFSET = 12; // px between stacked cards
  const STACK_SCALE = 0.03; // scale reduction per stacked card

  const y = useTransform(scrollYProgress, (val: number) => {
    if (val < p - step * 0.5) {
      // Below: coming in from bottom
      const ratio = (p - val - step * 0.5) / (step * 0.5);
      const isMobile = window.innerWidth < 768;
      return `${Math.min(ratio * 120, isMobile ? 120 : 110)}vh`;
    }
    if (val >= p && val < 1) {
      // Stacked: how many cards are on top?
      const cardsOnTop = Math.round((val - p) / step);
      return `${cardsOnTop * STACK_OFFSET}px`;
    }
    return "0px";
  });

  const scale = useTransform(scrollYProgress, (val: number) => {
    if (val < p) return 1;
    const cardsOnTop = Math.min((val - p) / step, total - index - 1);
    return Math.max(1 - cardsOnTop * STACK_SCALE, 0.7);
  });

  const opacity = useTransform(scrollYProgress, (val: number) => {
    if (val < p - step * 0.8) return 0;
    const cardsOnTop = (val - p) / step;
    // Fade out very back cards
    if (cardsOnTop > 5) return Math.max(1 - (cardsOnTop - 5) * 0.3, 0);
    return 1;
  });

  const zIndex = useTransform(scrollYProgress, (val: number) => {
    if (val < p) return index;
    // When active, this card is on top; as new cards come, they go higher
    return index;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        y,
        scale,
        opacity,
        zIndex: index, // cards added later sit on top naturally
        width: "min(420px, 85vw)",
        transformOrigin: "top center",
      }}
      className="will-change-transform"
    >
      <div
        className="rounded-3xl shadow-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {/* Card accent bar */}
        <div style={{ height: "4px", background: accent }} />

        <div className="p-8 md:p-10">
          {/* Code & Name */}
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: accent }}
          >
            {service.code}
          </p>
          <h3
            className="font-black text-gray-900 leading-tight mb-4"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)" }}
          >
            {service.name}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            {service.description}
          </p>
          {service.bullets && (
            <ul className="space-y-2">
              {service.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: accent }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesStack;
