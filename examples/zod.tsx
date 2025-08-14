import { z } from "zod";
import { useState } from "react";

// Esquemas de ejemplo
const UserSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  age: z.number().min(18, "Debe ser mayor de edad").max(120, "Edad inválida"),
  website: z.string().url("URL inválida").optional(),
  role: z.enum(["admin", "user", "guest"]),
  preferences: z.object({
    newsletter: z.boolean(),
    theme: z.enum(["light", "dark", "auto"]),
    language: z.string().min(2).max(5),
  }),
  tags: z.array(z.string().min(1)).min(1, "Debe tener al menos un tag"),
  birthDate: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime()) && parsed < new Date();
  }, "Fecha de nacimiento inválida"),
});

const PostSchema = z.object({
  title: z.string().min(5, "Título muy corto").max(100, "Título muy largo"),
  content: z.string().min(10, "Contenido muy corto"),
  category: z.enum(["tech", "lifestyle", "business", "education"]),
  published: z.boolean(),
  tags: z.array(z.string()).max(5, "Máximo 5 tags"),
  metadata: z.object({
    views: z.number().nonnegative(),
    likes: z.number().nonnegative(),
    readTime: z.number().positive(),
  }),
});

const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.union([
    z.object({
      users: z.array(UserSchema.omit({ preferences: true })),
    }),
    z.object({
      posts: z.array(PostSchema.partial({ metadata: true })),
    }),
  ]),
  message: z.string(),
  timestamp: z.string().datetime(),
});

type User = z.infer<typeof UserSchema>;
type Post = z.infer<typeof PostSchema>;

interface ValidationExample {
  name: string;
  schema: z.ZodSchema;
  validData: any;
  invalidData: any;
  description: string;
}

