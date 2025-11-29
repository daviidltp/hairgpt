    *   **Buttons:** `rounded-full` or `rounded-2xl`.
2.  **Spacing:** Use Tailwind spacing scale (`p-4`, `m-6`, `gap-4`).
3.  **SafeArea:** Always wrap top-level screens in `SafeAreaView` (from `react-native-safe-area-context`) with appropriate edges.
4.  **Gradients:** Use `expo-linear-gradient`.
5.  **Interactive Elements:**
    *   **Scale Effect:** All interactive cards and buttons must use the `ScalePressable` component.
    *   **Animation:** Use a fast, non-bouncy animation (`withTiming`, ~100ms) for a premium, responsive feel. Avoid springy, bouncy effects.
    *   **Feedback:** Always provide haptic feedback on press (`Haptics.ImpactFeedbackStyle.Light` or `Medium`).

## 4. Rules for AI Agents & Developers

1.  **Consistency:** Maintain the "Premium" look. Do not introduce flat, boring designs.
2.  **Component Reuse:** If a UI pattern appears twice, refactor it into `src/core/ui`.
3.  **Documentation Updates:**
    *   **CRITICAL:** If you change the design system (e.g., new primary color, new card style), add a new UI library, or change the styling methodology, **YOU MUST UPDATE THIS DOCUMENT**.
    *   Include the new standard and how to use it.

## 5. Example Usage

```tsx
import { Colors } from '@/core/theme/colors';
import { GlassCard } from '@/core/ui';

// Correct usage
<GlassCard className="p-6">
    <Text className="text-white font-bold text-xl">Hello World</Text>
</GlassCard>

// Incorrect usage (Hardcoded color, raw View)
<View style={{ backgroundColor: '#333', padding: 20 }}>
    <Text style={{ color: 'white' }}>Hello World</Text>
</View>
```
