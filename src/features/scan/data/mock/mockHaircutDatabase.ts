import { AnalysisResultDTO } from '../dtos/AnalysisResultDTO';

/**
 * Mock database simulating API responses for haircut analysis
 * In production, this would be replaced by actual API calls
 */
export const mockHaircutDatabase: Record<string, AnalysisResultDTO> = {
    'mock-1': {
        faceShape: 'Diamante',
        hairType: 'Ondulado',
        explanation: 'Tu rostro diamante se beneficia de volumen en la parte superior para equilibrar los pómulos anchos. El cabello ondulado añade textura natural que suaviza las líneas angulares.',
        recommendations: [
            { name: 'Textured Crop', description: 'Añade volumen arriba sin ensanchar los lados.' },
            { name: 'Messy Quiff', description: 'Equilibra la frente estrecha y da altura.' },
            { name: 'Fringe', description: 'Suaviza la frente y resalta los ojos.' },
            { name: 'Side Part', description: 'Elegante y define la estructura ósea.' },
            { name: 'Slick Back', description: 'Resalta tus pómulos marcados.' },
        ],
    },
    'mock-2': {
        faceShape: 'Ovalado',
        hairType: 'Liso',
        explanation: 'Tu rostro ovalado es versátil y funciona bien con casi cualquier estilo. El cabello liso permite cortes definidos y estructurados.',
        recommendations: [
            { name: 'Classic Pompadour', description: 'Elegante y atemporal.' },
            { name: 'Undercut', description: 'Moderno y limpio.' },
            { name: 'Side Swept', description: 'Profesional y sofisticado.' },
        ],
    },
    'mock-3': {
        faceShape: 'Cuadrado',
        hairType: 'Rizado',
        explanation: 'Tu rostro cuadrado se beneficia de estilos que suavizan la mandíbula angular. Los rizos añaden textura y movimiento.',
        recommendations: [
            { name: 'Curly Fringe', description: 'Suaviza la frente.' },
            { name: 'Textured Quiff', description: 'Añade altura y equilibrio.' },
            { name: 'Natural Curls', description: 'Abraza tu textura natural.' },
        ],
    },
};
