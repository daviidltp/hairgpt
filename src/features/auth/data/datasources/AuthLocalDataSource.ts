import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { User } from '../../domain/entities/User';

const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';

export class AuthLocalDataSource {
    async saveSession(user: User, token: string): Promise<void> {
        if (Platform.OS === 'web') {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
            await SecureStore.setItemAsync(TOKEN_KEY, token);
        }
    }

    async clearSession(): Promise<void> {
        if (Platform.OS === 'web') {
            localStorage.removeItem(USER_KEY);
            localStorage.removeItem(TOKEN_KEY);
        } else {
            await SecureStore.deleteItemAsync(USER_KEY);
            await SecureStore.deleteItemAsync(TOKEN_KEY);
        }
    }

    async getUser(): Promise<User | null> {
        let userStr: string | null;
        if (Platform.OS === 'web') {
            userStr = localStorage.getItem(USER_KEY);
        } else {
            userStr = await SecureStore.getItemAsync(USER_KEY);
        }
        return userStr ? JSON.parse(userStr) : null;
    }

    async getToken(): Promise<string | null> {
        if (Platform.OS === 'web') {
            return localStorage.getItem(TOKEN_KEY);
        } else {
            return await SecureStore.getItemAsync(TOKEN_KEY);
        }
    }
}
