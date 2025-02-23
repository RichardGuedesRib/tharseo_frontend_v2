import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  levelUser: string;
  balance: number;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  expiresIn: number | null;
  setAuth: (payload: { user: User; token: string; expiresIn: number }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      expiresIn: null,

      setAuth: (payload) =>
        set(() => ({
          user: payload.user,
          token: payload.token,
          expiresIn: payload.expiresIn,
        })),

      logout: () =>
        set(() => ({
          user: null,
          token: null,
          expiresIn: null,
        })),
    }),
    {
      name: "auth-storage", 
            storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null; 
        },
        setItem: (name: string, value: any) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
