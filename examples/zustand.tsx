import { create } from "zustand";
import { persist } from "zustand/middleware";

// Store para contador simple
type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (value: number) => void;
};

const useCounterStore = create<CounterStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      incrementBy: (value) => set((state) => ({ count: state.count + value })),
    }),
    {
      name: "counter-storage", // Persistir en localStorage
    }
  )
);

// Store para lista de tareas
type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
};

const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    { id: "1", text: "Aprender Zustand", completed: false },
    { id: "2", text: "Crear un ejemplo", completed: true },
  ],
  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now().toString(), text, completed: false },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));

// Componente contador
function Counter() {
  const { count, increment, decrement, reset, incrementBy } = useCounterStore();

  return (
    <div className="counter-section">
      <h3>🔢 Contador Persistente</h3>
      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>
      <div className="counter-controls">
        <button onClick={decrement} className="btn btn-secondary">
          -1
        </button>
        <button onClick={increment} className="btn btn-primary">
          +1
        </button>
        <button onClick={() => incrementBy(5)} className="btn btn-accent">
          +5
        </button>
        <button onClick={reset} className="btn btn-danger">
          Reset
        </button>
      </div>
      <p className="counter-note">
        💾 El valor se guarda automáticamente en localStorage
      </p>
    </div>
  );
}

// Componente lista de tareas
function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } =
    useTodoStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("todo") as string;
    if (text.trim()) {
      addTodo(text.trim());
      e.currentTarget.reset();
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todo-section">
      <h3>📝 Lista de Tareas</h3>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          name="todo"
          type="text"
          placeholder="Agregar nueva tarea..."
          className="todo-input"
        />
        <button type="submit" className="btn btn-primary">
          ➕ Agregar
        </button>
      </form>

      <div className="todo-stats">
        <span>Total: {todos.length}</span>
        <span>Completadas: {completedCount}</span>
        <span>Pendientes: {todos.length - completedCount}</span>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <button onClick={() => toggleTodo(todo.id)} className="todo-toggle">
              {todo.completed ? "✅" : "⭕"}
            </button>
            <span className="todo-text">{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)} className="todo-remove">
              🗑️
            </button>
          </div>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="btn btn-secondary clear-completed"
        >
          🧹 Limpiar Completadas
        </button>
      )}
    </div>
  );
}

export function ZustandExample() {
  return (
    <div className="example-container">
      <div className="example-header">
        <h1>🐻 Zustand State Management</h1>
        <p>Gestión de estado simple y potente sin boilerplate</p>
      </div>

      <div className="installation-section">
        <h3>📦 Instalación</h3>
        <div className="installation-code">
          <pre>
            <code>{`npm install zustand`}</code>
          </pre>
        </div>
        <p className="installation-note">
          Zustand es una solución de gestión de estado pequeña, rápida y escalable.
        </p>
      </div>

      <div className="zustand-demo">
        <div className="demo-grid">
          <Counter />
          <TodoList />
        </div>
      </div>

      <div className="zustand-features">
        <h3>✨ Características de Zustand:</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>🚀 Simple</h4>
            <p>Sin providers, sin boilerplate, solo tu store</p>
          </div>
          <div className="feature">
            <h4>💾 Persistencia</h4>
            <p>Middleware para localStorage/sessionStorage</p>
          </div>
          <div className="feature">
            <h4>⚡ Performante</h4>
            <p>Actualizaciones granulares sin re-renders innecesarios</p>
          </div>
          <div className="feature">
            <h4>🔧 TypeScript</h4>
            <p>Soporte completo y tipos inferidos</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <h3>📖 Código de ejemplo:</h3>
        <pre>
          {`import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function Counter() {
  const { count, increment, decrement } = useStore();
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}`}
        </pre>
      </div>
    </div>
  );
}
