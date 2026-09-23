import { Linkedin, Instagram, Send, X, ArrowUp, ChevronDown, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useLayoutEffect, useRef, RefObject } from "react";

import ScrollReveal from "@/components/ScrollReveal";

import ClientCarousel from "@/components/ClientCarousel";
import TestimonialStack from "@/components/TestimonialStack";
import SectionBackgrounds from "@/components/SectionBackgrounds";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSectionTheme } from "@/hooks/useSectionTheme";
import { useEndSnapMarker } from "@/hooks/useEndSnapMarker";

const teamMembers = [
  {
    name: "Constanza Mackrey",
    role: "CEO & Strategy Lead",
    image: "/Coni2.JPG",
    bio: "Directora ejecutiva de Mack Studio.\n\nComunicadora Social especializada en Marketing Digital y Agromarketing. Lidera la agencia con una visión estratégica orientada a resultados, integrando comunicación, negocio y posicionamiento de marca. Su diferencial radica en el profundo conocimiento del sector agroindustrial, asegurando coherencia, impacto y una comunicación con sentido.",
  },
  {
    name: "Belén Massigoge",
    role: "Content Specialist & Quality Control",
    image: "/Bele.JPG",
    bio: "Especialista en planificación, gestión de redes sociales y control de calidad de contenidos.\n\nSe encarga de estructurar el enfoque comunicacional de las cuentas, el armado diario de contenidos para las redes sociales bajo lineamientos visuales y de supervisar, revisar y optimizar las planificaciones elaboradas por el equipo.",
  },
  {
    name: "Candela Montovi",
    role: "Content & Social Media Specialist",
    image: "/Cande.png",
    bio: "Especialista en planificación y gestión de redes sociales.\n\nSe encarga de cranear contenidos creativos y alineados a las tendencias actuales bajo los lineamientos visuales de la agencia, manteniendo un contacto directo y fluido con los clientes de sus cuentas.",
  },
  {
    name: "Agostina Morey",
    role: "Lead Designer & Brand Supervisor",
    image: "/agos.png",
    bio: "Coordinadora del área de diseño gráfico de Mack Studio.\n\nLidera y desarrolla la identidad visual de la agencia y sus clientes, asegurando calidad, coherencia estética y supervisando que todas las adaptaciones gráficas que se realizan cumplan con los lineamientos de marca.",
  },
  {
    name: "Sofia Presa",
    role: "Content & Social Media Specialist",
    image: "/sofia.jpg",
    bio: "Especialista en creación de contenido y gestión de redes sociales.\n\nAcompaña la ejecución diaria aportando dinamismo, agilidad y adaptando cada pieza a la identidad visual y comunicacional de los clientes.",
  },
  {
    name: "Juan Ignacio Suarez",
    role: "Web Developer",
    image: "/juaniprueba4.jpg",
    bio: "Responsable del desarrollo de los proyectos digitales de Mack Studio.\n\nDiseña y programa sitios web modernos, optimizados en rendimiento y enfocados en brindar una experiencia de usuario clara, ágil y estratégica.",
  },
];

