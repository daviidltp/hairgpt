import { BaldnessAnalysisResultDTO } from '../dtos/BaldnessAnalysisResultDTO';

/**
 * Mock database simulating API responses for baldness analysis
 * In production, this would be replaced by actual API calls
 */
export const mockBaldnessDatabase: Record<string, BaldnessAnalysisResultDTO> = {
    'mock-baldness-1': {
        baldnessProbability: 75,
        norwoodStage: '3-Vertex',
        recession: 7,
        crownDensity: 4,
        density: 40,
        texture: 60,
        porosity: 30,
        volume: 20,
        summary: 'Se observa un adelgazamiento significativo en la zona de la coronilla y entradas pronunciadas, indicativo de alopecia androgenética en etapa temprana a media.',
    },
    'mock-baldness-2': {
        baldnessProbability: 25,
        norwoodStage: '1',
        recession: 2,
        crownDensity: 9,
        density: 85,
        texture: 80,
        porosity: 60,
        volume: 75,
        summary: 'Línea de nacimiento natural sin signos de recesión. Densidad capilar excelente en todas las zonas evaluadas.',
    },
    'mock-baldness-3': {
        baldnessProbability: 50,
        norwoodStage: '2',
        recession: 5,
        crownDensity: 7,
        density: 65,
        texture: 70,
        porosity: 50,
        volume: 60,
        summary: 'Se observan entradas moderadas (Norwood 2) pero buena densidad en la corona. El riesgo es medio, se recomienda seguimiento.',
    },
};
