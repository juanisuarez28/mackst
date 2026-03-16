import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import DetailModal from "@/components/DetailModal";

const teamMembers = [
  {
    name: "Martina Ackermann",
    role: "Directora Creativa",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    bio: "Con más de 10 años de experiencia en comunicación y marketing, Martina lidera la visión creativa de Mack St. Su pasión por el sector agroindustrial y su formación en diseño estratégico la convierten en una profesional única que combina creatividad con conocimiento sectorial.\n\nFormada en Comunicación Social y con posgrado en Marketing Digital, ha trabajado con las principales marcas del agro argentino, desarrollando campañas que han sido reconocidas en la industria.",
  },
  {
    name: "Santiago Kramer",
    role: "Director de Estrategia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Santiago aporta una visión estratégica integral al equipo. Especialista en planificación de medios y análisis de mercado, es responsable de diseñar las estrategias de comunicación que conectan a nuestros clientes con sus audiencias de manera efectiva.\n\nIngeniero Agrónomo de formación y MBA en Marketing, combina su conocimiento técnico del campo con herramientas de gestión empresarial de vanguardia.",
  },
  {
    name: "Valentina Suárez",
    role: "Directora de Contenidos",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Valentina es la voz detrás de las narrativas más impactantes de Mack St. Con una sólida formación en periodismo y comunicación corporativa, se especializa en crear contenidos que informan, inspiran y generan engagement.\n\nSu experiencia en medios especializados del sector agropecuario le permite entender las necesidades comunicacionales únicas de la industria y traducirlas en historias que resuenan.",
  },
];

const Nosotros = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="Nuestro equipo."
        bgClass="bg-secondary"
        textClass="text-secondary-foreground"
        showArrow
        minHeight="min-h-[60vh]"
      />

      {/* Team Grid */}
      <section className="bg-secondary px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold text-secondary-foreground">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-secondary-foreground/70 mt-1 uppercase tracking-wider">
                  {member.role}
                </p>
                <button
                  onClick={() => setSelectedMember(i)}
                  className="font-body text-xs text-secondary-foreground/60 mt-4 underline underline-offset-4 hover:text-secondary-foreground transition-colors"
                >
                  Más sobre {member.name.split(" ")[0]}...
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Clientes */}
      <section className="bg-primary px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-[1400px] w-full mx-auto">
          <h2
            className="font-heading font-bold text-primary-foreground leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Nuestros<br />clientes.
          </h2>
          <p className="font-body text-sm md:text-base text-primary-foreground/70 mt-8 max-w-xl leading-relaxed">
            Trabajamos con las principales empresas del sector agroindustrial, construyendo relaciones de confianza a largo plazo.
          </p>
        </div>
      </section>

      {/* Team Modal */}
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
    </div>
  );
};

export default Nosotros;
