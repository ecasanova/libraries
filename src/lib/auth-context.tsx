// Contexto de autenticación personalizado para GitHub OAuth
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configuración de GitHub OAuth
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/auth/callback`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay un token guardado al inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('github_user');
    const savedToken = localStorage.getItem('github_token');
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('github_user');
        localStorage.removeItem('github_token');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Manejar la redirección de GitHub OAuth
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        setIsLoading(true);
        try {
          // En una aplicación real, enviarías el código a tu backend
          // Aquí simularemos obtener el usuario
          await exchangeCodeForUser(code);
          
          // Limpiar la URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Error during OAuth callback:', error);
        }
        setIsLoading(false);
      }
    };

    handleCallback();
  }, []);

  const exchangeCodeForUser = async (code: string) => {
    // En una aplicación real, esto sería una llamada a tu backend
    // que intercambiaría el código por un access_token
    
    // Para demostración, crearemos un usuario mock
    const mockUser: User = {
      id: '123456',
      login: 'demo-user',
      name: 'Usuario Demo',
      email: 'demo@github.com',
      avatar_url: 'https://github.com/github.png'
    };
    
    setUser(mockUser);
    localStorage.setItem('github_user', JSON.stringify(mockUser));
    localStorage.setItem('github_token', 'demo-token');
    
    console.log('OAuth code received:', code);
    console.log('User authenticated:', mockUser);
  };

  const signIn = () => {
    if (!GITHUB_CLIENT_ID) {
      console.error('GITHUB_CLIENT_ID not configured');
      return;
    }

    const scope = 'read:user user:email';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=${Math.random().toString(36)}`;
    
    console.log('Redirecting to GitHub OAuth:', githubAuthUrl);
    window.location.href = githubAuthUrl;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('github_user');
    localStorage.removeItem('github_token');
    console.log('User signed out');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
