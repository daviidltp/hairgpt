import { HaircutRecommendation } from './HaircutRecommendation';

export interface AnalysisResult {
    faceShape: string;
    hairType: string;
    explanation: string;
    recommendations: HaircutRecommendation[];
}
