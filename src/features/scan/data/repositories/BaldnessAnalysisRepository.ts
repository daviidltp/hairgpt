import { BaldnessAnalysisResult } from '../../domain/entities/BaldnessAnalysisResult';
import { IBaldnessAnalysisRepository } from '../../domain/repositories/IBaldnessAnalysisRepository';
import { BaldnessAnalysisResultSchema } from '../dtos/BaldnessAnalysisResultDTO';
import { mapBaldnessAnalysisResultDtoToEntity } from '../mappers/BaldnessAnalysisMapper';

export class BaldnessAnalysisRepository implements IBaldnessAnalysisRepository {
    parseBaldnessResult(rawJson: string): BaldnessAnalysisResult {
        try {
            // 1. Handle if already an object
            if (typeof rawJson !== 'string') {
                const dto = BaldnessAnalysisResultSchema.parse(rawJson);
                return mapBaldnessAnalysisResultDtoToEntity(dto);
            }

            // 2. Clean markdown code blocks
            const cleanResult = rawJson
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();

            // 3. Parse JSON
            const parsed = JSON.parse(cleanResult);

            // 4. Validate with Zod
            const dto = BaldnessAnalysisResultSchema.parse(parsed);

            // 5. Map to Domain Entity
            return mapBaldnessAnalysisResultDtoToEntity(dto);
        } catch (e) {
            console.error('Failed to parse baldness analysis result:', e);
            // Return default error state
            return {
                baldnessProbability: 0,
                density: 0,
                texture: 0,
                porosity: 0,
                volume: 0,
                summary: 'Error parsing results',
            };
        }
    }
}
