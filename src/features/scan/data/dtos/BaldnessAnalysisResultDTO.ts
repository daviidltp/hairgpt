import { z } from 'zod';

// Zod Schema for Runtime Validation
export const BaldnessAnalysisResultSchema = z.object({
    baldnessProbability: z.number(),
    density: z.number(),
    texture: z.number(),
    porosity: z.number(),
    volume: z.number(),
    summary: z.string(),
});

// TypeScript Type inferred from Schema
export type BaldnessAnalysisResultDTO = z.infer<typeof BaldnessAnalysisResultSchema>;
