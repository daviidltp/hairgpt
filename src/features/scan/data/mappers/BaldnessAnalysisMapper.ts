import { BaldnessAnalysisResult } from '../../domain/entities/BaldnessAnalysisResult';
import { BaldnessAnalysisResultDTO } from '../dtos/BaldnessAnalysisResultDTO';

export function mapBaldnessAnalysisResultDtoToEntity(
    dto: BaldnessAnalysisResultDTO
): BaldnessAnalysisResult {
    return {
        baldnessProbability: dto.baldnessProbability,
        density: dto.density,
        texture: dto.texture,
        porosity: dto.porosity,
        volume: dto.volume,
        summary: dto.summary,
    };
}
