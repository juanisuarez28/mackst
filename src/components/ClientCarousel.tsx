import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const clients = [
  { name: "El Mingo", logo: "/clients/El-Mingo.png" },
  { name: "MC Agroservicios", logo: "/clients/Logo-MCAgroservicios.png" },
  { name: "Raul Andres", logo: "/clients/RaulAndres.png" },
  { name: "AAT", logo: "/clients/aat.png" },
  { name: "Agrowise", logo: "/clients/agrowise.png" },
  { name: "Grow Padel", logo: "/clients/growpadel.png" },
  { name: "Gym Best", logo: "/clients/gymbest.png" },
  { name: "IT", logo: "/clients/it.svg" },
  { name: "La Camisería", logo: "/clients/la_camiseria.JPG" },
  { name: "Las Nazarenas", logo: "/clients/lasnazarenas.svg" },
  { name: "LT", logo: "/clients/lt.png" },
  { name: "SyG", logo: "/clients/syg.png" },
  { name: "Vet San Jose", logo: "/clients/vet.sanjose.png" },
  { name: "Vetifarma", logo: "/clients/vetifarma.png" },
];

const ClientCarousel = () => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  // Responsive: 2 on mobile, 4 on desktop
  useEffect(() => {
    const update = () =>
      setVisibleCount(window.innerWidth >= 768 ? 4 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = clients.length - visibleCount;

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  // Auto-advance every 2 seconds
  useEffect(() => {
    const timer = setInterval(next, 2000);
    return () => clearInterval(timer);
  }, [next]);

  const slideWidth = 100 / visibleCount;

  return (
    <div className="relative flex items-center gap-2 md:gap-4 w-full">
      <button
        onClick={prev}
        className="text-primary-foreground/60 hover:text-primary-foreground transition-opacity shrink-0"
        aria-label="Anterior"
      >
        <ChevronLeft size={28} />
      </button>

      <div className="overflow-hidden flex-1">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * slideWidth}%)` }}
        >
          {clients.map((client, i) => (
            <div
              key={i}
              className="shrink-0 px-4 md:px-8"
              style={{ width: `${slideWidth}%` }}
            >
              <div className="flex items-center justify-center h-24 md:h-36 group">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110 grayscale brightness-200 opacity-60 hover:grayscale-0 hover:brightness-100 hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={next}
        className="text-primary-foreground/60 hover:text-primary-foreground transition-opacity shrink-0"
        aria-label="Siguiente"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default ClientCarousel;
