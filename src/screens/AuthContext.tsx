import React, { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "@/services/loginService";
import {  UserProfile } from "@/services/UserService";
import { storage } from "@/storage";
import { User } from "../models/user";
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUserProfile: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const setUserProfile = async () => {
    const prof = await UserProfile();
    setUser(prof);
  };

  const logout = async () => {
    await logoutUser(await storage.getRefreshToken())
    setUser(null);
  };


useEffect(() => {

  const restoreSession = async () => {

    const token = await storage.getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    const prof = await UserProfile();

    setUser(prof);

    setLoading(false);
  };

  restoreSession();

}, []);
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, setUserProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};