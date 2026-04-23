import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const clients = Array.from({ length: 8 }, (_, i) => ({
  name: `Cliente ${i + 1}`,
}));

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
              className="shrink-0 px-2 md:px-4"
              style={{ width: `${slideWidth}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-primary-foreground/15 border-2 border-primary-foreground/20 flex items-center justify-center mx-auto">
                  <span className="text-primary-foreground/40 text-xs font-medium">
                    LOGO
                  </span>
                </div>
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
