import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Rojo", "Azul", "Amarillo"],
  datasets: [
    {
      data: [12, 19, 3],
      backgroundColor: ["#f00", "#00f", "#ff0"],
    },
  ],
};

export function Grafica() {
  return <Doughnut data={data} />;
}
