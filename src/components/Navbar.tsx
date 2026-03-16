import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "INICIO", path: "/" },
  { label: "NOSOTROS", path: "/nosotros" },
  { label: "SERVICIOS", path: "/servicios" },
  { label: "CONTACTO", path: "/contacto" },
];

// Pages with dark/olive backgrounds need light nav text
const darkPages = ["/nosotros"];

const Navbar = () => {
  const location = useLocation();
  const isDarkBg = darkPages.includes(location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="z-50">
          <span
            className={`font-heading text-xl font-bold tracking-tight transition-colors ${
              isDarkBg ? "text-primary-foreground" : "text-primary"
            }`}
          >
            mack st.
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-body text-xs tracking-[0.15em] font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? isDarkBg
                      ? "bg-primary-foreground text-primary"
                      : "bg-primary text-primary-foreground"
                    : isDarkBg
                      ? "text-primary-foreground/80 hover:text-primary-foreground"
                      : "text-primary/70 hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden z-50 ${isDarkBg ? "text-primary-foreground" : "text-primary"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-heading text-2xl tracking-[0.15em] font-medium px-6 py-3 rounded-full transition-all ${
                  isActive
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