const servicesData = [
  {
    code: "01.",
    name: "MACK Strategy",
    shortDescription: "Estrategia integral de marketing.",
    description: "Planificación estratégica integral de comunicación y marketing, adaptada a cada marca. Creamos campañas digitales efectivas, gestionamos envíos masivos y construimos planes que conectan con el público objetivo.",
    bullets: ["Campañas digitales", "Comunicación estratégica", "Marketing & Branding", "Envíos masivos"],
  },
  {
    code: "02.",
    name: "MACK Social",
    shortDescription: "Gestión estratégica de redes.",
    description: "Gestión, asesoramiento y optimización de redes sociales. Diseñamos campañas creativas, generamos contenido relevante y realizamos análisis de métricas mensuales para potenciar resultados.",
    bullets: ["Gestión de redes", "Diseño de campañas", "Generación de contenido", "Análisis mensual de métricas"],
  },
  {
    code: "03.",
    name: "MACK Design",
    shortDescription: "Identidad visual y branding.",
    description: "Creamos y fortalecemos tu identidad visual: logotipo, branding, papelería, catálogos, folletería, revistas, packaging, cartelería, gráfica vehicular y mailing.",
    bullets: ["Logotipo & Branding", "Papelería & Catálogos", "Packaging & Cartelería", "Gráfica vehicular"],
  },
  {
    code: "04.",
    name: "MACK Web",
    shortDescription: "Desarrollo web y SEO.",
    description: "Diseño y desarrollo de sitios web responsivos, pensados para generar experiencias fluidas y profesionales. Optimizamos tu presencia con posicionamiento en Google y análisis de tráfico web.",
    bullets: ["Sitios web responsivos", "UX/UI profesional", "SEO & Posicionamiento", "Análisis de tráfico"],
  },
  {
    code: "05.",
    name: "MACK Media",
    shortDescription: "Producción audiovisual de impacto.",
    description: "Producción de contenido visual de alto impacto: cobertura de fotos, videos institucionales, testimoniales, campañas y producciones audiovisuales que cuentan historias y transmiten emociones.",
    bullets: ["Fotografía profesional", "Videos institucionales", "Producciones audiovisuales", "Testimoniales"],
  },
  {
    code: "06.",
    name: "MACK Events",
    shortDescription: "Organización de eventos.",
    description: "Planificamos y organizamos tu evento corporativo de principio a fin. Desde la comunicación previa hasta la cobertura en vivo, logramos que tu marca brille en cada detalle.",
    bullets: ["Planificación de eventos", "Comunicación previa", "Cobertura en vivo", "Branding de evento"],
  },
  {
    code: "07.",
    name: "MACK Academy",
    shortDescription: "Capacitaciones y cursos.",
    description: "Cursos y capacitaciones diseñadas para potenciar habilidades en comunicación, marketing y gestión. Además, capacitaciones a medida para equipos empresariales.",
    bullets: ["Curso Community Manager", "Curso de Fotografía", "Curso de Marketing", "Comunicación Científica"],
  },
  {
    code: "08.",
    name: "MACK Consulting",
    shortDescription: "Asesoría estratégica empresarial.",
    description: "Acompañamos a tu empresa en la definición de estrategias, posicionamiento de marca y toma de decisiones, brindando una mirada profesional, externa y orientada a resultados.",
    bullets: ["Estrategia empresarial", "Posicionamiento de marca", "Toma de decisiones", "Mirada externa"],
  },
  {
    code: "09.",
    name: "MACK Merch",
    shortDescription: "Merchandising corporativo.",
    description: "Diseñamos y producimos merchandising corporativo que conecta tu marca con las personas: indumentaria, gorras, tazas, agendas, bolígrafos, bolsas, stands, materiales POP y más.",
    bullets: ["Indumentaria & Gorras", "Agendas & Bolígrafos", "Stands & POP", "Packaging de marca"],
  },
];

const testimonials = [
  {
    name: "Best Gym",
    text: "Excelente profesional! Siempre responden a las exigencias. Excelente!! Todo es positivo. Calidad y confianza",
    rating: 5,
    logo: "/clients/GymBest_logoNEGRO.png",
  },
  {
    name: "El Mingo",
    text: "Servicio activo y muy eficiente. La mejor experiencia porque están siempre atentas a las necesidades del cliente y en pos de los mejores resultados",
    rating: 5,
    logo: "/clients/elmingonegro.png",
  },
  {
    name: "Raúl Andrés Propiedades",
    text: "Desde la primera reunión con Coni, sentí que estábamos por el camino correcto. Hoy casi un año después, logramos una gran transformación y seguimos innovando juntos. ¡Excelente! El profesionalismo y el equipo de personas que componen Mack Studio hacen todo más sencillo. Capacidad, predisposición y comunicación al 100%. Belén es una genia !!",
    rating: 5,
    logo: "/clients/RaulAndres.png",
  },
];

