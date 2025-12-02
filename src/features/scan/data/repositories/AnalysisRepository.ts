import { AnalysisResult } from '../../domain/entities/AnalysisResult';
import { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository';
import { AnalysisResultSchema } from '../dtos/AnalysisResultDTO';
import { mapAnalysisResultDtoToEntity } from '../mappers/AnalysisMapper';

export class AnalysisRepository implements IAnalysisRepository {
    parseAnalysisResult(rawJson: string): AnalysisResult {
        try {
            // 1. Clean the string if it contains markdown code blocks
            let jsonString = rawJson;
            if (jsonString.includes('```json')) {
                jsonString = jsonString.replace(/```json\n/g, '').replace(/\n```/g, '');
            } else if (jsonString.includes('```')) {
                jsonString = jsonString.replace(/```\n/g, '').replace(/\n```/g, '');
            }

            // 2. Parse JSON
            const parsed = JSON.parse(jsonString);

            // 3. Validate with Zod (Data Contract)
            const dto = AnalysisResultSchema.parse(parsed);

            // 4. Map to Domain Entity
            return mapAnalysisResultDtoToEntity(dto);
        } catch (e) {
            console.error('Failed to parse analysis result:', e);
            // Return default error state
            return {
                faceShape: 'Desconocido',
                hairType: 'Desconocido',
                explanation: 'No se pudo analizar el resultado.',
                recommendations: [],
            };
        }
    }
}
