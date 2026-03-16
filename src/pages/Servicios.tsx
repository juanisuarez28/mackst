import { useState } from "react";
import { ChevronDown } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import DetailModal from "@/components/DetailModal";

const services = [
  {
    name: "Estrategia de Comunicación",
    shortDesc: "Planificación estratégica de comunicación integral para el sector agroindustrial.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    fullDesc: "Desarrollamos planes de comunicación integrales que alinean los objetivos de negocio con las necesidades comunicacionales de tu empresa.\n\nNuestro enfoque estratégico abarca desde el diagnóstico inicial hasta la implementación y medición de resultados, asegurando que cada acción de comunicación contribuya al crecimiento de tu marca en el sector agroindustrial.\n\nServicios incluidos:\n• Diagnóstico comunicacional\n• Plan de comunicación estratégica\n• Gestión de crisis\n• Relaciones con medios\n• Comunicación interna",
  },
  {
    name: "Marketing Digital",
    shortDesc: "Campañas digitales, redes sociales y presencia online para marcas del agro.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    fullDesc: "Diseñamos e implementamos estrategias de marketing digital específicas para el sector agroindustrial, maximizando el alcance y el impacto de tu marca en el ecosistema digital.\n\nCombinamos creatividad con datos para crear campañas que generan resultados medibles y construyen comunidades comprometidas alrededor de tu marca.\n\nServicios incluidos:\n• Gestión de redes sociales\n• Campañas de publicidad digital\n• Email marketing\n• SEO y SEM\n• Análisis y reportes de métricas",
  },
  {
    name: "Branding & Identidad",
    shortDesc: "Creación y gestión de marca, identidad visual y posicionamiento estratégico.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    fullDesc: "Creamos y fortalecemos identidades de marca que se destacan en el mercado agroindustrial. Desde el naming hasta el manual de marca completo, desarrollamos todos los elementos que conforman una identidad visual sólida y coherente.\n\nNuestro proceso de branding está diseñado para capturar la esencia de tu empresa y traducirla en una identidad que conecte emocionalmente con tus audiencias.\n\nServicios incluidos:\n• Naming y arquitectura de marca\n• Diseño de identidad visual\n• Manual de marca\n• Aplicaciones de marca\n• Estrategia de posicionamiento",
  },
];

const Servicios = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="Nuestros servicios."
        bgClass="bg-background"
        textClass="text-foreground"
        showArrow
        minHeight="min-h-[60vh]"
      />

      {/* Services Grid */}
      <section className="bg-background px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="border-2 border-foreground/20 rounded-2xl overflow-hidden group hover:border-foreground/40 transition-colors cursor-pointer"
                onClick={() => setSelectedService(i)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {service.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <div className="flex items-center justify-end mt-4">
                    <ChevronDown size={20} className="text-foreground/50 group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
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

export default Servicios;
