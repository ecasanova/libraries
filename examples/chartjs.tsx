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

const doughnutData = {
  labels: ["React", "Vue", "Angular", "Svelte"],
  datasets: [
    {
      label: "Popularidad",
      data: [45, 25, 20, 10],
      backgroundColor: ["#61dafb", "#4fc08d", "#dd1b16", "#ff3e00"],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

const barData = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
  datasets: [
    {
      label: "Ventas 2024",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      borderColor: "rgba(99, 102, 241, 1)",
      borderWidth: 1,
    },
    {
      label: "Ventas 2023",
      data: [8, 15, 5, 7, 4, 6],
      backgroundColor: "rgba(34, 197, 94, 0.8)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 1,
    },
  ],
};

const lineData = {
  labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"],
  datasets: [
    {
      label: "Usuarios Activos",
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
      text: "Datos de Ejemplo",
    },
  },
};

export function ChartJSExample() {
  const [activeChart, setActiveChart] = useState<"doughnut" | "bar" | "line">(
    "doughnut"
  );

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
    <div className="example-container">
      <div className="example-header">
        <h1>📊 Chart.js + React</h1>
        <p>
          Gráficos interactivos y responsivos con Chart.js y react-chartjs-2
        </p>
      </div>

      <div className="installation-section">
        <h3>📦 Instalación</h3>
        <div className="installation-code">
          <pre>
            <code>{`npm install chart.js react-chartjs-2`}</code>
          </pre>
        </div>
        <p className="installation-note">
          Chart.js es una biblioteca poderosa para crear gráficos HTML5
          responsivos y animados.
        </p>
      </div>

      <div className="chart-demo">
        <div className="chart-controls">
          <button
            className={`chart-btn ${
              activeChart === "doughnut" ? "active" : ""
            }`}
            onClick={() => setActiveChart("doughnut")}
          >
            🍩 Doughnut
          </button>
          <button
            className={`chart-btn ${activeChart === "bar" ? "active" : ""}`}
            onClick={() => setActiveChart("bar")}
          >
            📊 Barras
          </button>
          <button
            className={`chart-btn ${activeChart === "line" ? "active" : ""}`}
            onClick={() => setActiveChart("line")}
          >
            📈 Líneas
          </button>
        </div>

        <div className="chart-container">{renderChart()}</div>

        <div className="chart-info">
          <h3>Información del gráfico actual:</h3>
          <ul>
            {activeChart === "doughnut" && (
              <>
                <li>
                  🎯 <strong>Tipo:</strong> Gráfico de dona
                </li>
                <li>
                  📝 <strong>Uso:</strong> Mostrar proporciones y porcentajes
                </li>
                <li>
                  ✨ <strong>Características:</strong> Interactivo, con tooltips
                </li>
              </>
            )}
            {activeChart === "bar" && (
              <>
                <li>
                  🎯 <strong>Tipo:</strong> Gráfico de barras
                </li>
                <li>
                  📝 <strong>Uso:</strong> Comparar valores entre categorías
                </li>
                <li>
                  ✨ <strong>Características:</strong> Múltiples datasets,
                  responsive
                </li>
              </>
            )}
            {activeChart === "line" && (
              <>
                <li>
                  🎯 <strong>Tipo:</strong> Gráfico de líneas
                </li>
                <li>
                  📝 <strong>Uso:</strong> Mostrar tendencias a lo largo del
                  tiempo
                </li>
                <li>
                  ✨ <strong>Características:</strong> Curvas suaves, área
                  rellena
                </li>
              </>
            )}
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
