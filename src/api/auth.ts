// Mock API endpoints para NextAuth.js en desarrollo
// En un proyecto real de Next.js, esto estaría en /pages/api/auth/[...nextauth].ts

import { authOptions } from "../lib/auth";

// Simulación de endpoints de autenticación
export const mockAuthAPI = {
  async signIn(provider: string) {
    console.log(`Iniciando sesión con ${provider}...`);

    // En desarrollo, simula una respuesta exitosa
    if (process.env.NODE_ENV === "development") {
      // Simula el flujo de OAuth
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXTAUTH_URL}/api/auth/callback/github&scope=read:user%20user:email`;

      // En un entorno real, esto redirigiría a GitHub
      console.log("Redirigiendo a:", githubAuthUrl);

      // Para desarrollo, retorna un mock de usuario
      return {
        user: {
          id: "demo-user",
          name: "Usuario Demo",
          email: "demo@example.com",
          image: "https://github.com/github.png",
        },
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días
      };
    }
  },

  async signOut() {
    console.log("Cerrando sesión...");
    return { success: true };
  },

  async getSession() {
    // En desarrollo, retorna una sesión mock si existe
    const mockSession = localStorage.getItem("mock-auth-session");
    return mockSession ? JSON.parse(mockSession) : null;
  },
};

// Helper para manejar las redirecciones de OAuth en desarrollo
export const handleOAuthRedirect = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    // En un entorno real, este código se enviaría al backend para intercambiarlo por tokens
    console.log("Código de autorización recibido:", code);

    // Simula la creación de una sesión
    const mockSession = {
      user: {
        id: "github-user",
        name: "Usuario GitHub",
        email: "user@github.com",
        image: "https://github.com/github.png",
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    localStorage.setItem("mock-auth-session", JSON.stringify(mockSession));

    // Limpia la URL
    window.history.replaceState({}, document.title, window.location.pathname);

    return mockSession;
  }

  return null;
};
