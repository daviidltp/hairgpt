const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("API Key not found in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        // For v1beta, we might not have direct listModels on genAI instance in the SDK depending on version,
        // but usually it is on the client or we can try to just generate with a known model.
        // Actually, the SDK doesn't expose listModels directly on the main class in all versions.
        // Let's try to use the model manager if available or just try a standard generation to see the error detail.

        // The error message said "Call ListModels".
        // In the Node SDK, it's usually not straightforward to list models without using the REST API directly
        // or a specific method if exposed.

        // Let's try to fetch via REST API to be sure.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
