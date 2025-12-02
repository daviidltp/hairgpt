import { ImageSourcePropType } from 'react-native';

export interface IHaircutRepository {
    getHaircutImages(haircutName: string): ImageSourcePropType[];
}
