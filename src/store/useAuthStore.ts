import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string | null;
  email: string | null;
  picture: string | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      signOut: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
