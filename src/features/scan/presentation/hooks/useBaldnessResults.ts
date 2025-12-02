import { useMemo } from 'react';
import { BaldnessAnalysisRepository } from '../../data/repositories/BaldnessAnalysisRepository';
import { BaldnessAnalysisResult } from '../../domain/entities/BaldnessAnalysisResult';

// Repository instance (in a real app, this would come from DI container)
const baldnessAnalysisRepository = new BaldnessAnalysisRepository();

export function useBaldnessResults(rawAnalysisResult: string): BaldnessAnalysisResult {
    return useMemo(() => {
        return baldnessAnalysisRepository.parseBaldnessResult(rawAnalysisResult);
    }, [rawAnalysisResult]);
}
