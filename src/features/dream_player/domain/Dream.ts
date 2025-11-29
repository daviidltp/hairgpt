export interface Dream {
    id: string;
    title: string;
    description: string;
    audioUrl?: string;
    duration?: number; // in seconds
    createdAt: Date;
}
