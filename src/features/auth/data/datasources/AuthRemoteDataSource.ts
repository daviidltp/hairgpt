import { User } from '../../domain/entities/User';

export class AuthRemoteDataSource {
    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        // Mock API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        id: '1',
                        name: 'User',
                        email: email,
                    },
                    token: 'dummy-jwt-token',
                });
            }, 1000);
        });
    }

    async logout(): Promise<void> {
        // Mock API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }
}
