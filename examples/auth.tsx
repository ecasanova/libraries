import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

function AuthButton() {
  const { data: session, status } = useSession();
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Verificar si las variables de entorno están configuradas
    const hasGitHubConfig = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET;
    setIsConfigured(!!hasGitHubConfig);
  }, []);

  if (status === "loading") {
    return (
      <div className="auth-status">
        <div className="user-info">
          <span className="status-badge">🔄 Cargando...</span>
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="auth-status">
        <div className="user-info">
          <span className="status-badge unauthenticated">⚠️ Configuración incompleta</span>
        </div>
        <div className="auth-config-warning">
          <p>Para usar la autenticación, necesitas:</p>
          <ol>
            <li>Crear una GitHub OAuth App</li>
            <li>Configurar las variables de entorno</li>
            <li>Reiniciar el servidor</li>
          </ol>
        </div>
      </div>
    );
  }
  
  if (session) {
    return (
      <div className="auth-status">
        <div className="user-info">
          {session.user?.image && (
            <img 
              src={session.user.image} 
              alt="Avatar" 
              className="user-avatar"
            />
          )}
          <span className="user-email">{session.user?.email || session.user?.name || 'Usuario autenticado'}</span>
          <span className="status-badge authenticated">✓ Autenticado con GitHub</span>
        </div>
        <button 
          className="auth-button logout-button" 
          onClick={() => signOut()}
        >
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
      <button 
        className="auth-button login-button" 
        onClick={() => signIn("github")}
      >
        <svg className="github-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Iniciar sesión con GitHub
      </button>
    </div>
  );
}

// Wrapper que incluye el SessionProvider
export default function AuthExample() {
  return (
    <SessionProvider>
      <div className="example-header">
        <h2>Auth.js (NextAuth.js)</h2>
        <p>Autenticación de usuarios con GitHub OAuth</p>
      </div>
      
      <div className="installation-section">
        <h3>📦 Instalación</h3>
        <div className="installation-code">
          <pre>
            <code>npm install next-auth</code>
          </pre>
        </div>
      </div>

      <div className="auth-demo">
        <h3>🔐 Demo de Autenticación</h3>
        <div className="demo-content">
          <AuthButton />
          
          <div className="auth-setup-guide">
            <h4>🚀 Configuración para GitHub OAuth:</h4>
            <div className="setup-steps">
              <div className="setup-step">
                <h5>1. Crear GitHub OAuth App</h5>
                <p>Ve a <a href="https://github.com/settings/applications/new" target="_blank" rel="noopener noreferrer">GitHub Settings → Developer settings → OAuth Apps</a></p>
                <ul>
                  <li><strong>Application name:</strong> Mi App React</li>
                  <li><strong>Homepage URL:</strong> http://localhost:5174</li>
                  <li><strong>Authorization callback URL:</strong> http://localhost:5174/api/auth/callback/github</li>
                </ul>
              </div>
              
              <div className="setup-step">
                <h5>2. Configurar variables de entorno</h5>
                <p>Copia el Client ID y Client Secret de tu GitHub App y agrégalos al archivo <code>.env</code>:</p>
                <div className="env-example">
                  <pre>
                    <code>{`NEXTAUTH_URL=http://localhost:5174
NEXTAUTH_SECRET=tu-secreto-super-seguro-aqui
GITHUB_CLIENT_ID=tu-github-client-id
GITHUB_CLIENT_SECRET=tu-github-client-secret`}</code>
                  </pre>
                </div>
              </div>
              
              <div className="setup-step">
                <h5>3. Reiniciar el servidor</h5>
                <p>Detén el servidor (Ctrl+C) y reinicia con <code>npm run dev</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-features">
        <h3>✨ Características principales</h3>
        <div className="features-grid">
          <div className="feature-item">
            <h4>🔐 Múltiples proveedores</h4>
            <p>GitHub, Google, Discord, Auth0, y más de 50 proveedores OAuth</p>
          </div>
          <div className="feature-item">
            <h4>🛡️ Seguro por defecto</h4>
            <p>JWT, bases de datos, CSRF protection, secure cookies</p>
          </div>
          <div className="feature-item">
            <h4>🎨 Personalizable</h4>
            <p>Páginas de login personalizadas, callbacks, y hooks</p>
          </div>
          <div className="feature-item">
            <h4>📱 Universal</h4>
            <p>Compatible con Next.js, React, Svelte, y aplicaciones serverless</p>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