// Fuente única con la info de cada sección: qué tema (claro/oscuro) le
// corresponde al Navbar, y qué fondo pinta SectionBackgrounds ahí — así los
// fondos siempre están en el mismo orden/lista que usa la detección de
// sección activa, sin repetir la data en dos lugares.
// "experiencia-0" es el id del <TestimonialStack>, que ocupa una sola sección.
const SECTIONS = [
  { id: "inicio", theme: "light" as const, bgColorClass: "bg-background", bgImage: "url('/fondo_claro_mack.svg')" },
  { id: "mision", theme: "dark" as const, bgColorClass: "bg-primary", bgImage: "url('/fondo_verde_oscuro_mack.svg')" },
  { id: "nosotros", theme: "white" as const, bgColorClass: "bg-secondary", bgImage: "url('/fondo_verde_claro_mack.svg')" },
  { id: "clientes", theme: "white" as const, bgColorClass: "bg-primary", bgImage: "url('/fondo_verde_oscuro_mack.svg')" },
  { id: "experiencia-0", theme: "white" as const, bgColorClass: "bg-primary", bgImage: "url('/fondo_verde_oscuro_mack.svg')" },
  { id: "servicios", theme: "light" as const, bgColorClass: "bg-background", bgImage: "url('/fondo_claro_mack.svg')" },
  { id: "contacto", theme: "white" as const, bgColorClass: "bg-background", bgImage: "url('/fondo_verde_claro_mack.svg')" },
];