export default function ZodExample() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [customData, setCustomData] = useState("");
  const [validationResult, setValidationResult] = useState<any>(null);

  const examples: ValidationExample[] = [
    {
      name: "Usuario Completo",
      schema: UserSchema,
      validData: {
        name: "Juan Pérez",
        email: "juan@example.com",
        age: 30,
        website: "https://juanperez.com",
        role: "user",
        preferences: {
          newsletter: true,
          theme: "dark",
          language: "es",
        },
        tags: ["developer", "react"],
        birthDate: "1994-05-15",
      },
      invalidData: {
        name: "J",
        email: "invalid-email",
        age: 15,
        website: "not-a-url",
        role: "invalid-role",
        preferences: {
          newsletter: "yes",
          theme: "purple",
          language: "español-mexicano",
        },
        tags: [],
        birthDate: "2030-01-01",
      },
      description:
        "Esquema complejo con validaciones anidadas y personalizadas",
    },
    {
      name: "Post del Blog",
      schema: PostSchema,
      validData: {
        title: "Introducción a Zod para validación",
        content:
          "Zod es una biblioteca de validación de esquemas TypeScript-first...",
        category: "tech",
        published: true,
        tags: ["typescript", "validation", "zod"],
        metadata: {
          views: 1250,
          likes: 45,
          readTime: 5,
        },
      },
      invalidData: {
        title: "Muy",
        content: "Corto",
        category: "invalid",
        published: "yes",
        tags: ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
        metadata: {
          views: -10,
          likes: -5,
          readTime: 0,
        },
      },
      description: "Validación de contenido con límites y enums",
    },
    {
      name: "Respuesta de API",
      schema: ApiResponseSchema,
      validData: {
        success: true,
        data: {
          users: [
            {
              name: "Ana",
              email: "ana@test.com",
              age: 25,
              role: "admin",
              tags: ["manager"],
              birthDate: "1998-01-01",
            },
          ],
        },
        message: "Usuarios obtenidos exitosamente",
        timestamp: new Date().toISOString(),
      },
      invalidData: {
        success: "true",
        data: {
          invalid: "structure",
        },
        message: 123,
        timestamp: "not-a-datetime",
      },
      description:
        "Esquema para respuestas de API con unions y tipos complejos",
    },
  ];

  const validateCustomData = () => {
    try {
      const parsed = JSON.parse(customData);
      const result = examples[selectedExample].schema.safeParse(parsed);
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        success: false,
        error: { message: "JSON inválido" },
      });
    }
  };

  const currentExample = examples[selectedExample];

  const validateExample = (data: any) => {
    return currentExample.schema.safeParse(data);
  };

  const validResult = validateExample(currentExample.validData);
  const invalidResult = validateExample(currentExample.invalidData);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🛡️ Zod</h1>
        <p>
          Validación de esquemas TypeScript-first con inferencia de tipos
          estática
        </p>
      </div>

      <div className="installation-section">
        <h3>📦 Instalación</h3>
        <div className="installation-code">
          <pre>
            <code>{`npm install zod`}</code>
          </pre>
        </div>
        <p className="installation-note">
          Zod es una biblioteca de validación de esquemas TypeScript-first con
          inferencia de tipos estática.
        </p>
      </div>

      <div className="zod-demo">
        {/* Selector de ejemplos */}
        <div className="example-selector">
          <h3>📋 Ejemplos de Validación</h3>
          <div className="example-buttons">
            {examples.map((example, index) => (
              <button
                key={index}
                className={`btn ${
                  selectedExample === index ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setSelectedExample(index)}
              >
                {example.name}
              </button>
            ))}
          </div>
          <p className="example-description">{currentExample.description}</p>
        </div>

        {/* Esquema actual */}
        <div className="schema-display">
          <h3>📐 Esquema de Validación</h3>
          <div className="schema-code">
            <pre>
              {selectedExample === 0 &&
                `const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18).max(120),
  website: z.string().url().optional(),
  role: z.enum(["admin", "user", "guest"]),
  preferences: z.object({
    newsletter: z.boolean(),
    theme: z.enum(["light", "dark", "auto"]),
    language: z.string().min(2).max(5)
  }),
  tags: z.array(z.string()).min(1),
  birthDate: z.string().refine(/* custom validation */)
});`}
              {selectedExample === 1 &&
                `const PostSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(10),
  category: z.enum(["tech", "lifestyle", "business", "education"]),
  published: z.boolean(),
  tags: z.array(z.string()).max(5),
  metadata: z.object({
    views: z.number().nonnegative(),
    likes: z.number().nonnegative(),
    readTime: z.number().positive()
  })
});`}
              {selectedExample === 2 &&
                `const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.union([
    z.object({ users: z.array(UserSchema.omit({ preferences: true })) }),
    z.object({ posts: z.array(PostSchema.partial({ metadata: true })) })
  ]),
  message: z.string(),
  timestamp: z.string().datetime()
});`}
            </pre>
          </div>
        </div>

        {/* Validación de ejemplos */}
        <div className="validation-examples">
          <div className="validation-pair">
            {/* Datos válidos */}
            <div className="validation-case valid">
              <h4>✅ Datos Válidos</h4>
              <div className="data-display">
                <pre>{JSON.stringify(currentExample.validData, null, 2)}</pre>
              </div>
              <div
                className={`result ${
                  validResult.success ? "success" : "error"
                }`}
              >
                <strong>Resultado:</strong>
                {validResult.success ? (
                  <span className="success-message">✅ Validación exitosa</span>
                ) : (
                  <div className="error-details">
                    <span className="error-message">❌ Error inesperado</span>
                  </div>
                )}
              </div>
            </div>

            {/* Datos inválidos */}
            <div className="validation-case invalid">
              <h4>❌ Datos Inválidos</h4>
              <div className="data-display">
                <pre>{JSON.stringify(currentExample.invalidData, null, 2)}</pre>
              </div>
              <div
                className={`result ${
                  invalidResult.success ? "success" : "error"
                }`}
              >
                <strong>Resultado:</strong>
                {invalidResult.success ? (
                  <span className="success-message">
                    ✅ Validación exitosa (inesperado)
                  </span>
                ) : (
                  <div className="error-details">
                    <span className="error-message">
                      ❌ Errores encontrados:
                    </span>
                    <ul className="error-list">
                      {invalidResult.error?.issues?.map(
                        (issue: any, index: number) => (
                          <li key={index} className="error-item">
                            <strong>{issue.path.join(".")}</strong>:{" "}
                            {issue.message}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Validador personalizado */}
        <div className="custom-validator">
          <h3>🧪 Prueba Tu Propio JSON</h3>
          <div className="validator-controls">
            <textarea
              value={customData}
              onChange={(e) => setCustomData(e.target.value)}
              placeholder={`Ingresa un JSON para validar con el esquema "${currentExample.name}"...`}
              className="json-input"
              rows={8}
            />
            <button
              onClick={validateCustomData}
              className="btn btn-primary validate-btn"
              disabled={!customData.trim()}
            >
              🔍 Validar JSON
            </button>
          </div>

          {validationResult && (
            <div
              className={`validation-result ${
                validationResult.success ? "success" : "error"
              }`}
            >
              <h4>📋 Resultado de Validación:</h4>
              {validationResult.success ? (
                <div className="success-result">
                  <p className="success-message">
                    ✅ JSON válido según el esquema
                  </p>
                  <details>
                    <summary>Ver datos procesados</summary>
                    <pre>{JSON.stringify(validationResult.data, null, 2)}</pre>
                  </details>
                </div>
              ) : (
                <div className="error-result">
                  <p className="error-message">❌ JSON inválido</p>
                  {validationResult.error?.issues ? (
                    <ul className="error-list">
                      {validationResult.error.issues.map(
                        (issue: any, index: number) => (
                          <li key={index} className="error-item">
                            <strong>{issue.path.join(".")}</strong>:{" "}
                            {issue.message}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>{validationResult.error?.message}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tipos TypeScript */}
        <div className="typescript-types">
          <h3>🔷 Tipos TypeScript Inferidos</h3>
          <div className="types-display">
            <pre>
              {selectedExample === 0 &&
                `type User = z.infer<typeof UserSchema>;
