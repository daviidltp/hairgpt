PROJECT INCUBATE: AI-Powered Lucid Dream Induction (MVP LEAN)

1. Concepto y Visión (MVP Simplificado)

Incubate es una herramienta de "ingeniería onírica" basada en la sugestión textual.

La Promesa: "Diseña tu sueño. Lee el guión. Toma el control."

El Mecanismo: Incubación de Sueños mediante lectura sugestiva antes de dormir. El usuario define el objetivo, la IA redacta el camino mental.

Estética: Dark, Minimalist, Text-Focused. Tipografía impecable sobre fondo negro absoluto.

2. Funcionalidades Core (MVP - Must Haves)

Centrado exclusivamente en la generación del guión y la retención.

A. The Incubator (Script Generator) - LA FUNCIONALIDAD PRINCIPAL

El usuario describe su deseo y la IA escribe un guión de "autohipnosis" para leer justo antes de cerrar los ojos.

Input: Campo de texto simple. "¿Qué quieres soñar hoy?" (Ej: "Volar sobre montañas nevadas").

Process (IA Gratuita): Conexión a API de LLM (Gemini Flash / HuggingFace / OpenAI Free Tier).

Prompt System: "Eres un experto en inducción de sueños lúcidos (MILD). Escribe un guión breve (150 palabras), en segunda persona, usando lenguaje sensorial presente y mantras repetitivos para incubar este sueño..."

Output (Texto): Se muestra el guión en pantalla con una tipografía grande, legible y relajante. Sin audio generado, solo lectura.

B. Background Ambience (Sonido Estático)

Para no dejar al usuario en silencio total mientras lee, reproducimos un "loop" de audio local simple.

Sin Generación: Solo 1 o 2 archivos MP3 integrados en la app (ej: "Deep Space Drone" o "Pink Noise").

UX: Botón simple de Mute/Play. Se reproduce mientras el usuario lee su guión generado.

C. Dream Journal (Texto Simple)

Esencial para que el usuario vuelva por la mañana.

Funcionalidad: Input de texto básico con fecha automática.

Almacenamiento: Local (AsyncStorage) o Firebase básico para persistencia.

D. Reality Checks (Notificaciones)

La herramienta de retención durante el día.

Funcionalidad: 3 notificaciones aleatorias al día: "¿Estás soñando ahora mismo?".

4. Estrategia de Onboarding (Venta Simplificada)

Slide 1: "Controla tus sueños."

Slide 2: "Escribe tu deseo. La IA crea el camino."

Slide 3: "Lee el guión. Despierta en tu sueño."

Paywall (Opcional en MVP): O simple registro para captar emails.

5. Stack Técnico (Coste Cero / Low Cost)

Framework: React Native (Expo).

IA (LLM):

Opción A (Recomendada): Google Gemini API (Tiene un Free Tier muy generoso que permite muchas peticiones gratis por minuto, ideal para MVP).

Opción B: OpenAI (gpt-4o-mini) - Muy barato, pero no gratis 100%.

Audio: expo-av reproduciendo un archivo .mp3 local (incluido en los assets de la app).

Storage: AsyncStorage (solo en el dispositivo del usuario para MVP) o Firebase Free Tier.

Navegación: React Navigation.