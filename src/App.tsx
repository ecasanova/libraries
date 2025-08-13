import { useEffect, useState } from "react";
import { Grafica } from "../examples/chartjs";
import Lista from "../examples/drag-and-drop";
import FontApp from "../examples/fontsource";
import Hotkeys from "../examples/hotkeys";
import FadeIn from "../examples/motion";
import { Tabla } from "../examples/react-table";
import { Counter } from "../examples/zustand";
import DayjsExample from "../examples/dayjs";
import ZodExample from "../examples/zod";

const examples = [
  { slug: "chartjs", label: "ChartJS", element: <Grafica /> },
  { slug: "drag-and-drop", label: "Drag & Drop", element: <Lista /> },
  { slug: "fontsource", label: "Fontsource", element: <FontApp /> },
  { slug: "hotkeys", label: "Hotkeys", element: <Hotkeys /> },
  { slug: "motion", label: "Motion", element: <FadeIn /> },
  {
    slug: "react-table",
    label: "React Table",
    element: <Tabla data={[{ name: "Juan", age: 30 }]} />,
  },
  { slug: "zustand", label: "Zustand", element: <Counter /> },
  { slug: "dayjs", label: "Dayjs", element: <DayjsExample /> },
  { slug: "zod", label: "Zod", element: <ZodExample /> },
];

export default function App() {
  const [example, setExample] = useState<string>(
    window.location.hash.replace("#", "")
  );

  useEffect(() => {
    const handler = () => setExample(window.location.hash.replace("#", ""));
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const current = examples.find((e) => e.slug === example);

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <a href="#" className="nav-brand">
              React Libraries
            </a>
            <div className="nav-links">
              <a href="#" className="nav-link">
                Inicio
              </a>
              {examples.map((e) => (
                <a key={e.slug} href={`#${e.slug}`} className="nav-link">
                  {e.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main className="main-content">
        {current ? current.element : <h1>React Libraries Examples</h1>}
      </main>
    </>
  );
}
