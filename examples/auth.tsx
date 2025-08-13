import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="auth-status">
        <div className="user-info">
          <span className="status-badge">🔄 Cargando...</span>
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
          <span className="user-email">{session.user?.email}</span>
          <span className="status-badge authenticated">✓ Autenticado</span>
        </div>
        <button className="auth-button logout-button" onClick={() => signOut()}>
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
        Iniciar sesión con GitHub
      </button>
    </div>
  );
}

export default function AuthExample() {
  return (
    <SessionProvider>
      <div className="example-header">
        <h2>🔐 Auth.js</h2>
        <p>Autenticación con GitHub usando Auth.js</p>
      </div>
      <div className="auth-demo">
        <h3>🚀 Demo de Autenticación</h3>
        <AuthStatus />
      </div>
    </SessionProvider>
  );
}
