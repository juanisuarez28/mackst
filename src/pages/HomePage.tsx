import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import DetailModal from "@/components/DetailModal";
import ClientCarousel from "@/components/ClientCarousel";
import Testimonials from "@/components/Testimonials";

const teamMembers = [
  {
    name: "Martina Ackermann",
    role: "Directora Creativa",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    bio: "Con más de 10 años de experiencia en comunicación y marketing, Martina lidera la visión creativa de Mack St. Su pasión por el sector agroindustrial y su formación en diseño estratégico la convierten en una profesional única.\n\nFormada en Comunicación Social y con posgrado en Marketing Digital, ha trabajado con las principales marcas del agro argentino.",
  },
  {
    name: "Santiago Kramer",
    role: "Director de Estrategia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Santiago aporta una visión estratégica integral al equipo. Especialista en planificación de medios y análisis de mercado.\n\nIngeniero Agrónomo de formación y MBA en Marketing, combina su conocimiento técnico del campo con herramientas de gestión empresarial.",
  },
  {
    name: "Valentina Suárez",
    role: "Directora de Contenidos",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Valentina es la voz detrás de las narrativas más impactantes de Mack St. Con una sólida formación en periodismo y comunicación corporativa.\n\nSu experiencia en medios especializados del sector agropecuario le permite entender las necesidades comunicacionales únicas de la industria.",
  },
];

const services = [
  {
    name: "Estrategia de Comunicación",
    shortDesc: "Planificación estratégica de comunicación integral para el sector agroindustrial.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    fullDesc: "Desarrollamos planes de comunicación integrales que alinean los objetivos de negocio con las necesidades comunicacionales de tu empresa.\n\nServicios incluidos:\n• Diagnóstico comunicacional\n• Plan de comunicación estratégica\n• Gestión de crisis\n• Relaciones con medios\n• Comunicación interna",
  },
  {
    name: "Marketing Digital",
    shortDesc: "Campañas digitales, redes sociales y presencia online para marcas del agro.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    fullDesc: "Diseñamos e implementamos estrategias de marketing digital específicas para el sector agroindustrial.\n\nServicios incluidos:\n• Gestión de redes sociales\n• Campañas de publicidad digital\n• Email marketing\n• SEO y SEM\n• Análisis y reportes de métricas",
  },
  {
    name: "Branding & Identidad",
    shortDesc: "Creación y gestión de marca, identidad visual y posicionamiento estratégico.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    fullDesc: "Creamos y fortalecemos identidades de marca que se destacan en el mercado agroindustrial.\n\nServicios incluidos:\n• Naming y arquitectura de marca\n• Diseño de identidad visual\n• Manual de marca\n• Aplicaciones de marca\n• Estrategia de posicionamiento",
  },
];

const HomePage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div>
      {/* ===== INICIO ===== */}
      <section id="inicio" className="bg-background min-h-screen relative flex flex-col justify-center px-6 md:px-12 pt-24 pb-16">
        <div className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <h1
              className="font-bold text-foreground leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
            >
              <span className="font-bold">mack</span> <span className="font-bold">st.</span>
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
      </section>

      {/* Misión & Visión */}
      <section className="bg-primary px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <h2
              className="font-bold text-primary-foreground leading-[0.85] tracking-tight mb-12 md:mb-20"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              Misión &<br />visión.
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <ScrollReveal delay={0.1}>
              <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                Nuestra misión es impulsar el crecimiento de las empresas del sector agroindustrial a través de estrategias de comunicación y marketing que generen valor, conecten con sus audiencias y fortalezcan su posicionamiento en el mercado.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                Creemos en el poder de la comunicación estratégica como herramienta transformadora. Trabajamos junto a nuestros clientes para construir narrativas auténticas que reflejen su identidad.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                Nuestra visión es ser la consultora líder en agromarketing de la región, reconocida por nuestra creatividad, innovación y compromiso con los resultados.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== NOSOTROS ===== */}
      <section id="nosotros" className="bg-secondary px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <h2
              className="font-bold text-secondary-foreground leading-[0.85] tracking-tight mb-16 md:mb-24"
              style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
            >
              Nuestro equipo.
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-foreground">{member.name}</h3>
                  <p className="text-sm text-secondary-foreground/70 mt-1 uppercase tracking-wider">{member.role}</p>
                  <button
                    onClick={() => setSelectedMember(i)}
                    className="text-xs text-secondary-foreground/60 mt-4 underline underline-offset-4 hover:text-secondary-foreground transition-colors"
                  >
                    Más sobre {member.name.split(" ")[0]}...
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Clientes */}
      <section className="bg-primary px-6 md:px-12 py-20 md:py-32">
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
        </div>

        {/* Cartera de Clientes - Carousel */}
        <ScrollReveal>
          <div className="max-w-[1400px] w-full mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">
              Cartera de Clientes
            </h3>
            <ClientCarousel />
          </div>
        </ScrollReveal>

        {/* Clientes Satisfechos */}
        <ScrollReveal>
          <div className="max-w-[1400px] w-full mx-auto mt-24">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">
              Clientes Satisfechos
            </h3>
            <Testimonials />
          </div>
        </ScrollReveal>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section id="servicios" className="bg-background px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <h2
              className="font-bold text-foreground leading-[0.85] tracking-tight mb-16 md:mb-24"
              style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
            >
              Nuestros servicios.
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className="border-2 border-foreground/20 rounded-2xl overflow-hidden group hover:border-foreground/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedService(i)}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{service.shortDesc}</p>
                    <div className="flex items-center justify-end mt-4">
                      <ChevronDown size={20} className="text-foreground/50 group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACTO ===== */}
      <section id="contacto" className="bg-background px-6 md:px-12 py-20 md:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] w-full mx-auto">
          <ScrollReveal>
            <h2
              className="font-bold text-foreground leading-[0.85] tracking-tight mb-8"
              style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
            >
              Contacto.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
              Próximamente más información. Mientras tanto, no dudes en comunicarte con nosotros.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Modals */}
      {selectedMember !== null && (
        <DetailModal
          isOpen={true}
          onClose={() => setSelectedMember(null)}
          image={teamMembers[selectedMember].image}
          title={teamMembers[selectedMember].name}
          subtitle={teamMembers[selectedMember].role}
          description={teamMembers[selectedMember].bio}
        />
      )}
      {selectedService !== null && (
        <DetailModal
          isOpen={true}
          onClose={() => setSelectedService(null)}
          image={services[selectedService].image}
          title={services[selectedService].name}
          description={services[selectedService].fullDesc}
        />
      )}
    </div>
  );
};

export default HomePage;
