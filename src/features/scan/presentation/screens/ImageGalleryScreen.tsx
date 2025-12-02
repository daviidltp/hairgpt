import { PrimaryButton } from '@/core/ui/buttons/PrimaryButton';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import * as MediaLibrary from 'expo-media-library';
import React, { useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ImageGalleryScreenRouteProp = RouteProp<RootStackParamList, 'ImageGallery'>;
type ImageGalleryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ImageGallery'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function ImageGalleryScreen() {
    const navigation = useNavigation<ImageGalleryScreenNavigationProp>();
    const route = useRoute<ImageGalleryScreenRouteProp>();
    const { images, initialIndex, haircutTitle } = route.params;

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isSaving, setIsSaving] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const handleBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.goBack();
    };

    const handleSaveToGallery = async () => {
        const currentImage = images[currentIndex];
        if (!currentImage) return;

        try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setIsSaving(true);

            // Request permissions
            const { status } = await MediaLibrary.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permiso denegado',
                    'Necesitamos permiso para guardar imágenes en tu galería.'
                );
                setIsSaving(false);
                return;
            }

            // Get the image URI from the source
            let imageUri: string;

            if (typeof currentImage === 'number') {
                // It's a require() asset
                Alert.alert(
                    'Función no disponible',
                    'Esta función estará disponible cuando las imágenes se descarguen del servidor.'
                );
                setIsSaving(false);
                return;
            } else if (typeof currentImage === 'object' && 'uri' in currentImage) {
                imageUri = currentImage.uri as string;
            } else {
                throw new Error('Formato de imagen no soportado');
            }

            // Save to media library
            const asset = await MediaLibrary.createAssetAsync(imageUri);

            // Create or add to album
            const album = await MediaLibrary.getAlbumAsync('HairGPT');
            if (album == null) {
                await MediaLibrary.createAlbumAsync('HairGPT', asset, false);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }

            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert(
                '¡Guardado!',
                'La imagen se ha guardado en tu galería.'
            );
        } catch (error) {
            console.error('Error saving image:', error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert(
                'Error',
                'No se pudo guardar la imagen. Inténtalo de nuevo.'
            );
        } finally {
            setIsSaving(false);
        }
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index;
            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const renderItem = ({ item }: { item: ImageSourcePropType }) => (
        <View style={{ width: SCREEN_WIDTH }} className="items-center justify-center">
            <Image
                source={item}
                className="w-full h-full"
                resizeMode="contain"
            />
        </View>
    );

    const renderDots = () => (
        <View className="flex-row justify-center items-center gap-2 mb-4">
            {images.map((_: any, index: number) => (
                <View
                    key={index}
                    className={`h-2 rounded-full ${index === currentIndex
                            ? 'w-6 bg-white'
                            : 'w-2 bg-white/40'
                        }`}
                />
            ))}
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center">
                <Pressable
                    onPress={handleBack}
                    className="w-10 h-10 items-center justify-center -ml-2"
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                <Text className="flex-1 text-xl font-bold text-foreground text-center mr-8">
                    {haircutTitle}
                </Text>
            </View>

            {/* Image Gallery */}
            <View className="flex-1">
                <FlatList
                    ref={flatListRef}
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    initialScrollIndex={initialIndex}
                    getItemLayout={(_, index) => ({
                        length: SCREEN_WIDTH,
                        offset: SCREEN_WIDTH * index,
                        index,
                    })}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    decelerationRate="fast"
                    snapToInterval={SCREEN_WIDTH}
                    snapToAlignment="center"
                />
            </View>

            {/* Page Indicator */}
            {images.length > 1 && renderDots()}

            {/* Save Button */}
            <View className="px-6 pb-8">
                <PrimaryButton
                    label="Guardar en galería"
                    onPress={handleSaveToGallery}
                    loading={isSaving}
                    disabled={isSaving}
                    variant="secondary"
                    className="bg-white"
                />
            </View>
        </SafeAreaView>
    );
}
