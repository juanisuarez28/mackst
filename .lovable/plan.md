

## Plan: Mack St. — Agromarketing & Comunicación Website

### Design System
- **Fonts:** Space Grotesk (headings, bold 700-800, tight tracking) + Instrument Sans (body)
- **Colors:** Dark green `#1B3A2D` for text/accents, cream/beige `#D6CFC1` background for Inicio/Servicios, deep green `#3A5A40` background for Nosotros sections, olive `#8B8B4B` for Nosotros hero
- **Nav:** 4 links (INICIO, NOSOTROS, SERVICIOS, CONTACTOS) spread across top. Active page gets a pill/rounded button style — green on light pages, dark on olive pages
- **Typography:** Hero titles are massive fluid type (`clamp(3rem,10vw,8rem)`), uppercase navigation

### Pages & Structure

#### 1. Inicio (`/`)
- **Hero:** Cream/beige textured background. Large "mack st." logo text in dark green + "Agromarketing & Comunicación" subtitle + descriptive paragraph
- **Misión & Visión section:** Full-width dark green background. Massive "Misión & visión." title in white. Below: three paragraphs of mission/vision text in white

#### 2. Nosotros (`/nosotros`)
- **Hero "Nuestro Equipo":** Olive green background, massive white title, arrow navigation button bottom-right
- **Team grid:** 3 circular team member photos on olive background. Name + role + "Más sobre..." expandable
- **Team detail modal:** Overlay with photo on left, name/role/bio on right, close X button
- **"Nuestros Clientes" section:** Dark green background, massive white title, arrow button

#### 3. Servicios (`/servicios`)
- **Hero:** Cream background, massive dark green "Nuestros servicios." title, arrow button
- **Services grid:** 3 cards with rounded corners and dark green borders. Each has an image, service name, short description, and expandable chevron
- **Service detail modal:** Overlay with image on left, title + long description on right, close X

#### 4. Contacto (`/contacto`)
- Placeholder page with hero title "Contacto." (to be detailed later)

### Shared Components
- **Navbar:** Fixed top nav with 4 links, pill indicator on active page. Style adapts to light/dark backgrounds
- **Hero Section:** Reusable component with massive fluid typography
- **Detail Modal/Overlay:** Reusable for team bios and service details
- **Page Layout:** Each page wrapped with its own accent color CSS variable

### Implementation Approach
- Single-page app with React Router (4 routes)
- CSS variables per page for accent colors
- Placeholder images for team/services (using placeholder.svg or Unsplash)
- Smooth page transitions
- Fully responsive

