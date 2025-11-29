import { IScriptRepository } from '../../domain/repositories/IScriptRepository';
import { Script } from '../../domain/entities/Script';

export class MockScriptRepository implements IScriptRepository {
    private scripts: Script[] = [];

    async save(script: Script): Promise<void> {
        const existingIndex = this.scripts.findIndex(s => s.id === script.id);
        if (existingIndex >= 0) {
            this.scripts[existingIndex] = script;
        } else {
            this.scripts.push(script);
        }
    }

    async getById(id: string): Promise<Script | null> {
        return this.scripts.find(s => s.id === id) || null;
    }

    async getAll(): Promise<Script[]> {
        return [...this.scripts];
    }

    async delete(id: string): Promise<void> {
        this.scripts = this.scripts.filter(s => s.id !== id);
    }
}
