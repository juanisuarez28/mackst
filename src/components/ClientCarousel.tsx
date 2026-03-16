import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const clients = Array.from({ length: 8 }, (_, i) => ({
  name: `Cliente ${i + 1}`,
}));

const ClientCarousel = () => {
  const [offset, setOffset] = useState(0);
  const visibleCount = 4;
  const maxOffset = Math.max(0, clients.length - visibleCount);

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  return (
    <div className="relative flex items-center gap-4">
      <button
        onClick={prev}
        disabled={offset === 0}
        className="text-primary-foreground/60 hover:text-primary-foreground disabled:opacity-30 transition-opacity shrink-0"
      >
        <ChevronLeft size={32} />
      </button>

      <div className="overflow-hidden flex-1">
        <div
          className="flex gap-8 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${offset * (100 / visibleCount)}%)` }}
        >
          {clients.map((client, i) => (
            <div
              key={i}
              className="shrink-0 flex flex-col items-center"
              style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 8 / visibleCount}px * ${visibleCount})` }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary-foreground/15 border-2 border-primary-foreground/20 flex items-center justify-center">
                <span className="text-primary-foreground/40 text-xs font-medium">LOGO</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={next}
        disabled={offset >= maxOffset}
        className="text-primary-foreground/60 hover:text-primary-foreground disabled:opacity-30 transition-opacity shrink-0"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default ClientCarousel;
