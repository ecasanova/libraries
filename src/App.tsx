import { useEffect, useState } from "react";
import { ChartJSExample } from "../examples/chartjs";
import DragAndDropExample from "../examples/drag-and-drop";
import FontsourceExample from "../examples/fontsource";
          <p>
            📚 Bibliotecas recomendadas por{" "}
            <a
              href="https://github.com/midudev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              midudev
            </a>
          </p>eysExample from "../examples/hotkeys";
import FramerMotionExample from "../examples/motion";
import { Tabla } from "../examples/react-table";
import { ZustandExample } from "../examples/zustand";
import DayjsExample from "../examples/dayjs";
import ZodExample from "../examples/zod";

const examples = [
  { slug: "chartjs", label: "ChartJS", element: <ChartJSExample /> },
  {
    slug: "drag-and-drop",
    label: "Drag & Drop",
    element: <DragAndDropExample />,
  },
  { slug: "fontsource", label: "Fontsource", element: <FontsourceExample /> },
  { slug: "hotkeys", label: "Hotkeys", element: <HotkeysExample /> },
  { slug: "motion", label: "Motion", element: <FramerMotionExample /> },
  {
    slug: "react-table",
    label: "React Table",
    element: (
      <Tabla
        data={[
          {
            id: 1,
            name: "Juan",
            age: 30,
            email: "juan@example.com",
            department: "Engineering",
            salary: 50000,
            status: "active",
          },
        ]}
      />
    ),
  },
  { slug: "zustand", label: "Zustand", element: <ZustandExample /> },
  { slug: "dayjs", label: "Dayjs", element: <DayjsExample /> },
  { slug: "zod", label: "Zod", element: <ZodExample /> },
];

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🚀 React Libraries Showcase</h1>
        <p className="hero-subtitle">
          Colección interactiva de las mejores bibliotecas para React
        </p>
        <div className="hero-description">
          <p>
            Explora ejemplos completos y funcionales de las bibliotecas más
            populares del ecosistema React. Cada ejemplo incluye código,
            documentación y casos de uso prácticos.
          </p>
          <p className="recommendation-note">
            📚 Bibliotecas recomendadas por{" "}
            <a
              href="https://github.com/midudev"
              target="_blank"
              rel="noopener noreferrer"
              className="recommendation-link"
            >
              midudev
            </a>
          </p>
        </div>
      </div>

      <div className="libraries-grid">
        {examples.map((example) => (
          <a
            key={example.slug}
            href={`#${example.slug}`}
            className="library-card"
          >
            <div className="card-header">
              <h3>{example.label}</h3>
            </div>
            <div className="card-description">
              {getLibraryDescription(example.slug)}
            </div>
            <div className="card-footer">
              <span className="view-demo">Ver Demo →</span>
            </div>
          </a>
        ))}
      </div>

      <div className="features-section">
        <h2>✨ Características</h2>
        <div className="features-list">
          <div className="feature-item">
            <h4>🎯 Ejemplos Prácticos</h4>
            <p>Cada biblioteca incluye múltiples ejemplos de uso real</p>
          </div>
          <div className="feature-item">
            <h4>📖 Código Completo</h4>
            <p>Código fuente disponible con explicaciones detalladas</p>
          </div>
          <div className="feature-item">
            <h4>🎨 Diseño Moderno</h4>
            <p>Interfaz limpia y responsive para todos los dispositivos</p>
          </div>
          <div className="feature-item">
            <h4>⚡ Rendimiento</h4>
            <p>Optimizado con Vite para desarrollo rápido</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getLibraryDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    chartjs: "Gráficos interactivos y responsivos con Chart.js",
    "drag-and-drop": "Funcionalidad drag & drop con @formkit/drag-and-drop",
    fontsource: "Fuentes web auto-hospedadas para npm",
    hotkeys: "Atajos de teclado potentes con hotkeys-js",
    motion: "Animaciones fluidas con Framer Motion",
    "react-table": "Tablas potentes con TanStack Table",
    zustand: "Gestión de estado simple y efectiva",
    dayjs: "Manipulación de fechas ligera y moderna",
    zod: "Validación de esquemas TypeScript-first",
  };
  return descriptions[slug] || "Biblioteca de React";
}

export default function App() {
  const [example, setExample] = useState<string>(
    window.location.hash.replace("#", "")
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setExample(window.location.hash.replace("#", ""));
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const current = examples.find((e) => e.slug === example);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <a href="#" className="nav-brand" onClick={handleLinkClick}>
              React Libraries
            </a>

            {/* Botón hamburguesa */}
            <button
              className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Navigation Links */}
            <div
              className={`nav-links ${
                mobileMenuOpen ? "nav-links-mobile open" : "nav-links-desktop"
              }`}
            >
              {examples.map((e) => (
                <a
                  key={e.slug}
                  href={`#${e.slug}`}
                  className={`nav-link ${example === e.slug ? "active" : ""}`}
                  onClick={handleLinkClick}
                >
                  {e.label}
                </a>
              ))}
            </div>
          </div>

          {/* Overlay para cerrar el menú móvil */}
          {mobileMenuOpen && (
            <div
              className="mobile-overlay"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
          )}
        </nav>
      </header>
      <main className="main-content">
        {current ? current.element : <HomePage />}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>
            ✨ Creado con ❤️ por{" "}
            <a
              href="https://github.com/ecasanova"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Enrique Casanova
            </a>
          </p>
          <p>
            � Bibliotecas recomendadas por{" "}
            <a
              href="https://github.com/midudev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              midudev
            </a>
          </p>
          <p>
            �📂 Código fuente disponible en{" "}
            <a
              href="https://github.com/ecasanova/libraries"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
