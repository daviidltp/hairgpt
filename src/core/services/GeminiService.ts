import { BaldnessAnalysisPrompts } from '@/core/config/baldnessPrompts';
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

        const modelsToTry = ['gemini-pro-latest']; // Vision models preferred
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting to analyze with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const promptText = HairAnalysisPrompts.analyzeHaircut();

                console.log('--- GEMINI REQUEST DEBUG ---');
                console.log('Prompt:', promptText);
                console.log('Front Image Present:', !!frontImageBase64);
                if (frontImageBase64) console.log('Front Image Length:', frontImageBase64.length);
                console.log('Profile Image Present:', !!profileImageBase64);
                if (profileImageBase64) console.log('Profile Image Length:', profileImageBase64.length);
                console.log('----------------------------');

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
                console.log('--- GEMINI RESPONSE DEBUG ---');
                console.log(response.text());
                console.log('-----------------------------');
                return response.text();
            } catch (error) {
                console.warn(`Failed with model ${modelName}:`, error);
                lastError = error;
                // Continue to next model
            }
        }

        console.error('All models failed. Last error:', lastError);
        throw new Error('Failed to analyze haircut with any available model.');
    },

    async analyzeBaldness(frontImageBase64?: string, profileImageBase64?: string, crownImageBase64?: string): Promise<string> {
        if (!API_KEY) {
            // Mock response for testing without API key
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(JSON.stringify({
                        baldnessProbability: 45,
                        density: 6,
                        texture: 7,
                        porosity: 5,
                        volume: 8,
                        summary: "(MOCK) Se observan entradas moderadas (Norwood 2) pero buena densidad en la corona. El riesgo es medio."
                    }));
                }, 2000);
            });
        }

        const modelsToTry = ['gemini-pro-latest']; // Vision models preferred
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting to analyze baldness with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const promptText = BaldnessAnalysisPrompts.analyzeBaldness();

                console.log('--- GEMINI BALDNESS REQUEST DEBUG ---');
                console.log('Prompt:', promptText);
                console.log('Front Image Present:', !!frontImageBase64);
                console.log('Profile Image Present:', !!profileImageBase64);
                console.log('Crown Image Present:', !!crownImageBase64);
                console.log('-------------------------------------');

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

                if (crownImageBase64) {
                    parts.push({
                        inlineData: {
                            data: crownImageBase64,
                            mimeType: "image/jpeg",
                        },
                    });
                }

                const result = await model.generateContent(parts);
                const response = await result.response;
                console.log('--- GEMINI BALDNESS RESPONSE DEBUG ---');
                console.log(response.text());
                console.log('--------------------------------------');
                return response.text();
            } catch (error) {
                console.warn(`Failed with model ${modelName}:`, error);
                lastError = error;
            }
        }

        console.error('All models failed. Last error:', lastError);
        throw new Error('Failed to analyze baldness with any available model.');
    }
};
