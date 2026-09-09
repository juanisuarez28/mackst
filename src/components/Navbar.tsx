import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSectionTheme } from "@/hooks/useSectionTheme";

const navItems = [
  { label: "INICIO", target: "inicio" },
  { label: "NOSOTROS", target: "nosotros" },
  { label: "CLIENTES", target: "clientes" },
  { label: "SERVICIOS", target: "servicios" },
  { label: "CONTACTO", target: "contacto" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const theme = useSectionTheme();

  useEffect(() => {
    // Escuchar el cambio de sección activa, emitido por useActiveSection
    // (un IntersectionObserver en HomePage que sabe qué sección está centrada
    // en la pantalla). Algunas secciones (mision, experiencia-0) no tienen
    // botón propio en el navbar, así que se agrupan bajo el botón anterior
    // más cercano.
    const handleSectionChange = (e: Event) => {
      const id = (e as CustomEvent).detail as string;
      if (navItems.some((item) => item.target === id)) {
        setActiveSection(id);
      } else if (id === "mision") {
        setActiveSection("inicio");
      } else if (id.startsWith("experiencia-")) {
        setActiveSection("clientes");
      }
    };

    window.addEventListener("section-change", handleSectionChange);
    return () => window.removeEventListener("section-change", handleSectionChange);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  // Determine colors based on theme. "white" is the same idea as "dark"
  // (light text for a busy/colored background) but forced to pure white
  // instead of cream, for sections where the designer wants more contrast.
  const textColorClass = theme === "dark" ? "text-mack-cream" : theme === "white" ? "text-white" : "text-primary";
  const hoverTextColorClass = theme === "dark" ? "hover:text-white" : theme === "white" ? "hover:text-white/70" : "hover:text-primary/70";
  const activeBgClass = theme === "dark" ? "bg-mack-cream text-primary" : theme === "white" ? "bg-white text-primary" : "bg-primary text-primary-foreground";
  // No hay un archivo de logo blanco puro: reutilizamos el logo beige y lo
  // forzamos a blanco con un filtro (brightness-0 + invert), en vez de sumar
  // un asset nuevo.
  const logoFilterClass = theme === "white" ? "brightness-0 invert" : "";
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 transition-all duration-500 bg-transparent`}
    >
      <div className="flex items-center justify-between">
        <button onClick={() => scrollTo("inicio")} className="z-50">
          <img
            src={theme === "light" ? "/Logo-Dark-Green-03.svg" : "/Logo-Beige-03.svg"}
            alt="Mack Studio"
            className={`h-8 md:h-10 w-auto object-contain transition-all duration-500 ${logoFilterClass}`}
          />
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className={`text-xs tracking-[0.15em] font-medium px-5 py-2 rounded-full transition-all duration-500 ${
                activeSection === item.target
                  ? activeBgClass
                  : `${textColorClass} ${hoverTextColorClass} opacity-80 hover:opacity-100`
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden z-50 transition-colors duration-500 ${textColorClass}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className={`text-2xl tracking-[0.15em] font-medium px-6 py-3 rounded-full transition-all ${
                activeSection === item.target
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
