import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  levelUser: string;
  balance: number;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: number | null; 
  setAuth: (payload: { user: User; token: string; expiresIn: number }) => void;
  updateUser: (user: User) => void;
  logout: () => void;
  isTokenValid: () => boolean; 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      expiresAt: null, 

      setAuth: ({ user, token, expiresIn }) => {
        const expiresAt = Date.now() + expiresIn * 1000;
        set({ user, token, expiresAt });
      },

      updateUser: (user) => set({ user }),

      logout: () => set({ user: null, token: null, expiresAt: null }),

      isTokenValid: () => {
        const { token, expiresAt } = get();
        if (!token || !expiresAt) return false;
        return Date.now() < expiresAt; 
      },
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
