import { Script } from '../entities/Script';

export interface IScriptRepository {
    save(script: Script): Promise<void>;
    getById(id: string): Promise<Script | null>;
    getAll(): Promise<Script[]>;
    delete(id: string): Promise<void>;
}
