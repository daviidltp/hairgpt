# Superwall Configuration Guide

## ✅ Installation Complete

The app is now configured with `expo-superwall` (v0.8.1) with **dual-mode support**:
- 🚀 **Expo Go**: Develop quickly without Superwall (mock paywall)
- 📱 **Development Build**: Full Superwall functionality for testing
- 🏭 **Production**: Complete paywall integration

## Development Workflow

### Option 1: Quick Development (Expo Go)
```bash
npx expo start
```
- Fast refresh and instant updates
- Superwall is **mocked** (logs to console instead of showing paywall)
- Perfect for UI/UX development

### Option 2: Testing Superwall (Development Build)
```bash
npx expo run:android --device
```
- Full native module support
- Real Superwall paywall displays
- Use this to test the actual paywall experience

## 1. Get your API Key

1. Go to [Superwall Dashboard](https://superwall.com/).
2. Create a new project or select an existing one.
3. Navigate to **Settings > Keys**.
4. Copy your **Public API Key**.

**Current API Key**: `pk_mlrsPZ7arycLQZwyeArVM`

## 2. Bundle IDs (Already Configured)

Your app is configured with:
- **iOS Bundle ID**: `com.david.dreamshift`
- **Android Package**: `com.david.dreamshift`

Make sure these match in your Superwall dashboard project settings.

## 3. Code Implementation (Already Done)

✅ **App.tsx**: Conditionally wraps with `SuperwallProvider` (only in dev/prod builds)
✅ **OnboardingScreen.tsx**: Uses `usePlacement` hook with Expo Go fallback

## 4. Creating a Paywall in Dashboard

1. In the Superwall Dashboard, go to **Paywalls**.
2. Click **Create Paywall** and use the visual editor to design your paywall.
3. Go to **Campaigns** and create a new campaign.
4. Add a **Placement** (Trigger) with the exact name: `onboarding_finish`
5. Attach your paywall to this placement.

## 5. Testing

### In Expo Go (Development):
- Complete the onboarding flow
- You'll see: `[EXPO GO MOCK] Would show paywall for placement: onboarding_finish`
- The app continues normally without showing a paywall

### In Development Build (Testing):
- Complete the onboarding flow
- The actual Superwall paywall will appear
- Check console logs for:
  - `"Paywall Presented:"` - When the paywall shows
  - `"Paywall Dismissed:"` - When the user closes it
  - `"Paywall Error:"` - If something goes wrong

## 6. Debugging

If the paywall doesn't show in a development build:
1. Check that the placement name in the dashboard exactly matches: `onboarding_finish`
2. Verify your API key is correct in `src/core/services/SuperwallService.ts`
3. Make sure the campaign is **active** in the dashboard
4. Check the console for error messages
5. Verify you're NOT running in Expo Go (check for the mock message)
