import { useEffect, useState } from "react";
import { useSectionTheme } from "@/hooks/useSectionTheme";

interface SectionDotsEntry {
  id: string;
  label: string;
}

/**
 * Columna de guiones fija a la derecha (solo desktop — en mobile no hay
 * espacio lateral para esto, ver ScrollProgressBar) que marca en qué
 * sección está el usuario y permite saltar directo a cualquiera. Pensada
 * para que, además de la pista inicial en "inicio" (ver el botón "Descubrí
 * más" en HomePage), quede una referencia constante de que la página sigue
 * más abajo mientras se recorre.
 *
 * Escucha el mismo evento "section-change" que ya emite useActiveSection y
 * que Navbar usa para resaltar su propio item activo — mismo mecanismo,
 * sin agregar un segundo IntersectionObserver.
 */
const SectionDots = ({ sections }: { sections: SectionDotsEntry[] }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const theme = useSectionTheme();

  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      setActiveId((e as CustomEvent).detail as string);
    };
    window.addEventListener("section-change", handleSectionChange);
    return () => window.removeEventListener("section-change", handleSectionChange);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Mismo criterio de color que Navbar/el botón de subir: "white" fuerza
  // blanco puro (más contraste sobre fondos con foto/textura), "dark" usa
  // el beige de marca, "light" el verde primario.
  const dashColorClass = theme === "dark" ? "bg-mack-cream" : theme === "white" ? "bg-white" : "bg-primary";

  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          aria-label={`Ir a ${section.label}`}
          aria-current={activeId === section.id ? "true" : undefined}
          className="group flex items-center justify-center py-2"
        >
          <span
            className={`block h-[3px] rounded-full transition-all duration-300 ${dashColorClass} ${
              activeId === section.id ? "w-7 opacity-100" : "w-4 opacity-30 group-hover:opacity-70"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default SectionDots;
