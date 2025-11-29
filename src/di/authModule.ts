import { AuthLocalDataSource } from '../features/auth/data/datasources/AuthLocalDataSource';
import { AuthRemoteDataSource } from '../features/auth/data/datasources/AuthRemoteDataSource';
import { AuthRepositoryImpl } from '../features/auth/data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../features/auth/domain/usecases/LoginUseCase';
import { LogoutUseCase } from '../features/auth/domain/usecases/LogoutUseCase';

// Singleton instances
const localDataSource = new AuthLocalDataSource();
const remoteDataSource = new AuthRemoteDataSource();
const authRepository = new AuthRepositoryImpl(localDataSource, remoteDataSource);

export const loginUseCase = new LoginUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase(authRepository);
export const authRepositoryInstance = authRepository;
