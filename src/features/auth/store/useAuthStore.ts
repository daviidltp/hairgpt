import { loginUseCase, logoutUseCase } from '@/di/authModule';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '../domain/entities/User';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    hasCompletedOnboarding: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    completeOnboarding: () => void;
    // Helper to manually set state (used by OnboardingScreen for now until full refactor)
    setAuth: (user: User, token: string) => void;
}

// Secure storage adapter for Zustand persistence (only for non-critical UI state if needed, 
// but here we use it to persist the store state to keep UI in sync with Data Layer)
const secureStorage = {
    getItem: async (name: string): Promise<string | null> => {
        if (Platform.OS === 'web') {
            return localStorage.getItem(name);
        }
        return await SecureStore.getItemAsync(name);
    },
    setItem: async (name: string, value: string): Promise<void> => {
        if (Platform.OS === 'web') {
            localStorage.setItem(name, value);
            return;
        }
        await SecureStore.setItemAsync(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
        if (Platform.OS === 'web') {
            localStorage.removeItem(name);
            return;
        }
        await SecureStore.deleteItemAsync(name);
    },
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            hasCompletedOnboarding: false,

            login: async (email, password) => {
                try {
                    const { user, token } = await loginUseCase.execute(email, password);
                    set({ user, token, isAuthenticated: true });
                } catch (error) {
                    console.error('Login failed', error);
                    throw error;
                }
            },

            logout: async () => {
                try {
                    await logoutUseCase.execute();
                    set({ user: null, token: null, isAuthenticated: false });
                } catch (error) {
                    console.error('Logout failed', error);
                }
            },

            completeOnboarding: () => set({ hasCompletedOnboarding: true }),

            setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => secureStorage),
        }
    )
);
