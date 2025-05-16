import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("auth") === "true";
  });
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("user") || null;
  });

  const getUsers = (): User[] => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const match = users.find(
      (u) => u.email === email && u.password === password
    );
    if (match) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", email);
      setIsAuthenticated(true);
      setUser(email);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string): boolean => {
    const users = getUsers();
    const exists = users.some((u) => u.email === email);
    if (exists) return false;
    users.push({ email, password });
    saveUsers(users);
    return login(email, password); // автоматично увійти
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
