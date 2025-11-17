import React, { createContext, useContext, useState, useEffect } from "react";
import usersData from "@/data/users.json";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("zaliant_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = usersData.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      };
      setUser(userData);
      localStorage.setItem("zaliant_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    const existingUser = usersData.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role: "user",
    };

    setUser(newUser);
    localStorage.setItem("zaliant_user", JSON.stringify(newUser));
    
    // In a real app, save to database
    const users = JSON.parse(localStorage.getItem("zaliant_all_users") || "[]");
    users.push({ ...newUser, password });
    localStorage.setItem("zaliant_all_users", JSON.stringify(users));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zaliant_user");
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
