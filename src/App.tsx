import { useEffect, useState } from "react";
import { translations, Language } from "./i18n";
import { ChartJSExample } from "../examples/chartjs";
import DragAndDropExample from "../examples/drag-and-drop";
import FontsourceExample from "../examples/fontsource";
import HotkeysExample from "../examples/hotkeys";
import FramerMotionExample from "../examples/motion";
import { Tabla } from "../examples/react-table";
import { ZustandExample } from "../examples/zustand";
import DayjsExample from "../examples/dayjs";
import ZodExample from "../examples/zod";
import AuthExample from "../examples/auth";

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

function HomePage({ lang }: { lang: Language }) {
  const t = translations[lang];
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="hero-description">
          <p>{t.hero.description}</p>
          <p className="recommendation-note">
            {t.hero.recommendation}{" "}
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
            aria-label={`${t.viewDemo} ${example.label}`}
          >
            <div className="card-header">
              <h3>{example.label}</h3>
            </div>
            <div className="card-description">
              {getLibraryDescription(example.slug, lang)}
            </div>
            <div className="card-footer">
              <span className="view-demo">{t.viewDemo}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="features-section">
        <h2>{t.featuresTitle}</h2>
        <div className="features-list">
          {t.features.map((feature) => (
            <div key={feature.title} className="feature-item">
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getLibraryDescription(slug: string, lang: Language): string {
  const descriptions = translations[lang].libraryDescriptions;
  return (
    descriptions[slug] ||
    (lang === "es" ? "Biblioteca de React" : "React library")
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>("es");
  const [example, setExample] = useState<string>(
    window.location.hash.replace("#", "")
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setExample(window.location.hash.replace("#", ""));
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  const current = examples.find((e) => e.slug === example);

  // Manejar caso especial para auth (no en navegación pero accesible)
  const renderContent = () => {
    if (example === "auth") {
      return <AuthExample />;
    }
    return current ? current.element : <HomePage lang={lang} />;
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <nav className="navbar" aria-label={t.nav.main}>
          <div className="nav-container">
            <a href="#" className="nav-brand" onClick={handleLinkClick}>
              React Common Libraries
            </a>

            <button
              className="lang-toggle"
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              aria-label={
                lang === "es" ? "Switch to English" : "Cambiar a Español"
              }
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            {/* Botón hamburguesa */}
            <button
              className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t.nav.toggleMenu}
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
      <main className="main-content">{renderContent()}</main>
      <footer className="footer">
        <div className="footer-content">
          <p>
            {t.footer.createdBy}{" "}
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
            {t.footer.recommendedBy}{" "}
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
            {t.footer.sourceCode}{" "}
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
