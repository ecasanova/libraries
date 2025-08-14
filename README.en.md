# Recommended libraries for React

[Versión en español](README.md)

This guide shows brief examples of how to use some popular libraries in React applications.

## zod – schema validation
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

## day.js – work with dates
```tsx
import dayjs from "dayjs";

const now = dayjs();
const formatted = now.format("DD/MM/YYYY");
```

## @tanstack/react-table – create tables
```tsx
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
];

function Table({ data }) {
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

## Auth.js – user authentication
```tsx
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();
  return session ? (
    <>
      <span>{session.user?.email}</span>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <button onClick={() => signIn("github")}>Sign in</button>
  );
}
```

## Motion – JavaScript animations
```tsx
import { motion } from "framer-motion";

export default function FadeIn() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Hello world
    </motion.div>
  );
}
```

## fontsource – load web fonts
```tsx
import "@fontsource/roboto/400.css";

function App() {
  return <div style={{ fontFamily: "Roboto" }}>Text with Roboto</div>;
}
```

## Chart.js – accessible HTML5 charts
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
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [12, 19, 3],
      backgroundColor: ["#f00", "#00f", "#ff0"],
    },
  ],
};

function Chart() {
  return <Doughnut data={data} />;
}
```

## Zustand – global state management
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

## formkit-drag-and-drop – drag and drop
```tsx
import { createDragAndDrop } from "@formkit/drag-and-drop";
import { useEffect, useRef } from "react";

export default function List() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      createDragAndDrop(ref.current);
    }
  }, []);

  return (
    <ul ref={ref}>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  );
}
```

## hotkeys-js – keyboard shortcuts
```tsx
import { useEffect } from "react";
import hotkeys from "hotkeys-js";

export default function Hotkeys() {
  useEffect(() => {
    hotkeys("ctrl+k", (event) => {
      event.preventDefault();
      console.log("Open search");
    });

    return () => {
      hotkeys.unbind("ctrl+k");
    };
  }, []);

  return null;
}
```
