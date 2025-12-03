import { BaldnessAnalysisResult } from '../entities/BaldnessAnalysisResult';

export interface IBaldnessAnalysisRepository {
    parseBaldnessResult(rawJson: string): BaldnessAnalysisResult;
    fetchBaldnessAnalysisById(id: string): Promise<BaldnessAnalysisResult>;
}
