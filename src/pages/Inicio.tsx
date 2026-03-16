import HeroSection from "@/components/HeroSection";

const Inicio = () => {
  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="mack st."
        subtitle="Agromarketing & Comunicación"
        description="Somos una consultora especializada en comunicación estratégica y marketing para el sector agroindustrial. Conectamos marcas con sus audiencias a través de estrategias innovadoras y creativas."
        bgClass="bg-background"
        textClass="text-foreground"
        minHeight="min-h-screen"
      />

      {/* Misión & Visión */}
      <section className="bg-primary px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-[1400px] w-full mx-auto">
          <h2
            className="font-heading font-bold text-primary-foreground leading-[0.85] tracking-tight mb-12 md:mb-20"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Misión &<br />visión.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed">
              Nuestra misión es impulsar el crecimiento de las empresas del sector agroindustrial a través de estrategias de comunicación y marketing que generen valor, conecten con sus audiencias y fortalezcan su posicionamiento en el mercado.
            </p>
            <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed">
              Creemos en el poder de la comunicación estratégica como herramienta transformadora. Trabajamos junto a nuestros clientes para construir narrativas auténticas que reflejen su identidad y los diferencien en un mercado cada vez más competitivo.
            </p>
            <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed">
              Nuestra visión es ser la consultora líder en agromarketing de la región, reconocida por nuestra creatividad, innovación y compromiso con los resultados. Aspiramos a ser el socio estratégico de referencia para las marcas del agro.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
