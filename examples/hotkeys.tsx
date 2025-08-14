import { useEffect, useState } from "react";
import hotkeys from "hotkeys-js";

interface HotkeyAction {
  key: string;
  description: string;
  action: () => void;
  category: string;
}

interface LogEntry {
  id: number;
  timestamp: string;
  hotkey: string;
  description: string;
}

export default function HotkeysExample() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [counter, setCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications, setNotifications] = useState<string[]>([]);

  const addLog = (hotkey: string, description: string) => {
    const newEntry: LogEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      hotkey,
      description,
    };
    setLog((prev) => [newEntry, ...prev.slice(0, 9)]); // Mantener solo 10 entradas
  };

  const showNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  const hotkeyActions: HotkeyAction[] = [
    {
      key: "ctrl+k,command+k",
      description: "Abrir modal de búsqueda",
      action: () => {
        setIsModalOpen(true);
        addLog("Ctrl+K", "Modal abierto");
        showNotification("🔍 Modal abierto");
      },
      category: "Navegación",
    },
    {
      key: "escape",
      description: "Cerrar modal",
      action: () => {
        setIsModalOpen(false);
        addLog("Escape", "Modal cerrado");
      },
      category: "Navegación",
    },
    {
      key: "ctrl+j,command+j",
      description: "Incrementar contador",
      action: () => {
        setCounter((prev) => prev + 1);
        addLog("Ctrl+J", "Contador incrementado");
        showNotification("➕ Contador: " + (counter + 1));
      },
      category: "Acciones",
    },
    {
      key: "ctrl+h,command+h",
      description: "Decrementar contador",
      action: () => {
        setCounter((prev) => Math.max(0, prev - 1));
        addLog("Ctrl+H", "Contador decrementado");
        showNotification("➖ Contador: " + Math.max(0, counter - 1));
      },
      category: "Acciones",
    },
    {
      key: "ctrl+r,command+r",
      description: "Reset contador",
      action: () => {
        setCounter(0);
        addLog("Ctrl+R", "Contador reseteado");
        showNotification("🔄 Contador reseteado");
      },
      category: "Acciones",
    },
    {
      key: "ctrl+t,command+t",
      description: "Cambiar tema",
      action: () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        addLog("Ctrl+T", `Tema cambiado a ${newTheme}`);
        showNotification(`🎨 Tema: ${newTheme}`);
      },
      category: "Configuración",
    },
    {
      key: "ctrl+l,command+l",
      description: "Limpiar log",
      action: () => {
        setLog([]);
        addLog("Ctrl+L", "Log limpiado");
        showNotification("🧹 Log limpiado");
      },
      category: "Utilidades",
    },
    {
      key: "ctrl+?,command+?",
      description: "Mostrar ayuda",
      action: () => {
        addLog("Ctrl+?", "Ayuda solicitada");
        showNotification("❓ Revisa la lista de atajos abajo");
      },
      category: "Ayuda",
    },
  ];

  useEffect(() => {
    // Registrar todos los hotkeys
    hotkeyActions.forEach(({ key, action }) => {
      hotkeys(key, (event) => {
        event.preventDefault();
        action();
      });
    });

    // Cleanup
    return () => {
      hotkeyActions.forEach(({ key }) => {
        hotkeys.unbind(key);
      });
    };
  }, [counter, theme]); // Re-register when dependencies change

  const groupedHotkeys = hotkeyActions.reduce((acc, hotkey) => {
    if (!acc[hotkey.category]) {
      acc[hotkey.category] = [];
    }
    acc[hotkey.category].push(hotkey);
    return acc;
  }, {} as Record<string, HotkeyAction[]>);

  return (
    <div className={`page-container ${theme === "dark" ? "dark-theme" : ""}`}>
      <div className="page-header">
        <h1>⌨️ Hotkeys.js</h1>
        <p>Atajos de teclado poderosos y flexibles para aplicaciones web</p>
      </div>

      <div className="installation-section">
        <h3>📦 Instalación</h3>
        <div className="installation-code">
          <pre>
            <code>{`npm install hotkeys-js`}</code>
          </pre>
        </div>
        <p className="installation-note">
          Hotkeys.js es una biblioteca robusta para manejar atajos de teclado en
          aplicaciones web.
        </p>
      </div>

      {/* Notificaciones */}
      <div className="notifications-container">
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            {notification}
          </div>
        ))}
      </div>

      <div className="hotkeys-demo">
        {/* Estado actual */}
        <div className="demo-state">
          <div className="state-card">
            <h3>📊 Estado Actual</h3>
            <div className="state-grid">
              <div className="state-item">
                <label>Contador:</label>
                <span className="state-value">{counter}</span>
              </div>
              <div className="state-item">
                <label>Tema:</label>
                <span className="state-value">{theme}</span>
              </div>
              <div className="state-item">
                <label>Modal:</label>
                <span className="state-value">
                  {isModalOpen ? "Abierto" : "Cerrado"}
                </span>
              </div>
            </div>
          </div>

          {/* Log de actividad */}
          <div className="activity-log">
            <h3>📝 Log de Actividad</h3>
            <div className="log-container">
              {log.length === 0 ? (
                <p className="no-activity">
                  Sin actividad. ¡Prueba algunos atajos!
                </p>
              ) : (
                log.map((entry) => (
                  <div key={entry.id} className="log-entry">
                    <span className="log-time">{entry.timestamp}</span>
                    <span className="log-hotkey">{entry.hotkey}</span>
                    <span className="log-description">{entry.description}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Lista de atajos disponibles */}
        <div className="hotkeys-reference">
          <h3>🎯 Atajos Disponibles</h3>
          {Object.entries(groupedHotkeys).map(([category, hotkeys]) => (
            <div key={category} className="hotkey-category">
              <h4 className="category-title">{category}</h4>
              <div className="hotkeys-grid">
                {hotkeys.map((hotkey, index) => (
                  <div key={index} className="hotkey-item">
                    <div className="hotkey-combo">
                      {hotkey.key
                        .split(",")[0]
                        .split("+")
                        .map((key, i, arr) => (
                          <span key={i}>
                            <kbd className="key">{key}</kbd>
                            {i < arr.length - 1 && (
                              <span className="plus">+</span>
                            )}
                          </span>
                        ))}
                    </div>
                    <div className="hotkey-desc">{hotkey.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Área de prueba interactiva */}
        <div className="interactive-area">
          <h3>🎮 Área Interactiva</h3>
          <p>Haz clic aquí y prueba los atajos de teclado:</p>
          <div
            className="focus-area"
            tabIndex={0}
            onFocus={() =>
              showNotification("✨ Área enfocada - atajos activos")
            }
          >
            <div className="counter-display">
              <span className="counter-label">Contador:</span>
              <span className="counter-value">{counter}</span>
            </div>
            <p>Usa Ctrl+J/H para modificar, Ctrl+R para resetear</p>
          </div>
        </div>
      </div>

      {/* Modal de búsqueda */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔍 Búsqueda Rápida</h3>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Buscar..."
                className="search-input"
                autoFocus
              />
              <p className="modal-tip">
                💡 Presiona <kbd>Escape</kbd> para cerrar
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="hotkeys-features">
        <h3>✨ Características de Hotkeys.js:</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>🎯 Flexibilidad</h4>
            <p>Combina múltiples teclas, secuencias y modificadores</p>
          </div>
          <div className="feature">
            <h4>🔧 Configuración</h4>
            <p>Scope, filtros y opciones avanzadas</p>
          </div>
          <div className="feature">
            <h4>📱 Compatibilidad</h4>
            <p>Funciona en todos los navegadores modernos</p>
          </div>
          <div className="feature">
            <h4>⚡ Ligero</h4>
            <p>Solo 3KB minificado y comprimido</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <h3>📖 Código de ejemplo:</h3>
        <pre>
          {`import hotkeys from "hotkeys-js";

// Hotkey simple
hotkeys('ctrl+k', (event) => {
  event.preventDefault();
  openSearchModal();
});

// Múltiples combinaciones
hotkeys('ctrl+j,command+j', (event) => {
  incrementCounter();
});

// Con scope
hotkeys('enter', 'modal', (event) => {
  submitForm();
});

// Cleanup
useEffect(() => {
  return () => {
    hotkeys.unbind('ctrl+k');
  };
}, []);`}
        </pre>
      </div>
    </div>
  );
}
