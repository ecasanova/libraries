import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import { Language } from "../src/i18n";

const fontExamples = [
  {
    name: "Roboto",
    family: "Roboto, sans-serif",
    description: {
      es: "Fuente moderna y legible de Google",
      en: "Modern and readable Google font",
    },
    weights: ["300", "400", "500", "700"],
    category: "Sans Serif",
  },
  {
    name: "Arial",
    family: "Arial, sans-serif",
    description: {
      es: "Fuente clásica disponible en todos los sistemas",
      en: "Classic font available on all systems",
    },
    weights: ["400", "700"],
    category: "Sans Serif",
  },
  {
    name: "Georgia",
    family: "Georgia, serif",
    description: {
      es: "Fuente serif optimizada para pantalla",
      en: "Serif font optimized for screen",
    },
    weights: ["400", "700"],
    category: "Serif",
  },
  {
    name: "Courier New",
    family: "Courier New, monospace",
    description: {
      es: "Fuente monospace clásica para código",
      en: "Classic monospace font for code",
    },
    weights: ["400"],
    category: "Monospace",
  },
];

const sampleTexts = {
  paragraph:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  title: {
    es: "El Zorro Veloz Salta Sobre el Perro Perezoso",
    en: "The Quick Brown Fox Jumps Over the Lazy Dog",
  },
  code: "const greeting = 'Hello World!';\nconsole.log(greeting);",
  numbers: "0123456789 + - = * / () [] {}",
};

interface ExampleTranslations {
  headerTitle: string;
  headerDescription: string;
  installHeading: string;
  installOtherFont: string;
  installNote: string;
  textTypeHeading: string;
  textButtons: { paragraph: string; title: string; code: string; numbers: string };
  filterHeading: string;
  allFonts: string;
  comparisonHeading: string;
  installGuideHeading: string;
  installSteps: [string, string, string];
  featuresHeading: string;
  features: { title: string; description: string }[];
  codeExampleHeading: string;
  orJsx: string;
  robotoText: string;
}

const translations: Record<Language, ExampleTranslations> = {
  es: {
    headerTitle: "🔤 Fontsource",
    headerDescription: "Fuentes web auto-hospedadas para proyectos npm",
    installHeading: "📦 Instalación",
    installOtherFont: "O cualquier otra fuente específica",
    installNote: "Fontsource permite auto-hospedar fuentes de Google Fonts en tu proyecto npm.",
    textTypeHeading: "📝 Tipo de texto:",
    textButtons: { paragraph: "Párrafo", title: "Título", code: "Código", numbers: "Números" },
    filterHeading: "🎯 Filtrar por fuente:",
    allFonts: "Todas",
    comparisonHeading: "📊 Comparación lado a lado:",
    installGuideHeading: "📦 Guía de Instalación:",
    installSteps: [
      "Instalar la fuente",
      "Importar en tu componente",
      "Usar en CSS o inline",
    ],
    featuresHeading: "✨ Ventajas de Fontsource:",
    features: [
      { title: "🚀 Auto-hospedado", description: "No dependes de CDNs externos, mejor rendimiento" },
      { title: "📦 NPM", description: "Instalación y versionado como cualquier paquete" },
      { title: "🎛️ Control granular", description: "Importa solo los pesos y estilos que necesitas" },
      { title: "🔒 Offline", description: "Funciona sin conexión a internet" },
    ],
    codeExampleHeading: "📖 Código de ejemplo:",
    orJsx: "O directamente en JSX",
    robotoText: "Texto con Roboto",
  },
  en: {
    headerTitle: "🔤 Fontsource",
    headerDescription: "Self-hosted web fonts for npm projects",
    installHeading: "📦 Installation",
    installOtherFont: "Or any other specific font",
    installNote: "Fontsource lets you self-host Google Fonts in your npm project.",
    textTypeHeading: "📝 Text type:",
    textButtons: { paragraph: "Paragraph", title: "Title", code: "Code", numbers: "Numbers" },
    filterHeading: "🎯 Filter by font:",
    allFonts: "All",
    comparisonHeading: "📊 Side-by-side comparison:",
    installGuideHeading: "📦 Installation Guide:",
    installSteps: [
      "Install the font",
      "Import in your component",
      "Use in CSS or inline",
    ],
    featuresHeading: "✨ Fontsource advantages:",
    features: [
      { title: "🚀 Self-hosted", description: "No external CDNs, better performance" },
      { title: "📦 NPM", description: "Install and version like any package" },
      { title: "🎛️ Granular control", description: "Import only the weights and styles you need" },
      { title: "🔒 Offline", description: "Works without internet connection" },
    ],
    codeExampleHeading: "📖 Example code:",
    orJsx: "Or directly in JSX",
    robotoText: "Text with Roboto",
  },
};

