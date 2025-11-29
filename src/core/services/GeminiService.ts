import { HairAnalysisPrompts } from '@/core/config/prompts';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn('Gemini API Key is missing! Please set EXPO_PUBLIC_GEMINI_API_KEY in your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

export const GeminiService = {
    async analyzeHaircut(frontImageBase64?: string, profileImageBase64?: string): Promise<string> {
        if (!API_KEY) {
            // Mock response for testing without API key
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(`(MOCK RESPONSE - NO API KEY)\n\n**Tu Rostro:** Diamante\n\n**El Diagnóstico:** Tienes pómulos marcados y una barbilla definida. Tu rostro es anguloso y masculino.\n\n**Cortes Recomendados:**\n1. **Textured Crop con Fade:** Suaviza los ángulos superiores y resalta tu mandíbula.\n2. **Messy Quiff:** Da volumen arriba para equilibrar la frente estrecha.\n\n**Tip Pro:** Usa cera mate para dar textura sin apelmazar.`);
                }, 2000);
            });
        }

        const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro-vision']; // Vision models preferred
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting to analyze with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const promptText = HairAnalysisPrompts.analyzeHaircut();

                // Prepare content parts. If images are provided, add them.
                const parts: any[] = [{ text: promptText }];

                if (frontImageBase64) {
                    parts.push({
                        inlineData: {
                            data: frontImageBase64,
                            mimeType: "image/jpeg",
                        },
                    });
                }

                if (profileImageBase64) {
                    parts.push({
                        inlineData: {
                            data: profileImageBase64,
                            mimeType: "image/jpeg",
                        },
                    });
                }

                // If no images are provided (text-only test), we might want to warn or just send text
                // But for now, we assume images will be passed or the prompt handles "no image" context if needed.

                const result = await model.generateContent(parts);
                const response = await result.response;
                return response.text();
            } catch (error) {
                console.warn(`Failed with model ${modelName}:`, error);
                lastError = error;
                // Continue to next model
            }
        }

        console.error('All models failed. Last error:', lastError);
        throw new Error('Failed to analyze haircut with any available model.');
    }
};
