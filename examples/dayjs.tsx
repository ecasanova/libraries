import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import calendar from "dayjs/plugin/calendar";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import "dayjs/locale/es";
import { useState, useEffect } from "react";
import { Language } from "../src/i18n";

interface ExampleTranslations {
  headerTitle: string;
  headerDescription: string;
  installHeading: string;
  installNote: string;
}

const translations: Record<Language, ExampleTranslations> = {
  es: {
    headerTitle: "📅 Day.js",
    headerDescription: "Manipulación de fechas ligera y moderna",
    installHeading: "📦 Instalación",
    installNote:
      "Day.js es una biblioteca ligera para manejar fechas y tiempos en JavaScript.",
  },
  en: {
    headerTitle: "📅 Day.js",
    headerDescription: "Lightweight, modern date manipulation",
    installHeading: "📦 Installation",
    installNote:
      "Day.js is a lightweight library for handling dates and times in JavaScript.",
  },
};

// Configurar plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(calendar);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

interface DateOperation {
  title: string;
  description: string;
  code: string;
  result: string;
  category: string;
}

export default function DayjsExample({ lang }: { lang: Language }) {
  dayjs.locale(lang);
  const t = translations[lang];
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [selectedTimezone, setSelectedTimezone] = useState(
    "America/Mexico_City"
  );
  const [customDate, setCustomDate] = useState("2024-12-25");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Actualizar hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timezones = [
    "America/Mexico_City",
    "America/New_York",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ];

  const now = dayjs();
  const birthday = dayjs("1990-05-15");
  const christmas = dayjs(customDate);

  const operations: DateOperation[] = [
    // Formato y display
    {
      title: "Formato básico",
      description: "Formatear fecha actual",
      code: "dayjs().format('DD/MM/YYYY')",
      result: now.format("DD/MM/YYYY"),
      category: "Formato",
    },
    {
      title: "Formato completo",
      description: "Fecha y hora completa",
      code: "dayjs().format('dddd, DD [de] MMMM [de] YYYY [a las] HH:mm:ss')",
      result: now.format("dddd, DD [de] MMMM [de] YYYY [a las] HH:mm:ss"),
      category: "Formato",
    },
    {
      title: "Formato ISO",
      description: "Formato estándar ISO",
      code: "dayjs().toISOString()",
      result: now.toISOString(),
      category: "Formato",
    },
    {
      title: "Unix timestamp",
      description: "Timestamp en segundos",
      code: "dayjs().unix()",
      result: now.unix().toString(),
      category: "Formato",
    },

    // Tiempo relativo
    {
      title: "Hace cuánto",
      description: "Tiempo transcurrido desde cumpleaños",
      code: "dayjs('1990-05-15').fromNow()",
      result: birthday.fromNow(),
      category: "Relativo",
    },
    {
      title: "En cuánto tiempo",
      description: "Tiempo hasta Navidad",
      code: `dayjs('${customDate}').fromNow()`,
      result: christmas.fromNow(),
      category: "Relativo",
    },
    {
      title: "Diferencia en días",
      description: "Días transcurridos",
      code: "dayjs().diff(dayjs('1990-05-15'), 'day')",
      result: now.diff(birthday, "day").toString() + " días",
      category: "Relativo",
    },
    {
      title: "Diferencia en años",
      description: "Edad en años",
      code: "dayjs().diff(dayjs('1990-05-15'), 'year')",
      result: now.diff(birthday, "year").toString() + " años",
      category: "Relativo",
    },

    // Manipulación
    {
      title: "Agregar tiempo",
      description: "Fecha en 30 días",
      code: "dayjs().add(30, 'day').format('DD/MM/YYYY')",
      result: now.add(30, "day").format("DD/MM/YYYY"),
      category: "Manipulación",
    },
    {
      title: "Restar tiempo",
      description: "Fecha hace 6 meses",
      code: "dayjs().subtract(6, 'month').format('DD/MM/YYYY')",
      result: now.subtract(6, "month").format("DD/MM/YYYY"),
      category: "Manipulación",
    },
    {
      title: "Inicio del día",
      description: "Medianoche de hoy",
      code: "dayjs().startOf('day').format('DD/MM/YYYY HH:mm:ss')",
      result: now.startOf("day").format("DD/MM/YYYY HH:mm:ss"),
      category: "Manipulación",
    },
    {
      title: "Fin del mes",
      description: "Último día del mes",
      code: "dayjs().endOf('month').format('DD/MM/YYYY')",
      result: now.endOf("month").format("DD/MM/YYYY"),
      category: "Manipulación",
    },

    // Validación y comparación
    {
      title: "Es antes",
      description: "¿Navidad es antes que hoy?",
      code: `dayjs('${customDate}').isBefore(dayjs())`,
      result: christmas.isBefore(now) ? "Sí" : "No",
      category: "Comparación",
    },
    {
      title: "Es mismo año",
      description: "¿Navidad es este año?",
      code: `dayjs('${customDate}').isSame(dayjs(), 'year')`,
      result: christmas.isSame(now, "year") ? "Sí" : "No",
      category: "Comparación",
    },
    {
      title: "Es válida",
      description: "¿La fecha es válida?",
      code: "dayjs('2024-02-30').isValid()",
      result: dayjs("2024-02-30").isValid() ? "Sí" : "No",
      category: "Comparación",
    },

    // Información
    {
      title: "Día del año",
      description: "Día número del año",
      code: "dayjs().dayOfYear()",
      result: now.dayOfYear().toString(),
      category: "Información",
    },
    {
      title: "Semana del año",
      description: "Semana número del año",
      code: "dayjs().week()",
      result: now.week().toString(),
      category: "Información",
    },
    {
      title: "Días en el mes",
      description: "Cantidad de días este mes",
      code: "dayjs().daysInMonth()",
      result: now.daysInMonth().toString(),
      category: "Información",
    },
  ];

  const categories = [...new Set(operations.map((op) => op.category))];

  const filteredOperations = selectedCategory
    ? operations.filter((op) => op.category === selectedCategory)
    : operations;

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
            <code>{`npm install dayjs`}</code>
          </pre>
        </div>
        <p className="installation-note">{t.installNote}</p>
      </div>

      <div className="dayjs-demo">
        {/* Reloj en tiempo real */}
        <div className="live-clock-section">
          <div className="live-clock">
            <h3>🕐 Reloj en Tiempo Real</h3>
            <div className="clock-display">
              <div className="time">{currentTime.format("HH:mm:ss")}</div>
              <div className="date">
                {currentTime.format("dddd, DD [de] MMMM [de] YYYY")}
              </div>
            </div>
          </div>

          {/* Zonas horarias */}
          <div className="timezone-section">
            <h3>🌍 Zonas Horarias</h3>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="timezone-select"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
            <div className="timezone-display">
              <div className="timezone-time">
                {currentTime.tz(selectedTimezone).format("HH:mm:ss")}
              </div>
              <div className="timezone-date">
                {currentTime.tz(selectedTimezone).format("DD/MM/YYYY")}
              </div>
              <div className="timezone-offset">
                UTC{currentTime.tz(selectedTimezone).format("Z")}
              </div>
            </div>
          </div>
        </div>

        {/* Controles de fecha personalizada */}
        <div className="date-controls">
          <h3>🎯 Fecha Personalizada</h3>
          <div className="control-group">
            <label>Selecciona una fecha para las operaciones:</label>
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>

        {/* Filtros de categoría */}
        <div className="category-filters">
          <h3>📋 Filtrar por Categoría</h3>
          <div className="filter-buttons">
            <button
              className={`btn ${
                selectedCategory === null ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              📋 Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`btn ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Operaciones */}
        <div className="operations-grid">
          {filteredOperations.map((operation, index) => (
            <div key={index} className="operation-card">
              <div className="operation-header">
                <h4>{operation.title}</h4>
                <span className="operation-category">{operation.category}</span>
              </div>
              <p className="operation-description">{operation.description}</p>
              <div className="operation-code">
                <code>{operation.code}</code>
              </div>
              <div className="operation-result">
                <strong>Resultado:</strong> <span>{operation.result}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Duración y calendario */}
        <div className="special-features">
          <div className="duration-demo">
            <h3>⏱️ Duración</h3>
            <div className="duration-examples">
              <div className="duration-item">
                <label>1 hora en minutos:</label>
                <span>{dayjs.duration(1, "hour").asMinutes()} minutos</span>
              </div>
              <div className="duration-item">
                <label>90 minutos humanizado:</label>
                <span>{dayjs.duration(90, "minutes").humanize()}</span>
              </div>
              <div className="duration-item">
                <label>Tiempo hasta fin de año:</label>
                <span>
                  {dayjs
                    .duration(dayjs().endOf("year").diff(dayjs()))
                    .humanize(true)}
                </span>
              </div>
            </div>
          </div>

          <div className="calendar-demo">
            <h3>📆 Calendario</h3>
            <div className="calendar-examples">
              <div className="calendar-item">
                <label>Ayer:</label>
                <span>{dayjs().subtract(1, "day").calendar()}</span>
              </div>
              <div className="calendar-item">
                <label>Mañana:</label>
                <span>{dayjs().add(1, "day").calendar()}</span>
              </div>
              <div className="calendar-item">
                <label>La semana pasada:</label>
                <span>{dayjs().subtract(1, "week").calendar()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dayjs-features">
        <h3>✨ Ventajas de Day.js:</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>🪶 Ligero</h4>
            <p>Solo 2KB minificado - 100 veces más pequeño que Moment.js</p>
          </div>
          <div className="feature">
            <h4>🔌 Modular</h4>
            <p>Carga solo los plugins que necesitas</p>
          </div>
          <div className="feature">
            <h4>🔄 Compatible</h4>
            <p>API similar a Moment.js para migración fácil</p>
          </div>
          <div className="feature">
            <h4>🌍 I18n</h4>
            <p>Soporte para internacionalización</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <h3>📖 Código de ejemplo:</h3>
        <pre>
          {`import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';

// Configurar plugins e idioma
dayjs.extend(relativeTime);
dayjs.locale('es');

// Ejemplos de uso
const now = dayjs();
const formatted = now.format('DD/MM/YYYY HH:mm');
const relative = now.subtract(1, 'day').fromNow(); // "hace un día"
const added = now.add(7, 'day');
const isValid = dayjs('2024-02-30').isValid(); // false

// Comparaciones
const isBefore = dayjs('2024-01-01').isBefore(dayjs());
const isSame = dayjs().isSame(dayjs(), 'day');`}
        </pre>
      </div>
    </div>
  );
}
