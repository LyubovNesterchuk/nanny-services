import { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../services/firebase";
import {
  loginUser,
  logoutUser,
} from "../services/auth.service";
import { AuthContext } from "./auth.context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: name,
    });

    setUser({
      ...result.user,
      displayName: name,
    });
  };

  const logout = async () => {
    await logoutUser();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};