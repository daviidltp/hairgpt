# PROJECT HAIRGPT: AI-Powered Haircut Analysis & Visagism

## 1. Concepto y Visión

**HairGPT** es tu estilista personal impulsado por IA. Analiza tu rostro para recomendarte el corte de pelo perfecto.

**La Promesa:** "Sube tu foto. Descubre tu mejor versión."

**El Mecanismo:** Análisis de visagismo mediante IA. El usuario sube una foto frontal y de perfil, y la IA analiza la forma de su cara (diamante, ovalada, cuadrada, etc.) para sugerir los cortes que mejor le sientan.

**Estética:** Premium, Moderna, Clean. Enfocada en hombres jóvenes (12-24 años). Estilo "Barber Shop del Futuro".

## 2. Funcionalidades Core (MVP)

### A. The Analyzer (Haircut Recommendation) - CORE FEATURE

El usuario proporciona imágenes y la IA genera un análisis detallado.

*   **Input:** Foto Frontal y Foto de Perfil (o descripción detallada en MVP v1).
*   **Process (IA):** Google Gemini API (Multimodal).
*   **Prompt System:** "Eres un experto barbero y visajista. Analiza estas imágenes..."
*   **Output:**
    *   Forma de la cara detectada.
    *   Recomendación de corte específico.
    *   Por qué le queda bien.

### B. History (My Looks)

Guardar los análisis anteriores para referencia en la barbería.

### C. Trends (Explore)

Ver cortes de tendencia para inspirarse.

## 3. Stack Técnico

*   **Framework:** React Native (Expo).
*   **IA:** Google Gemini API (Flash/Pro) para análisis de visión y texto.
*   **UI:** React Native, Tailwind/NativeWind.
*   **Storage:** Local/Firebase.