const ServicesSectionContent = ({
  setSelectedService,
  contentRef,
  endTop,
}: {
  setSelectedService: (i: number) => void;
  contentRef: RefObject<HTMLDivElement>;
  endTop: number | null;
}) => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Cuántos botones, contando desde el primero, siguen siendo parada de snap
  // en mobile. Los que quedan pasado el marcador de fin de sección (endTop,
  // ver useEndSnapMarker) dejan de serlo: ahí ya se vio toda la lista, y una
  // parada más adelante solo dejaba el scroll clavado a mitad de camino con
  // los íconos de contacto asomando debajo de los últimos servicios.
  const [snapCount, setSnapCount] = useState(servicesData.length);

  useLayoutEffect(() => {
    const sectionEl = contentRef.current?.closest("section");
    if (endTop === null || !sectionEl) {
      setSnapCount(servicesData.length);
      return;
    }
    // offsetTop (a diferencia de getBoundingClientRect) ignora el transform
    // de la animación de ScrollReveal, que desplaza los botones mientras
    // aparecen.
    const topWithinSection = (el: HTMLElement) => {
      let top = 0;
      for (let node: HTMLElement | null = el; node && node !== sectionEl; node = node.offsetParent as HTMLElement | null) {
        top += node.offsetTop;
      }
      return top;
    };
    setSnapCount(buttonRefs.current.filter((btn) => btn && topWithinSection(btn) <= endTop + 1).length);
  }, [endTop, contentRef]);

  return (
    <div ref={contentRef} className="w-full px-6 md:px-12 pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="max-w-[1400px] w-full mx-auto">
        <ScrollReveal>
          <h2
            className="font-bold text-foreground leading-[0.85] tracking-tight mb-8 md:mb-16 text-center md:text-left whitespace-nowrap"
            style={{ fontSize: "clamp(1.75rem, 8.5vw, 8rem)" }}
          >
            Nuestros servicios.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
          {servicesData.map((service, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <button
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                onClick={() => setSelectedService(i)}
                // max-md:snap-point: en mobile, la lista de 9 servicios es
                // mucho más alta que una pantalla. Sin paradas intermedias,
                // "servicios" y "contacto" quedan como los únicos dos puntos
                // de snap "mandatory" del documento en ese tramo, así que un
                // scroll con algo de impulso podía saltar directo a
                // contacto sin llegar a mostrar los últimos servicios. Cada
                // botón hasta el marcador de fin de sección (ver snapCount)
                // es entonces también una parada válida.
                className={`w-full text-left p-3 md:p-6 rounded-[20px] md:rounded-[25px] border border-primary/20 hover:border-primary transition-all duration-300 group flex flex-col items-center text-center min-h-[90px] md:min-h-[140px] justify-center relative shadow-sm ${i < snapCount ? "max-md:snap-point" : ""}`}
                style={{ background: "rgba(143, 157, 103, 0.05)" }}
              >
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-sm md:text-lg font-bold text-secondary mb-0.5 uppercase tracking-widest leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-[9px] md:text-xs text-foreground/60 leading-relaxed font-medium uppercase tracking-wide">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="mt-1">
                  <ChevronDown className="text-primary/30 group-hover:text-primary transition-all duration-300 transform group-hover:translate-y-0.5" size={14} />
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useActiveSection(SECTIONS);
  const sectionTheme = useSectionTheme();

  // Ver useEndSnapMarker: marca dónde termina el contenido real de cada
  // sección para que, al llegar ahí, se vea completo terminando justo al
  // fondo de la pantalla — nunca la sección siguiente asomando debajo.
  const serviciosContentRef = useRef<HTMLDivElement>(null);
  const serviciosEndTop = useEndSnapMarker(serviciosContentRef);
  const contactoContentRef = useRef<HTMLDivElement>(null);
  const contactoEndTop = useEndSnapMarker(contactoContentRef);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    // scroll-snap-stop: always (used everywhere on the page — every section
    // boundary, every service item, every testimonial card) forces a
    // continuous/animated scroll to stop at every one it passes through.
    // A "smooth" scroll from deep in the page kept getting caught on the
    // way up — and toggling scroll-snap-type off mid-animation to work
    // around it raced with the browser's own "scrollend" timing, so the
    // button would jump to the top and then get snapped straight back to
    // where it started. An INSTANT jump sidesteps this cleanly: it isn't a
    // continuous scroll passing through intermediate snap points, it's a
    // single relocation straight to y=0 — which is already "inicio"'s own
    // valid snap point, so there's nothing left to correct afterward.
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleCardClick = (i: number) => {
    setSelectedMember(i);
  };
  const closeModal = () => setSelectedMember(null);

  return (
    // Sin fondo propio: si este wrapper pintara un color acá, taparía a
    // SectionBackgrounds (fixed, detrás de todo) en TODO el alto de la
    // página, ya que es un elemento normal (no positioned) más grande que
    // cualquier sección — exactamente lo que borraba los fondos.
    <div>
      <SectionBackgrounds sections={SECTIONS} />

      <section
        id="inicio"
        className="snap-section relative w-full flex flex-col justify-center items-center px-6 md:px-12 pt-24 pb-16"
      >
        <div className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <img
              src="/Logo-DarkGreen-01.svg"
              alt="Mack Studio"
              className="w-auto object-contain -ml-1"
              style={{
                height: "clamp(5rem, 16vw, 13rem)",
              }}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-foreground/80 mt-8 max-w-2xl leading-relaxed">
              Somos tu equipo estratégico de Agromarketing y Comunicación. Sabemos el esfuerzo que hay detrás de cada empresa, por eso queremos contar tu historia ayudándote a conectar con tu audiencia.
            </p>
            <p className="text-base md:text-lg text-foreground/80 mt-4 max-w-2xl leading-relaxed">
              Impulsamos tu marca y conectamos el Agro con las personas a través del marketing digital.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-sm md:text-base text-foreground/60 mt-8 max-w-xl italic leading-relaxed">
              "Somos la agencia que entiende de agro y de comunicación porque nacimos en el campo" <span className="not-italic font-semibold">El agro, pero con estrategia.</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section
        id="mision"
        className="snap-section relative w-full flex flex-col justify-center items-center px-6 md:px-12 py-12 md:py-32"
      >
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-20">
            <ScrollReveal delay={0.1}>
              <h2
                className="font-bold text-secondary-foreground leading-[0.85] tracking-tight mb-6 md:mb-16"
                style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
              >
                Misión.
              </h2>
              <p className="text-[13px] md:text-lg text-secondary-foreground/90 leading-snug md:leading-relaxed mb-3 md:mb-4">
                En Mack Studio acompañamos a las marcas del agro y otros sectores a comunicar con autenticidad, contando la historia que hay detrás de cada proyecto.
              </p>
              <p className="text-[13px] md:text-lg text-secondary-foreground/90 leading-snug md:leading-relaxed">
                Nuestra misión es crear estrategias creativas y efectivas, combinando comunicación, marketing y diseño con un profundo conocimiento técnico del campo, para lograr que cada empresa conecte de manera real con su audiencia.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2
                className="font-bold text-secondary-foreground leading-[0.85] tracking-tight mb-6 md:mb-16 mt-8 md:mt-0"
                style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
              >
                Visión.
              </h2>
              <p className="text-[13px] md:text-lg text-secondary-foreground/90 leading-snug md:leading-relaxed mb-3 md:mb-4">
                Ser la agencia de agromarketing y comunicación líder, reconocida por dar voz a quienes producen y por transformar el esfuerzo de las empresas en marcas sólidas, cercanas e innovadoras.
              </p>
              <p className="text-[13px] md:text-lg text-secondary-foreground/90 leading-snug md:leading-relaxed">
                Queremos consolidarnos como un aliado estratégico del sector agropecuario, llevando la comunicación a un nivel más humano, técnico y creativo, que inspire confianza y crecimiento sostenido.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section
        id="nosotros"
        className="snap-section relative w-full flex flex-col justify-center items-center px-6 md:px-12 py-20"
      >
        <div className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <h2
              className="font-bold text-secondary-foreground leading-[0.85] tracking-tight mb-10 md:mb-16"
              style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}
            >
              Nuestro equipo.
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-y-8 md:gap-10">
            {teamMembers.map((member, i) => (
              <div key={i} className="w-1/3 md:w-auto flex flex-col items-center px-1.5 md:px-0">
                <ScrollReveal delay={i * 0.08}>
                  <div
                    className="flex flex-col items-center text-center cursor-pointer group w-full md:w-44"
                    onClick={() => handleCardClick(i)}
                  >
                    <div className="w-full aspect-square md:w-40 md:h-40 rounded-full overflow-hidden mb-3 md:mb-4 ring-4 ring-transparent group-hover:ring-secondary-foreground/40 transition-all duration-300 group-hover:scale-105 transform shadow-lg">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xs md:text-base font-bold text-secondary-foreground leading-tight">{member.name}</h3>
                    <p className="text-[9px] md:text-xs text-secondary-foreground/60 mt-0.5 md:mt-1 uppercase tracking-wider leading-relaxed">{member.role}</p>
                    <p className="text-[9px] md:text-xs text-secondary-foreground/40 mt-2">Saber más →</p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="clientes"
        className="snap-section relative w-full flex flex-col justify-center items-center px-6 md:px-12"
      >
        <div className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <h2
              className="font-bold text-secondary-foreground leading-[0.85] tracking-tight mb-6 md:mb-10"
              style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}
            >
              Nuestros clientes.
            </h2>
            <p className="text-sm md:text-lg text-white max-w-xl leading-relaxed mb-10 md:mb-16">
              Trabajamos con las principales empresas del sector agroindustrial, construyendo relaciones de confianza a largo plazo.
            </p>
          </ScrollReveal>

          {/* Cartera de Clientes - Carousel */}
          <ScrollReveal>
            <h3 className="text-xl md:text-3xl font-bold text-secondary-foreground text-center mb-8 md:mb-12">
              Cartera de Clientes
            </h3>
            <ClientCarousel />
          </ScrollReveal>
        </div>
      </section>

      <TestimonialStack testimonials={testimonials} />

      <section
        id="servicios"
        className="snap-section relative w-full flex flex-col items-center"
        // "safe center" (vía style, no tiene clase Tailwind): centra igual
        // que antes cuando el contenido entra en la pantalla, pero si es más
        // alto que el viewport (título grande + grilla, en una pantalla baja
        // tipo Mac) no lo desborda por arriba tapando el navbar — cae a
        // alineado arriba en ese caso.
        style={{ justifyContent: "safe center" }}
      >
        <ServicesSectionContent
          setSelectedService={setSelectedService}
          contentRef={serviciosContentRef}
          endTop={serviciosEndTop}
        />
        {/* Marca el final real del contenido (ver useEndSnapMarker): sin
            esto, en mobile la lista de 9 servicios es más alta que la
            pantalla y el último punto de snap "válido" era el propio botón 9
            alineado arriba de todo, dejando el resto de esta sección (su
            padding) y el arranque de "Contacto" visibles al mismo tiempo
            debajo — nunca se llegaba a hacer el salto limpio a la siguiente
            sección. Cuando el contenido ya entra en un viewport (desktop),
            serviciosEndTop es null y esto no hace nada. */}
        {serviciosEndTop !== null && (
          <div className="snap-point absolute left-0 w-full pointer-events-none" style={{ top: `${serviciosEndTop}px` }} />
        )}
      </section>

      <section
        id="contacto"
        className="snap-section-last relative w-full flex flex-col justify-center items-center px-6 md:px-12 py-16 md:py-0"
      >
        <div ref={contactoContentRef} className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-14 items-center justify-center">
              {/* WhatsApp */}
              <a
                href="https://wa.me/5492266449690"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-background transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-bold tracking-wider text-white">WhatsApp</span>
              </a>

              {/* Mail */}
              <a href="mailto:mackstudio.cm@gmail.com" className="flex flex-col items-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-background transition-all duration-300">
                  <Send size={40} className="md:w-12 md:h-12" />
                </div>
                <span className="text-xs md:text-sm font-bold tracking-wider text-white">Email</span>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/mack-studio-agromarketing/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-background transition-all duration-300">
                  <Linkedin size={40} className="md:w-12 md:h-12" />
                </div>
                <span className="text-xs md:text-sm font-bold tracking-wider text-white">LinkedIn</span>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/mackstudio.cm/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-background transition-all duration-300">
                  <Instagram size={40} className="md:w-12 md:h-12" />
                </div>
                <span className="text-xs md:text-sm font-bold tracking-wider text-white">Instagram</span>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@mackstudio.cm" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-background transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-bold tracking-wider text-white">TikTok</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
        {/* Al ser la última sección, el min-height de .snap-section (para que
            ocupe una pantalla completa, como cualquier otra) deja espacio de
            sobra debajo cuando los 5 íconos entran holgados en una pantalla
            alta — y ese espacio vacío quedaba scrolleable, dejando "colgado"
            un tramo por debajo del TikTok. Este marcador ancla el final real
            del contenido con el fondo de la pantalla en ese caso. */}
        {contactoEndTop !== null && (
          <div className="snap-point absolute left-0 w-full pointer-events-none" style={{ top: `${contactoEndTop}px` }} />
        )}
      </section>

      {/* Team Member Modal */}
      {selectedMember !== null && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl bg-white rounded-[30px] md:rounded-[40px] shadow-2xl overflow-y-auto overflow-x-hidden max-h-[90vh] custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-40 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col md:flex-row min-h-[auto] md:min-h-[350px]">
              {/* Photo */}
              <div className="w-full md:w-[40%] h-64 md:h-auto relative flex-shrink-0 group">
                <img
                  src={teamMembers[selectedMember].image}
                  alt={teamMembers[selectedMember].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary/30 to-transparent mix-blend-multiply" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-2 text-primary/50">
                  {teamMembers[selectedMember].role}
                </p>
                <h3 className="text-2xl md:text-4xl font-black text-primary leading-[0.9] mb-4">
                  {teamMembers[selectedMember].name}
                </h3>
                <div className="w-12 h-1 bg-primary/10 rounded-full mb-4 md:mb-6" />
                <div className="max-h-none overflow-visible">
                  <p className="text-[13px] md:text-base text-primary/80 leading-relaxed whitespace-pre-line font-medium">
                    {teamMembers[selectedMember].bio}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden border border-primary/20"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all z-10"
              >
                <X size={18} />
              </button>

              <div className="p-6 md:p-12">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-primary/40 uppercase">
                    {servicesData[selectedService].code}
                  </span>
                  <div className="h-px flex-1 bg-primary/10" />
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-secondary mb-4 md:mb-6 tracking-tighter leading-none uppercase">
                  {servicesData[selectedService].name}
                </h3>

                <p className="text-[13px] md:text-lg text-foreground/80 leading-relaxed mb-6 md:mb-8">
                  {servicesData[selectedService].description}
                </p>

                {servicesData[selectedService].bullets && (
                  <div className="grid md:grid-cols-2 gap-y-3 gap-x-8">
                    {servicesData[selectedService].bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary mt-1.5 md:mt-2 flex-shrink-0" />
                        <p className="text-[12px] md:text-sm font-bold text-secondary uppercase tracking-wide">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-primary/5 p-6 md:p-8 flex justify-center border-t border-primary/10">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-primary/40 uppercase">
                  Mack Studio • Estrategia & Comunicación
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll to top button — mismos tres temas que el Navbar, así el
          ícono siempre contrasta contra el fondo de la sección en la que
          estás, en vez de un color fijo que se perdía en algunos fondos. */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[80] w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center shadow-xl transition-colors duration-500 ${
              sectionTheme === "light"
                ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
            aria-label="Subir"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
