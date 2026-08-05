import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('documind_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('documind_user');
      }
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // Simulated login — accepts any credentials
    await new Promise((resolve) => setTimeout(resolve, 800));
    const authUser: AuthUser = {
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
    };
    setUser(authUser);
    localStorage.setItem('documind_user', JSON.stringify(authUser));
  };

  const register = async (name: string, email: string, _password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const authUser: AuthUser = { name, email };
    setUser(authUser);
    localStorage.setItem('documind_user', JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('documind_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