function FontDemo({
  font,
  selectedText,
  lang,
}: {
  font: (typeof fontExamples)[0];
  selectedText: string;
  lang: Language;
}) {
  const getText = () => {
    switch (selectedText) {
      case "title":
        return sampleTexts.title[lang];
      case "code":
        return sampleTexts.code;
      case "numbers":
        return sampleTexts.numbers;
      default:
        return sampleTexts.paragraph;
    }
  };

  return (
    <div className="font-demo-card">
      <div className="font-header">
        <h3>{font.name}</h3>
        <span className="font-category">{font.category}</span>
      </div>
      <p className="font-description">{font.description[lang]}</p>

      <div className="font-weights">
        <strong>Pesos disponibles:</strong>
        <div className="weight-tags">
          {font.weights.map((weight) => (
            <span key={weight} className="weight-tag">
              {weight}
            </span>
          ))}
        </div>
      </div>

      <div className="font-sample" style={{ fontFamily: font.family }}>
        {selectedText === "code" ? (
          <pre style={{ fontFamily: font.family }}>{getText()}</pre>
        ) : (
          <div style={{ fontFamily: font.family }}>{getText()}</div>
        )}
      </div>

      <div className="font-weights-demo">
        {font.weights.map((weight) => (
          <div
            key={weight}
            className="weight-example"
            style={{
              fontFamily: font.family,
              fontWeight: weight,
            }}
          >
            Weight {weight}: The quick brown fox jumps over the lazy dog
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FontsourceExample({ lang }: { lang: Language }) {
  const t = translations[lang];
  const [selectedText, setSelectedText] = useState("paragraph");
  const [selectedFont, setSelectedFont] = useState<string | null>(null);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{t.headerTitle}</h1>
        <p>{t.headerDescription}</p>
      </div>

      <div className="installation-section">
        <h3>{t.installHeading}</h3>
        <div className="installation-code">
          <pre>
            <code>{`npm install @fontsource/roboto
# ${t.installOtherFont}
npm install @fontsource/inter`}</code>
          </pre>
        </div>
        <p className="installation-note">{t.installNote}</p>
      </div>

      <div className="fontsource-demo">
        <div className="demo-controls">
          <div className="text-controls">
            <h3>{t.textTypeHeading}</h3>
            <div className="text-buttons">
              <button
                className={`btn ${
                  selectedText === "paragraph" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedText("paragraph")}
              >
                📄 {t.textButtons.paragraph}
              </button>
              <button
                className={`btn ${
                  selectedText === "title" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedText("title")}
              >
                📰 {t.textButtons.title}
              </button>
              <button
                className={`btn ${
                  selectedText === "code" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedText("code")}
              >
                💻 {t.textButtons.code}
              </button>
              <button
                className={`btn ${
                  selectedText === "numbers" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedText("numbers")}
              >
                🔢 {t.textButtons.numbers}
              </button>
            </div>
          </div>

          <div className="font-filter">
            <h3>{t.filterHeading}</h3>
            <div className="font-buttons">
              <button
                className={`btn ${
                  selectedFont === null ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedFont(null)}
              >
                📋 {t.allFonts}
              </button>
              {fontExamples.map((font) => (
                <button
                  key={font.name}
                  className={`btn ${
                    selectedFont === font.name ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => setSelectedFont(font.name)}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fonts-grid">
          {fontExamples
            .filter(
              (font) => selectedFont === null || font.name === selectedFont
            )
            .map((font, index) => (
              <FontDemo key={index} font={font} selectedText={selectedText} lang={lang} />
            ))}
        </div>

        <div className="comparison-section">
          <h3>{t.comparisonHeading}</h3>
          <div className="comparison-grid">
            {fontExamples.map((font) => (
              <div key={font.name} className="comparison-item">
                <h4>{font.name}</h4>
                <div
                  className="comparison-text"
                  style={{ fontFamily: font.family }}
                >
                  The quick brown fox jumps over the lazy dog. 1234567890
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="installation-guide">
          <h3>{t.installGuideHeading}</h3>
          <div className="install-steps">
            <div className="install-step">
              <h4>{t.installSteps[0]}</h4>
              <pre className="install-code">npm install @fontsource/roboto</pre>
            </div>
            <div className="install-step">
              <h4>{t.installSteps[1]}</h4>
              <pre className="install-code">{`import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";`}</pre>
            </div>
            <div className="install-step">
              <h4>{t.installSteps[2]}</h4>
              <pre className="install-code">{`.my-text {
  font-family: 'Roboto', sans-serif;
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="fontsource-features">
        <h3>{t.featuresHeading}</h3>
        <div className="features-grid">
          {t.features.map((feature: { title: string; description: string }) => (
            <div key={feature.title} className="feature">
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="code-example">
        <h3>{t.codeExampleHeading}</h3>
        <pre>
          {`// 1. ${t.installSteps[0]}
npm install @fontsource/roboto

// 2. ${t.installSteps[1]}
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

// 3. ${t.installSteps[2]}
.my-text {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

// ${t.orJsx}
<div style={{ fontFamily: 'Roboto, sans-serif' }}>
  ${t.robotoText}
</div>`}
        </pre>
      </div>
    </div>
  );
}
