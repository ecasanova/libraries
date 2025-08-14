import { useEffect, useState } from "react";
import { translations, Language } from "./i18n";
import { FlagES, FlagUS } from "./flags";
import { LanguageIcon } from "./language-icon";
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
  {
    slug: "chartjs",
    label: "ChartJS",
    element: (lang: Language) => <ChartJSExample lang={lang} />,
  },
  {
    slug: "drag-and-drop",
    label: "Drag & Drop",
    element: (lang: Language) => <DragAndDropExample lang={lang} />,
  },
  {
    slug: "fontsource",
    label: "Fontsource",
    element: (lang: Language) => <FontsourceExample lang={lang} />,
  },
  {
    slug: "hotkeys",
    label: "Hotkeys",
    element: (lang: Language) => <HotkeysExample lang={lang} />,
  },
  {
    slug: "motion",
    label: "Motion",
    element: (lang: Language) => <FramerMotionExample lang={lang} />,
  },
  {
    slug: "react-table",
    label: "React Table",
    element: (lang: Language) => (
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
        lang={lang}
      />
    ),
  },
  {
    slug: "zustand",
    label: "Zustand",
    element: (lang: Language) => <ZustandExample lang={lang} />,
  },
  {
    slug: "dayjs",
    label: "Dayjs",
    element: (lang: Language) => <DayjsExample lang={lang} />,
  },
  {
    slug: "zod",
    label: "Zod",
    element: (lang: Language) => <ZodExample lang={lang} />,
  },
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
      return <AuthExample lang={lang} />;
    }
    return current ? current.element(lang) : <HomePage lang={lang} />;
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
              style={{ display: "flex", alignItems: "center", gap: 12 }}
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
              {/* Selector de idioma al final del nav */}
              <button
                className="lang-toggle"
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                aria-label={
                  lang === "es" ? "Switch to English" : "Cambiar a Español"
                }
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                <LanguageIcon />
                {lang === "es" ? <FlagUS /> : <FlagES />}
              </button>
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
