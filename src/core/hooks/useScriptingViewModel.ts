import { useState } from 'react';
import { useRouter } from 'expo-router';

export function useScriptingViewModel() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [realityName, setRealityName] = useState('');
    const [content, setContent] = useState('');

    const saveScript = () => {
        // Feature removed
        console.warn("Scripting feature removed");
        router.back();
    };

    return {
        title,
        setTitle,
        realityName,
        setRealityName,
        content,
        setContent,
        saveScript,
        isSaving: false,
    };
}
