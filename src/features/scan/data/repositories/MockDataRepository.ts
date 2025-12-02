import { ImageSourcePropType } from 'react-native';
import { AnalysisResult } from '../../domain/entities/AnalysisResult';
import { BaldnessAnalysisResult } from '../../domain/entities/BaldnessAnalysisResult';
import { IMockDataRepository } from '../../domain/repositories/IMockDataRepository';

export class MockDataRepository implements IMockDataRepository {
    getMockHaircutAnalysis(): AnalysisResult {
        return {
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
        };
    }

    getMockBaldnessAnalysis(): BaldnessAnalysisResult {
        return {
            baldnessProbability: 45,
            density: 6,
            texture: 7,
            porosity: 5,
            volume: 8,
            summary: 'Mock summary',
        };
    }

    getMockFrontPhoto(): ImageSourcePropType {
        return require('../../../../../assets/images/haircuts/front_image.png');
    }

    getMockProfilePhoto(): ImageSourcePropType {
        return require('../../../../../assets/images/haircuts/profile_pic.png');
    }

    getMockCrownPhoto(): ImageSourcePropType {
        return require('../../../../../assets/images/haircuts/profile_pic.png');
    }
}
