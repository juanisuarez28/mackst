import { Star } from "lucide-react";

const testimonials = [
  {
    name: "CLIENTE X",
    text: "Excelente servicio y atención personalizada. Lograron entender nuestra marca y comunicar nuestros valores de manera efectiva al público objetivo del sector agroindustrial.",
    rating: 5,
  },
  {
    name: "CLIENTE X",
    text: "Profesionales comprometidos con resultados. Su conocimiento del agro combinado con estrategias de marketing modernas nos ayudó a posicionarnos como líderes en nuestro segmento.",
    rating: 5,
  },
  {
    name: "CLIENTE X",
    text: "La mejor decisión fue confiar en Mack St. para nuestra comunicación. Su equipo entiende las particularidades del sector y ofrece soluciones creativas y efectivas.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <div key={i} className="relative">
          {/* Avatar placeholder */}
          <div className="flex justify-center mb-[-28px] relative z-10">
            <div className="w-14 h-14 rounded-full bg-accent border-4 border-primary flex items-center justify-center">
              <span className="text-accent-foreground text-xs font-bold">Logo</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-6 pt-10 text-center border border-primary-foreground/10">
            <h4 className="font-bold text-primary-foreground text-sm">{t.name}</h4>
            <p className="text-xs text-primary-foreground/70 mt-3 leading-relaxed">
              {t.text}
            </p>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mt-4">
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} size={18} className="fill-mack-olive text-mack-olive" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
