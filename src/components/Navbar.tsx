import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "INICIO", target: "inicio" },
  { label: "NOSOTROS", target: "nosotros" },
  { label: "SERVICIOS", target: "servicios" },
  { label: "CONTACTO", target: "contacto" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => {
        const el = document.getElementById(item.target);
        if (!el) return { id: item.target, top: 0 };
        return { id: item.target, top: el.offsetTop };
      });

      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPos >= sections[i].top) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <button onClick={() => scrollTo("inicio")} className="z-50">
          <span className="text-xl font-bold tracking-tight text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="font-bold">mack</span> <span className="font-bold">st.</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className={`text-xs tracking-[0.15em] font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                activeSection === item.target
                  ? "bg-primary text-primary-foreground"
                  : "text-primary/70 hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden z-50 text-primary"
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
