import { AnalysisResult } from '../entities/AnalysisResult';

export interface IAnalysisRepository {
    parseAnalysisResult(rawJson: string): AnalysisResult;
    fetchAnalysisById(id: string): Promise<AnalysisResult>;
}
