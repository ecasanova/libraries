import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useState } from "react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function DragAndDropExample() {
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
    <div className="example-container">
      <div className="example-header">
        <h1>🎯 Drag & Drop Task List</h1>
        <p>
          Arrastra las tareas para reordenarlas. Usa la biblioteca
          @formkit/drag-and-drop
        </p>
      </div>

      <div className="installation-section">
        <h3>📦 Instalación</h3>
        <div className="installation-code">
          <pre>
            <code>{`npm install @formkit/drag-and-drop`}</code>
          </pre>
        </div>
        <p className="installation-note">
          FormKit Drag and Drop es una biblioteca liviana y flexible para
          funcionalidad drag & drop.
        </p>
      </div>

      <div className="drag-drop-demo">
        <div className="add-task-section">
          <div className="input-group">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Agregar nueva tarea..."
              className="task-input"
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            <button onClick={addTask} className="add-btn">
              ➕ Agregar
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
          <p>Total: {tasks.length} tareas</p>
          <p>Completadas: {tasks.filter((t) => t.completed).length}</p>
          <p>Pendientes: {tasks.filter((t) => !t.completed).length}</p>
        </div>
      </div>

      <div className="code-example">
        <h3>📖 Código de ejemplo:</h3>
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
