import { ImageSourcePropType } from 'react-native';
import { IDefaultImageRepository } from '../../domain/repositories/IDefaultImageRepository';

export class DefaultImageRepository implements IDefaultImageRepository {
    getDefaultFrontImage(): ImageSourcePropType {
        return require('../../../../../assets/images/haircuts/default.png');
    }

    getDefaultProfileImage(): ImageSourcePropType {
        return require('../../../../../assets/images/haircuts/profile_pic.png');
    }

    getDefaultCrownImage(): ImageSourcePropType {
        return require('../../../../../assets/images/haircuts/profile_pic.png');
    }
}
