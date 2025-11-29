import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

export function usePlayerViewModel() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return {
        script: null,
        dream: null,
        isLoading: false,
        isPlaying: false,
        position: 0,
        duration: 0,
        playSound: () => console.warn("Player feature removed"),
    };
}
