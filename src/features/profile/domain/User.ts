export interface User {
    id: string;
    username: string;
    email: string;
    preferences: {
        theme: 'dark' | 'light';
        hapticsEnabled: boolean;
    };
}
