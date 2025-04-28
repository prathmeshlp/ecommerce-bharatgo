import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { login, signup, logout, onAuthChange } from "../services/firebase"

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(setUser);
    return () => unsubscribe();
  }, []);

  const authContextValue: AuthContextType = {
    user,
    login: async (email: string, password: string) => {
      await login(email, password);
    },
    signup: async (email: string, password: string) => {
      await signup(email, password);
    },
    logout: async () => {
      await logout();
    },
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

