import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Language } from "../src/i18n";

interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
  department: string;
  salary: number;
  status: "active" | "inactive";
}

// Datos de ejemplo más completos
const sampleData: Person[] = [
  {
    id: 1,
    name: "Ana García",
    age: 28,
    email: "ana@company.com",
    department: "Engineering",
    salary: 75000,
    status: "active",
  },
  {
    id: 2,
    name: "Carlos López",
    age: 34,
    email: "carlos@company.com",
    department: "Marketing",
    salary: 65000,
    status: "active",
  },
  {
    id: 3,
    name: "María Rodríguez",
    age: 29,
    email: "maria@company.com",
    department: "Design",
    salary: 70000,
    status: "inactive",
  },
  {
    id: 4,
    name: "Juan Pérez",
    age: 42,
    email: "juan@company.com",
    department: "Engineering",
    salary: 95000,
    status: "active",
  },
  {
    id: 5,
    name: "Laura Martín",
    age: 31,
    email: "laura@company.com",
    department: "HR",
    salary: 60000,
    status: "active",
  },
  {
    id: 6,
    name: "David Silva",
    age: 26,
    email: "david@company.com",
    department: "Marketing",
    salary: 55000,
    status: "inactive",
  },
  {
    id: 7,
    name: "Elena Torres",
    age: 38,
    email: "elena@company.com",
    department: "Engineering",
    salary: 85000,
    status: "active",
  },
  {
    id: 8,
    name: "Miguel Santos",
    age: 33,
    email: "miguel@company.com",
    department: "Design",
    salary: 72000,
    status: "active",
  },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "👤 Nombre",
    cell: ({ row }) => (
      <div className="table-cell-name">
        <strong>{row.getValue("name")}</strong>
      </div>
    ),
  },
  {
    accessorKey: "age",
    header: "🎂 Edad",
    cell: ({ row }) => (
      <span className="table-cell-age">{row.getValue("age")} años</span>
    ),
  },
  {
    accessorKey: "email",
    header: "📧 Email",
    cell: ({ row }) => (
      <a href={`mailto:${row.getValue("email")}`} className="table-cell-email">
        {row.getValue("email")}
      </a>
    ),
  },
  {
    accessorKey: "department",
    header: "🏢 Departamento",
    cell: ({ row }) => (
      <span
        className={`table-cell-department department-${(
          row.getValue("department") as string
        ).toLowerCase()}`}
      >
        {row.getValue("department")}
      </span>
    ),
  },
  {
    accessorKey: "salary",
    header: "💰 Salario",
    cell: ({ row }) => (
      <span className="table-cell-salary">
        ${(row.getValue("salary") as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "📊 Estado",
    cell: ({ row }) => (
      <span className={`table-cell-status status-${row.getValue("status")}`}>
        {row.getValue("status") === "active" ? "✅ Activo" : "❌ Inactivo"}
      </span>
    ),
  },
];

interface ExampleTranslations {
  headerTitle: string;
  headerDescription: string;
  installHeading: string;
  installNote: string;
}

const translations: Record<Language, ExampleTranslations> = {
  es: {
    headerTitle: "📊 React Table (TanStack Table)",
    headerDescription: "Tabla potente con ordenamiento, filtrado, paginación y más",
    installHeading: "📦 Instalación",
    installNote:
      "TanStack Table es una biblioteca headless para construir tablas poderosas y flexibles.",
  },
  en: {
    headerTitle: "📊 React Table (TanStack Table)",
    headerDescription: "Powerful table with sorting, filtering, pagination and more",
    installHeading: "📦 Installation",
    installNote:
      "TanStack Table is a headless library for building powerful, flexible tables.",
  },
};

export function ReactTableExample({ lang }: { lang: Language }) {
  const t = translations[lang];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

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
            <code>{`npm install @tanstack/react-table`}</code>
          </pre>
        </div>
        <p className="installation-note">{t.installNote}</p>
      </div>

      <div className="table-demo">
        {/* Controles de filtrado */}
        <div className="table-controls">
          <div className="search-box">
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="🔍 Buscar en todos los campos..."
              className="global-filter"
            />
          </div>

          <div className="filter-controls">
            <select
              value={
                (table.getColumn("department")?.getFilterValue() as string) ??
                ""
              }
              onChange={(e) =>
                table
                  .getColumn("department")
                  ?.setFilterValue(e.target.value || undefined)
              }
              className="department-filter"
            >
              <option value="">Todos los departamentos</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="HR">HR</option>
            </select>

            <select
              value={
                (table.getColumn("status")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table
                  .getColumn("status")
                  ?.setFilterValue(e.target.value || undefined)
              }
              className="status-filter"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="table-container">
          <table className="react-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="table-header">
                      {header.isPlaceholder ? null : (
                        <div
                          className={`header-content ${
                            header.column.getCanSort() ? "sortable" : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="table-row">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="pagination-controls">
          <div className="pagination-info">
            <span>
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()} ({table.getFilteredRowModel().rows.length}{" "}
              registros)
            </span>
          </div>

          <div className="pagination-buttons">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="pagination-btn"
            >
              ⏮️
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="pagination-btn"
            >
              ⬅️
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="pagination-btn"
            >
              ➡️
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="pagination-btn"
            >
              ⏭️
            </button>
          </div>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="page-size-select"
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-features">
        <h3>✨ Características de TanStack Table:</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>🔄 Ordenamiento</h4>
            <p>Haz clic en las cabeceras para ordenar columnas</p>
          </div>
          <div className="feature">
            <h4>🔍 Filtrado</h4>
            <p>Filtrado global y por columnas específicas</p>
          </div>
          <div className="feature">
            <h4>📄 Paginación</h4>
            <p>Navegación por páginas con tamaños configurables</p>
          </div>
          <div className="feature">
            <h4>🎨 Personalización</h4>
            <p>Renderizado personalizado de celdas y cabeceras</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <h3>📖 Código de ejemplo:</h3>
        <pre>
          {`import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const columns = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "age", header: "Edad" },
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
                {flexRender(header.column.columnDef.header, header.getContext())}
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
}`}
        </pre>
      </div>
    </div>
  );
}

// Mantenemos la función original para compatibilidad
export function Tabla({ data, lang }: { data: Person[]; lang: Language }) {
  return <ReactTableExample lang={lang} />;
}
