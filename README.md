# Ejemplos de librerías recomendadas para React

Esta guía muestra ejemplos breves de cómo usar algunas librerías populares en aplicaciones React.

## zod – validaciones de esquema
```tsx
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

function handleSubmit(data: unknown) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error.format());
  }
}
```

## day.js – trabajar con fechas
```tsx
import dayjs from "dayjs";

const now = dayjs();
const formatted = now.format("DD/MM/YYYY");
```

## @tanstack/react-table – crear tablas
```tsx
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const columns = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "age", header: "Edad" },
];

function Tabla({ data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((group) => (
          <tr key={group.id}>
            {group.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Auth.js – autenticación de usuarios
```tsx
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();
  return session ? (
    <>
      <span>{session.user?.email}</span>
      <button onClick={() => signOut()}>Salir</button>
    </>
  ) : (
    <button onClick={() => signIn("github")}>Entrar</button>
  );
}
```

## Motion – animaciones con JavaScript
```tsx
import { motion } from "framer-motion";

export default function FadeIn() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Hola mundo
    </motion.div>
  );
}
```

## fontsource – cargar tipografías web
```tsx
import "@fontsource/roboto/400.css";

function App() {
  return <div style={{ fontFamily: "Roboto" }}>Texto con Roboto</div>;
}
```

## Chart.js – gráficas HTML5 accesibles
```tsx
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

function Grafica() {
  return <Doughnut data={data} />;
}
```

## Zustand – manejo de estado global
```tsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const { count, inc } = useStore();
  return <button onClick={inc}>{count}</button>;
}
```

## formkit-drag-and-drop – arrastrar y soltar
```tsx
import { createDragAndDrop } from "@formkit/drag-and-drop";
import { useEffect, useRef } from "react";

export default function Lista() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      createDragAndDrop(ref.current);
    }
  }, []);

  return (
    <ul ref={ref}>
      <li>Elemento 1</li>
      <li>Elemento 2</li>
    </ul>
  );
}
```

## hotkeys-js – atajos de teclado
```tsx
import { useEffect } from "react";
import hotkeys from "hotkeys-js";

export default function Hotkeys() {
  useEffect(() => {
    hotkeys("ctrl+k", (event) => {
      event.preventDefault();
      console.log("Abrir buscador");
    });

    return () => {
      hotkeys.unbind("ctrl+k");
    };
  }, []);

  return null;
}
```

