import { ImageSourcePropType } from 'react-native';

export interface IDefaultImageRepository {
    getDefaultProfileImage(): ImageSourcePropType;
    getDefaultFrontImage(): ImageSourcePropType;
    getDefaultCrownImage(): ImageSourcePropType;
}
