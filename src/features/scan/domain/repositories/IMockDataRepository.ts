import { ImageSourcePropType } from 'react-native';
import { AnalysisResult } from '../entities/AnalysisResult';
import { BaldnessAnalysisResult } from '../entities/BaldnessAnalysisResult';

export interface IMockDataRepository {
    getMockHaircutAnalysis(): AnalysisResult;
    getMockBaldnessAnalysis(): BaldnessAnalysisResult;
    getMockFrontPhoto(): ImageSourcePropType;
    getMockProfilePhoto(): ImageSourcePropType;
    getMockCrownPhoto(): ImageSourcePropType;
}
