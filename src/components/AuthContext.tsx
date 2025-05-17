import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  firstName: string | null;
  login: (email: string, password: string) => boolean;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => boolean;
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
  const [firstName, setFirstName] = useState<string | null>(() => {
    return localStorage.getItem("firstName") || null;
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
      localStorage.setItem("firstName", match.firstName);
      setIsAuthenticated(true);
      setUser(email);
      setFirstName(match.firstName);
      return true;
    }
    return false;
  };

  const register = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): boolean => {
    const users = getUsers();
    const exists = users.some((u) => u.email === email);
    if (exists) return false;
    users.push({ email, password, firstName, lastName });
    saveUsers(users);
    return login(email, password); // автоматично увійти
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    localStorage.removeItem("firstName");
    setIsAuthenticated(false);
    setUser(null);
    setFirstName(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, firstName, login, register, logout }}
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
