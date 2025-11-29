import { Dream } from '@/features/dream_player/domain/Dream';

export interface IDreamRepository {
    generateAudio(scriptContent: string): Promise<Dream>;
    getById(id: string): Promise<Dream | null>;
    getAll(): Promise<Dream[]>;
}
