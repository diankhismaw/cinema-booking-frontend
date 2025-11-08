import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      user: null,

      // Action: login
      login: (token, user) => {
        set({ token, user });
        console.log("User logged in, token set.");
      },

      // Action: logout
      logout: () => {
        set({ token: null, user: null });
        console.log("User logged out.");
      },
    }),
    {
      // key localStorage
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);