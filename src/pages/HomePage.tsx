import { Linkedin, Instagram, Send, X, ArrowUp, ChevronDown, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

import ScrollReveal from "@/components/ScrollReveal";

import ClientCarousel from "@/components/ClientCarousel";
import TestimonialStack from "@/components/TestimonialStack";
import SectionBackgrounds from "@/components/SectionBackgrounds";
import { useActiveSection } from "@/hooks/useActiveSection";

const teamMembers = [
  {
    name: "Constanza Mackrey",
    role: "CEO - Marketing y Comunicación",
    image: "/Coni2.JPG",
    bio: "Directora ejecutiva de Mack Studio. Comunicadora Social especializada en Marketing Digital y Agromarketing.\n\nLidera la agencia con una visión estratégica orientada a resultados, integrando comunicación, negocio y posicionamiento de marca. Su diferencial radica en el profundo conocimiento del sector agroindustrial, que le permite desarrollar estrategias alineadas al contexto y a las necesidades reales de cada cliente.\n\nSupervisa y acompaña cada proyecto desde una mirada integral, asegurando coherencia, impacto y una comunicación con sentido.",
  },
  {
    name: "Belén Massigoge",
    role: "Marketing y Redes Sociales",
    image: "/Bele.JPG",
    bio: "Especialista en estrategias de marketing digital y gestión de redes sociales, con foco en la planificación, ejecución y optimización de contenido.\n\nSe encarga de diseñar estrategias y gestionar la comunicación digital de nuestros clientes, creando contenidos alineados a cada marca y a sus objetivos. Su trabajo busca garantizar coherencia, consistencia y un crecimiento sostenido del alcance y la interacción en redes sociales.",
  },
  {
    name: "Candela Montovi",
    role: "Marketing y Redes Sociales",
    image: "/Cande.png",
    bio: "Especialista en estrategias de marketing digital y gestión de redes sociales, con un enfoque orientado a la planificación, ejecución y optimización de contenidos.\n\nAcompaña a las marcas desde una mirada creativa y estratégica, desarrollando propuestas que generan valor y conexión real con sus audiencias. Su trabajo combina análisis, tendencias y creatividad para potenciar la presencia digital de cada cliente y lograr una comunicación coherente, efectiva y alineada a sus objetivos.",
  },
  {
    name: "Agostina Morey",
    role: "Diseño Gráfico",
    image: "/agos.png",
    bio: "Coordinadora del área de diseño gráfico de Mack Studio.\n\nResponsable de liderar y desarrollar la identidad visual de Mack Studio y de cada uno de sus clientes, asegurando coherencia, calidad y una estética alineada a la estrategia de comunicación.\n\nTrabaja en la conceptualización y creación de piezas visuales que reflejan la esencia de cada marca: desde el desarrollo de branding e identidad, hasta el diseño de contenidos para redes sociales, campañas digitales y materiales gráficos.\n\nSu enfoque combina creatividad y criterio estratégico, logrando que cada diseño no solo se vea bien, sino que comunique con claridad y propósito.",
  },
  {
    name: "Sofia Presa",
    role: "Comunicación Visual y Redes Sociales",
    image: "/sofia.jpg",
    bio: "Se especializa en la creación de contenido visual y la gestión de redes sociales, combinando diseño y comunicación para desarrollar piezas atractivas y funcionales.\n\nAcompaña la ejecución diaria de los proyectos, diseñando contenidos para redes y adaptando cada pieza a la identidad de marca de nuestros clientes. Su trabajo aporta dinamismo, coherencia visual y rapidez en la producción de contenido, contribuyendo a una comunicación efectiva y consistente.",
  },
  {
    name: "Juan Ignacio Suarez",
    role: "Desarrollo Web",
    image: "/juaniprueba4.jpg",
    bio: "Responsable del desarrollo de los proyectos digitales de Mack Studio, enfocado en crear sitios web modernos, funcionales y alineados a los objetivos de cada marca.\n\nDiseña y desarrolla plataformas optimizadas en rendimiento, asegurando una experiencia de usuario clara, ágil y profesional. Su trabajo garantiza que la presencia online de cada cliente no solo sea visualmente atractiva, sino también estratégica y efectiva.",
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
  { id: "nosotros", theme: "light" as const, bgColorClass: "bg-secondary", bgImage: "url('/fondo_verde_claro_mack.svg')" },
  { id: "clientes", theme: "dark" as const, bgColorClass: "bg-primary", bgImage: "url('/fondo_verde_oscuro_mack.svg')" },
  { id: "experiencia-0", theme: "dark" as const, bgColorClass: "bg-primary", bgImage: "url('/fondo_verde_oscuro_mack.svg')" },
  { id: "servicios", theme: "light" as const, bgColorClass: "bg-background", bgImage: "url('/fondo_claro_mack.svg')" },
  { id: "contacto", theme: "light" as const, bgColorClass: "bg-background", bgImage: "url('/fondo_verde_claro_mack.svg')" },
];

const ServicesSectionContent = ({ setSelectedService }: { setSelectedService: (i: number) => void }) => {
  return (
    <div className="w-full px-6 md:px-12 py-16 md:py-24">
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
                onClick={() => setSelectedService(i)}
                className="w-full text-left p-3 md:p-6 rounded-[20px] md:rounded-[25px] border border-primary/20 hover:border-primary transition-all duration-300 group flex flex-col items-center text-center min-h-[90px] md:min-h-[140px] justify-center relative shadow-sm"
                style={{ background: "rgba(143, 157, 103, 0.05)" }}
              >
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-sm md:text-lg font-bold text-primary mb-0.5 uppercase tracking-widest leading-tight">
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              Somos tu equipo estratégico de Agromarketing y Comunicación. Sabemos el esfuerzo que hay detrás de cada empresa, por eso queremos contar tu historia ayudándote a conectar con tu audiencia. Impulsamos tu marca y conectamos el Agro con las personas a través del marketing digital.
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
                    <p className="text-[9px] md:text-xs text-secondary-foreground/40 mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">Saber más →</p>
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
            <p className="text-sm md:text-lg text-primary-foreground/70 max-w-xl leading-relaxed mb-10 md:mb-16">
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
        className="snap-section relative w-full flex flex-col justify-center items-center"
      >
        <ServicesSectionContent setSelectedService={setSelectedService} />
      </section>

      <section
        id="contacto"
        className="snap-section relative w-full flex flex-col justify-center items-center px-6 md:px-12"
      >
        <div className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-14 items-center justify-center">
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
              className="relative w-full max-w-2xl bg-background rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden border border-primary/20"
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

                <h3 className="text-2xl md:text-4xl font-black text-primary mb-4 md:mb-6 tracking-tighter leading-none uppercase">
                  {servicesData[selectedService].name}
                </h3>

                <p className="text-[13px] md:text-lg text-foreground/80 leading-relaxed mb-6 md:mb-8">
                  {servicesData[selectedService].description}
                </p>

                {servicesData[selectedService].bullets && (
                  <div className="grid md:grid-cols-2 gap-y-3 gap-x-8">
                    {servicesData[selectedService].bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0" />
                        <p className="text-[12px] md:text-sm font-bold text-foreground/70 uppercase tracking-wide">
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

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[80] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-mack-olive shadow-xl hover:bg-white/20 transition-colors"
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
