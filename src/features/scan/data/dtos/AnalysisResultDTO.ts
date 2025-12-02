import { z } from 'zod';

// Zod Schema for Runtime Validation
export const HaircutRecommendationSchema = z.object({
    name: z.string(),
    description: z.string(),
});

export const AnalysisResultSchema = z.object({
    faceShape: z.string(),
    hairType: z.string(),
    explanation: z.string(),
    recommendations: z.array(HaircutRecommendationSchema),
});

// TypeScript Types inferred from Schema
export type HaircutRecommendationDTO = z.infer<typeof HaircutRecommendationSchema>;
export type AnalysisResultDTO = z.infer<typeof AnalysisResultSchema>;
