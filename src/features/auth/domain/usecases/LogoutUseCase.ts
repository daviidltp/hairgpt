import { AuthRepository } from '../repositories/AuthRepository';

export class LogoutUseCase {
    constructor(private repository: AuthRepository) { }

    async execute(): Promise<void> {
        return this.repository.logout();
    }
}
