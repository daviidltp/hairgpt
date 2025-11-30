import { Colors } from '@/core/theme/colors';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { HomeScreen } from '@/features/home/presentation/HomeScreen';
import { FakePaywall } from '@/features/onboarding/presentation/components/FakePaywall';
import { OnboardingScreen } from '@/features/onboarding/presentation/OnboardingScreen';
import { WelcomeScreen } from '@/features/onboarding/presentation/WelcomeScreen';
import { ScanFaceScreen } from '@/features/scan/presentation/screens/ScanFaceScreen';
import { SettingsScreen } from '@/features/settings/presentation/SettingsScreen';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export type RootStackParamList = {
    Welcome: undefined;
    Onboarding: undefined;
    Home: undefined;
    Settings: undefined;
    Paywall: undefined;
    ScanFace: undefined;
};

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
                        name="ScanFace"
                        component={ScanFaceScreen}
                        options={{
                            gestureEnabled: false,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
