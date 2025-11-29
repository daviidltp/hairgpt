import { IDreamRepository } from '../repositories/IDreamRepository';
import { Dream } from '@/features/dream_player/domain/Dream';

export class GenerateDreamAudioUseCase {
    constructor(private dreamRepository: IDreamRepository) { }

    async execute(scriptContent: string): Promise<Dream> {
        if (!scriptContent) {
            throw new Error('Script content is required to generate audio');
        }
        return await this.dreamRepository.generateAudio(scriptContent);
    }
}
