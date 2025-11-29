import { User } from '../entities/User';
import { AuthRepository } from '../repositories/AuthRepository';

export class LoginUseCase {
    constructor(private repository: AuthRepository) { }

    async execute(email: string, password: string): Promise<{ user: User; token: string }> {
        return this.repository.login(email, password);
    }
}
