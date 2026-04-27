import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
  const [theme, setTheme] = useState("light"); // "light" or "dark" based on background

  useEffect(() => {
    // Escuchar el cambio de tema emitido por CylinderScroll
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setTheme(customEvent.detail);
    };

    window.addEventListener("theme-change", handleThemeChange);
    
    // Fallback scroll listener just to update activeSection based on offset top
    // Since we now use anchors that have native offsetTop, this will still work!
    const handleScroll = () => {
      const sections = navItems.map((item) => {
        const el = document.getElementById(item.target);
        if (!el) return { id: item.target, top: 0 };
        return { id: item.target, top: el.offsetTop };
      });

      const scrollPos = window.scrollY + window.innerHeight / 2; // Mid screen
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPos >= sections[i].top) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("theme-change", handleThemeChange);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  // Determine colors based on theme
  const textColorClass = theme === "dark" ? "text-mack-cream" : "text-primary";
  const hoverTextColorClass = theme === "dark" ? "hover:text-white" : "hover:text-primary/70";
  const activeBgClass = theme === "dark" ? "bg-mack-cream text-primary" : "bg-primary text-primary-foreground";
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 transition-all duration-500 bg-transparent`}
    >
      <div className="flex items-center justify-between">
        <button onClick={() => scrollTo("inicio")} className="z-50">
          <img 
            src={theme === "dark" ? "/Logo-Beige-03.svg" : "/Logo-Dark-Green-03.svg"} 
            alt="Mack Studio" 
            className="h-8 md:h-10 w-auto object-contain transition-all duration-500"
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
