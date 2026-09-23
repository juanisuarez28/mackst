import { useEffect, useState } from "react";
import { useSectionTheme } from "@/hooks/useSectionTheme";

/**
 * Línea fina pegada al borde superior, visible solo en mobile — el
 * equivalente de SectionDots (columna de puntos, solo desktop) para
 * pantallas sin espacio lateral. Se va llenando con el progreso de scroll
 * de toda la página, para dejar una referencia constante de que el
 * contenido sigue más abajo mientras se recorre el sitio.
 */
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const theme = useSectionTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Mismo criterio de color que SectionDots/Navbar.
  const barColorClass = theme === "dark" ? "bg-mack-cream" : theme === "white" ? "bg-white" : "bg-primary";

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-[60] h-[3px] bg-black/10">
      <div
        className={`h-full ${barColorClass} transition-[width] duration-150 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
