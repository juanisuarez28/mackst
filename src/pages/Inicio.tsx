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
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="flex flex-col gap-4">
              <h2
                className="font-heading font-bold text-primary-foreground leading-[0.85] tracking-tight mb-4"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
              >
                Misión.
              </h2>
              <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                En Mack Studio acompañamos a las marcas del agro y otros sectores a comunicar con autenticidad, contando la historia que hay detrás de cada proyecto.
              </p>
              <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                Nuestra misión es crear estrategias creativas y efectivas, combinando comunicación, marketing y diseño con un profundo conocimiento técnico del campo, para lograr que cada empresa conecte de manera real con su audiencia.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2
                className="font-heading font-bold text-primary-foreground leading-[0.85] tracking-tight mb-4"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
              >
                Visión.
              </h2>
              <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                Ser la agencia de agromarketing y comunicación líder, reconocida por dar voz a quienes producen y por transformar el esfuerzo de las empresas en marcas sólidas, cercanas e innovadoras.
              </p>
              <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                Queremos consolidarnos como un aliado estratégico del sector agropecuario, llevando la comunicación a un nivel más humano, técnico y creativo, que inspire confianza y crecimiento sostenido.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
