import { IScriptRepository } from '../repositories/IScriptRepository';
import { Script } from '../entities/Script';

export class SaveScriptUseCase {
    constructor(private scriptRepository: IScriptRepository) { }

    async execute(script: Script): Promise<void> {
        if (!script.title || !script.content) {
            throw new Error('Script title and content are required');
        }
        await this.scriptRepository.save(script);
    }
}
