import { useMemo } from 'react';
import { AnalysisRepository } from '../../data/repositories/AnalysisRepository';
import { AnalysisResult } from '../../domain/entities/AnalysisResult';

// Repository instance (in a real app, this would come from DI container)
const analysisRepository = new AnalysisRepository();

export function useScanResults(rawAnalysisResult: string): AnalysisResult {
    return useMemo(() => {
        return analysisRepository.parseAnalysisResult(rawAnalysisResult);
    }, [rawAnalysisResult]);
}
