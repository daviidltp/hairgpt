import { AnalysisResult } from '../../domain/entities/AnalysisResult';
import { HaircutRecommendation } from '../../domain/entities/HaircutRecommendation';
import { AnalysisResultDTO, HaircutRecommendationDTO } from '../dtos/AnalysisResultDTO';

export function mapHaircutRecommendationDtoToEntity(
    dto: HaircutRecommendationDTO
): HaircutRecommendation {
    return {
        name: dto.name,
        description: dto.description,
    };
}

export function mapAnalysisResultDtoToEntity(dto: AnalysisResultDTO): AnalysisResult {
    return {
        faceShape: dto.faceShape,
        hairType: dto.hairType,
        explanation: dto.explanation,
        recommendations: dto.recommendations.map(mapHaircutRecommendationDtoToEntity),
    };
}
