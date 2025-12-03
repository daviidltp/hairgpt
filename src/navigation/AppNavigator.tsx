import { Colors } from '@/core/theme/colors';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { HomeScreen } from '@/features/home/presentation/HomeScreen';
import { FakePaywall } from '@/features/onboarding/presentation/components/FakePaywall';
import { OnboardingScreen } from '@/features/onboarding/presentation/OnboardingScreen';
import { WelcomeScreen } from '@/features/onboarding/presentation/WelcomeScreen';
import { BaldnessCrownTutorialScreen } from '@/features/scan/presentation/screens/BaldnessCrownTutorialScreen';
import { BaldnessFrontTutorialScreen } from '@/features/scan/presentation/screens/BaldnessFrontTutorialScreen';
import { BaldnessProfileTutorialScreen } from '@/features/scan/presentation/screens/BaldnessProfileTutorialScreen';
import { BaldnessResultsScreen } from '@/features/scan/presentation/screens/BaldnessResultsScreen';
import { FrontPhotoTutorialScreen } from '@/features/scan/presentation/screens/FrontPhotoTutorialScreen';
import { ImageGalleryScreen } from '@/features/scan/presentation/screens/ImageGalleryScreen';
import { ProfilePhotoTutorialScreen } from '@/features/scan/presentation/screens/ProfilePhotoTutorialScreen';
import { ScanFaceScreen } from '@/features/scan/presentation/screens/ScanFaceScreen';
import { ScanResultsScreen } from '@/features/scan/presentation/screens/ScanResultsScreen';
import { SettingsScreen } from '@/features/settings/presentation/SettingsScreen';
import { RouteProp } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

export type RootStackParamList = {
    Welcome: undefined;
    Onboarding: undefined;
    Home: undefined;
    Settings: undefined;
    Paywall: undefined;
    FrontPhotoTutorial: { mode?: 'haircut' | 'baldness' } | undefined;
    ProfilePhotoTutorial: { mode?: 'haircut' | 'baldness'; frontPhoto?: string | number; frontBase64?: string } | undefined;
    BaldnessFrontTutorial: undefined;
    BaldnessProfileTutorial: { frontPhoto?: string | number; frontBase64?: string } | undefined;
    BaldnessCrownTutorial: { frontPhoto?: string | number; frontBase64?: string; profilePhoto?: string | number; profileBase64?: string } | undefined;
    ScanFace: { mock?: boolean; mockResults?: boolean; mode?: 'haircut' | 'baldness'; photoType?: 'front' | 'profile' | 'crown' } | undefined;
    ScanResults: {
        analysisData: any; // AnalysisResult
        frontPhoto: any;
        profilePhoto: any;
    };
    BaldnessResults: {
        analysisData: any; // BaldnessAnalysisResult
        frontPhoto: any;
        profilePhoto: any;
        crownPhoto: any;
    };
    ImageGallery: {
        images: any[];
        initialIndex: number;
        haircutTitle: string;
    };
};



export type ScanResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScanResults'>;
export type ScanResultsScreenRouteProp = RouteProp<RootStackParamList, 'ScanResults'>;

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
    const { isAuthenticated, hasCompletedOnboarding } = useAuthStore();

    // Determine initial route based on auth state
    const getInitialRouteName = () => {
        if (!hasCompletedOnboarding) return 'Welcome';
        if (!isAuthenticated) return 'Welcome'; // Or Onboarding, depending on flow
        return 'Home';
    };

    return (
        <Stack.Navigator
            initialRouteName={getInitialRouteName()}
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: Colors.background },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            }}
        >
            {!hasCompletedOnboarding || !isAuthenticated ? (
                <>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen
                        name="Onboarding"
                        component={OnboardingScreen}
                        options={{ gestureEnabled: false }}
                    />
                    <Stack.Screen
                        name="Paywall"
                        component={FakePaywall}
                        options={{
                            presentation: 'modal',
                            gestureEnabled: true,
                            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                        }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ gestureEnabled: false }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            gestureEnabled: true,
                            gestureDirection: 'horizontal',
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="FrontPhotoTutorial"
                        component={FrontPhotoTutorialScreen}
                        options={{
                            gestureEnabled: true,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="ProfilePhotoTutorial"
                        component={ProfilePhotoTutorialScreen}
                        options={{
                            gestureEnabled: true,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="BaldnessFrontTutorial"
                        component={BaldnessFrontTutorialScreen}
                        options={{
                            gestureEnabled: true,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="BaldnessProfileTutorial"
                        component={BaldnessProfileTutorialScreen}
                        options={{
                            gestureEnabled: true,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="BaldnessCrownTutorial"
                        component={BaldnessCrownTutorialScreen}
                        options={{
                            gestureEnabled: true,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="ScanFace"
                        component={ScanFaceScreen}
                        options={{
                            gestureEnabled: true,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="ScanResults"
                        component={ScanResultsScreen}
                        options={{
                            presentation: 'modal',
                            gestureEnabled: true,
                            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="BaldnessResults"
                        component={BaldnessResultsScreen}
                        options={{
                            presentation: 'modal',
                            gestureEnabled: true,
                            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="ImageGallery"
                        component={ImageGalleryScreen}
                        options={{
                            gestureEnabled: true,
                            gestureDirection: 'horizontal',
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
