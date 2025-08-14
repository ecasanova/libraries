import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { useState } from "react";
import { Language } from "../src/i18n";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

interface ExampleTranslations {
  headerTitle: string;
  headerDescription: string;
  installHeading: string;
  installNote: string;
  chartOptionsTitle: string;
  buttons: { doughnut: string; bar: string; line: string };
  chartInfoTitle: string;
  info: Record<"doughnut" | "bar" | "line", string[]>;
  doughnutData: { labels: string[]; datasetLabel: string };
  barData: {
    labels: string[];
    currentLabel: string;
    previousLabel: string;
  };
  lineData: { labels: string[]; datasetLabel: string };
}

const translations: Record<Language, ExampleTranslations> = {
  es: {
    headerTitle: "📊 Chart.js + React",
    headerDescription:
      "Gráficos interactivos y responsivos con Chart.js y react-chartjs-2",
    installHeading: "📦 Instalación",
    installNote:
      "Chart.js es una biblioteca poderosa para crear gráficos HTML5 responsivos y animados.",
    chartOptionsTitle: "Datos de Ejemplo",
    buttons: {
      doughnut: "🍩 Doughnut",
      bar: "📊 Barras",
      line: "📈 Líneas",
    },
    chartInfoTitle: "Información del gráfico actual:",
    info: {
      doughnut: [
        "🎯 <strong>Tipo:</strong> Gráfico de dona",
        "📝 <strong>Uso:</strong> Mostrar proporciones y porcentajes",
        "✨ <strong>Características:</strong> Interactivo, con tooltips",
      ],
      bar: [
        "🎯 <strong>Tipo:</strong> Gráfico de barras",
        "📝 <strong>Uso:</strong> Comparar valores entre categorías",
        "✨ <strong>Características:</strong> Múltiples datasets, responsive",
      ],
      line: [
        "🎯 <strong>Tipo:</strong> Gráfico de líneas",
        "📝 <strong>Uso:</strong> Mostrar tendencias a lo largo del tiempo",
        "✨ <strong>Características:</strong> Curvas suaves, área rellena",
      ],
    },
    doughnutData: {
      labels: ["React", "Vue", "Angular", "Svelte"],
      datasetLabel: "Popularidad",
    },
    barData: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      currentLabel: "Ventas 2024",
      previousLabel: "Ventas 2023",
    },
    lineData: {
      labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"],
      datasetLabel: "Usuarios Activos",
    },
  },
  en: {
    headerTitle: "📊 Chart.js + React",
    headerDescription:
      "Interactive and responsive charts with Chart.js and react-chartjs-2",
    installHeading: "📦 Installation",
    installNote:
      "Chart.js is a powerful library for creating responsive, animated HTML5 charts.",
    chartOptionsTitle: "Sample Data",
    buttons: {
      doughnut: "🍩 Doughnut",
      bar: "📊 Bars",
      line: "📈 Lines",
    },
    chartInfoTitle: "Current chart information:",
    info: {
      doughnut: [
        "🎯 <strong>Type:</strong> Doughnut chart",
        "📝 <strong>Use:</strong> Display proportions and percentages",
        "✨ <strong>Features:</strong> Interactive with tooltips",
      ],
      bar: [
        "🎯 <strong>Type:</strong> Bar chart",
        "📝 <strong>Use:</strong> Compare values across categories",
        "✨ <strong>Features:</strong> Multiple datasets, responsive",
      ],
      line: [
        "🎯 <strong>Type:</strong> Line chart",
        "📝 <strong>Use:</strong> Show trends over time",
        "✨ <strong>Features:</strong> Smooth curves, filled area",
      ],
    },
    doughnutData: {
      labels: ["React", "Vue", "Angular", "Svelte"],
      datasetLabel: "Popularity",
    },
    barData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      currentLabel: "Sales 2024",
      previousLabel: "Sales 2023",
    },
    lineData: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      datasetLabel: "Active Users",
    },
  },
};

export function ChartJSExample({ lang }: { lang: Language }) {
  const [activeChart, setActiveChart] = useState<"doughnut" | "bar" | "line">(
    "doughnut"
  );
  const t = translations[lang];

  const doughnutData = {
    labels: t.doughnutData.labels,
    datasets: [
      {
        label: t.doughnutData.datasetLabel,
        data: [45, 25, 20, 10],
        backgroundColor: ["#61dafb", "#4fc08d", "#dd1b16", "#ff3e00"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const barData = {
    labels: t.barData.labels,
    datasets: [
      {
        label: t.barData.currentLabel,
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
      {
        label: t.barData.previousLabel,
        data: [8, 15, 5, 7, 4, 6],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: t.lineData.labels,
    datasets: [
      {
        label: t.lineData.datasetLabel,
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: t.chartOptionsTitle,
      },
    },
  };

  const renderChart = () => {
    switch (activeChart) {
      case "doughnut":
        return <Doughnut data={doughnutData} options={chartOptions} />;
      case "bar":
        return <Bar data={barData} options={chartOptions} />;
      case "line":
        return <Line data={lineData} options={chartOptions} />;
      default:
        return <Doughnut data={doughnutData} options={chartOptions} />;
    }
  };

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
            <code>{`npm install chart.js react-chartjs-2`}</code>
          </pre>
        </div>
        <p className="installation-note">{t.installNote}</p>
      </div>

      <div className="chart-demo">
        <div className="chart-controls">
          <button
            className={`chart-btn ${
              activeChart === "doughnut" ? "active" : ""
            }`}
            onClick={() => setActiveChart("doughnut")}
          >
            {t.buttons.doughnut}
          </button>
          <button
            className={`chart-btn ${activeChart === "bar" ? "active" : ""}`}
            onClick={() => setActiveChart("bar")}
          >
            {t.buttons.bar}
          </button>
          <button
            className={`chart-btn ${activeChart === "line" ? "active" : ""}`}
            onClick={() => setActiveChart("line")}
          >
            {t.buttons.line}
          </button>
        </div>

        <div className="chart-container">{renderChart()}</div>

        <div className="chart-info">
          <h3>{t.chartInfoTitle}</h3>
          <ul>
            {t.info[activeChart].map((line, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
          </ul>
        </div>
      </div>

      <div className="code-example">
        <h3>📖 Código de ejemplo:</h3>
        <pre>
          {`import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["React", "Vue", "Angular"],
  datasets: [{
    data: [45, 25, 20],
    backgroundColor: ["#61dafb", "#4fc08d", "#dd1b16"]
  }]
};

export function Chart() {
  return <Doughnut data={data} />;
}`}
        </pre>
      </div>
    </div>
  );
}
