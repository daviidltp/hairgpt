import { IDreamRepository } from '../../domain/repositories/IDreamRepository';
import { Dream } from '@/features/dream_player/domain/Dream';

export class MockDreamRepository implements IDreamRepository {
    private dreams: Dream[] = [];

    async generateAudio(scriptContent: string): Promise<Dream> {
        const newDream: Dream = {
            id: Math.random().toString(36).substring(7),
            title: 'Generated Dream',
            description: scriptContent.substring(0, 50) + '...',
            audioUrl: 'https://example.com/dream.mp3',
            duration: 300,
            createdAt: new Date(),
        };
        this.dreams.push(newDream);
        return newDream;
    }

    async getById(id: string): Promise<Dream | null> {
        return this.dreams.find(d => d.id === id) || null;
    }

    async getAll(): Promise<Dream[]> {
        return [...this.dreams];
    }
}
