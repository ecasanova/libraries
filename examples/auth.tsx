import { AuthProvider, useAuth } from "../src/lib/auth-context";

function AuthButton() {
  const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="auth-status">
        <div className="user-info">
          <span className="status-badge">🔄 Cargando...</span>
        </div>
      </div>
    );
  }

  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  if (!clientId || clientId === "your-github-client-id") {
    return (
      <div className="auth-status">
        <div className="user-info">
          <span className="status-badge unauthenticated">
            ⚠️ Configuración incompleta
          </span>
        </div>
        <div className="auth-config-warning">
          <p>Para usar la autenticación, necesitas:</p>
          <ol>
            <li>Crear una GitHub OAuth App</li>
            <li>Configurar VITE_GITHUB_CLIENT_ID en .env</li>
            <li>Reiniciar el servidor</li>
          </ol>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    const isDemo = user.name?.includes('(Demo)') || user.id?.toString().startsWith('demo_');
    
    return (
      <div className="auth-status">
        {isDemo && (
          <div className="demo-badge">
            🎭 Datos de Demostración
          </div>
        )}
        <div className="user-info">
          <div className="avatar-container">
            <img 
              src={user.avatar_url} 
              alt="Avatar" 
              className="user-avatar"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="avatar-placeholder hidden">
              <span className="avatar-initials">
                {user.name?.charAt(0)?.toUpperCase() || user.login?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
          </div>
          <span className="user-email">
            {user.email || user.name || user.login}
          </span>
          <span className="status-badge authenticated">
            ✓ Autenticado con GitHub
          </span>
        </div>
        <div className="user-details">
          <p>
            <strong>Usuario:</strong> @{user.login}
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          {isDemo && (
            <div className="demo-info">
              <p><strong>ℹ️ Nota:</strong> Estos son datos de demostración generados automáticamente.</p>
              <p>Para obtener datos reales, necesitas configurar un backend que maneje el intercambio seguro de tokens.</p>
            </div>
          )}
        </div>
        <button className="auth-button logout-button" onClick={signOut}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="auth-status">
      <div className="user-info">
        <span className="status-badge unauthenticated">✗ No autenticado</span>
      </div>
      <button className="auth-button login-button" onClick={signIn}>
        <svg className="github-icon" viewBox="0 0 24 24" width="20" height="20">
          <path
            fill="currentColor"
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        Iniciar sesión con GitHub
      </button>
    </div>
  );
}
// Wrapper que incluye el AuthProvider personalizado
export default function AuthExample() {
  return (
    <AuthProvider>
      <div className="example-header">
        <h2>🔐 GitHub OAuth</h2>
        <p>Autenticación personalizada con GitHub OAuth (sin NextAuth.js)</p>
      </div>

      <div className="installation-section">
        <h3>📦 Configuración</h3>
        <div className="installation-code">
          <pre>
            <code>
              # Agregar al archivo .env{"\n"}
              VITE_GITHUB_CLIENT_ID=tu-client-id-aqui
            </code>
          </pre>
        </div>
      </div>

      <div className="auth-demo">
        <h3>🚀 Demo de Autenticación</h3>
        <div className="demo-content">
          <AuthButton />

          <div className="auth-setup-guide">
            <h4>🛠️ Configuración para GitHub OAuth:</h4>
            <div className="setup-steps">
              <div className="setup-step">
                <h5>1. Crear GitHub OAuth App</h5>
                <p>
                  Ve a{" "}
                  <a
                    href="https://github.com/settings/applications/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Settings → Developer settings → OAuth Apps
                  </a>
                </p>
                <ul>
                  <li>
                    <strong>Application name:</strong> Mi App React
                  </li>
                  <li>
                    <strong>Homepage URL:</strong> {window.location.origin}
                  </li>
                  <li>
                    <strong>Authorization callback URL:</strong>{" "}
                    {window.location.origin}/
                  </li>
                </ul>
              </div>

              <div className="setup-step">
                <h5>2. Configurar variable de entorno</h5>
                <p>
                  Agrega tu GitHub Client ID al archivo <code>.env</code>:
                </p>
                <div className="env-example">
                  <pre>
                    <code>VITE_GITHUB_CLIENT_ID=tu-client-id-de-github</code>
                  </pre>
                </div>
              </div>

              <div className="setup-step">
                <h5>3. Para datos reales (Opcional)</h5>
                <p>Para obtener tus datos reales de GitHub, necesitas:</p>
                <ul>
                  <li>Crear un backend que maneje el intercambio código↔token</li>
                  <li>Usar tu <code>client_secret</code> de forma segura en el servidor</li>
                  <li>Hacer llamadas autenticadas a la API de GitHub</li>
                </ul>
                <p><em>Actualmente funciona con datos de demostración generados dinámicamente.</em></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-features">
        <h3>✨ Características de esta implementación</h3>
        <div className="features-grid">
          <div className="feature-item">
            <h4>🎯 Simple y directo</h4>
            <p>
              Implementación nativa sin dependencias pesadas como NextAuth.js
            </p>
          </div>
          <div className="feature-item">
            <h4>🔒 Seguro</h4>
            <p>Usa el flujo OAuth 2.0 estándar de GitHub con state parameter</p>
          </div>
          <div className="feature-item">
            <h4>💾 Persistente</h4>
            <p>
              Guarda la sesión en localStorage para mantener el login entre
              recargas
            </p>
          </div>
          <div className="feature-item">
            <h4>⚡ Compatible con Vite</h4>
            <p>Diseñado específicamente para aplicaciones React + Vite</p>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
import { useEffect, useState } from "react";
