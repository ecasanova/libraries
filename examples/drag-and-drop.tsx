import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useState } from "react";
import { Language } from "../src/i18n";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface ExampleTranslations {
  headerTitle: string;
  headerDescription: string;
  installHeading: string;
  installNote: string;
  addPlaceholder: string;
  addButton: string;
  stats: { total: string; completed: string; pending: string };
  codeExampleTitle: string;
}

const translations: Record<Language, ExampleTranslations> = {
  es: {
    headerTitle: "🎯 Lista de tareas Drag & Drop",
    headerDescription:
      "Arrastra las tareas para reordenarlas. Usa la biblioteca @formkit/drag-and-drop",
    installHeading: "📦 Instalación",
    installNote:
      "FormKit Drag and Drop es una biblioteca liviana y flexible para funcionalidad drag & drop.",
    addPlaceholder: "Agregar nueva tarea...",
    addButton: "➕ Agregar",
    stats: { total: "Total", completed: "Completadas", pending: "Pendientes" },
    codeExampleTitle: "📖 Código de ejemplo:",
  },
  en: {
    headerTitle: "🎯 Drag & Drop Task List",
    headerDescription:
      "Drag tasks to reorder them. Uses the @formkit/drag-and-drop library",
    installHeading: "📦 Installation",
    installNote:
      "FormKit Drag and Drop is a lightweight and flexible library for drag & drop functionality.",
    addPlaceholder: "Add new task...",
    addButton: "➕ Add",
    stats: { total: "Total", completed: "Completed", pending: "Pending" },
    codeExampleTitle: "📖 Example code:",
  },
};

export default function DragAndDropExample({ lang }: { lang: Language }) {
  const t = translations[lang];
  const [newTask, setNewTask] = useState("");

  const [ref, tasks, setTasks] = useDragAndDrop<HTMLDivElement, Task>([
    { id: "1", text: "Aprender React", completed: false },
    { id: "2", text: "Configurar TypeScript", completed: true },
    { id: "3", text: "Implementar Drag & Drop", completed: false },
    { id: "4", text: "Escribir documentación", completed: false },
  ]);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
            <code>{`npm install @formkit/drag-and-drop`}</code>
          </pre>
        </div>
        <p className="installation-note">{t.installNote}</p>
      </div>

      <div className="drag-drop-demo">
        <div className="add-task-section">
          <div className="input-group">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={t.addPlaceholder}
              className="task-input"
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            <button onClick={addTask} className="add-btn">
              {t.addButton}
            </button>
          </div>
        </div>

        <div className="tasks-container" ref={ref}>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <div className="task-content">
                <button
                  className="check-btn"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "✅" : "⭕"}
                </button>
                <span className="task-text">{task.text}</span>
              </div>
              <div className="task-actions">
                <span className="drag-handle">⋮⋮</span>
                <button
                  className="delete-btn"
                  onClick={() => removeTask(task.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="stats">
          <p>
            {t.stats.total}: {tasks.length}
          </p>
          <p>
            {t.stats.completed}: {tasks.filter((t) => t.completed).length}
          </p>
          <p>
            {t.stats.pending}: {tasks.filter((t) => !t.completed).length}
          </p>
        </div>
      </div>

      <div className="code-example">
        <h3>{t.codeExampleTitle}</h3>
        <pre>
          {`import { useDragAndDrop } from "@formkit/drag-and-drop/react";

const [ref, items, setItems] = useDragAndDrop([
  { id: "1", text: "Tarea 1" },
  { id: "2", text: "Tarea 2" }
]);

return (
  <div ref={ref}>
    {items.map(item => (
      <div key={item.id}>{item.text}</div>
    ))}
  </div>
);`}
        </pre>
      </div>
    </div>
  );
}
