import { BaldnessAnalysisResult } from '../../domain/entities/BaldnessAnalysisResult';
import { BaldnessAnalysisResultDTO } from '../dtos/BaldnessAnalysisResultDTO';

export function mapBaldnessAnalysisResultDtoToEntity(
    dto: BaldnessAnalysisResultDTO
): BaldnessAnalysisResult {
    return {
        baldnessProbability: dto.baldnessProbability,
        norwoodStage: dto.norwoodStage,
        recession: dto.recession,
        crownDensity: dto.crownDensity,
        density: dto.density,
        texture: dto.texture,
        porosity: dto.porosity,
        volume: dto.volume,
        summary: dto.summary,
    };
}
