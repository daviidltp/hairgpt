import { ImageSourcePropType } from 'react-native';
import { IHaircutRepository } from '../../domain/repositories/IHaircutRepository';

// Mock haircut images - centralized in data layer
// In a real app, this would fetch from an API based on haircut name
const MOCK_HAIRCUT_IMAGES: ImageSourcePropType[] = [
    require('../../../../../assets/images/haircuts/front_image.png'),
    require('../../../../../assets/images/haircuts/profile_pic.png'),
    require('../../../../../assets/images/haircuts/front_image.png'),
    require('../../../../../assets/images/haircuts/profile_pic.png'),
];

export class HaircutRepository implements IHaircutRepository {
    getHaircutImages(haircutName: string): ImageSourcePropType[] {
        // For now, return mock images regardless of haircut name
        // TODO: Replace with API call when backend is ready
        // Example: return fetch(`/api/haircuts/${haircutName}/images`)
        return MOCK_HAIRCUT_IMAGES;
    }
}
