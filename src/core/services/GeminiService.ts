import { DreamPrompts } from '@/core/config/prompts';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn('Gemini API Key is missing! Please set EXPO_PUBLIC_GEMINI_API_KEY in your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

export const GeminiService = {
    async generateDreamScript(dreamDesire: string): Promise<string> {
        if (!API_KEY) {
            // Mock response for testing without API key
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(`(MOCK RESPONSE - NO API KEY)\n\nCierra los ojos y visualiza ${dreamDesire}. Siente el aire fresco en tu rostro. Repite conmigo: "Estoy soñando". A medida que te relajas, imagina que ${dreamDesire} se vuelve más y más vívido...`);
                }, 2000);
            });
        }

        const modelsToTry = ['gemini-flash-latest', 'gemini-pro-latest', 'gemini-1.5-flash', 'gemini-pro'];
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting to generate with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const prompt = DreamPrompts.incubation(dreamDesire);

                const result = await model.generateContent(prompt);
                const response = await result.response;
                return response.text();
            } catch (error) {
                console.warn(`Failed with model ${modelName}:`, error);
                lastError = error;
                // Continue to next model
            }
        }

        console.error('All models failed. Last error:', lastError);
        throw new Error('Failed to generate dream script with any available model.');
    }
};
