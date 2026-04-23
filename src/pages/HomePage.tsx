import { Linkedin, Instagram, Send, X, ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import ScrollReveal from "@/components/ScrollReveal";

import ClientCarousel from "@/components/ClientCarousel";
import Testimonials from "@/components/Testimonials";
import CylinderScroll, { StickySection } from "@/components/CylinderScroll";

const teamMembers = [
  {
    name: "Constanza Mackrey",
    role: "Fundadora",
    image: "https://ui-avatars.com/api/?name=Constanza+Mackrey&size=400&background=5a6b41&color=fff&bold=true",
    bio: "Fundadora de Mack Studio. Comunicadora Social especializada en Marketing Digital y Agromarketing.\n\nLidera la agencia con una visión estratégica única, combinando su formación en comunicación con un profundo conocimiento del sector agroindustrial.",
  },
  {
    name: "Belén Massigoge",
    role: "Redes Sociales y Marketing",
    image: "https://ui-avatars.com/api/?name=Belén+Massigoge&size=400&background=8f9d67&color=fff&bold=true",
    bio: "Especialista en gestión de redes sociales y estrategias de marketing digital.\n\nSe encarga de crear y gestionar el contenido de nuestros clientes en redes sociales, asegurando coherencia de marca y maximizando el alcance orgánico.",
  },
  {
    name: "Candela Montovi",
    role: "Redes Sociales y Marketing",
    image: "https://ui-avatars.com/api/?name=Candela+Montovi&size=400&background=6b7c4e&color=fff&bold=true",
    bio: "Especialista en gestión de redes sociales y estrategias de marketing digital.\n\nAcompaña a las marcas en su presencia digital con creatividad y datos, generando contenido que conecta con las audiencias del sector agroindustrial.",
  },
  {
    name: "Agostina Morey",
    role: "Diseñadora Gráfica",
    image: "https://ui-avatars.com/api/?name=Agostina+Morey&size=400&background=b5c48a&color=3d4a2a&bold=true",
    bio: "Diseñadora Gráfica a cargo de la identidad visual de Mack Studio y sus clientes.\n\nCrea piezas visuales que transmiten la esencia de cada marca: desde logos y branding hasta material gráfico para redes y campañas digitales.",
  },
  {
    name: "Juan Ignacio Suárez",
    role: "Desarrollo Web",
    image: "https://ui-avatars.com/api/?name=Juan+Ignacio+Suarez&size=400&background=4a5a35&color=fff&bold=true",
    bio: "Desarrollador web responsable de los proyectos digitales de Mack Studio.\n\nDiseña y desarrolla sitios web modernos, funcionales y optimizados para SEO, asegurando que la presencia online de cada cliente sea impecable.",
  },
];

const servicesData = [
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

const cardAccents = [
  "#8f9d67", "#5a6b41", "#b5c48a", "#6b7c4e", "#8f9d67", "#4a5a35", "#a0b077", "#5a6b41", "#8f9d67"
];


const HomePage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [modalPos, setModalPos] = useState<{ x: number; y: number; mobile: boolean } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleCardEnter = (i: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Mobile: center on screen
      setModalPos({ x: window.innerWidth / 2, y: window.innerHeight / 2, mobile: true });
    } else {
      // Desktop: above the card
      const rect = e.currentTarget.getBoundingClientRect();
      const MODAL_W = Math.min(560, window.innerWidth - 32);
      const rawX = rect.left + rect.width / 2;
      const clampedX = Math.max(MODAL_W / 2 + 16, Math.min(window.innerWidth - MODAL_W / 2 - 16, rawX));
      setModalPos({ x: clampedX, y: rect.top, mobile: false });
    }
    setSelectedMember(i);
  };
  const handleCardLeave = () => {
    // On mobile, modal stays open until X is tapped
    if (modalPos?.mobile) return;
    closeTimeoutRef.current = setTimeout(() => setSelectedMember(null), 150);
  };
  const handleModalEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };
  const handleModalLeave = () => {
    if (modalPos?.mobile) return;
    setSelectedMember(null);
  };
  const closeModal = () => setSelectedMember(null);

  const sections: StickySection[] = [
    {
      id: "inicio",
      bgColorClass: "bg-background",
      bgImage: "url('/fondo_claro_mack.png')",
      scrollWeight: 0.8,
      content: (
        <div id="inicio" className="w-full px-6 md:px-12 pt-24 pb-16 flex flex-col justify-center items-center">
          <div className="max-w-[1400px] w-full mx-auto">
            <ScrollReveal>
              <h1
                className="font-black text-foreground leading-[0.8] tracking-tighter flex items-start"
                style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
              >
                <span className="font-[900]">mack</span>
                <span className="text-[0.35em] font-black ml-1 mt-[0.15em]" style={{ color: "#8f9d67" }}>st.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xl md:text-3xl text-foreground mt-4 font-medium">
                Agromarketing & Comunicación
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-sm md:text-lg text-foreground/80 mt-8 max-w-2xl leading-relaxed">
                Somos tu equipo estratégico de Agromarketing y Comunicación. Sabemos el esfuerzo que hay detrás de cada empresa, por eso queremos contar tu historia ayudándote a conectar con tu audiencia. Impulsamos tu marca y conectamos el Agro con las personas a través del marketing digital.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-sm md:text-base text-foreground/60 mt-8 max-w-xl italic leading-relaxed">
                "Somos la agencia que entiende de agro y de comunicación, porque nacimos en el campo" <span className="not-italic font-semibold">El agro, pero con estrategia.</span>
              </p>
            </ScrollReveal>
          </div>
        </div>
      ),
    },
    {
      bgColorClass: "bg-primary",
      bgImage: "url('/fondo_verde_oscuro_mack.png')",
      scrollWeight: typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 1.2,
      content: (
        <div className="w-full px-6 md:px-12 py-20 md:py-32 flex flex-col justify-center items-center">
          <div className="max-w-[1400px] w-full mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <ScrollReveal delay={0.1}>
                <h2
                  className="font-bold text-primary-foreground leading-[0.85] tracking-tight mb-8"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
                >
                  Misión.
                </h2>
                <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed mb-4">
                  En Mack Studio acompañamos a las marcas del agro y otros sectores a comunicar con autenticidad, contando la historia que hay detrás de cada proyecto.
                </p>
                <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                  Nuestra misión es crear estrategias creativas y efectivas, combinando comunicación, marketing y diseño con un profundo conocimiento técnico del campo, para lograr que cada empresa conecte de manera real con su audiencia.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <h2
                  className="font-bold text-primary-foreground leading-[0.85] tracking-tight mb-8"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
                >
                  Visión.
                </h2>
                <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed mb-4">
                  Ser la agencia de agromarketing y comunicación líder, reconocida por dar voz a quienes producen y por transformar el esfuerzo de las empresas en marcas sólidas, cercanas e innovadoras.
                </p>
                <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                  Queremos consolidarnos como un aliado estratégico del sector agropecuario, llevando la comunicación a un nivel más humano, técnico y creativo, que inspire confianza y crecimiento sostenido.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "nosotros",
      bgColorClass: "bg-secondary",
      bgImage: "url('/fondo_verde_claro_mack.png')",
      scrollWeight: 1.2,
      content: (
        <div id="nosotros" className="w-full h-full flex flex-col justify-center items-center px-6 md:px-12 py-20">
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
                      onMouseEnter={(e) => handleCardEnter(i, e)}
                      onMouseLeave={handleCardLeave}
                      onClick={(e) => handleCardEnter(i, e)}
                    >
                      <div className="w-full aspect-square md:w-40 md:h-40 rounded-full overflow-hidden mb-3 md:mb-4 ring-4 ring-transparent group-hover:ring-secondary-foreground/40 transition-all duration-300 group-hover:scale-105 transform">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-xs md:text-base font-bold text-secondary-foreground leading-tight">{member.name}</h3>
                      <p className="text-[9px] md:text-xs text-secondary-foreground/60 mt-0.5 md:mt-1 uppercase tracking-wider leading-relaxed">{member.role}</p>
                      <p className="hidden md:block text-xs text-secondary-foreground/40 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Ver más →</p>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "clientes",
      bgColorClass: "bg-primary",
      bgImage: "url('/fondo_verde_oscuro_mack.png')",
      scrollWeight: 1.2,
      content: (
        <div className="w-full px-6 md:px-12 flex flex-col justify-center items-center h-full">
          <div className="max-w-[1400px] w-full mx-auto">
            <ScrollReveal>
              <h2
                className="font-bold text-primary-foreground leading-[0.85] tracking-tight mb-8"
                style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
              >
                Nuestros<br />clientes.
              </h2>
              <p className="text-sm md:text-base text-primary-foreground/70 max-w-xl leading-relaxed mb-16">
                Trabajamos con las principales empresas del sector agroindustrial, construyendo relaciones de confianza a largo plazo.
              </p>
            </ScrollReveal>

            {/* Cartera de Clientes - Carousel */}
            <ScrollReveal>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">
                Cartera de Clientes
              </h3>
              <ClientCarousel />
            </ScrollReveal>
          </div>
        </div>
      ),
    },
    {
      bgColorClass: "bg-primary",
      bgImage: "url('/fondo_verde_oscuro_mack.png')",
      scrollWeight: 1.2,
      content: (
        <div className="w-full px-6 md:px-12 flex flex-col justify-center items-center h-full">
          <div className="max-w-[1400px] w-full mx-auto">
            {/* Clientes Satisfechos */}
            <ScrollReveal>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">
                  Clientes Satisfechos
                </h3>
                <Testimonials />
              </div>
            </ScrollReveal>
          </div>
        </div>
      ),
    },
    // SERVICES STACKED SECTIONS
    ...servicesData.map((service, i) => ({
      id: i === 0 ? "servicios" : undefined,
      bgColorClass: "bg-background",
      bgImage: "url('/fondo_claro_mack.png')",
      isStack: true,
      scrollWeight: 0.5, // Faster stacking for services
      content: (
        <div className="w-full h-full flex items-center px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
          {/* Card Container (Always stays at flex-1 to occupy 62% if title exists or same space if not) */}
          <div className="flex-1 relative flex items-center justify-center h-full">
            <div
              className="rounded-3xl shadow-2xl overflow-hidden w-full max-w-[420px]"
              style={{
                background: "white",
                border: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ height: "4px", background: cardAccents[i] }} />
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: cardAccents[i] }}>
                  {service.code}
                </p>
                <h3 className="font-black text-gray-900 leading-tight mb-4 text-2xl md:text-3xl">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {service.description}
                </p>
                {service.bullets && (
                  <ul className="space-y-2">
                    {service.bullets.map((b, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cardAccents[i] }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Title Column - remains as is */}
          <div className="hidden md:flex w-[38%] flex-col justify-center items-start md:pl-8 select-none pointer-events-none">
            {i === 0 && (
              <>
                <p className="text-[25px] tracking-[0.3em] text-foreground/40 uppercase mb-4">Nuestros</p>
                <h2
                  className="font-black text-foreground leading-[0.82] tracking-tighter text-[6.5rem]"
                >
                  servicios.
                </h2>
              </>
            )}
          </div>
        </div>
      )
    })),
    // CONTACT SECTION
    {
      id: "contacto",
      bgColorClass: "bg-background",
      bgImage: "url('/fondo_verde_claro_mack.png')",
      scrollWeight: 0.8,
      content: (
        <div className="w-full px-6 md:px-12 flex flex-col justify-center items-center h-full">
          <div className="max-w-[1400px] w-full mx-auto">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-10 items-center justify-center">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/5492266449690"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-green-500 transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-xs md:text-sm font-bold tracking-wider text-white">+54 9 2266 449690</span>
                </a>

                {/* Mail */}
                <a href="mailto:mackstudio.cm@gmail.com" className="flex flex-col items-center group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-background transition-all duration-300">
                    <Send size={40} className="md:w-12 md:h-12" />
                  </div>
                  <span className="text-xs md:text-sm font-bold tracking-wider text-white">mackstudio.cm@gmail.com</span>
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
                  <span className="text-xs md:text-sm font-bold tracking-wider text-white">@mackstudio.cm</span>
                </a>

                {/* TikTok */}
                <a href="https://www.tiktok.com/@mackstudio.cm" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-background transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-12 md:h-12">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                    </svg>
                  </div>
                  <span className="text-xs md:text-sm font-bold tracking-wider text-white">@mackstudio.cm</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-black">
      <CylinderScroll sections={sections} />

      {/* Team Member Modal */}
      {selectedMember !== null && modalPos !== null && (
        <>
          {/* Mobile backdrop */}
          {modalPos.mobile && (
            <div
              className="fixed inset-0 z-[99] bg-black/60"
              onClick={closeModal}
            />
          )}

          <div
            style={modalPos.mobile ? {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 100,
              width: "min(560px, calc(100vw - 32px))",
              pointerEvents: "none",
            } : {
              position: "fixed",
              left: `${modalPos.x}px`,
              top: `${modalPos.y - 20}px`,
              transform: "translate(-50%, -100%)",
              zIndex: 100,
              width: "min(560px, calc(100vw - 32px))",
              pointerEvents: "none",
            }}
          >
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: "rgba(143, 157, 103, 0.98)", // Mack Olive
                backdropFilter: "blur(40px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 28px 70px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
                pointerEvents: "auto",
              }}
              onMouseEnter={handleModalEnter}
              onMouseLeave={handleModalLeave}
            >
              {/* Close button — always on mobile */}
              {modalPos.mobile && (
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-black/50 hover:text-black transition-all"
                  aria-label="Cerrar"
                >
                  <X size={14} />
                </button>
              )}
              <div className="flex flex-col md:flex-row">
                {/* Photo: top on mobile, left on desktop */}
                <div className="w-full h-52 md:w-44 md:h-auto flex-shrink-0 relative overflow-hidden">
                  <img
                    src={teamMembers[selectedMember].image}
                    alt={teamMembers[selectedMember].name}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: modalPos.mobile
                        ? "linear-gradient(to bottom, transparent 55%, rgba(143, 157, 103, 0.6))"
                        : "linear-gradient(to right, transparent 55%, rgba(143, 157, 103, 0.5))",
                    }}
                  />
                </div>
                {/* Info */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                  <p
                    className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-black/40"
                  >
                    {teamMembers[selectedMember].role}
                  </p>
                  <h3 className="text-lg md:text-xl font-black text-white leading-tight">
                    {teamMembers[selectedMember].name}
                  </h3>
                  <div
                    style={{ width: "32px", height: "2px", background: "rgba(0,0,0,0.2)", borderRadius: "2px", margin: "10px 0" }}
                  />
                  <p className="text-xs text-black/70 leading-relaxed whitespace-pre-line">
                    {teamMembers[selectedMember].bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Services Title (Fixed, single instance) */}
      <ServicesMobileTitle />

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

const ServicesMobileTitle = () => {
  const { scrollYProgress } = useScroll();
  // Services start after ~60% of the page
  // We'll fade it in/out precisely for the services block
  const opacity = useTransform(scrollYProgress, [0.52, 0.55, 0.92, 0.98], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.52, 0.55], [10, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="md:hidden fixed top-20 left-0 w-full z-[70] flex flex-col items-center pointer-events-none text-center"
    >
      <p className="text-[14px] tracking-[0.3em] text-foreground/40 uppercase mb-1 font-bold">Nuestros</p>
      <h2 className="font-black text-gray-900 leading-[0.82] tracking-tighter text-4xl">
        servicios.
      </h2>
    </motion.div>
  );
};

export default HomePage;
