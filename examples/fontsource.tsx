import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";

const fontExamples = [
  {
    name: "Roboto",
    family: "Roboto, sans-serif",
    description: "Fuente moderna y legible de Google",
    weights: ["300", "400", "500", "700"],
    category: "Sans Serif",
  },
  {
    name: "Arial",
    family: "Arial, sans-serif",
    description: "Fuente clásica disponible en todos los sistemas",
    weights: ["400", "700"],
    category: "Sans Serif",
  },
  {
    name: "Georgia",
    family: "Georgia, serif",
    description: "Fuente serif optimizada para pantalla",
    weights: ["400", "700"],
    category: "Serif",
  },
  {
    name: "Courier New",
    family: "Courier New, monospace",
    description: "Fuente monospace clásica para código",
    weights: ["400"],
    category: "Monospace",
  },
];

const sampleTexts = {
  paragraph:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  title: "El Zorro Veloz Salta Sobre el Perro Perezoso",
  code: "const greeting = 'Hello World!';\nconsole.log(greeting);",
  numbers: "0123456789 + - = * / () [] {}",
};

function FontDemo({
  font,
  selectedText,
}: {
  font: (typeof fontExamples)[0];
  selectedText: string;
}) {
  const getText = () => {
    switch (selectedText) {
      case "title":
        return sampleTexts.title;
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
      <p className="font-description">{font.description}</p>

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

export default function FontsourceExample() {
  const [selectedText, setSelectedText] = useState("paragraph");
  const [selectedFont, setSelectedFont] = useState<string | null>(null);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🔤 Fontsource</h1>
        <p>Fuentes web auto-hospedadas para proyectos npm</p>
      </div>

      <div className="installation-section">
        <h3>📦 Instalación</h3>
        <div className="installation-code">
          <pre>
            <code>{`npm install @fontsource/roboto
# O cualquier otra fuente específica
npm install @fontsource/inter`}</code>
          </pre>
        </div>
        <p className="installation-note">
          Fontsource permite auto-hospedar fuentes de Google Fonts en tu
          proyecto npm.
        </p>
      </div>

      <div className="fontsource-demo">
        <div className="demo-controls">
          <div className="text-controls">
            <h3>📝 Tipo de texto:</h3>
            <div className="text-buttons">
              <button
                className={`btn ${
                  selectedText === "paragraph" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedText("paragraph")}
              >
                📄 Párrafo
              </button>
              <button
                className={`btn ${
                  selectedText === "title" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedText("title")}
              >
                📰 Título
              </button>
              <button
                className={`btn ${
                  selectedText === "code" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedText("code")}
              >
                💻 Código
              </button>
              <button
                className={`btn ${
                  selectedText === "numbers" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedText("numbers")}
              >
                🔢 Números
              </button>
            </div>
          </div>

          <div className="font-filter">
            <h3>🎯 Filtrar por fuente:</h3>
            <div className="font-buttons">
              <button
                className={`btn ${
                  selectedFont === null ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedFont(null)}
              >
                📋 Todas
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
              <FontDemo key={index} font={font} selectedText={selectedText} />
            ))}
        </div>

        <div className="comparison-section">
          <h3>📊 Comparación lado a lado:</h3>
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
          <h3>📦 Guía de Instalación:</h3>
          <div className="install-steps">
            <div className="install-step">
              <h4>1. Instalar la fuente</h4>
              <pre className="install-code">npm install @fontsource/roboto</pre>
            </div>
            <div className="install-step">
              <h4>2. Importar en tu componente</h4>
              <pre className="install-code">{`import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";`}</pre>
            </div>
            <div className="install-step">
              <h4>3. Usar en CSS o inline</h4>
              <pre className="install-code">{`.my-text {
  font-family: 'Roboto', sans-serif;
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="fontsource-features">
        <h3>✨ Ventajas de Fontsource:</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>🚀 Auto-hospedado</h4>
            <p>No dependes de CDNs externos, mejor rendimiento</p>
          </div>
          <div className="feature">
            <h4>📦 NPM</h4>
            <p>Instalación y versionado como cualquier paquete</p>
          </div>
          <div className="feature">
            <h4>🎛️ Control granular</h4>
            <p>Importa solo los pesos y estilos que necesitas</p>
          </div>
          <div className="feature">
            <h4>🔒 Offline</h4>
            <p>Funciona sin conexión a internet</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <h3>📖 Código de ejemplo:</h3>
        <pre>
          {`// 1. Instalar fuente
npm install @fontsource/roboto

// 2. Importar en tu componente
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

// 3. Usar en CSS
.my-text {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

// O directamente en JSX
<div style={{ fontFamily: 'Roboto, sans-serif' }}>
  Texto con Roboto
</div>`}
        </pre>
      </div>
    </div>
  );
}
