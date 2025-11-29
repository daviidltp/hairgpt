import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { OnboardingScreen } from '@/features/onboarding/presentation/OnboardingScreen';
import { WelcomeScreen } from '@/features/onboarding/presentation/WelcomeScreen';
import { SettingsScreen } from '@/features/settings/presentation/SettingsScreen';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigator } from './MainTabNavigator';

import { FakePaywall } from '@/features/onboarding/presentation/components/FakePaywall';

export type RootStackParamList = {
    Welcome: undefined;
    Onboarding: undefined;
    MainTabs: undefined;
    Settings: undefined;
    Paywall: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
    const { isAuthenticated, hasCompletedOnboarding } = useAuthStore();

    // Determine initial route based on auth state
    const getInitialRouteName = () => {
        if (!hasCompletedOnboarding) return 'Welcome';
        if (!isAuthenticated) return 'Welcome'; // Or Onboarding, depending on flow
        return 'MainTabs';
    };

    return (
        <Stack.Navigator
            initialRouteName={getInitialRouteName()}
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#000000' },
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
                        name="MainTabs"
                        component={MainTabNavigator}
                        options={{ gestureEnabled: false }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            gestureEnabled: true,
                            gestureDirection: 'horizontal',
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