// Equivale a:
type User = {
  name: string;
  email: string;
  age: number;
  website?: string;
  role: "admin" | "user" | "guest";
  preferences: {
    newsletter: boolean;
    theme: "light" | "dark" | "auto";
    language: string;
  };
  tags: string[];
  birthDate: string;
}`}
              {selectedExample === 1 &&
                `type Post = z.infer<typeof PostSchema>;
// Equivale a:
type Post = {
  title: string;
  content: string;
  category: "tech" | "lifestyle" | "business" | "education";
  published: boolean;
  tags: string[];
  metadata: {
    views: number;
    likes: number;
    readTime: number;
  };
}`}
              {selectedExample === 2 &&
                `type ApiResponse = z.infer<typeof ApiResponseSchema>;
// Equivale a:
type ApiResponse = {
  success: boolean;
  data: {
    users: User[];
  } | {
    posts: Post[];
  };
  message: string;
  timestamp: string;
}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="zod-features">
        <h3>✨ Características de Zod:</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>🔷 TypeScript First</h4>
            <p>
              Diseñado específicamente para TypeScript con inferencia automática
            </p>
          </div>
          <div className="feature">
            <h4>🪶 Zero Dependencies</h4>
            <p>Sin dependencias externas, bundle pequeño</p>
          </div>
          <div className="feature">
            <h4>🔧 Composable</h4>
            <p>Esquemas reutilizables y componibles</p>
          </div>
          <div className="feature">
            <h4>🛡️ Runtime Safe</h4>
            <p>Validación en tiempo de ejecución con mensajes claros</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <h3>📖 Código de ejemplo:</h3>
        <pre>
          {`import { z } from "zod";

// Definir esquema
const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18)
});

// Inferir tipo TypeScript
type User = z.infer<typeof UserSchema>;

// Validar datos
const result = UserSchema.safeParse({
  name: "Juan",
  email: "juan@example.com",
  age: 30
});

if (result.success) {
  console.log(result.data); // Tipo User
} else {
  console.log(result.error.issues); // Errores detallados
}`}
        </pre>
      </div>
    </div>
  );
}
