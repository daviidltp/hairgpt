/**
 * Incubate Design System Colors
 * These colors match the Tailwind config in tailwind.config.js
 * Use these constants instead of hardcoding hex values
 */

export const Colors = {
    // Base colors
    background: '#FFFFFF',
    surface: '#F2F2F7', // iOS System Gray 6

    // Brand colors
    primary: '#000000', // Matte Black
    secondary: '#809FFF', // Legacy Blue (kept as requested)
    accent: '#f472b6', // pink-400

    // Orange accent colors (from premium card) - Keeping for potential accents
    purpleDark: '#4D78FA',
    purpleLight: '#A6BBFF',
    orangeDark: '#EA580C',
    orangeMid: '#F97316',

    // Glass effect (Adapted for Light Mode if needed, or kept for legacy)
    glassBorder: 'rgba(0, 0, 0, 0.1)',
    glassBg: 'rgba(255, 255, 255, 0.8)',

    // Utility colors (for icons, etc)
    amber: '#F59E0B',
    blue: '#3B82F6',
    green: '#10B981',
    yellow: '#FCD34D',

    // Text colors
    textPrimary: '#000000',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    mutedWhite: '#888888', // Legacy name, maybe unused
} as const;

/**
 * Helper to create alpha variants of colors
 * Example: withAlpha(Colors.primary, 0.2) => 'rgba(0, 0, 0, 0.2)'
 */
export function withAlpha(hexColor: string, alpha: number): string {
    const hex = hexColor.replace('#', '').substring(0, 6); // Remove # and alpha channel if present
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
