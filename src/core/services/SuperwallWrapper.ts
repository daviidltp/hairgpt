import Constants, { ExecutionEnvironment } from 'expo-constants';

// Check if running in Expo Go
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let usePlacement: any = null;

if (!isExpoGo) {
    try {
        // We use require to avoid crashing in Expo Go where the native module is missing
        // The warning "Falling back to file-based resolution" is expected in some Metro versions
        // when using require() with exports-based packages, but it works.
        const superwall = require('expo-superwall');
        usePlacement = superwall.usePlacement;
    } catch (e) {
        console.warn('Superwall not available:', e);
    }
}

export const useSuperwall = () => {
    if (usePlacement) {
        return usePlacement;
    }
    return null;
};

export const SuperwallProvider = (!isExpoGo && usePlacement) ? require('expo-superwall').SuperwallProvider : null;

export { isExpoGo };

