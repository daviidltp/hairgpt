import { SUPERWALL_API_KEY } from '@/core/services/SuperwallService';
import '@/global.css';
import { AppNavigator } from '@/navigation/AppNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SuperwallProvider, isExpoGo } from '@/core/services/SuperwallWrapper';

export default function App() {
    const appContent = (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <BottomSheetModalProvider>
                    <View style={styles.container}>
                        <StatusBar style="light" />
                        <NavigationContainer>
                            <AppNavigator />
                        </NavigationContainer>
                    </View>
                </BottomSheetModalProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );

    // Only wrap with SuperwallProvider if not in Expo Go
    if (SuperwallProvider && !isExpoGo) {
        return (
            <SuperwallProvider
                apiKeys={{
                    android: SUPERWALL_API_KEY,
                    ios: SUPERWALL_API_KEY,
                }}
            >
                {appContent}
            </SuperwallProvider>
        );
    }

    // In Expo Go, return app without Superwall
    return appContent;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
});
