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
            console.log('--- MOCK GEMINI HAIRCUT RESPONSE ---');
            return JSON.stringify({
                faceShape: "Diamante",
                hairType: "Ondulado",
                explanation: "Tu rostro diamante se beneficia de volumen en la parte superior para equilibrar los pómulos anchos. El cabello ondulado añade textura natural que suaviza las líneas angulares.",
                recommendations: [
                    { name: "Textured Crop", description: "Añade volumen arriba sin ensanchar los lados." },
                    { name: "Messy Quiff", description: "Equilibra la frente estrecha y da altura." },
                    { name: "Fringe", description: "Suaviza la frente y resalta los ojos." },
                    { name: "Side Part", description: "Elegante y define la estructura ósea." },
                    { name: "Slick Back", description: "Resalta tus pómulos marcados." }
                ]
            });
        }

        const modelsToTry = ['gemini-pro-vision', 'gemini-1.5-flash'];

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const promptText = HairAnalysisPrompts.analyzeHaircut();

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

                const result = await model.generateContent(parts);
                const response = await result.response;
                return response.text();
            } catch (error) {
                console.error(`Error analyzing haircut with model ${modelName}:`, error);
                // Continue to next model if available
            }
        }

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

        const modelsToTry = ['gemini-pro-vision', 'gemini-1.5-flash'];
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting to analyze baldness with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const promptText = BaldnessAnalysisPrompts.analyzeBaldness();

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
