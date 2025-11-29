import { User } from '../../domain/entities/User';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { AuthLocalDataSource } from '../datasources/AuthLocalDataSource';
import { AuthRemoteDataSource } from '../datasources/AuthRemoteDataSource';

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private localDataSource: AuthLocalDataSource,
        private remoteDataSource: AuthRemoteDataSource
    ) { }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const { user, token } = await this.remoteDataSource.login(email, password);
        await this.localDataSource.saveSession(user, token);
        return { user, token };
    }

    async logout(): Promise<void> {
        await this.remoteDataSource.logout();
        await this.localDataSource.clearSession();
    }

    async getCurrentUser(): Promise<User | null> {
        return this.localDataSource.getUser();
    }

    async getToken(): Promise<string | null> {
        return this.localDataSource.getToken();
    }
}
