import { AnalysisData, getFaceShapeData, getHairTypeData } from '@/features/scan/data/analysisDescriptions';
import { useMemo } from 'react';

export function useAnalysisData(type: 'face' | 'hair', value: string): AnalysisData {
    return useMemo(() => {
        if (type === 'face') {
            return getFaceShapeData(value);
        } else {
            return getHairTypeData(value);
        }
    }, [type, value]);
}
