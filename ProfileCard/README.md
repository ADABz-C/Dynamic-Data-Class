# Homework 2: Profile Card

This project is a mobile **Profile Card** app built with React Native and
Expo. It displays a profile image, a name, a short bio, and three fun facts in
a centered card layout.

The app demonstrates React Native's core `View`, `Text`, and `Image`
components, `StyleSheet` styling, and Flexbox alignment.

## Features

- Profile picture loaded with React Native's `Image` component
- Full name and short bio/tagline
- Three fun facts displayed inside a `View`
- Vertically and horizontally centered card
- Background colors, padding, margins, and rounded corners

## Requirements

Install the following before running the project:

- [Node.js LTS](https://nodejs.org/)
- npm (included with Node.js)
- [Expo Go](https://expo.dev/go) on your Android or iPhone
- For an iPhone, a Mac with Xcode is only needed if you want to use the iOS
  Simulator instead of a physical phone

## Installation

Clone the repository, then open the Expo project directory:

```bash
git clone <your-repository-url>
cd Dynamic-Data-Class/ProfileCard
```

Install the project dependencies:

```bash
npm install
```

## Run the app on your phone

1. Connect your phone and computer to the same Wi-Fi network.
2. Start the Expo development server:

   ```bash
   npx expo start
   ```

3. Open the **Expo Go** app on your phone.
4. Scan the QR code shown in the terminal or in the browser window:
   - **Android:** use the QR scanner in Expo Go.
   - **iPhone:** use the phone's Camera app, then open the Expo Go link.
5. The Profile Card app will load on your phone. Keep the development server
   running while using the app.

If the QR code does not connect, make sure both devices are on the same
network. You can also press `m` in the Expo terminal to switch connection
modes, or run:

```bash
npx expo start --tunnel
```

## Other ways to run the app

```bash
# Android emulator
npm run android

# iOS Simulator (macOS only)
npm run ios

# Web browser
npm run web
```

## Project structure

- `ProfileCard/app/(tabs)/index.tsx` - Profile Card screen
- `ProfileCard/package.json` - Project scripts and dependencies

## Assignment checklist

- [x] Expo project named Profile Card
- [x] Profile picture, name, bio, and 2–3 fun facts
- [x] `View`, `Text`, and `Image` components
- [x] `StyleSheet` and Flexbox layout
- [x] Background color, spacing, and rounded corners
- [ ] Push the repository to GitHub and submit its link
